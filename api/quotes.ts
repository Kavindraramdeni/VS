import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";
import { insertQuoteSchema } from "@shared/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "POST") {
      const data = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(data);

      return res.status(201).json({
        success: true,
        message: "Quote request submitted successfully",
        data: {
          id: quote.id,
          name: quote.name,
          service: quote.service
        }
      });
    }

    if (req.method === "GET") {
      const quotes = await storage.getQuotes();
      return res.status(200).json({ success: true, data: quotes });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message ?? "Internal Server Error",
    });
  }
}
