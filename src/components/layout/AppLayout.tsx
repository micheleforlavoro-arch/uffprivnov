"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchDrawer from "@/components/search/SearchDrawer";
import AssistanceWidget from "@/components/ui/AssistanceWidget";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#f4f4f4]">
          <AnnouncementBar />
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <AssistanceWidget />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
