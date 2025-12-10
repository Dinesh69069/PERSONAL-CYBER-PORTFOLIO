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
      
      // Store message in storage (file-based for now)
      const contactData = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
        status: 'unread'
      };
      
      // Log contact submission to server console
      // In production, this would be saved to a database
      console.log('📬 New Contact Form Submission:');
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${email}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Message: ${message.substring(0, 100)}...`);
      console.log(`   Time: ${contactData.timestamp}`);
      
      // Send success response
      res.status(200).json({ 
        message: "Thank you for your message! I'll get back to you soon.",
        success: true
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        message: "An error occurred while processing your request",
        success: false
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

