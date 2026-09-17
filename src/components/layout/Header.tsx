"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const { cart, setIsCartOpen, cartTotal } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#000000]/95 backdrop-blur-md border-b border-[#1c1c1c]">
      
      {/* MAIN NAV ROW (HIGHER STACKING CONTEXT Z-30) */}
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative z-30">
        
        {/* LEFT: NAVIGATION MENU WITH DROPDOWNS */}
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden p-2 -ml-2 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center gap-6 font-mono">
            {/* SHOP DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/#collection"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2 cursor-pointer"
              >
                Shop <ChevronDown size={14} />
              </Link>

              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 w-56 bg-[#0d0d0d] border border-[#333] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    Tutti i Capi
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    Nuovi Arrivi (Drop 01)
                  </Link>
                  <Link href="/chi-siamo" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
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
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2 cursor-pointer"
              >
                Prodotti <ChevronDown size={14} />
              </Link>

              {activeDropdown === "prodotti" && (
                <div className="absolute top-full left-0 w-56 bg-[#0d0d0d] border border-[#333] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    Giacche & Outerwear
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    Felpe & Hoodies
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    T-Shirt & Top
                  </Link>
                  <Link href="/#collection" className="px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-mono cursor-pointer">
                    Pantaloni & Cargo
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#collection"
              className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white py-2 cursor-pointer"
            >
              Archivio 1/1
            </Link>
          </nav>
        </div>

        {/* CENTER: STANDALONE PROMINENT BRAND LOGO */}
        <Link href="/" className="flex items-center justify-center py-1 transition-transform hover:scale-105 cursor-pointer">
          <Image
            src="/logo.png"
            alt="Novum Store Logo"
            width={140}
            height={48}
            className="object-contain h-12 w-auto brightness-125 contrast-125"
            priority
          />
        </Link>

        {/* RIGHT: SEARCH, WISHLIST DRAWER TRIGGER & CART WITH REALTIME TOTAL */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Cerca nell'archivio"
          >
            <Search size={19} />
          </button>

          {/* Wishlist Drawer Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Vedi Preferiti"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-white text-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Realtime Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#121212] hover:bg-white hover:text-black border border-[#2a2a2a] px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer"
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

      {/* ANNOUNCEMENT MARQUEE BAR INTEGRATED INSIDE HEADER BELOW MAIN ROW (LOWER STACKING CONTEXT Z-10) */}
      <div className="border-t border-[#1a1a1a] relative z-10">
        <AnnouncementBar />
      </div>

      {/* MOBILE MENU SLIDE OVER */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-[#222] py-6 px-6 flex flex-col gap-4 font-mono animate-in slide-in-from-top-5 duration-150 shadow-2xl z-50">
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-white cursor-pointer"
          >
            Tutti i Capi (Drop 01)
          </Link>
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300 cursor-pointer"
          >
            Pezzi Unici 1/1
          </Link>
          <Link
            href="/chi-siamo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300 cursor-pointer"
          >
            Chi Siamo
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300 cursor-pointer"
          >
            FAQ & Guida Taglie
          </Link>
          <Link
            href="/contatti"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold uppercase tracking-widest text-gray-300 cursor-pointer"
          >
            Contatti
          </Link>
        </div>
      )}
    </header>
  );
}