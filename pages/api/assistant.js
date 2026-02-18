import { siteKnowledge } from "../../lib/siteKnowledge";
import fs from "fs";
import path from "path";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const getApiKeyFromPagesEnv = () => {
  try {
    const filePath = path.join(process.cwd(), "pages", ".env");
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^OPENAI_API_KEY=(.*)$/m);

    if (!match || !match[1]) {
      return "";
    }

    return match[1].trim().replace(/^['"]|['"]$/g, "");
  } catch {
    return "";
  }
};

const getContentAsText = (content) => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (part && typeof part.text === "string") {
          return part.text;
        }

        return "";
      })
      .join("")
      .trim();
  }

  return "";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY || getApiKeyFromPagesEnv();
  if (!apiKey) {
    return res.status(500).json({
      error:
        "OPENAI_API_KEY not found. Set it in .env.local or pages/.env and restart the dev server.",
    });
  }

  const { question, messages = [] } = req.body || {};
  const normalizedQuestion =
    typeof question === "string" ? question.trim() : "";

  if (!normalizedQuestion) {
    return res.status(400).json({ error: "Question is required." });
  }

  const history = Array.isArray(messages)
    ? messages
        .filter(
          (item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
        )
        .slice(-8)
    : [];

  const systemPrompt = `
You are the AI assistant for this portfolio website.
Use only the website knowledge provided below.
Do not invent project names, client names, prices, or claims not in data.
If information is missing, say clearly that it is not available in website data.
Reply in the same language the user used.

Website Knowledge:
${siteKnowledge}
`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: normalizedQuestion },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const details =
        data?.error?.message || "OpenAI request failed. Check API key/model.";
      return res.status(response.status).json({ error: details });
    }

    const answer = getContentAsText(data?.choices?.[0]?.message?.content);

    return res.status(200).json({
      answer:
        answer ||
        "Not enough data was found on this website for that question. Please ask more specifically.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Unexpected server error.",
    });
  }
}
