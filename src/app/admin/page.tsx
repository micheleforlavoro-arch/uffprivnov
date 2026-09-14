"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductForm from "@/components/admin/ProductForm";
import Image from "next/image";
import { checkPassword } from "./actions";

type Product = {
  id: string;
  title: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  tag_id: string;
  is_visible: boolean;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
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

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMessages();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isOk = await checkPassword(passwordInput);
    if (isOk) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Password errata");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 border tag-border bg-[#050505]">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="password" 
            placeholder="Inserisci Password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="bg-transparent border tag-border p-3 text-center focus:border-white outline-none"
          />
          {loginError && <p className="text-red-500 text-sm text-center font-bold">{loginError}</p>}
          <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 hover:bg-gray-200 transition-colors">
            Entra
          </button>
        </form>
      </div>
    );
  }

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
                        <span className={`px-2 py-1 ${p.stock_quantity > 0 ? 'text-white' : 'text-red-500 bg-red-500/10'} border tag-border`}>
                          {p.stock_quantity}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`tag-label px-2 py-1 ${p.is_visible ? 'text-green-400 bg-green-400/10' : 'text-gray-500 bg-gray-800'}`}>
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

      <div className="border tag-border bg-[#050505] overflow-hidden mt-8">
        <div className="p-4 border-b tag-border flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase">Messaggi Ricevuti</h3>
          <button onClick={fetchMessages} className="text-xs tag-label hover:text-white transition-colors">Aggiorna</button>
        </div>
        
        <div className="divide-y divide-[#1a1a1a]">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nessun messaggio ricevuto.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-[#0a0a0a] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-white uppercase">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{msg.email}</a>
                  </div>
                  <span className="text-xs tag-label text-gray-500">
                    {new Date(msg.created_at).toLocaleString('it-IT')}
                  </span>
                </div>
                <div className="text-gray-300 text-sm whitespace-pre-wrap bg-[#111] p-4 border border-[#222]">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
