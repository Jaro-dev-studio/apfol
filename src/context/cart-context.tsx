"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  ShopifyCart,
  createCheckout,
  fetchCheckout,
  addToCart as shopifyAddToCart,
  updateCartItem as shopifyUpdateCartItem,
  removeFromCart as shopifyRemoveFromCart,
} from "@/lib/shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CHECKOUT_ID_KEY = "apfol_checkout_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      const existingCheckoutId = localStorage.getItem(CHECKOUT_ID_KEY);

      if (existingCheckoutId) {
        const existingCart = await fetchCheckout(existingCheckoutId);
        if (existingCart && existingCart.lineItems) {
          setCart(existingCart);
          return;
        }
      }

      // Create new checkout if none exists or existing one is invalid
      const newCart = await createCheckout();
      if (newCart) {
        localStorage.setItem(CHECKOUT_ID_KEY, newCart.id);
        setCart(newCart);
      }
    };

    initializeCart();
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      if (!cart) return;

      setIsLoading(true);
      try {
        const updatedCart = await shopifyAddToCart(cart.id, variantId, quantity);
        if (updatedCart) {
          setCart(updatedCart);
          setIsCartOpen(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart) return;

      setIsLoading(true);
      try {
        if (quantity <= 0) {
          const updatedCart = await shopifyRemoveFromCart(cart.id, lineItemId);
          if (updatedCart) setCart(updatedCart);
        } else {
          const updatedCart = await shopifyUpdateCartItem(
            cart.id,
            lineItemId,
            quantity
          );
          if (updatedCart) setCart(updatedCart);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      if (!cart) return;

      setIsLoading(true);
      try {
        const updatedCart = await shopifyRemoveFromCart(cart.id, lineItemId);
        if (updatedCart) setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const checkout = useCallback(() => {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

