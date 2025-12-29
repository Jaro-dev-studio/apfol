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
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem, checkout } = useCart();

  const itemCount = cart?.lineItemCount || 0;
  const isEmpty = itemCount === 0;

  return (
    <div className="bg-[#f5f0e8] text-[#1d1d1f] min-h-screen pt-20">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-[#1d1d1f]">
              Your Cart
            </h1>
            <p className="text-[#1d1d1f]/60">
              {itemCount === 0
                ? "Your cart is empty"
                : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 rounded-full"
            >
              <Link href="/products/watchintosh">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="text-center py-24"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-32 h-32 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center mx-auto mb-8"
              >
                <ShoppingBag className="h-14 w-14 text-[#1d1d1f]/30" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold mb-4 text-[#1d1d1f]"
              >
                Your cart is empty
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#1d1d1f]/60 mb-8 max-w-md mx-auto"
              >
                Looks like you have not added anything to your cart yet. Browse
                our collection to find something you will love.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-8"
                >
                  <Link href="/products/watchintosh">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart?.lineItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/70 border border-[#d4cdc0] shadow-sm"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-[#f5f0e8] overflow-hidden shrink-0">
                        <Image
                          src={item.variant.image?.src || "/watchintosh.png"}
                          alt={item.variant.image?.altText || item.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 sm:gap-4">
                          <div>
                            <Link
                              href={`/products/${item.variant.product.handle}`}
                              className="text-base sm:text-lg font-medium text-[#1d1d1f] hover:underline line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            {item.variant.title !== "Default Title" && (
                              <p className="text-sm text-[#1d1d1f]/60 mt-1">
                                {item.variant.title}
                              </p>
                            )}
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-[#1d1d1f]/40 hover:text-red-500 hover:bg-red-500/10 shrink-0"
                              onClick={() => removeItem(item.id)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </motion.div>
                        </div>

                        <div className="flex items-center justify-between mt-3 sm:mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-[#1d1d1f]/5 rounded-full p-1">
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={isLoading}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </motion.div>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="w-8 text-center font-medium"
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={isLoading}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-semibold text-[#1d1d1f]">
                              $
                              {(
                                parseFloat(item.variant.price.amount) * item.quantity
                              ).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-[#1d1d1f]/50">
                                ${parseFloat(item.variant.price.amount).toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 p-6 rounded-2xl bg-white/70 border border-[#d4cdc0] shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#1d1d1f]/60">Subtotal</span>
                      <span className="text-[#1d1d1f]">
                        $
                        {parseFloat(cart?.subtotalPrice.amount || "0").toFixed(2)}
                      </span>
                    </div>
                    {parseFloat(cart?.discountAmount?.amount || "0") > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex justify-between"
                      >
                        <span className="text-green-600 font-medium">Buy 2 Get 1 Free</span>
                        <span className="text-green-600 font-medium">
                          -${parseFloat(cart?.discountAmount?.amount || "0").toFixed(2)}
                        </span>
                      </motion.div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#1d1d1f]/60">Shipping</span>
                      <span className="text-[#1d1d1f]/60">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1d1d1f]/60">Taxes</span>
                      <span className="text-[#1d1d1f]/60">
                        Calculated at checkout
                      </span>
                    </div>

                    <Separator className="bg-[#d4cdc0]" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-[#1d1d1f]">Total</span>
                      <span className="text-[#1d1d1f]">
                        ${parseFloat(cart?.totalPrice.amount || "0").toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6"
                  >
                    <Button
                      className="w-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full h-12 text-base font-medium"
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
                  </motion.div>

                  <p className="text-center text-sm text-[#1d1d1f]/40 mt-4">
                    Secure checkout powered by Shopify
                  </p>

                  {/* Buy 2 Get 1 Free Promo Banner */}
                  {itemCount > 0 && itemCount < 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                    >
                      <p className="text-sm font-medium text-green-800">
                        Add {3 - itemCount} more item{3 - itemCount !== 1 ? "s" : ""} to get 1 FREE!
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Buy 2 Get 1 Free on all products
                      </p>
                    </motion.div>
                  )}
                  {itemCount >= 3 && parseFloat(cart?.discountAmount?.amount || "0") > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                    >
                      <p className="text-sm font-medium text-green-800">
                        You are saving ${parseFloat(cart?.discountAmount?.amount || "0").toFixed(2)}!
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Buy 2 Get 1 Free applied
                      </p>
                    </motion.div>
                  )}

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-[#d4cdc0] space-y-3 text-sm text-[#1d1d1f]/60">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
