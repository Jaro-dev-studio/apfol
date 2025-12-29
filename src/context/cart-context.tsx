"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  const cartInitPromiseRef = useRef<Promise<ShopifyCart | null> | null>(null);

  // Helper to ensure cart is initialized
  const ensureCart = useCallback(async (): Promise<ShopifyCart | null> => {
    // If cart already exists, return it
    if (cart) return cart;

    // If initialization is in progress, wait for it
    if (cartInitPromiseRef.current) {
      return cartInitPromiseRef.current;
    }

    // Start new initialization
    cartInitPromiseRef.current = (async () => {
      try {
        const existingCheckoutId = localStorage.getItem(CHECKOUT_ID_KEY);

        if (existingCheckoutId) {
          const existingCart = await fetchCheckout(existingCheckoutId);
          if (existingCart && existingCart.lineItems) {
            setCart(existingCart);
            return existingCart;
          }
        }

        // Create new checkout if none exists or existing one is invalid
        const newCart = await createCheckout();
        if (newCart) {
          localStorage.setItem(CHECKOUT_ID_KEY, newCart.id);
          setCart(newCart);
          return newCart;
        }
        return null;
      } catch (error) {
        console.error("Error initializing cart:", error);
        return null;
      }
    })();

    return cartInitPromiseRef.current;
  }, [cart]);

  // Initialize cart on mount
  useEffect(() => {
    ensureCart();
  }, [ensureCart]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        // Ensure cart is initialized before adding
        const currentCart = await ensureCart();
        if (!currentCart) {
          console.error("Failed to initialize cart");
          return;
        }

        const updatedCart = await shopifyAddToCart(currentCart.id, variantId, quantity);
        if (updatedCart) {
          setCart(updatedCart);
          setIsCartOpen(true);
        } else {
          console.error("Failed to add item to cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
  );

  const updateQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const currentCart = await ensureCart();
        if (!currentCart) return;

        if (quantity <= 0) {
          const updatedCart = await shopifyRemoveFromCart(currentCart.id, lineItemId);
          if (updatedCart) setCart(updatedCart);
        } else {
          const updatedCart = await shopifyUpdateCartItem(
            currentCart.id,
            lineItemId,
            quantity
          );
          if (updatedCart) setCart(updatedCart);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      setIsLoading(true);
      try {
        const currentCart = await ensureCart();
        if (!currentCart) return;

        const updatedCart = await shopifyRemoveFromCart(currentCart.id, lineItemId);
        if (updatedCart) setCart(updatedCart);
      } catch (error) {
        console.error("Error removing item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
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


