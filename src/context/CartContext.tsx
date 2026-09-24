"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  tagId: string;
  stockQuantity?: number;
  selectedSize?: string;
}

export type ShippingMethod = "standard" | "pickup";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  shippingCost: number;
  finalTotal: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("novum_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    const savedShipping = localStorage.getItem("novum_shipping_method");
    if (savedShipping === "standard" || savedShipping === "pickup") {
      setShippingMethod(savedShipping);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("novum_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("novum_shipping_method", shippingMethod);
    }
  }, [shippingMethod, isMounted]);

  const addToCart = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity || 1;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );
      const maxStock = newItem.stockQuantity !== undefined ? newItem.stockQuantity : 999;

      if (existing) {
        const targetQty = existing.quantity + qtyToAdd;
        if (targetQty > maxStock) {
          alert(`Disponibilità massima per questo capo: ${maxStock} pz.`);
          return prev.map((item) =>
            item.id === newItem.id && item.selectedSize === newItem.selectedSize
              ? { ...item, quantity: maxStock, stockQuantity: maxStock }
              : item
          );
        }
        return prev.map((item) =>
          item.id === newItem.id && item.selectedSize === newItem.selectedSize
            ? { ...item, quantity: targetQty, stockQuantity: maxStock }
            : item
        );
      }

      if (qtyToAdd > maxStock) {
        alert(`Disponibilità massima per questo capo: ${maxStock} pz.`);
        return [...prev, { ...newItem, quantity: maxStock, stockQuantity: maxStock }];
      }

      return [...prev, { ...newItem, quantity: qtyToAdd, stockQuantity: maxStock }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const maxStock = item.stockQuantity !== undefined ? item.stockQuantity : 999;
          if (newQuantity > maxStock) {
            alert(`Disponibilità massima per questo capo: ${maxStock} pz.`);
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const freeShippingThreshold = 150.0;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : shippingMethod === "pickup" ? 4.0 : 7.0;
  const finalTotal = cartTotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        shippingMethod,
        setShippingMethod,
        shippingCost,
        finalTotal,
        freeShippingThreshold,
        isFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};