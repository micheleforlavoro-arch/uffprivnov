import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-20">
      <aside className="w-full md:w-64 border-r tag-border bg-[#050505] p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-1">Admin</h2>
          <p className="tag-label text-gray-500">Pannello Gestionale</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-2 border tag-border bg-white text-black font-bold uppercase text-sm tracking-widest hover:bg-gray-200 transition-colors">
            Prodotti
          </Link>
          <Link href="/" className="px-4 py-2 border tag-border text-gray-400 uppercase text-sm tracking-widest hover:text-white transition-colors">
            Torna al Sito
          </Link>
        </nav>
      </aside>
      
      <main className="flex-grow p-6 bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
