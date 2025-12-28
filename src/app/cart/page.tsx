"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem, checkout } = useCart();

  const itemCount = cart?.lineItemCount || 0;
  const isEmpty = itemCount === 0;

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
              Your Cart
            </h1>
            <p className="text-white/60">
              {itemCount === 0
                ? "Your cart is empty"
                : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full"
          >
            <Link href="/#products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {isEmpty ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-14 w-14 text-white/40" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Looks like you have not added anything to your cart yet. Browse
              our collection to find something you will love.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8"
            >
              <Link href="/#products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart?.lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  {/* Product Image */}
                  <div className="relative w-28 h-28 rounded-xl bg-white/10 overflow-hidden shrink-0">
                    {item.variant.image ? (
                      <Image
                        src={item.variant.image.src}
                        alt={item.variant.image.altText || item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-10 w-10 text-white/40" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link
                          href={`/products/${item.variant.product.handle}`}
                          className="text-lg font-medium text-white hover:underline"
                        >
                          {item.title}
                        </Link>
                        {item.variant.title !== "Default Title" && (
                          <p className="text-sm text-white/60 mt-1">
                            {item.variant.title}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/60 hover:text-red-400 hover:bg-red-500/10 shrink-0"
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={isLoading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          $
                          {(
                            parseFloat(item.variant.price.amount) * item.quantity
                          ).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-white/60">
                            ${parseFloat(item.variant.price.amount).toFixed(2)}{" "}
                            each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Subtotal</span>
                    <span>
                      $
                      {parseFloat(cart?.subtotalPrice.amount || "0").toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Shipping</span>
                    <span className="text-white/60">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Taxes</span>
                    <span className="text-white/60">
                      Calculated at checkout
                    </span>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      ${parseFloat(cart?.totalPrice.amount || "0").toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-white text-black hover:bg-white/90 rounded-full h-12 text-base font-medium"
                  onClick={checkout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-white/40 mt-4">
                  Secure checkout powered by Shopify
                </p>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Free shipping on all orders
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    30-day money-back guarantee
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Secure SSL encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


