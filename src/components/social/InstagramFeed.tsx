"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Camera } from "lucide-react";
import Script from "next/script";

interface InstagramPost {
  id: string;
  url: string;
  caption: string;
}

export default function InstagramFeed() {
  // Initial 4 Instagram post URLs from @novum_store_
  const [posts, setPosts] = useState<InstagramPost[]>([
    {
      id: "post-1",
      url: "https://www.instagram.com/novum_store_",
      caption: "NOVUM ARCHIVE • LATEST POST 01",
    },
    {
      id: "post-2",
      url: "https://www.instagram.com/novum_store_",
      caption: "NOVUM ARCHIVE • LATEST POST 02",
    },
    {
      id: "post-3",
      url: "https://www.instagram.com/novum_store_",
      caption: "NOVUM ARCHIVE • LATEST POST 03",
    },
    {
      id: "post-4",
      url: "https://www.instagram.com/novum_store_",
      caption: "NOVUM ARCHIVE • LATEST POST 04",
    },
  ]);

  // Trigger Instagram embed processing when script or posts change
  const processEmbeds = () => {
    if (typeof window !== "undefined" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  };

  useEffect(() => {
    processEmbeds();
  }, [posts]);

  return (
    <section className="container mx-auto px-4 pb-24 font-mono">
      {/* Script to load official Instagram embeds */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#1c1c1c] pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-white font-sans flex items-center gap-2">
            <Camera size={24} className="text-white" /> @novum_store_
          </h2>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Feed Ufficiale Instagram • Primi 4 Post in Evidenza (Live Update)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/novum_store_"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
          >
            Vedi su Instagram <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.tiktok.com/@novum_store_"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
          >
            TikTok <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* INSTAGRAM POSTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className="bg-[#090909] border border-[#1f1f1f] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-gray-500 transition-all duration-300 min-h-[380px]"
          >
            {/* INSTAGRAM EMBED CONTAINER */}
            <div className="relative w-full flex-grow flex items-center justify-center p-2 bg-[#050505] overflow-hidden">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
                style={{
                  background: "#0a0a0a",
                  border: 0,
                  borderRadius: "12px",
                  boxShadow: "none",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "280px",
                  padding: 0,
                  width: "calc(100% - 2px)",
                }}
              >
                <div className="p-4 flex flex-col items-center justify-center text-center space-y-3 min-h-[280px]">
                  <Camera size={36} className="text-gray-500 animate-pulse" />
                  <span className="text-xs text-gray-400 font-bold uppercase">
                    POST 0{idx + 1} • @novum_store_
                  </span>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    {post.caption}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#161616] hover:bg-white hover:text-black text-gray-200 border border-[#333] rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all"
                  >
                    Apri Post Ufficiale →
                  </a>
                </div>
              </blockquote>
            </div>

            {/* CARD FOOTER */}
            <div className="p-3 bg-[#0d0d0d] border-t border-[#1a1a1a] flex items-center justify-between text-[11px]">
              <span className="text-gray-400 font-bold uppercase">Post 0{idx + 1}</span>
              <a
                href="https://www.instagram.com/novum_store_"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline font-bold flex items-center gap-1"
              >
                @novum_store_ <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
