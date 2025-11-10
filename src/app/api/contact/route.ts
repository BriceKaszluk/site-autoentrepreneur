import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactRatelimit } from "@/lib/ratelimit";

export const runtime = "nodejs"; // Nodemailer => Node (pas Edge)

type Body = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
  turnstileToken: string;
  website?: string; // honeypot
};

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );
  const data = await res.json();
  return Boolean(data.success);
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const body = (await req.json()) as Body;

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true }); // on ignore silencieusement
    }

    // Validations rapides (le zod est côté client ; on re-valide les points critiques)
    if (!body.name || !body.email || !body.message || !body.consent) {
      return NextResponse.json(
        { ok: false, error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // Turnstile
    const ok = await verifyTurnstile(body.turnstileToken, ip);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Vérification anti-spam échouée." },
        { status: 400 }
      );
    }

    // Envoi email via Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      authMethod: "LOGIN", // aide parfois chez Brevo
    });

    const subject = `Nouveau contact — ${body.name}`;
    const text = [
      `Nom: ${body.name}`,
      `Email: ${body.email}`,
      body.phone ? `Téléphone: ${body.phone}` : null,
      `Message:\n${body.message}`,
      ip ? `IP: ${ip}` : null,
    ]
      .filter(Boolean)
      .join("\n");
await transporter.verify().then(console.log).catch(console.error);
    await transporter.sendMail({
      from: `brice-laurent<kaszlukb@gmail.com>`, // DOIT être validé chez Brevo
      to: process.env.CONTACT_TO!,
      subject,
      replyTo: body.email,
      text,
      html: text.replace(/\n/g, "<br>"),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 }
    );
  }
}
