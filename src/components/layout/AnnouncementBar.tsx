"use client";

import React from "react";

export default function AnnouncementBar() {
  const announcements = [
    "🔥 SPEDIZIONE GRATUITA PER ORDINI SUPERIORI A €100",
    "⚡ NUOVO DROP 01 LIVE NOW - NESSUN RESTOCK",
    "📦 RESI FACILI ENTRO 14 GIORNI",
    "💳 PAGA IN 3 RATE SENZA INTERESSI CON KLARNA",
  ];

  return (
    <div className="bg-[#000] text-gray-300 text-[11px] font-mono border-b border-[#222] py-2 overflow-hidden relative z-50">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
        {announcements.concat(announcements).map((text, idx) => (
          <span key={idx} className="flex items-center gap-3 tracking-widest font-semibold uppercase">
            <span>{text}</span>
            <span className="text-gray-600">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
