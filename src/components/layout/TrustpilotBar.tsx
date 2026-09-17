"use client";

import React from "react";
import { Star } from "lucide-react";

export default function TrustpilotBar() {
  return (
    <div className="bg-[#090909] border-b border-[#1a1a1a] py-2 px-4 text-center flex items-center justify-center gap-3 text-xs text-gray-300">
      <div className="flex items-center gap-1 bg-[#00b67a] text-black px-1.5 py-0.5 rounded font-bold text-[10px]">
        <span>Trustpilot</span>
      </div>
      <div className="flex items-center gap-0.5 text-[#00b67a]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} fill="#00b67a" className="text-[#00b67a]" />
        ))}
      </div>
      <span className="font-semibold text-white">4.9 / 5</span>
      <span className="text-gray-500 hidden sm:inline">•</span>
      <span className="text-gray-400 hidden sm:inline">Oltre 1.240 recensioni verificate dei clienti</span>
    </div>
  );
}
