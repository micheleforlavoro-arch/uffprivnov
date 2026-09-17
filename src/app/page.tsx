"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import TrustpilotBar from "@/components/layout/TrustpilotBar";
import { supabase } from "@/lib/supabase";
import { Sparkles, ShieldCheck, Flame, ArrowRight, Zap, RefreshCw } from "lucide-react";

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
    if (selectedCategory === "offer") return p.stock_quantity > 0;
    if (selectedCategory === "unique") return p.tag_id.includes("1/1");
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* TRUSTPILOT BAR */}
      <TrustpilotBar />

      {/* HERO SECTION "DROP 01" */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] border-b border-[#1f1f1f]">
        {/* Background Image with Dark Gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center py-20">
          <div className="inline-flex items-center gap-2 border border-red-500/40 px-4 py-1.5 rounded-full mb-6 bg-black/60 backdrop-blur-md shadow-lg shadow-red-950/20">
            <Flame size={14} className="text-red-500 animate-bounce" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
              COLLEZIONE UFFICIALE • DROP 01
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter mb-6 leading-none text-white drop-shadow-2xl">
            DROP <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">01</span>
          </h1>

          <p className="text-gray-300 max-w-xl mb-10 text-base sm:text-lg font-light leading-relaxed">
            Abbigliamento streetwear d&apos;archivio a tiratura limitata. Pezzi unici, volumi oversize e finiture industriali.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#collection"
              className="bg-white text-black px-8 py-4 rounded-xl uppercase font-extrabold tracking-widest text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              Esplora i Capi <ArrowRight size={16} />
            </a>

            <a
              href="#collection"
              onClick={() => setSelectedCategory("unique")}
              className="bg-[#121212] border border-[#333] hover:border-white text-white px-8 py-4 rounded-xl uppercase font-bold tracking-widest text-xs transition-all flex items-center justify-center gap-2"
            >
              <Zap size={16} className="text-yellow-400" /> Pezzi Unici (1/1)
            </a>
          </div>

          {/* Key Selling Points Pill */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left font-sans">
            <div className="bg-[#0e0e0e]/80 border border-[#222] p-3 rounded-xl backdrop-blur-md flex items-center gap-3">
              <ShieldCheck size={20} className="text-green-400 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase">100% Autentico</h5>
                <p className="text-[10px] text-gray-400">Certificato e verificato</p>
              </div>
            </div>

            <div className="bg-[#0e0e0e]/80 border border-[#222] p-3 rounded-xl backdrop-blur-md flex items-center gap-3">
              <Sparkles size={20} className="text-yellow-400 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Nessun Restock</h5>
                <p className="text-[10px] text-gray-400">Una volta venduto è finito</p>
              </div>
            </div>

            <div className="bg-[#0e0e0e]/80 border border-[#222] p-3 rounded-xl backdrop-blur-md flex items-center gap-3">
              <span className="text-xs font-bold bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded border border-pink-500/30">3x</span>
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Klarna Attivo</h5>
                <p className="text-[10px] text-gray-400">Paga in 3 comode rate</p>
              </div>
            </div>

            <div className="bg-[#0e0e0e]/80 border border-[#222] p-3 rounded-xl backdrop-blur-md flex items-center gap-3">
              <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">COD</span>
              <div>
                <h5 className="text-xs font-bold text-white uppercase">Contrassegno</h5>
                <p className="text-[10px] text-gray-400">Paga alla consegna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION GRID SECTION */}
      <section id="collection" className="container mx-auto px-4 py-20">
        
        {/* Header Filters & Category Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#1f1f1f] pb-6 gap-6">
          <div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
              ARCHIVIO COMPLETO
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
              Prodotti in Vetrina
            </h2>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === "all"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#262626] hover:text-white"
              }`}
            >
              Tutti ({products.length})
            </button>

            <button
              onClick={() => setSelectedCategory("offer")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === "offer"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#262626] hover:text-white"
              }`}
            >
              Disponibili
            </button>

            <button
              onClick={() => setSelectedCategory("unique")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === "unique"
                  ? "bg-white text-black shadow-lg"
                  : "bg-[#121212] text-gray-400 border border-[#262626] hover:text-white"
              }`}
            >
              Pezzi Unici (1/1)
            </button>

            <button
              onClick={fetchProducts}
              className="p-2 bg-[#121212] border border-[#262626] rounded-xl text-gray-400 hover:text-white transition-colors"
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
              <div key={n} className="h-96 bg-[#0e0e0e] rounded-2xl border border-[#222] animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-[#222] rounded-2xl bg-[#090909]">
            <p className="text-gray-400 uppercase tracking-widest text-sm font-mono">
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

      {/* INSTAGRAM GRID SECTION */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-8 border-b border-[#1f1f1f] pb-4">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">@NOVUMSTORE</h2>
            <p className="text-xs text-gray-500 font-mono">Unisciti all&apos;underground community su Instagram</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold uppercase tracking-wider bg-[#141414] hover:bg-white hover:text-black border border-[#282828] text-gray-300 px-4 py-2 rounded-xl transition-all"
          >
            Seguici su Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-[#0a0a0a] border border-[#222] rounded-2xl relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:scale-110">
                <span className="text-gray-500 font-mono text-xs mb-1">#NOVUM_LOOK_{i}</span>
                <span className="text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Vedi su Instagram →
                </span>
              </div>
            </div>
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