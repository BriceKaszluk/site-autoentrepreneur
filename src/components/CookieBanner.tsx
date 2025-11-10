"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "cloud",
          position: "bottom center",
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
        },
      },
      categories: {
        necessary: {
          readOnly: true,
          enabled: true,
        },
        analytics: {},
      },
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Nous respectons votre vie privée",
              description:
                "Ce site utilise des cookies nécessaires à son bon fonctionnement et des cookies analytiques pour mesurer son audience. Vous pouvez accepter ou refuser ces derniers.",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser les cookies",
              showPreferencesBtn: "Personnaliser",
            },
            preferencesModal: {
              title: "Préférences des cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser les cookies",
              savePreferencesBtn: "Enregistrer mes choix",
              sections: [
                {
                  title: "Utilisation des cookies",
                  description:
                    "Nous utilisons des cookies pour assurer le bon fonctionnement du site et, avec votre consentement, pour analyser la fréquentation.",
                },
                {
                  title: "Cookies nécessaires",
                  description:
                    "Indispensables au bon fonctionnement du site (connexion, sécurité, choix du consentement).",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies de mesure d’audience",
                  description:
                    "Ces cookies nous aident à comprendre comment le site est utilisé afin d’en améliorer le contenu.",
                  linkedCategory: "analytics",
                },
                {
                  title: "En savoir plus",
                  description:
                    'Consultez notre <a href="/confidentialite" class="underline text-blue-600">politique de confidentialité</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
