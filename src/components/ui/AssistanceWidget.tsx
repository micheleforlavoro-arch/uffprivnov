"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, CheckCircle2 } from "lucide-react";

export default function AssistanceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(message || "Ciao Luca, vorrei informazioni sui capi e sulle taglie di Novum Store.");
    window.open(`https://wa.me/393000000000?text=${encodedText}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {isOpen && (
        <div className="w-80 sm:w-96 bg-[#0d0d0d] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#151515] p-4 border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center font-bold text-white border border-[#444] text-sm">
                  L
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#151515]"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Luca • Assistenza Store
                  <CheckCircle2 size={14} className="text-green-500 fill-green-500/20" />
                </h4>
                <p className="text-[11px] text-gray-400">Solitamente risponde in pochi minuti</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#222] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#090909] text-xs text-gray-300 space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-[#181818] p-3 rounded-2xl rounded-tl-none border border-[#282828] max-w-[85%] text-gray-200 leading-relaxed">
              👋 Ciao! Sono Luca di **Novum Store**.
              <br />
              Hai domande su taglie, spedizioni o disponibilità dei capi? Scrivimi pure!
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendWhatsApp} className="p-3 bg-[#121212] border-t border-[#222] flex gap-2">
            <input
              type="text"
              placeholder="Scrivi un messaggio a Luca..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-[#1c1c1c] border border-[#333] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center font-semibold"
              title="Invia su WhatsApp"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-medium text-xs tracking-wide transition-all transform hover:scale-105 border border-green-400/30"
      >
        <div className="relative">
          <MessageSquare size={18} fill="currentColor" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
        </div>
        <span className="font-semibold text-white">Assistenza - Parla con noi (Luca)</span>
      </button>
    </div>
  );
}
