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
  ShopifyCartItem,
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
const LOCAL_CART_KEY = "apfol_local_cart";

// Check if Shopify is configured
const isShopifyConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
};

// Product data for local cart
const PRODUCT_DATA: Record<string, { title: string; price: string; image: string }> = {
  "watchintosh": {
    title: "Watchintosh",
    price: "39.00",
    image: "/watchintosh.png",
  },
  "demo-variant-watchintosh": {
    title: "Watchintosh",
    price: "39.00",
    image: "/watchintosh.png",
  },
};

// Create an empty local cart
const createEmptyLocalCart = (): ShopifyCart => ({
  id: "local-cart",
  webUrl: "",
  lineItems: [],
  subtotalPrice: { amount: "0.00", currencyCode: "USD" },
  totalPrice: { amount: "0.00", currencyCode: "USD" },
  lineItemCount: 0,
  discountAmount: { amount: "0.00", currencyCode: "USD" },
});

// Calculate "Buy 2 Get 1 Free" discount
const calculateBuy2Get1FreeDiscount = (lineItems: ShopifyCartItem[]): number => {
  // Expand all items into individual units with their prices
  const allUnits: number[] = [];
  for (const item of lineItems) {
    const price = parseFloat(item.variant.price.amount);
    for (let i = 0; i < item.quantity; i++) {
      allUnits.push(price);
    }
  }
  
  // Sort by price ascending (cheapest first)
  allUnits.sort((a, b) => a - b);
  
  // For every 3 items, the cheapest one is free
  // So we get floor(totalItems / 3) free items
  const freeItemCount = Math.floor(allUnits.length / 3);
  
  // Sum up the prices of the cheapest items that are free
  let discount = 0;
  for (let i = 0; i < freeItemCount; i++) {
    discount += allUnits[i];
  }
  
  return discount;
};

