"use client";

import { useState } from "react";
import {
  BarChart3,
  Package,
  Users,
  Settings,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Bell,
  Clock,
  QrCode,
  Home,
  LogOut,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function StaffPOSDashboard() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "history">("products");

  // Mock products
  const products = [
    { id: "1", name: "Panadol Tablets 500mg", price: 5000, category: "Medicine", stock: 45 },
    { id: "2", name: "Cough Syrup", price: 8000, category: "Medicine", stock: 23 },
    { id: "3", name: "Face Cream", price: 12000, category: "Cosmetic", stock: 15 },
    { id: "4", name: "Hand Sanitizer", price: 3500, category: "Health", stock: 58 },
    { id: "5", name: "Vitamin C", price: 4500, category: "Supplement", stock: 30 },
    { id: "6", name: "Antibacterial Soap", price: 2500, category: "Health", stock: 72 },
  ];

  const addToCart = (product: typeof products[0]) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1e3a5f] text-white border-b border-border/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">POS System</h1>
            <p className="text-xs text-white/70">Point of Sale</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">Staff Member</p>
              <p className="text-xs text-white/70">Cashier</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Main POS Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Product Grid */}
          <Card className="p-4">
            <h3 className="font-bold text-lg mb-4">Available Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-3 rounded-lg border border-border bg-white hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left"
                >
                  <p className="font-medium text-foreground text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-emerald-600">TZS {product.price.toLocaleString()}</p>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {product.stock} in stock
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Cart Sidebar */}
        <div className="space-y-4">
          {/* Cart Summary */}
          <Card className="p-4 bg-emerald-50 border-emerald-200">
            <h3 className="font-bold text-lg text-foreground mb-4">Shopping Cart</h3>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Cart is empty</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-lg border border-emerald-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-6 w-6 rounded bg-muted hover:bg-muted flex items-center justify-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-6 w-6 rounded bg-muted hover:bg-muted flex items-center justify-center"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-bold text-emerald-600 text-sm">
                          TZS {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-white p-4 rounded-lg border-2 border-emerald-500 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">TZS {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-muted pt-3">
                    <p className="text-lg font-bold text-emerald-600">
                      Total: TZS {cartTotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Checkout Actions */}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 font-bold text-lg mb-2">
                  Complete Sale
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCartItems([])}
                >
                  Clear Cart
                </Button>
              </>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h4 className="font-bold text-sm mb-3">Today's Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Sales</span>
                <span className="font-bold">TZS 2.4M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transactions</span>
                <span className="font-bold">28</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items Sold</span>
                <span className="font-bold">156</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div>MediCare Online - POS System v1.0</div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
