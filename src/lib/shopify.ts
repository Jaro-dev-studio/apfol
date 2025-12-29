import Client from "shopify-buy";

// Initialize the Shopify client
// These values should be set in your .env.local file
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  apiVersion: "2024-01",
});

export default client;

// Product handles - these should match your Shopify product handles
export const PRODUCT_HANDLES = {
  WATCHTRAINER: "watchtrainer",
  WATCHINTOSH: "watchintosh",
} as const;

// Types for Shopify data
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  images: Array<{
    id: string;
    src: string;
    altText: string | null;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    available: boolean;
  }>;
}

export interface ShopifyCartItem {
  id: string;
  title: string;
  variant: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image: {
      src: string;
      altText: string | null;
    } | null;
    product: {
      handle: string;
    };
  };
  quantity: number;
}

export interface ShopifyCart {
  id: string;
  webUrl: string;
  lineItems: ShopifyCartItem[];
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItemCount: number;
  // Local discount calculation (Buy 2 Get 1 Free)
  discountAmount?: {
    amount: string;
    currencyCode: string;
  };
}

// Helper functions
export async function fetchProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  try {
    const product = await client.product.fetchByHandle(handle);
    if (!product) return null;

    return {
      id: product.id as string,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      images: product.images.map((img) => ({
        id: img.id as string,
        src: img.src,
        altText: img.altText ?? null,
      })),
      variants: product.variants.map((v) => ({
        id: v.id as string,
        title: v.title,
        price: {
          amount: String(v.price.amount),
          currencyCode: v.price.currencyCode,
        },
        available: (v as unknown as { available: boolean }).available,
      })),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  try {
    const products = await client.product.fetchAll();
    return products.map((product) => ({
      id: product.id as string,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      images: product.images.map((img) => ({
        id: img.id as string,
        src: img.src,
        altText: img.altText ?? null,
      })),
      variants: product.variants.map((v) => ({
        id: v.id as string,
        title: v.title,
        price: {
          amount: String(v.price.amount),
          currencyCode: v.price.currencyCode,
        },
        available: (v as unknown as { available: boolean }).available,
      })),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createCheckout(): Promise<ShopifyCart | null> {
  try {
    const checkout = await client.checkout.create();
    return normalizeCart(checkout);
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
}

export async function fetchCheckout(
  checkoutId: string
): Promise<ShopifyCart | null> {
  try {
    const checkout = await client.checkout.fetch(checkoutId);
    if (!checkout) return null;
    return normalizeCart(checkout);
  } catch (error) {
    console.error("Error fetching checkout:", error);
    return null;
  }
}

export async function addToCart(
  checkoutId: string,
  variantId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  try {
    const lineItemsToAdd = [{ variantId, quantity }];
    const checkout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );
    return normalizeCart(checkout);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

export async function updateCartItem(
  checkoutId: string,
  lineItemId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  try {
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const checkout = await client.checkout.updateLineItems(
      checkoutId,
      lineItemsToUpdate
    );
    return normalizeCart(checkout);
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

export async function removeFromCart(
  checkoutId: string,
  lineItemId: string
): Promise<ShopifyCart | null> {
  try {
    const checkout = await client.checkout.removeLineItems(checkoutId, [
      lineItemId,
    ]);
    return normalizeCart(checkout);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCart(checkout: any): ShopifyCart {
  return {
    id: checkout.id,
    webUrl: checkout.webUrl,
    lineItems: checkout.lineItems.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) =>
        ({
          id: item.id,
          title: item.title,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: {
              amount: item.variant.price.amount,
              currencyCode: item.variant.price.currencyCode,
            },
            image: item.variant.image
              ? {
                  src: item.variant.image.src,
                  altText: item.variant.image.altText,
                }
              : null,
            product: {
              handle: item.variant.product.handle,
            },
          },
          quantity: item.quantity,
        }) as ShopifyCartItem
    ),
    subtotalPrice: {
      amount: checkout.subtotalPrice.amount,
      currencyCode: checkout.subtotalPrice.currencyCode,
    },
    totalPrice: {
      amount: checkout.totalPrice.amount,
      currencyCode: checkout.totalPrice.currencyCode,
    },
    lineItemCount: checkout.lineItems.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (count: number, item: any) => count + item.quantity,
      0
    ),
  };
}

// Create a direct checkout with items and return the checkout URL
export async function createDirectCheckout(
  variantId: string,
  quantity: number
): Promise<string | null> {
  try {
    // Check if Shopify is configured
    if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 
        !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      // Return a demo URL for development
      console.warn("Shopify not configured - using demo checkout");
      return null;
    }

    // Create a new checkout with the items
    const checkout = await client.checkout.create();
    const lineItemsToAdd = [{ variantId, quantity }];
    const updatedCheckout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    );
    
    return updatedCheckout.webUrl;
  } catch (error) {
    console.error("Error creating direct checkout:", error);
    return null;
  }
}

// Get direct checkout URL using Shopify's cart permalink format
export function getShopifyCheckoutUrl(variantId: string, quantity: number): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    return "#";
  }
  
  // Extract numeric ID from the full variant ID if needed
  // Shopify variant IDs can be in format "gid://shopify/ProductVariant/12345678"
  let numericId = variantId;
  if (variantId.includes("/")) {
    const parts = variantId.split("/");
    numericId = parts[parts.length - 1];
  }
  
  // Shopify cart permalink format: /cart/{variant_id}:{quantity}
  return `https://${domain}/cart/${numericId}:${quantity}`;
}


