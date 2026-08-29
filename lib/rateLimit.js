const store = global.rateLimitStore || new Map();
global.rateLimitStore = store;

export const getRequestIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
};

export const rateLimit = (key, limit, windowMs) => {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  current.count += 1;
  if (store.size > 5000) {
    for (const [storedKey, entry] of store.entries()) if (entry.resetAt <= now) store.delete(storedKey);
  }
  return { allowed: current.count <= limit, remaining: Math.max(0, limit - current.count), retryAfter: Math.ceil((current.resetAt - now) / 1000) };
};
