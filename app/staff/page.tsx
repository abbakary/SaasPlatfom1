"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { products, stockAlerts, formatTZS } from "@/lib/mock-data";
import {
  Package,
  AlertTriangle,
  Clock,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StaffDashboard() {
  // Get top products for quick add
  const topProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Platform Goals" subtitle="Staff Dashboard" />

      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Sales</p>
                <p className="text-2xl font-bold text-foreground">TZS 125,000</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg per Sale</p>
                <p className="text-2xl font-bold text-foreground">TZS 5,208</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Package className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Platform Goals / Quick Products */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">Platform Goals</h3>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                      <Package className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTZS(product.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {formatTZS(product.price)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">2</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[1, 2, 3, 3, 4, 5, 6, 16, 7, 8, 10, "x"].map((num, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-10 text-lg font-semibold"
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="col-span-2 h-10 text-lg font-semibold"
              >
                0
              </Button>
              <Button
                variant="outline"
                className="h-10 text-lg font-semibold"
              >
                #E
              </Button>
              <Button
                variant="outline"
                className="h-10"
              >
                <Package className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="text-xl font-bold text-foreground">
                TZS 25,000
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                Checkout
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Stock Alerts</h3>
              <div className="space-y-3">
                {stockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 rounded-lg p-3 ${
                      alert.severity === "critical"
                        ? "bg-red-50"
                        : "bg-amber-50"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 shrink-0 ${
                        alert.severity === "critical"
                          ? "text-red-500"
                          : "text-amber-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {alert.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                    </div>
                    <Badge
                      className={
                        alert.severity === "critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      {alert.type === "low_stock" ? "Low Stock" : "Expiring"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Stock Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Low Stock: Vitamin C Capsules
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Only 8 units remaining
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                  <Clock className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Expiring Soon: Amoxicillin 500mg
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires in 45 days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Link href="/staff/pos" className="flex-1">
                <Button className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Open POS
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                <Package className="mr-2 h-4 w-4" />
                Check Inventory
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
