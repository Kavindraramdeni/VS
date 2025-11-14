import { VercelRequest, VercelResponse } from '@vercel/node';
import { getQuotes, saveQuote } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const quotes = await getQuotes();
      return res.status(200).json(quotes);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      await saveQuote(body);
      return res.status(201).json({ message: "Saved" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
