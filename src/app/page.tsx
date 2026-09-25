"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, ArrowRight, Zap, RefreshCw, Layers, PackageCheck, Repeat } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<any | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "available") return p.stock_quantity > 0;
    if (selectedCategory === "unique") return p.tag_id.includes("1/1");
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f4]">
      
      {/* HERO SECTION "DROP 01" */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] border-b border-[#1c1c1c]">
        {/* Background Image with Dark Gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-30 mix-blend-luminosity"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/95"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center py-20 font-mono">
          <div className="inline-flex items-center gap-2 border border-[#333] px-4 py-1.5 rounded-full mb-6 bg-black/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
              NOVUM ARCHIVE • DROP 01
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter mb-8 leading-none text-white drop-shadow-2xl font-sans">
            DROP <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">01</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#collection"
              className="bg-white text-black px-8 py-4 rounded-xl uppercase font-bold tracking-widest text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              Esplora l&apos;Archivio <ArrowRight size={16} />
            </a>

            <a
              href="#collection"
              onClick={() => setSelectedCategory("unique")}
              className="bg-[#121212] border border-[#2a2a2a] hover:border-white text-white px-8 py-4 rounded-xl uppercase font-bold tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
              <Zap size={15} /> Pezzi Unici (1/1)
            </a>
          </div>

          {/* AUTHENTIC BRAND VALUES BAR */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left font-mono">
            <div className="bg-[#0a0a0a]/90 border border-[#222] p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
              <Layers size={18} className="text-gray-300 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Pezzi Unici 1/1</h5>
                <p className="text-[10px] text-gray-500">Capi esclusivi</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/90 border border-[#222] p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
              <PackageCheck size={18} className="text-gray-300 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Spedizione Italia</h5>
                <p className="text-[10px] text-gray-500">Consegna 24/48h o a mano</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a]/90 border border-[#222] p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
              <ShieldCheck size={18} className="text-gray-300 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Archivio Verificato</h5>
                <p className="text-[10px] text-gray-500">100% Autentico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION GRID SECTION */}
      <section id="collection" className="container mx-auto px-4 py-20">
        
        {/* Header Filters & Category Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#1c1c1c] pb-6 gap-6">
          <div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
              ARCHIVIO COMPLETO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-sans">
              Capi in Vetrina
            </h2>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === "all"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#222] hover:text-white"
              }`}
            >
              Tutti ({products.length})
            </button>

            <button
              onClick={() => setSelectedCategory("available")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === "available"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#222] hover:text-white"
              }`}
            >
              Disponibili
            </button>

            <button
              onClick={() => setSelectedCategory("unique")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === "unique"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#222] hover:text-white"
              }`}
            >
              Pezzi Unici (1/1)
            </button>

            <button
              onClick={fetchProducts}
              className="p-2 bg-[#121212] border border-[#222] rounded-xl text-gray-400 hover:text-white transition-colors"
              title="Aggiorna prodotti"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 bg-[#090909] rounded-xl border border-[#1c1c1c] animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-[#222] rounded-xl bg-[#090909]">
            <p className="text-gray-500 uppercase tracking-widest text-xs font-mono">
              Nessun capo disponibile in questa categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.image_url}
                tagId={product.tag_id}
                material={product.material}
                fit={product.fit}
                stock_quantity={product.stock_quantity}
                onQuickView={() => setSelectedProductForQuickView(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* INSTAGRAM & TIKTOK SOCIAL GRID SECTION */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#1c1c1c] pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-white font-sans flex items-center gap-2">
              @novum_store_
            </h2>
            <p className="text-xs text-gray-500 font-mono">Community & Visual Archive • Instagram & TikTok</p>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <a
              href="https://www.instagram.com/novum_store_"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2 rounded-xl transition-all"
            >
              Instagram →
            </a>
            <a
              href="https://www.tiktok.com/@novum_store_"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest bg-[#121212] hover:bg-white hover:text-black border border-[#222] text-gray-300 px-4 py-2 rounded-xl transition-all"
            >
              TikTok →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          {[
            {
              id: 1,
              title: "NOVUM_LOOK_01",
              tag: "DROP 01 • OVERSIZE FIT",
              img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
              url: "https://www.instagram.com/novum_store_",
            },
            {
              id: 2,
              title: "NOVUM_LOOK_02",
              tag: "ARCHIVE 1/1 • BOXY HOODIE",
              img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
              url: "https://www.instagram.com/novum_store_",
            },
            {
              id: 3,
              title: "NOVUM_LOOK_03",
              tag: "UTILITARIAN CARGO",
              img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
              url: "https://www.instagram.com/novum_store_",
            },
            {
              id: 4,
              title: "NOVUM_LOOK_04",
              tag: "DARK LUXURY OUTERWEAR",
              img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
              url: "https://www.instagram.com/novum_store_",
            },
          ].map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="aspect-[3/4] bg-[#080808] border border-[#1c1c1c] hover:border-gray-500 rounded-xl relative overflow-hidden group transition-all duration-300 block"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-gray-300 border border-[#333]">
                @novum_store_
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-1.5 font-mono">
                <span className="text-[10px] text-gray-400 font-bold uppercase">{post.tag}</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>{post.title}</span>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
      />
    </div>
  );
}