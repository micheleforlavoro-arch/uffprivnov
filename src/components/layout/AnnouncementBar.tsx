"use client";

import React from "react";

export default function AnnouncementBar() {
  const announcements = [
    "SPEDIZIONE TRACCIATA IN TUTTA ITALIA",
    "NOVUM ARCHIVE • DROP 01 LIVE NOW",
    "PEZZI UNICI 1/1 • NESSUN RESTOCK",
    "RESI ENTRO 14 GIORNI",
  ];

  return (
    <div className="bg-[#000] text-gray-400 text-[11px] font-mono border-b border-[#1c1c1c] py-2 overflow-hidden relative z-50">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
        {announcements.concat(announcements).map((text, idx) => (
          <span key={idx} className="flex items-center gap-4 tracking-widest font-semibold uppercase">
            <span>{text}</span>
            <span className="text-gray-700">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
