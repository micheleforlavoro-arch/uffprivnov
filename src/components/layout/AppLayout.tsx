"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import SearchDrawer from "@/components/search/SearchDrawer";
import MinimalSupport from "@/components/ui/MinimalSupport";
import CookieBanner from "@/components/ui/CookieBanner";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f4]">
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="flex-grow pt-28">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <MinimalSupport />
          <CookieBanner />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

