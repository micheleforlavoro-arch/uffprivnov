"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const { cart, setIsCartOpen, cartTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-40 bg-[#000000]/95 backdrop-blur-md border-b border-[#1c1c1c]">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* LEFT: NAVIGATION MENU WITH DROPDOWNS */}
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden p-2 -ml-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {/* SHOP DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/#collection"
                className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2"
              >
                Shop <ChevronDown size={14} />
              </Link>

              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 w-48 bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    Tutti i Capi
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    Nuovi Arrivi (Drop 01)
                  </Link>
                  <Link href="/chi-siamo" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    L&apos;Archivio
                  </Link>
                </div>
              )}
            </div>

            {/* PRODOTTI DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("prodotti")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/#collection"
                className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2"
              >
                Prodotti <ChevronDown size={14} />
              </Link>

              {activeDropdown === "prodotti" && (
                <div className="absolute top-full left-0 w-52 bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    Giacche & Outerwear
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    Felpe & Hoodies
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    T-Shirt & Top
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161616] rounded-lg transition-colors font-mono">
                    Pantaloni & Cargo
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#collection"
              className="text-xs font-mono font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              Archivio 1/1
            </Link>
          </nav>
        </div>

        {/* CENTER: PROMINENT BRAND LOGO WITH HIGH CONTRAST */}
        <Link href="/" className="flex items-center justify-center group py-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#333] group-hover:border-white transition-all overflow-hidden flex items-center justify-center p-1 bg-[#0a0a0a] shadow-2xl">
              <Image
                src="/logo.png"
                alt="Novum Store Logo"
                width={42}
                height={42}
                className="object-contain rounded-full brightness-110 contrast-125"
                priority
              />
            </div>
            <span className="text-base font-extrabold uppercase tracking-widest text-white hidden sm:inline">
              NOVUM STORE
            </span>
          </div>
        </Link>

        {/* RIGHT: SEARCH, WISHLIST & CART WITH REALTIME TOTAL */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-300 hover:text-white transition-colors"
            title="Cerca nell'archivio"
          >
            <Search size={19} />
          </button>

          {/* Wishlist Counter */}
          <Link
            href="/#collection"
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            title="Wishlist Preferiti"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-white text-black text-[9px] font-mono font-bold h-4 w-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Realtime Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#121212] hover:bg-white hover:text-black border border-[#2a2a2a] px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white transition-all shadow-md"
          >
            <div className="relative">
              <ShoppingCart size={17} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-black">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              €{cartTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU SLIDE OVER */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-[#222] py-6 px-6 flex flex-col gap-4 font-mono animate-in slide-in-from-top-5 duration-150">
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-white"
          >
            Tutti i Capi (Drop 01)
          </Link>
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300"
          >
            Pezzi Unici 1/1
          </Link>
          <Link
            href="/chi-siamo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300"
          >
            Chi Siamo
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300"
          >
            FAQ & Guida Taglie
          </Link>
          <Link
            href="/contatti"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300"
          >
            Contatti
          </Link>
        </div>
      )}
    </header>
  );
}