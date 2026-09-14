"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock_quantity = parseInt(formData.get("stock_quantity") as string);
    const tag_id = formData.get("tag_id") as string;
    const material = formData.get("material") as string;
    const fit = formData.get("fit") as string;
    const is_visible = formData.get("is_visible") === "on";

    try {
      let image_url = "";

      // 1. Upload image if exists
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
          
        image_url = publicUrlData.publicUrl;
      }

      // 2. Insert product
      const { error: insertError } = await supabase.from("products").insert([
        {
          title,
          price,
          stock_quantity,
          tag_id,
          material,
          fit,
          is_visible,
          image_url: image_url || null,
        }
      ]);

      if (insertError) throw insertError;
      
      onSuccess();
      e.currentTarget.reset();
      setFile(null);
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Errore durante il salvataggio del prodotto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border tag-border p-6 bg-[#050505] space-y-4">
      <h3 className="text-xl font-bold uppercase mb-4">Aggiungi Nuovo Capo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Titolo</label>
          <input name="title" required className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Tag ID (es. PZ/05)</label>
          <input name="tag_id" required className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Prezzo (&euro;)</label>
          <input type="number" step="0.01" name="price" required className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Quantita&apos; in Stock</label>
          <input type="number" name="stock_quantity" required className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Materiale</label>
          <input name="material" className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="tag-label text-gray-400">Fit</label>
          <input name="fit" className="bg-transparent border tag-border p-2 focus:border-white outline-none" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="tag-label text-gray-400">Immagine</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="bg-transparent border tag-border p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border file:tag-border file:bg-[#111] file:text-white file:uppercase file:text-xs file:font-bold hover:file:bg-white hover:file:text-black transition-colors outline-none" 
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" name="is_visible" id="is_visible" defaultChecked className="w-4 h-4 accent-white" />
        <label htmlFor="is_visible" className="tag-label text-gray-300">Visibile in Vetrina</label>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-4 bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {loading ? "Salvataggio..." : "Salva Prodotto"}
      </button>
    </form>
  );
}
