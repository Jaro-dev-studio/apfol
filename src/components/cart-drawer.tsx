"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Loader2, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 right-0 sm:left-auto sm:w-[420px] z-50 bg-[#f5f0e8] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-6 border-b border-[#d4cdc0]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-[#1d1d1f]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#1d1d1f]">Your Cart</h2>
                  <p className="text-sm text-[#1d1d1f]/60">
                    {itemCount === 0 ? "Empty" : `${itemCount} item${itemCount !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeCart}
                className="p-2 rounded-full text-[#1d1d1f]/60 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/5 transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </motion.div>

            {isEmpty ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center mb-6"
                >
                  <ShoppingBag className="h-10 w-10 text-[#1d1d1f]/30" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-xl font-semibold text-[#1d1d1f] mb-2"
                >
                  Your cart is empty
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="text-[#1d1d1f]/60 mb-8"
                >
                  Looks like you have not added anything to your cart yet.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full px-8"
                    onClick={closeCart}
                  >
                    <Link href="/products/watchintosh">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {cart?.lineItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white/70 border border-[#d4cdc0]"
                      >
                        {/* Product Image */}
                        <div className="relative w-20 h-20 rounded-xl bg-[#f5f0e8] overflow-hidden shrink-0">
                          <Image
                            src={item.variant.image?.src || "/watchintosh.png"}
                            alt={item.variant.image?.altText || item.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              href={`/products/${item.variant.product.handle}`}
                              className="text-[#1d1d1f] font-medium hover:underline line-clamp-2 text-sm"
                              onClick={closeCart}
                            >
                              {item.title}
                            </Link>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              disabled={isLoading}
                              className="p-1 text-[#1d1d1f]/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                          
                          {item.variant.title !== "Default Title" && (
                            <p className="text-xs text-[#1d1d1f]/50 mt-0.5">{item.variant.title}</p>
                          )}
                          
                          <p className="text-[#1d1d1f] font-semibold mt-1">
                            ${parseFloat(item.variant.price.amount).toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1 bg-[#1d1d1f]/5 rounded-full p-0.5">
                              <motion.div whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={isLoading}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className="w-6 text-center text-sm font-medium text-[#1d1d1f]"
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.div whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/10"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  disabled={isLoading}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Cart Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="border-t border-[#d4cdc0] p-6 space-y-4 bg-white/50"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1d1d1f]/60">Subtotal</span>
                      <span className="text-[#1d1d1f]">
                        ${parseFloat(cart?.subtotalPrice.amount || "0").toFixed(2)}
                      </span>
                    </div>
                    {parseFloat(cart?.discountAmount?.amount || "0") > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-green-600 font-medium">Buy 2 Get 1 Free</span>
                        <span className="text-green-600 font-medium">
                          -${parseFloat(cart?.discountAmount?.amount || "0").toFixed(2)}
                        </span>
                      </motion.div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1d1d1f]/60">Shipping</span>
                      <span className="text-[#1d1d1f]/60">Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator className="bg-[#d4cdc0]" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-[#1d1d1f]">Total</span>
                    <span className="text-[#1d1d1f]">
                      ${parseFloat(cart?.totalPrice.amount || "0").toFixed(2)}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 rounded-full h-14 text-base font-medium"
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

                  {/* Buy 2 Get 1 Free Promo Banner */}
                  {itemCount > 0 && itemCount < 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                    >
                      <p className="text-sm font-medium text-green-800">
                        Add {3 - itemCount} more item{3 - itemCount !== 1 ? "s" : ""} to get 1 FREE!
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Buy 2 Get 1 Free on all products
                      </p>
                    </motion.div>
                  )}
                  {itemCount >= 3 && parseFloat(cart?.discountAmount?.amount || "0") > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                    >
                      <p className="text-sm font-medium text-green-800">
                        You are saving ${parseFloat(cart?.discountAmount?.amount || "0").toFixed(2)}!
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Buy 2 Get 1 Free applied
                      </p>
                    </motion.div>
                  )}

                  <p className="text-center text-sm text-[#1d1d1f]/40">
                    Secure checkout powered by Shopify
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
