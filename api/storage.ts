import { randomUUID } from "crypto";
import { type Quote, type InsertQuote } from "../shared/schema";

class MemStorage {
  private quotes = new Map<string, Quote>();

  async createQuote(data: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = {
      ...data,
      id,
      service: data.service || null,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return [...this.quotes.values()].sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
