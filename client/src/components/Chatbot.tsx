import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { getApiUrl, API_CONFIG } from "../lib/api-config";

const chatbotInfo = `\nHi! I'm your AI Cyber Assistant. Ask me about Dinesh's projects, skills, or technologies used in this portfolio!\n`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: chatbotInfo }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");
    try {
      console.log('Sending request to:', getApiUrl(API_CONFIG.ENDPOINTS.CHAT));
      const res = await axios.post(getApiUrl(API_CONFIG.ENDPOINTS.CHAT), { message: input });
      console.log('Response:', res.data);
      const data = res.data as { reply?: string; action?: string; target?: string };
      if (data.action === 'navigate' && data.target) {
        setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "Navigating..." }]);
        // Navigate by updating the hash, respecting base URL
        const base = import.meta.env.BASE_URL || '/';
        const url = new URL(window.location.href);
        url.pathname = base.replace(/\/$/, '/');
        url.hash = data.target;
        window.location.href = url.toString();
        return;
      }
      setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "" }]);
    } catch (error) {
      console.error('API request failed:', error);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I couldn't reach the AI right now. Please try again in a moment." },
      ]);
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999]" 
      style={{ 
        position: 'fixed', 
        zIndex: 9999,
        bottom: '24px',
        right: '24px',
        display: 'block',
        visibility: 'visible'
      }}
    >
      {/* Transformer-Themed Toggle Button */}
      {!open && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, 5, -5, 0],
            boxShadow: "0 0 30px rgba(0, 255, 178, 0.8)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group focus:outline-none overflow-hidden"
          style={{ background: "none", border: "none", borderRadius: "50%" }}
          aria-label="Open Transformer AI Assistant"
        >
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/60"
            animate={{ 
              rotate: 360,
              boxShadow: [
                "0 0 25px rgba(0, 255, 178, 1), 0 0 35px rgba(0, 255, 178, 0.6), inset 0 0 15px rgba(0, 255, 178, 0.3)",
                "0 0 40px rgba(0, 255, 178, 1.5), 0 0 50px rgba(0, 255, 178, 0.8), inset 0 0 20px rgba(0, 255, 178, 0.4)",
                "0 0 25px rgba(0, 255, 178, 1), 0 0 35px rgba(0, 255, 178, 0.6), inset 0 0 15px rgba(0, 255, 178, 0.3)"
              ]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Transformer Logo Background */}
          <motion.div
            className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-transparent"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ borderRadius: "50%" }}
          >
            <img 
              src={import.meta.env.BASE_URL + "neon-microchip.png"} 
              alt="AI Microchip" 
              className="w-full h-full object-cover rounded-full filter brightness-110 hover:brightness-125 transition-all duration-300"
              style={{ borderRadius: "50%" }}
            />
          </motion.div>
          
          {/* Interactive Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/50"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.2, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Chat Indicator Dot */}
          {/* <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3366] rounded-full border-2 border-[#1A1A1A]"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 5px rgba(255, 51, 102, 0.5)",
                "0 0 15px rgba(255, 51, 102, 0.8)",
                "0 0 5px rgba(255, 51, 102, 0.5)"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              
            </span>
          </motion.div> */}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-80 h-96 p-1 rounded-2xl shadow-neon border-2 border-[#00FFB2] glassmorphism animate-glow"
            style={{ background: "rgba(26,26,26,0.95)" }}
          >
            <div className="flex flex-col h-full rounded-2xl p-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img 
                    src={import.meta.env.BASE_URL + "transformers-logo-new.png"} 
                    alt="AI" 
                    className="w-6 h-6 object-cover rounded-full animate-pulse"
                  />
                  <span className="text-[#00FFB2] font-bold tracking-widest"> CYTRA AI</span>
                </div>
                <button 
                  onClick={() => setOpen(false)} 
                  className="text-[#FF3366] hover:text-[#00FFB2] font-bold text-xl transition hover:rotate-90 transform duration-300"
                >
                  ✕
                </button>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[80%] shadow-neon text-sm ${
                        msg.from === "bot"
                          ? `bg-[#101c1c]/80 text-[#00FFB2] border-l-4 border-[#00FFB2] ${i === 0 ? 'border-t-4' : ''}`
                          : "bg-[#1A1A1A]/80 text-[#FF3366] border-r-4 border-[#FF3366]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {/* Input */}
              <form
                className="mt-2 flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  className="flex-1 bg-[#101c1c]/80 border border-[#00FFB2] rounded-l-xl px-3 py-2 text-[#00FFB2] focus:outline-none placeholder:text-[#00FFB2]/60"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                />
                <button
                  type="submit"
                  className="bg-[#00FFB2] text-[#1A1A1A] px-4 rounded-r-xl font-bold hover:bg-[#FF3366] hover:text-[#fff] transition shadow-neon"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 