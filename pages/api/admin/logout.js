import { requireAdmin } from "../../../lib/apiAuth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!requireAdmin(req, res, { csrf: true })) return;
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true });
}
