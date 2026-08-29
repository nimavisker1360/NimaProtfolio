import mongoose from "mongoose";

const localizedTitle = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true, maxlength: 160 },
    tr: { type: String, default: "", trim: true, maxlength: 160 },
  },
  { _id: false }
);

const localizedDescription = new mongoose.Schema(
  {
    en: { type: String, default: "", trim: true, maxlength: 2400 },
    tr: { type: String, default: "", trim: true, maxlength: 2400 },
  },
  { _id: false }
);

const media = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const portfolioItemSchema = new mongoose.Schema(
  {
    title: { type: localizedTitle, required: true },
    description: { type: localizedDescription, default: () => ({ en: "", tr: "" }) },
    categories: [{ type: String, required: true }],
    clientIndustry: { type: String, default: "", trim: true, maxlength: 160 },
    year: { type: Number, default: () => new Date().getFullYear(), min: 2000, max: 2100 },
    role: { type: String, default: "", trim: true, maxlength: 240 },
    tools: [{ type: String, trim: true, maxlength: 80 }],
    cover: { type: media, required: true },
    video: { type: media, required: true },
    aspectRatio: { type: String, enum: ["9:16", "16:9", "1:1"], default: "9:16" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0, min: -100000, max: 100000 },
  },
  { timestamps: true }
);

portfolioItemSchema.index({ published: 1, featured: -1, order: 1, createdAt: -1 });
portfolioItemSchema.index({ categories: 1, published: 1 });

if (process.env.NODE_ENV !== "production" && mongoose.models.PortfolioItem) {
  mongoose.deleteModel("PortfolioItem");
}

/** @type {mongoose.Model<any>} */
const PortfolioItem = mongoose.models.PortfolioItem || mongoose.model("PortfolioItem", portfolioItemSchema);

export default PortfolioItem;
