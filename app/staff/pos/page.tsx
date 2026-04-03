"use client";

import { useState } from "react";
import { products, formatTZS } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-data";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Smartphone,
  Banknote,
  Package,
  Search,
  ChevronDown,
  Receipt,
  Users,
  ClipboardList,
  CheckCircle,
  Pill,
  Sparkles,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CartItem {
  product: Product;
  quantity: number;
}

type CategoryType = "all" | "medicines" | "cosmetics" | "supplements";

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "checkout">("products");

  const categories = [
    { id: "all" as const, label: "All", icon: <Package className="h-4 w-4" /> },
    { id: "medicines" as const, label: "Medicines", icon: <Pill className="h-4 w-4" /> },
    { id: "cosmetics" as const, label: "Cosmetics", icon: <Sparkles className="h-4 w-4" /> },
    { id: "supplements" as const, label: "Supplements", icon: <Leaf className="h-4 w-4" /> },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const clearCart = () => setCart([]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f]">
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Point of Sale</h1>
          <Badge variant="outline" className="ml-2">
            Snackicon
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/staff">
            <Button variant="ghost" size="sm">
              <X className="mr-1 h-4 w-4" />
              Close
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Products */}
        <div className="flex flex-1 flex-col border-r border-border">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-border p-3">
            {[
              { id: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
              { id: "cart", label: "Cart", icon: <ShoppingCart className="h-4 w-4" />, count: cart.length },
              { id: "checkout", label: "Checkout", icon: <CreditCard className="h-4 w-4" /> },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex-1",
                  activeTab === tab.id && "bg-[#1e3a5f] hover:bg-[#2d4a6f]"
                )}
              >
                {tab.icon}
                <span className="ml-1">{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white">{tab.count}</Badge>
                )}
              </Button>
            ))}
          </div>

          {activeTab === "products" && (
            <>
              {/* Categories */}
              <div className="flex gap-2 border-b border-border p-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      activeCategory === category.id &&
                        "bg-[#1e3a5f] hover:bg-[#2d4a6f]"
                    )}
                  >
                    {category.icon}
                    <span className="ml-1">{category.label}</span>
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div className="border-b border-border p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1 overflow-auto p-3">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="flex flex-col items-center rounded-xl border border-border bg-card p-3 text-center transition-all hover:border-[#1e3a5f] hover:shadow-md"
                    >
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                        <Package className="h-8 w-8 text-[#1e3a5f]" />
                      </div>
                      <p className="line-clamp-2 text-xs font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-emerald-600">
                        {formatTZS(product.price)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "cart" && (
            <div className="flex-1 overflow-auto p-3">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCart className="mb-2 h-12 w-12" />
                  <p>Cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                        <Package className="h-6 w-6 text-[#1e3a5f]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-emerald-600">
                          {formatTZS(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="w-24 text-right font-semibold text-foreground">
                        {formatTZS(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "checkout" && (
            <div className="flex-1 overflow-auto p-6">
              <div className="mx-auto max-w-md space-y-6">
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                  <h2 className="text-xl font-bold text-foreground">
                    Complete Sale
                  </h2>
                  <p className="text-muted-foreground">
                    Select a payment method to complete the transaction
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatTZS(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium text-emerald-600">
                      -{formatTZS(discount)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold text-emerald-600">
                        {formatTZS(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-red-500 py-6 text-lg hover:bg-red-600">
                    <Smartphone className="mr-2 h-5 w-5" />
                    M-Pesa
                  </Button>
                  <Button className="w-full bg-blue-500 py-6 text-lg hover:bg-blue-600">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Tigo Pesa
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-6 text-lg"
                  >
                    <Banknote className="mr-2 h-5 w-5" />
                    Cash
                  </Button>
                </div>

                <Button className="w-full bg-emerald-500 py-6 text-lg hover:bg-emerald-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Complete Sale
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Cart Summary */}
        <div className="flex w-80 flex-col bg-card">
          <div className="border-b border-border p-4">
            <h2 className="font-semibold text-foreground">Cart</h2>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                <ShoppingCart className="mb-2 h-10 w-10" />
                <p className="text-sm">No items in cart</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start gap-3 rounded-lg bg-muted/30 p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                      <Package className="h-5 w-5 text-[#1e3a5f]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTZS(item.product.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {formatTZS(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-border p-4">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">{formatTZS(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discount:</span>
                <span className="font-medium text-emerald-600">
                  {formatTZS(discount)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-lg font-bold text-foreground">
                  {formatTZS(total)}
                </span>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button className="bg-red-500 hover:bg-red-600">
                <Smartphone className="mr-1 h-4 w-4" />
                M-Pesa
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Smartphone className="mr-1 h-4 w-4" />
                Ligo Pesa
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button variant="outline">
                <Banknote className="mr-1 h-4 w-4" />
                Cash
              </Button>
              <Button variant="outline" className="text-blue-600">
                <CreditCard className="mr-1 h-4 w-4" />
                Airtel Mary
              </Button>
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Sale
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border p-4">
            <div className="grid grid-cols-4 gap-2">
              <QuickAction icon={<Receipt className="h-4 w-4" />} label="Papties" />
              <QuickAction icon={<Users className="h-4 w-4" />} label="Memblong" />
              <QuickAction
                icon={<ClipboardList className="h-4 w-4" />}
                label="Searching"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="flex flex-col items-center gap-1 h-auto py-2 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
                <span className="text-[10px]">Clear</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex flex-col items-center gap-1 h-auto py-2"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </Button>
  );
}
