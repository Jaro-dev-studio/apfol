"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const {
    cart,
    isLoading,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    checkout,
  } = useCart();

  const itemCount = cart?.lineItemCount || 0;
  const isEmpty = itemCount === 0;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-black border-l border-white/10 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-white/60 mb-8">
              Looks like you have not added anything to your cart yet.
            </p>
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              onClick={closeCart}
            >
              <Link href="/#products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cart?.lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-lg bg-white/10 overflow-hidden shrink-0">
                    {item.variant.image ? (
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText || item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-white/40" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.variant.product.handle}`}
                      className="text-white font-medium hover:underline truncate block"
                      onClick={closeCart}
                    >
                      {item.title}
                    </Link>
                    {item.variant.title !== "Default Title" && (
                      <p className="text-sm text-white/60">{item.variant.title}</p>
                    )}
                    <p className="text-white font-semibold mt-1">
                      ${parseFloat(item.variant.price.amount).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 bg-white/10 rounded-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={isLoading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm text-white">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isLoading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">
                    ${parseFloat(cart?.subtotalPrice.amount || "0").toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white/60">Calculated at checkout</span>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="flex justify-between text-lg font-semibold">
                <span className="text-white">Total</span>
                <span className="text-white">
                  ${parseFloat(cart?.totalPrice.amount || "0").toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 text-base font-medium"
                onClick={checkout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Checkout"
                )}
              </Button>

              <p className="text-center text-sm text-white/40">
                Secure checkout powered by Shopify
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}


