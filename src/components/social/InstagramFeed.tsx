"use client";

import React from "react";
import { Camera, ArrowUpRight } from "lucide-react";

interface InstagramPostItem {
  id: string;
  label: string;
  url: string;
  image: string;
  fallbackImg: string;
  caption: string;
}

export default function InstagramFeed() {
  const posts: InstagramPostItem[] = [
    {
      id: "post-1",
      label: "Post 1",
      url: "https://www.instagram.com/p/DdZcGDhF2oA/?stkn=MWwwNHA3c2QzaXd4cA==",
      image: "https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/814575235_17897200476670410_5352526386346135643_n.jpg?stp=c235.0.708.707a_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=w5cKIc8CIEwQ7kNvwGO3jKj&_nc_oc=AdoCC-jQ8VVdcVbI6dvKvTaw2n2uJmAOSEEjgFQiQesPvvekLvQvhMp13QQhvtMuIdY&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=E6xnQUAou3ayAr4CFqfF4A&_nc_ss=7b60f&oh=00_AQJe3WLi8xlv8WPCxHzgayFxH7iQT9f8kh0A9wZxUgJqeA&oe=6ABC603A",
      fallbackImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      caption: "LA SCUOLA È RICOMINCIATA... E SI RIPARTE CON STILE! 💯",
    },
    {
      id: "post-2",
      label: "Post 2",
      url: "https://www.instagram.com/p/DanX8NxCP6Q/?stkn=MWxmbHM0Y2J6YWY2NQ==",
      image: "https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/744875352_17883571851670410_7031603122100170582_n.jpg?stp=c614.0.1843.1843a_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=iCgKCf9O4_4Q7kNvwEN5GY0&_nc_oc=AdpYEP29s7jlE6CpzmGyv22cmboftZsVohOhGw2PvmZSNsmO7L_O9--t0qVzynWotc0&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=7zEvBUlxw83cdp5VhTpM8A&_nc_ss=7b60f&oh=00_AQJ9gNIndlUxguSYpzoNmEh1mxTw79DwQzICVTQyBrv0zg&oe=6ABC7564",
      fallbackImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      caption: "Coordinato Mare Perfetto • Novum Store Cosenza 🌊",
    },
    {
      id: "post-3",
      label: "Post 3",
      url: "https://www.instagram.com/p/DZmt-T-l4OM/?stkn=ZzZ6dmxvaHdnZHA=",
      image: "https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/722960542_17878448679670410_7865669657971377909_n.jpg?stp=c614.0.1843.1843a_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=5fn8mR90tfAQ7kNvwEgiZ2y&_nc_oc=AdpwB7UXDeVAN2CI9s08HzUa2FAmTBQhCxY2kxbRtwn-kWwFNuwGXI1f-afLSgRQPuU&_nc_zt=23&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_gid=zaN_yuu8qxz8l7WIwm75FA&_nc_ss=7b60f&oh=00_AQIg2hfsoYgqBS4EgtV1yEq69xeNNjEU-qnS5OFF5Bh_-A&oe=6ABC73DC",
      fallbackImg: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
      caption: "Outfit Streetwear da abbinare • Novum Archive 🖤",
    },
    {
      id: "post-4",
      label: "Post 4",
      url: "https://www.instagram.com/p/DZfePFaF_W2/?stkn=ZzI4a2RxZWtoMHYx",
      image: "https://scontent-bru2-1.cdninstagram.com/v/t51.82787-15/724010440_17877935685670410_6977938796757075179_n.jpg?stp=c307.0.921.921a_dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=DKLjv5beLuEQ7kNvwFM2GDC&_nc_oc=Ado1JE7b1xaE6kFa8S-kuTSB_Zx3L33yb05zXVpaOeu4UiNclf4LA7l6pwCpFsR4l4Q&_nc_zt=23&_nc_ht=scontent-bru2-1.cdninstagram.com&_nc_gid=-ZJzqfZZVRtT8VtBzzbcTg&_nc_ss=7b60f&oh=00_AQLrVIFBSNvkG2ULa3fZGZ_XvcHSy1L0FzIs6s21gfduFg&oe=6ABC590A",
      fallbackImg: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
      caption: "Vieni a trovarci in Via Silvio Sesti 22, Cosenza 🔥",
    },
  ];

  return (
    <section className="container mx-auto px-4 pb-24 font-mono">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#1c1c1c] pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-white font-sans flex items-center gap-2">
            @novum_store_
          </h2>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Visual Archive • Ultime 4 Uscite in Ordine Cronologico
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/novum_store_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
          >
            Instagram <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.tiktok.com/@novum_store_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
          >
            TikTok <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* SYMMETRICAL 4-CARD HORIZONTAL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[3/4] bg-[#070707] border border-[#1f1f1f] hover:border-gray-400 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            {/* IMAGE WITH SMOOTH HOVER ZOOM & BRIGHTNESS TRANSITION */}
            <div className="absolute inset-0 bg-[#0c0c0c] overflow-hidden">
              <img
                src={post.image}
                alt={post.caption}
                onError={(e) => {
                  // Fallback to high quality dark streetwear visual if Instagram CDN token expires
                  (e.target as HTMLImageElement).src = post.fallbackImg;
                }}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-out"
              />
            </div>

            {/* TOP LEFT MINIMAL INSTAGRAM ICON BADGE */}
            <div className="relative z-10 m-3 self-start">
              <div className="bg-black/75 backdrop-blur-md text-white border border-[#333] p-2 rounded-lg flex items-center gap-1.5 text-[10px] font-bold tracking-wider shadow-lg">
                <Camera size={13} className="text-gray-300" />
                <span className="text-gray-200">@novum_store_</span>
              </div>
            </div>

            {/* BOTTOM CAPTION OVERLAY WITH LINK INDICATOR */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
                {post.label}
              </span>
              <p className="text-xs font-bold text-white uppercase tracking-tight line-clamp-2 leading-snug">
                {post.caption}
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors pt-2 border-t border-white/10">
                <span>Vedi Post →</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
