import { connectDatabase } from "../../../lib/db";
import PortfolioItem from "../../../models/PortfolioItem";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!process.env.MONGODB_URI) return res.status(200).json({ items: [] });
  try {
    await connectDatabase();
    const items = await PortfolioItem.find({ published: true }).sort({ featured: -1, order: 1, createdAt: -1 }).lean();
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ items: JSON.parse(JSON.stringify(items)) });
  } catch {
    return res.status(503).json({ error: "Portfolio is temporarily unavailable." });
  }
}
