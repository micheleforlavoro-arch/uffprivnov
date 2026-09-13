"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductForm from "@/components/admin/ProductForm";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  tag_id: string;
  is_visible: boolean;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_visible: !currentStatus })
      .eq('id', id);
      
    if (!error) {
      fetchProducts();
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">Gestione Archivio</h1>
        <p className="text-gray-400">Aggiungi nuovi pezzi unici o modifica la disponibilita&apos;.</p>
      </div>

      <ProductForm onSuccess={fetchProducts} />

      <div className="border tag-border bg-[#050505] overflow-hidden">
        <div className="p-4 border-b tag-border">
          <h3 className="text-lg font-bold uppercase">Inventario Attuale</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500 uppercase tracking-widest text-sm">Caricamento...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111] text-gray-400 tag-label">
                <tr>
                  <th className="p-4 font-normal">Img</th>
                  <th className="p-4 font-normal">Tag / Nome</th>
                  <th className="p-4 font-normal">Prezzo</th>
                  <th className="p-4 font-normal">Stock</th>
                  <th className="p-4 font-normal">Stato</th>
                  <th className="p-4 font-normal">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">Nessun prodotto trovato.</td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="border-t tag-border hover:bg-[#0a0a0a] transition-colors">
                      <td className="p-4">
                        {p.image_url ? (
                          <div className="relative w-12 h-16 bg-[#1a1a1a]">
                            <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-16 bg-[#222] flex items-center justify-center tag-label text-[10px]">No Img</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold uppercase">{p.title}</div>
                        <div className="tag-label text-gray-500 mt-1">{p.tag_id}</div>
                      </td>
                      <td className="p-4">&euro;{p.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={\`px-2 py-1 \${p.stock_quantity > 0 ? 'text-white' : 'text-red-500 bg-red-500/10'} border tag-border\`}>
                          {p.stock_quantity}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={\`tag-label px-2 py-1 \${p.is_visible ? 'text-green-400 bg-green-400/10' : 'text-gray-500 bg-gray-800'}\`}>
                          {p.is_visible ? 'Visibile' : 'Nascosto'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleVisibility(p.id, p.is_visible)}
                          className="text-xs uppercase tracking-widest border tag-border px-3 py-1 hover:bg-white hover:text-black transition-colors"
                        >
                          {p.is_visible ? 'Nascondi' : 'Mostra'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
