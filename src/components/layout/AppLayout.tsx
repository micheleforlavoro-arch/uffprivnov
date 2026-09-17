"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import SearchDrawer from "@/components/search/SearchDrawer";
import MinimalSupport from "@/components/ui/MinimalSupport";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f4]">
          {/* HEADER WRAPPER INCLUDING ANNOUNCEMENT BAR BELOW MAIN BAR */}
          <div className="fixed top-0 w-full z-40">
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <div className="mt-20">
              <AnnouncementBar />
            </div>
          </div>

          <main className="flex-grow pt-28">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <MinimalSupport />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
