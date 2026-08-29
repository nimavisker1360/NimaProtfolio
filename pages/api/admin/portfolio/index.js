import { requireAdmin } from "../../../../lib/apiAuth";
import { connectDatabase } from "../../../../lib/db";
import { normalizePortfolioInput, portfolioSchema } from "../../../../lib/portfolioValidation";
import PortfolioItem from "../../../../models/PortfolioItem";

export default async function handler(req, res) {
  const needsCsrf = req.method !== "GET";
  if (!requireAdmin(req, res, { csrf: needsCsrf })) return;
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    await connectDatabase();
    if (req.method === "GET") {
      const items = await PortfolioItem.find({}).sort({ order: 1, createdAt: -1 }).lean();
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ items: JSON.parse(JSON.stringify(items)) });
    }

    const parsed = portfolioSchema.safeParse(normalizePortfolioInput(req.body));
    if (!parsed.success) return res.status(400).json({ error: "Invalid portfolio data.", details: parsed.error.flatten() });
    const item = await PortfolioItem.create(parsed.data);
    return res.status(201).json({ item: item.toJSON() });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Portfolio request failed." });
  }
}
