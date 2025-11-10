import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requêtes / heure / IP
  analytics: true,
  prefix: "rl:contact",
});
