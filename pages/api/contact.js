import nodemailer from "nodemailer";
import { z } from "zod";
import { getRequestIp, rateLimit } from "../../lib/rateLimit";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().default(""),
}).strict();

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}[character]));

export const config = {
  api: { bodyParser: { sizeLimit: "16kb" } },
  maxDuration: 10,
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const requestLimit = rateLimit(`contact:${getRequestIp(req)}`, 5, 15 * 60 * 1000);
  if (!requestLimit.allowed) {
    res.setHeader("Retry-After", String(requestLimit.retryAfter));
    return res.status(429).json({ error: "Too many requests" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid form data" });

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_TO_EMAIL || smtpUser;
  if (!smtpUser || !smtpPassword || !recipient) {
    return res.status(503).json({ error: "Contact service unavailable" });
  }

  const { name, email, subject, message } = parsed.data;
  const safeSubject = subject.replace(/[\r\n]+/g, " ");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: "Mavisker Portfolio", address: smtpUser },
      to: recipient,
      replyTo: { name, address: email },
      subject: `[Portfolio] ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery failed:", error instanceof Error ? error.message : "Unknown error");
    return res.status(502).json({ error: "Email delivery failed" });
  }
}
