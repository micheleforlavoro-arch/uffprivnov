import ProductCard from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

// Forza il rendering dinamico per avere sempre i prodotti aggiornati
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch products from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  const displayProducts = products || [];

  return (
    <div className="flex flex-col gap-24">
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-b tag-border">
        <div className="absolute inset-0 bg-[#050505] z-0">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2000&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(100%)" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="border tag-border px-3 py-1 mb-6">
            <span className="tag-label text-gray-400">Collezione 01</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-tight">
            Redefining <br/> The Underground
          </h1>
          <p className="text-gray-400 max-w-lg mb-10 text-lg">
            Pezzi unici, materiali tecnici e un&apos;estetica brutalista. Esplora la nuova collezione limitata.
          </p>
          <a href="#collection" className="bg-white text-black px-8 py-4 uppercase font-bold tracking-widest hover:bg-gray-200 transition-colors">
            Scopri i capi
          </a>
        </div>
        
        <div className="absolute bottom-8 left-8 hidden md:block">
          <p className="tag-label text-gray-500">EST. 2026</p>
        </div>
        <div className="absolute bottom-8 right-8 hidden md:block">
          <p className="tag-label text-gray-500">TOKYO / MILANO</p>
        </div>
      </section>

      <section id="collection" className="container mx-auto px-4 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b tag-border pb-4">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter">Archivio</h2>
            <p className="text-gray-500 mt-2">Disponibilita&apos; limitata. Nessun restock.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="tag-label px-2 py-1 border tag-border text-gray-400">{displayProducts.length} Pezzi Totali</span>
          </div>
        </div>
        
        {displayProducts.length === 0 ? (
          <div className="text-center py-12 border tag-border">
            <p className="text-gray-500 uppercase tracking-widest">Nessun prodotto disponibile in vetrina.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
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
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}