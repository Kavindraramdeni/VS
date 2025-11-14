import { storage } from "../server/storage";
import { insertQuoteSchema } from "@shared/schema";

export default async function handler(req, res) {
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
      return res.json({ success: true, data: quotes });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
