import { requireAdmin } from "../../../lib/apiAuth";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const session = requireAdmin(req, res);
  if (!session) return;
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ authenticated: true, email: session.email, csrfToken: session.csrf });
}
