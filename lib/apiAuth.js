import { getRequestIp, rateLimit } from "./rateLimit";

export const requireAdmin = (req, res, { csrf = false } = {}) => {
  if (csrf) {
    const origin = req.headers.origin;
    const forwardedHost = req.headers["x-forwarded-host"];
    const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host || "").split(",")[0].trim();
    let sameOrigin = false;
    try {
      sameOrigin = Boolean(origin && host && new URL(origin).host === host);
    } catch {}
    if (!sameOrigin) {
      res.status(403).json({ error: "Same-origin request required." });
      return null;
    }
  }

  const attempt = rateLimit(`admin:${getRequestIp(req)}`, 120, 60_000);
  if (!attempt.allowed) {
    res.setHeader("Retry-After", attempt.retryAfter);
    res.status(429).json({ error: "Too many requests." });
    return null;
  }

  return { email: "Open access", csrf: "" };
};
