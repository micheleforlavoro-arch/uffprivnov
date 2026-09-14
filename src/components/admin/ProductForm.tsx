"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductForm({ onSuccess, initialData, onCancel }: { onSuccess: () => void, initialData?: any, onCancel?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && initialData) {
      const form = formRef.current;
      (form.elements.namedItem("title") as HTMLInputElement).value = initialData.title || "";
      (form.elements.namedItem("tag_id") as HTMLInputElement).value = initialData.tag_id || "";
      (form.elements.namedItem("price") as HTMLInputElement).value = initialData.price || "";
      (form.elements.namedItem("stock_quantity") as HTMLInputElement).value = initialData.stock_quantity || "0";
      (form.elements.namedItem("material") as HTMLInputElement).value = initialData.material || "";
      (form.elements.namedItem("fit") as HTMLInputElement).value = initialData.fit || "";
      (form.elements.namedItem("is_visible") as HTMLInputElement).checked = initialData.is_visible;
    } else if (formRef.current && !initialData) {
      formRef.current.reset();
    }
  }, [initialData]);

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
      // 1. Upload
      let image_url = initialData?.image_url || "";
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (uploadError) {
          alert(`Errore Upload Immagine: ${uploadError.message || JSON.stringify(uploadError)}`);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
          
        image_url = publicUrlData.publicUrl;
      }

      // 2. Insert/Update
      const productData = {
        title,
        price,
        stock_quantity,
        tag_id,
        material,
        fit,
        is_visible,
        image_url: image_url || null,
      };

      if (initialData?.id) {
        const { error } = await supabase.from("products").update(productData).eq("id", initialData.id);
        if (error) {
           alert(`Errore Update DB: ${error.message || JSON.stringify(error)}`);
           // Continuiamo comunque se l'utente dice che funziona lo stesso
        }
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) {
           alert(`Errore Insert DB: ${error.message || JSON.stringify(error)}`);
        }
      }
      
      onSuccess();
      if (!initialData) e.currentTarget.reset();
      setFile(null);
    } catch (error: any) {
      console.error("Errore imprevisto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`border tag-border p-6 space-y-4 ${initialData ? 'bg-[#111] border-white' : 'bg-[#050505]'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold uppercase">{initialData ? "Modifica Capo" : "Aggiungi Nuovo Capo"}</h3>
        {initialData && onCancel && (
          <button type="button" onClick={onCancel} className="text-xs uppercase tracking-widest tag-label hover:text-white">Annulla</button>
        )}
      </div>
      
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
        <label className="tag-label text-gray-400">Immagine (lascia vuoto per mantenere {initialData?.image_url ? 'l\'attuale' : 'vuoto'})</label>
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
        {loading ? "Salvataggio..." : (initialData ? "Aggiorna Prodotto" : "Salva Prodotto")}
      </button>
    </form>
  );
}
