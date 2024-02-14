import { LRUCache } from "lru-cache";

import { IS_FORMBRICKS_CLOUD, REDIS_HTTP_CLIENT_URL } from "@formbricks/lib/constants";

type Options = {
  interval: number;
  allowedPerInterval: number;
};

const cloudRateLimiter = (options: Options) => {
  const tokenCache = new LRUCache<string, number>({
    max: 1000,
    ttl: options.interval,
  });

  return async (token: string) => {
    const currentUsage = tokenCache.get(token) || 0;
    if (currentUsage >= options.allowedPerInterval) {
      throw new Error("Rate limit exceeded");
    }
    tokenCache.set(token, currentUsage + 1);
  };
};

import Redis from 'ioredis';

const redis = new Redis(REDIS_HTTP_CLIENT_URL);

const selfHostingRateLimiter = async (options: Options) => {
  const tokenCount = await redis.incr(token);
  if (tokenCount === 1) {
    await redis.expire(token, options.interval / 1000);
  }
  if (tokenCount > options.allowedPerInterval) {
    throw new Error("Rate limit exceeded for IP: " + token);
  }
};
};

export default function rateLimit(options: Options) {
  if (IS_FORMBRICKS_CLOUD || !REDIS_HTTP_CLIENT_URL) {
    return cloudRateLimiter(options);
  } else {
    return selfHostingRateLimiter(options);
  }
}
