import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema } from "@shared/schema";
import { z } from "zod";

// Helper to handle async errors
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/quotes", asyncHandler(async (req, res) => {
    const result = insertQuoteSchema.parse(req.body); // throws if invalid
    const quote = await storage.createQuote(result);
    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: {
        id: quote.id,
        name: quote.name,
        service: quote.service
      }
    });
  }));

  app.get("/api/quotes", asyncHandler(async (_req, res) => {
    const quotes = await storage.getQuotes();
    res.json({ success: true, data: quotes });
  }));

  const httpServer = createServer(app);
  return httpServer;
}
