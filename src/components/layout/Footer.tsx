import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t tag-border mt-20 bg-[#020202]">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <Image src="/logo.png" alt="NovumStore Logo" width={100} height={34} className="object-contain mb-4" />
          <p className="text-gray-500 text-sm max-w-xs">
            Streetwear d&apos;alta gamma. Pezzi unici, design artigianale e stile dark underground.
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="tag-label text-gray-400 mb-2">Social</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-bold">
              IG
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-bold">
              X
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm font-bold">
              TK
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="tag-label text-gray-400 mb-2">Info</h3>
          <Link href="/chi-siamo" className="text-sm text-gray-400 hover:text-white">Chi Siamo</Link>
          <Link href="/contatti" className="text-sm text-gray-400 hover:text-white">Contatti & Supporto</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
        </div>
      </div>
      <div className="border-t border-[#1a1a1a] py-4 text-center">
        <p className="tag-label text-gray-600">&copy; {new Date().getFullYear()} NOVUM STORE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}