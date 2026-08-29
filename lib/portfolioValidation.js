import { z } from "zod";
import { PORTFOLIO_CATEGORIES } from "./content";

const categoryValues = /** @type {[string, ...string[]]} */ (PORTFOLIO_CATEGORIES.map((item) => item.value));
const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "Only HTTPS URLs are allowed.");

export const portfolioSchema = z.object({
  title: z.object({ en: z.string().trim().min(2).max(160), tr: z.string().trim().max(160) }),
  description: z.object({ en: z.string().trim().max(2400), tr: z.string().trim().max(2400) }),
  categories: z.array(z.enum(categoryValues)).min(1).max(categoryValues.length),
  clientIndustry: z.string().trim().max(160),
  year: z.coerce.number().int().min(2000).max(2100),
  role: z.string().trim().max(240),
  tools: z.array(z.string().trim().min(1).max(80)).max(30),
  cover: z.object({ url: httpsUrl, publicId: z.string().trim().min(1).max(300) }),
  video: z.object({ url: httpsUrl, publicId: z.string().trim().min(1).max(300) }),
  aspectRatio: z.enum(["9:16", "16:9", "1:1"]),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.coerce.number().int().min(-100000).max(100000),
});

export const normalizePortfolioInput = (body) => {
  const englishTitle = String(body?.title?.en || "").trim();
  return {
    ...body,
    title: {
      en: englishTitle,
      tr: String(body?.title?.tr || "").trim() || englishTitle,
    },
    description: {
      en: String(body?.description?.en || "").trim(),
      tr: String(body?.description?.tr || "").trim(),
    },
    clientIndustry: String(body?.clientIndustry || "").trim(),
    role: String(body?.role || "").trim(),
    year: body?.year || new Date().getFullYear(),
    order: body?.order || 0,
    tools: Array.isArray(body?.tools) ? body.tools : String(body?.tools || "").split(",").map((item) => item.trim()).filter(Boolean),
  };
};