// Calculate cart totals
const calculateCartTotals = (lineItems: ShopifyCartItem[]): { subtotal: string; total: string; count: number; discount: string } => {
  let subtotal = 0;
  let count = 0;
  
  for (const item of lineItems) {
    subtotal += parseFloat(item.variant.price.amount) * item.quantity;
    count += item.quantity;
  }
  
  const discount = calculateBuy2Get1FreeDiscount(lineItems);
  const total = subtotal - discount;
  
  return {
    subtotal: subtotal.toFixed(2),
    total: total.toFixed(2),
    count,
    discount: discount.toFixed(2),
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [useLocalCart, setUseLocalCart] = useState(false);

  // Load local cart from localStorage
  const loadLocalCart = useCallback((): ShopifyCart => {
    if (typeof window === "undefined") return createEmptyLocalCart();
    
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return createEmptyLocalCart();
      }
    }
    return createEmptyLocalCart();
  }, []);

  // Save local cart to localStorage
  const saveLocalCart = useCallback((cartData: ShopifyCart) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartData));
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    const initCart = async () => {
      // If Shopify is not configured, use local cart
      if (!isShopifyConfigured()) {
        setUseLocalCart(true);
        const localCart = loadLocalCart();
        setCart(localCart);
        return;
      }

      // Try to use Shopify
      try {
        const existingCheckoutId = localStorage.getItem(CHECKOUT_ID_KEY);

        if (existingCheckoutId) {
          const existingCart = await fetchCheckout(existingCheckoutId);
          if (existingCart && existingCart.lineItems) {
            setCart(existingCart);
            return;
          }
        }

        // Create new checkout
        const newCart = await createCheckout();
        if (newCart) {
          localStorage.setItem(CHECKOUT_ID_KEY, newCart.id);
          setCart(newCart);
          return;
        }
        
        // Fallback to local cart if Shopify fails
        setUseLocalCart(true);
        setCart(loadLocalCart());
      } catch (error) {
        console.error("Error initializing Shopify cart, using local cart:", error);
        setUseLocalCart(true);
        setCart(loadLocalCart());
      }
    };

    initCart();
  }, [loadLocalCart]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        if (useLocalCart || !isShopifyConfigured()) {
          // Local cart logic
          const currentCart = cart || loadLocalCart();
          const existingItemIndex = currentCart.lineItems.findIndex(
            (item) => item.variant.id === variantId
          );

          const productInfo = PRODUCT_DATA[variantId] || {
            title: "Watchintosh",
            price: "39.00",
            image: "",
          };

          let updatedLineItems: ShopifyCartItem[];

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            updatedLineItems = currentCart.lineItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            const newItem: ShopifyCartItem = {
              id: `local-${Date.now()}`,
              title: productInfo.title,
              variant: {
                id: variantId,
                title: "Default",
                price: { amount: productInfo.price, currencyCode: "USD" },
                image: productInfo.image ? { src: productInfo.image, altText: productInfo.title } : null,
                product: { handle: "watchintosh" },
              },
              quantity,
            };
            updatedLineItems = [...currentCart.lineItems, newItem];
          }

          const totals = calculateCartTotals(updatedLineItems);
          const updatedCart: ShopifyCart = {
            ...currentCart,
            lineItems: updatedLineItems,
            subtotalPrice: { amount: totals.subtotal, currencyCode: "USD" },
            totalPrice: { amount: totals.total, currencyCode: "USD" },
            lineItemCount: totals.count,
            discountAmount: { amount: totals.discount, currencyCode: "USD" },
          };

          setCart(updatedCart);
          saveLocalCart(updatedCart);
          setIsCartOpen(true);
        } else {
          // Shopify cart logic
          if (!cart) {
            console.error("Cart not initialized");
            return;
          }

          const updatedCart = await shopifyAddToCart(cart.id, variantId, quantity);
          if (updatedCart) {
            setCart(updatedCart);
            setIsCartOpen(true);
          } else {
            console.error("Failed to add item to cart");
          }
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, useLocalCart, loadLocalCart, saveLocalCart]
  );

  const updateQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      setIsLoading(true);
      try {
        if (useLocalCart || !isShopifyConfigured()) {
          // Local cart logic
          const currentCart = cart || loadLocalCart();
          
          let updatedLineItems: ShopifyCartItem[];
          if (quantity <= 0) {
            updatedLineItems = currentCart.lineItems.filter((item) => item.id !== lineItemId);
          } else {
            updatedLineItems = currentCart.lineItems.map((item) =>
              item.id === lineItemId ? { ...item, quantity } : item
            );
          }

          const totals = calculateCartTotals(updatedLineItems);
          const updatedCart: ShopifyCart = {
            ...currentCart,
            lineItems: updatedLineItems,
            subtotalPrice: { amount: totals.subtotal, currencyCode: "USD" },
            totalPrice: { amount: totals.total, currencyCode: "USD" },
            lineItemCount: totals.count,
            discountAmount: { amount: totals.discount, currencyCode: "USD" },
          };

          setCart(updatedCart);
          saveLocalCart(updatedCart);
        } else {
          // Shopify cart logic
          if (!cart) return;

          if (quantity <= 0) {
            const updatedCart = await shopifyRemoveFromCart(cart.id, lineItemId);
            if (updatedCart) setCart(updatedCart);
          } else {
            const updatedCart = await shopifyUpdateCartItem(cart.id, lineItemId, quantity);
            if (updatedCart) setCart(updatedCart);
          }
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, useLocalCart, loadLocalCart, saveLocalCart]
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      setIsLoading(true);
      try {
        if (useLocalCart || !isShopifyConfigured()) {
          // Local cart logic
          const currentCart = cart || loadLocalCart();
          const updatedLineItems = currentCart.lineItems.filter((item) => item.id !== lineItemId);

          const totals = calculateCartTotals(updatedLineItems);
          const updatedCart: ShopifyCart = {
            ...currentCart,
            lineItems: updatedLineItems,
            subtotalPrice: { amount: totals.subtotal, currencyCode: "USD" },
            totalPrice: { amount: totals.total, currencyCode: "USD" },
            lineItemCount: totals.count,
            discountAmount: { amount: totals.discount, currencyCode: "USD" },
          };

          setCart(updatedCart);
          saveLocalCart(updatedCart);
        } else {
          // Shopify cart logic
          if (!cart) return;
          const updatedCart = await shopifyRemoveFromCart(cart.id, lineItemId);
          if (updatedCart) setCart(updatedCart);
        }
      } catch (error) {
        console.error("Error removing item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, useLocalCart, loadLocalCart, saveLocalCart]
  );

  const checkout = useCallback(() => {
    if (useLocalCart || !isShopifyConfigured()) {
      // For local cart, show alert that Shopify needs to be configured
      alert("Checkout requires Shopify to be configured. Please set up your Shopify credentials.");
      return;
    }
    
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  }, [cart, useLocalCart]);

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
