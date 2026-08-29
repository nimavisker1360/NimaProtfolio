import { requireAdmin } from "../../../lib/apiAuth";
import { configureCloudinary } from "../../../lib/cloudinary";

const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!requireAdmin(req, res, { csrf: true })) return;

  const { resourceType, mimeType, size } = req.body || {};
  const bytes = Number(size);
  const video = resourceType === "video";
  const validType = video ? VIDEO_TYPES.has(mimeType) : resourceType === "image" && IMAGE_TYPES.has(mimeType);
  const validSize = Number.isFinite(bytes) && bytes > 0 && bytes <= (video ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES);
  if (!validType || !validSize) return res.status(400).json({ error: "Unsupported file type or file size." });

  try {
    const client = configureCloudinary();
    const timestamp = Math.round(Date.now() / 1000);
    const folder = video ? "mavisker/portfolio/videos" : "mavisker/portfolio/covers";
    const signature = client.utils.api_sign_request({ folder, timestamp }, process.env.CLOUDINARY_API_SECRET);
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      timestamp,
      folder,
      resourceType,
      signature,
    });
  } catch (error) {
    return res.status(503).json({ error: error.message });
  }
}
