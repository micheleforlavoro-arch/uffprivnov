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
  const pathname = usePathname();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
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
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white py-2"
              >
                Shop <ChevronDown size={14} />
              </Link>

              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 w-48 bg-[#0c0c0c] border border-[#222] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    Tutti i Capi
                  </Link>
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    Nuovi Arrivi (Drop 01)
                  </Link>
                  <Link href="/chi-siamo" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
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
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white py-2"
              >
                Prodotti <ChevronDown size={14} />
              </Link>

              {activeDropdown === "prodotti" && (
                <div className="absolute top-full left-0 w-48 bg-[#0c0c0c] border border-[#222] rounded-xl shadow-2xl py-3 px-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    Giacche & Outerwear
                  </Link>
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    Felpe & Hoodies
                  </Link>
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    T-Shirt & Top
                  </Link>
                  <Link href="/#collection" className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg">
                    Pantaloni & Cargo
                  </Link>
                </div>
              )}
            </div>

            {/* IN OFFERTA LINK */}
            <Link
              href="/#collection"
              className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 py-2 flex items-center gap-1"
            >
              In Offerta <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded border border-red-500/30">HOT</span>
            </Link>
          </nav>
        </div>

        {/* CENTER: CIRCULAR BRAND LOGO */}
        <Link href="/" className="flex items-center justify-center group">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:border-white transition-all overflow-hidden flex items-center justify-center p-1 bg-black shadow-lg">
            <Image
              src="/logo.png"
              alt="Novum Store Logo"
              width={40}
              height={40}
              className="object-contain rounded-full"
              priority
            />
          </div>
        </Link>

        {/* RIGHT: SEARCH, WISHLIST & CART WITH REALTIME TOTAL */}
        <div className="flex items-center gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-300 hover:text-white transition-colors"
            title="Cerca"
          >
            <Search size={20} />
          </button>

          {/* Wishlist Counter */}
          <Link
            href="/#collection"
            className="relative p-2 text-gray-300 hover:text-white transition-colors"
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Realtime Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-[#161616] hover:bg-[#222] border border-[#333] hover:border-white px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-black">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono">
              €{cartTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU SLIDE OVER */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0a0a0a] border-b border-[#222] py-6 px-6 flex flex-col gap-5 animate-in slide-in-from-top-5 duration-200">
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase tracking-wider text-white"
          >
            Tutti i Capi (Drop 01)
          </Link>
          <Link
            href="/#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase tracking-wider text-red-500"
          >
            In Offerta (-40%)
          </Link>
          <Link
            href="/chi-siamo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase tracking-wider text-gray-300"
          >
            Chi Siamo
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase tracking-wider text-gray-300"
          >
            FAQ & Guida Taglie
          </Link>
          <Link
            href="/contatti"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase tracking-wider text-gray-300"
          >
            Contatti
          </Link>
        </div>
      )}
    </header>
  );
}