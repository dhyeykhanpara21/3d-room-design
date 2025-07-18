import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          error: "All fields are required",
          message: "VALIDATION_ERROR: Missing required fields" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: "Invalid email format",
          message: "VALIDATION_ERROR: Invalid email format" 
        });
      }

      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Integrate with email service (SendGrid, Mailgun, etc.)
      
      // For now, just log the contact attempt
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.status(200).json({
        success: true,
        message: "MESSAGE_TRANSMITTED: Your message has been received successfully.",
        id: Math.random().toString(36).substr(2, 9)
      });

    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: "TRANSMISSION_ERROR: Failed to process your message. Please try again." 
      });
    }
  });

  // Portfolio data endpoints
  app.get("/api/portfolio/stats", async (req, res) => {
    try {
      const stats = {
        vulnerabilities_patched: 500,
        security_audits: 50,
        years_experience: 8,
        certifications: 15,
        projects_completed: 6,
        clients_served: 25
      };

      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/portfolio/skills", async (req, res) => {
    try {
      const skills = {
        technical: [
          { name: "Penetration Testing", level: 95 },
          { name: "Network Security", level: 90 },
          { name: "Incident Response", level: 88 },
          { name: "Malware Analysis", level: 85 },
          { name: "Security Architecture", level: 92 }
        ],
        tools: [
          "Metasploit", "Nmap", "Wireshark", "Burp Suite", "OWASP ZAP",
          "Splunk", "ELK Stack", "Nessus", "OpenVAS", "Kali Linux"
        ],
        certifications: [
          "CISSP", "CEH", "OSCP", "CISM", "Security+", "CySA+"
        ]
      };

      res.json(skills);
    } catch (error) {
      console.error("Skills error:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "CYBERVAULT_ONLINE",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
