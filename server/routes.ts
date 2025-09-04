import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { handleChatMessage } from "./chat-handler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

  // Chat endpoint (mounted on the provided app instance)
  app.post("/api/chat", handleChatMessage);
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please provide a valid email address" 
        });
      }
      
      // In a real application, here you would:
      // 1. Store the message in a database
      // 2. Send an email notification
      // 3. Set up a webhook to a CRM, etc.
      
      // For now, just return success
      res.status(200).json({ 
        message: "Message received successfully" 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

