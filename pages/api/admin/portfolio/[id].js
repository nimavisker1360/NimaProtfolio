import mongoose from "mongoose";
import { requireAdmin } from "../../../../lib/apiAuth";
import { configureCloudinary } from "../../../../lib/cloudinary";
import { connectDatabase } from "../../../../lib/db";
import { normalizePortfolioInput, portfolioSchema } from "../../../../lib/portfolioValidation";
import PortfolioItem from "../../../../models/PortfolioItem";

export default async function handler(req, res) {
  if (!requireAdmin(req, res, { csrf: true })) return;
  if (!["PUT", "DELETE"].includes(req.method)) {
    res.setHeader("Allow", "PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!mongoose.isValidObjectId(req.query.id)) return res.status(400).json({ error: "Invalid item id." });

  try {
    await connectDatabase();
    if (req.method === "PUT") {
      const parsed = portfolioSchema.safeParse(normalizePortfolioInput(req.body));
      if (!parsed.success) return res.status(400).json({ error: "Invalid portfolio data.", details: parsed.error.flatten() });
      const item = await PortfolioItem.findByIdAndUpdate(req.query.id, parsed.data, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ error: "Portfolio item not found." });
      return res.status(200).json({ item: item.toJSON() });
    }

    const item = await PortfolioItem.findById(req.query.id);
    if (!item) return res.status(404).json({ error: "Portfolio item not found." });
    const client = configureCloudinary();
    await Promise.all([
      client.uploader.destroy(item.video.publicId, { resource_type: "video", invalidate: true }),
      client.uploader.destroy(item.cover.publicId, { resource_type: "image", invalidate: true }),
    ]);
    await item.deleteOne();
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Portfolio request failed." });
  }
}
