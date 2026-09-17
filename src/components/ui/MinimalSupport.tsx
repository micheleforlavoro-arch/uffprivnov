"use client";

import React, { useState } from "react";
import { HelpCircle, X, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MinimalSupport() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-mono">
      {isOpen && (
        <div className="w-72 sm:w-80 bg-[#0a0a0a] border border-[#222] rounded-xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c] mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <HelpCircle size={14} /> Supporto Archivi
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed font-sans mb-4">
            Per informazioni sui capi, consigli sulle taglie o dettagli sulle spedizioni, il nostro team di supporto risponde direttamente.
          </p>

          <div className="space-y-2">
            <Link
              href="/contatti"
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-white px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all"
            >
              <span>Modulo Contatti</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href="mailto:supporto@novumstore.com"
              className="w-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-gray-300 hover:text-white px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <Mail size={13} /> Email Ufficiale
              </span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#121212] hover:bg-white text-gray-300 hover:text-black border border-[#2a2a2a] hover:border-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300"
      >
        <HelpCircle size={15} />
        <span>Supporto</span>
      </button>
    </div>
  );
}
