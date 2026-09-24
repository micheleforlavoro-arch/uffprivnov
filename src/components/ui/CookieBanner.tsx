"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const consent = localStorage.getItem("novum_cookie_consent");
    if (!consent) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "all" | "necessary") => {
    localStorage.setItem("novum_cookie_consent", type);
    localStorage.setItem("novum_cookie_consent_date", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-in slide-in-from-bottom duration-500 font-sans">
      <div className="bg-[#0c0c0c]/95 backdrop-blur-md border border-[#222] p-5 rounded-2xl shadow-2xl relative text-gray-300">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#181818] border border-[#333] rounded-xl text-white">
              <Cookie size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                Informativa Cookie & Privacy (GDPR)
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">NOVUM ARCHIVE • Trasparenza Digitale</p>
            </div>
          </div>
          
          <button
            onClick={() => handleConsent("necessary")}
            className="text-gray-500 hover:text-white p-1 transition-colors"
            title="Chiudi (Solo Necessari)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Text body */}
        <p className="text-xs leading-relaxed text-gray-300 mb-4 font-sans">
          Utilizziamo cookie tecnici essenziali per garantire il funzionamento del carrello e la sicurezza dei pagamenti tramite Stripe. Con il tuo consenso, possiamo anche utilizzare strumenti di analisi per migliorare la tua esperienza d&apos;acquisto streetwear.
        </p>

        {/* Links & Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#1c1c1c] font-mono">
          <div className="flex items-center gap-3 text-[11px] text-gray-400 underline">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConsent("necessary")}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#141414] hover:bg-[#1f1f1f] text-gray-300 border border-[#2e2e2e] hover:border-gray-500 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Solo necessari
            </button>
            <button
              onClick={() => handleConsent("all")}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-white text-black hover:bg-gray-200 text-[11px] font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
            >
              <ShieldCheck size={14} /> Accetta tutti
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
