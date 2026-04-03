"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import {
  TopSellingProducts,
  StockAlerts,
  BusinessInsights,
} from "@/components/dashboard/insights-panel";
import { formatTZS, formatShortTZS, products, topSellingProducts } from "@/lib/mock-data";
import {
  DollarSign,
  Package,
  Clock,
  TrendingUp,
  BarChart3,
  ShoppingCart,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PharmacyOwnerDashboard() {
  const todaysSales = 1250000;
  const lowStockCount = 8;
  const expiringCount = 5;

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Platform Overview" subtitle="Florisse Pharmacy" />

      <div className="p-6">
        {/* Top Metrics Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Today's Sales"
            value={formatTZS(todaysSales)}
            icon={<DollarSign className="h-5 w-5" />}
            color="blue"
          />
          <MetricCard
            title="Low Stock"
            value={`${lowStockCount} Products`}
            icon={<Package className="h-5 w-5" />}
            color="orange"
          />
          <MetricCard
            title="Expiring Soon"
            value={`${expiringCount} Batches`}
            icon={<Clock className="h-5 w-5" />}
            color="red"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Performance Chart */}
            <SalesChart type="monthly" title="Sales Performance" />

            {/* Sales Overview Table */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="font-semibold text-foreground">Sales Overview</h3>
                <Badge variant="outline" className="text-muted-foreground">
                  Today
                </Badge>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <SalesMetric
                    icon={<TrendingUp className="h-4 w-4" />}
                    label="Top Selling Products"
                    value="12"
                    color="emerald"
                  />
                  <SalesMetric
                    icon={<Package className="h-4 w-4" />}
                    label="65 Sessions Proposed"
                    value="65"
                    color="blue"
                  />
                  <SalesMetric
                    icon={<BarChart3 className="h-4 w-4" />}
                    label="Demand Products"
                    value="+15%"
                    color="amber"
                  />
                  <SalesMetric
                    icon={<ShoppingCart className="h-4 w-4" />}
                    label="Demand Forecast"
                    value="High"
                    color="purple"
                  />
                </div>
              </div>
            </div>

            {/* AI Interview Section */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Aile Interview</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <InterviewCard
                  icon={<TrendingUp className="h-5 w-5" />}
                  title="Top Selling Products"
                  color="emerald"
                />
                <InterviewCard
                  icon={<BarChart3 className="h-5 w-5" />}
                  title="Demand Products"
                  color="blue"
                />
                <InterviewCard
                  icon={<Package className="h-5 w-5" />}
                  title="Demand Forecast"
                  color="amber"
                />
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Sales Overview Stats */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Sales Overview</h3>
              <div className="space-y-3">
                <OverviewStat label="Total Sales Today" value="TZS 1,250,000" />
                <OverviewStat label="Products Sold" value="156" />
                <OverviewStat label="Avg Transaction" value="TZS 8,012" />
              </div>
            </div>

            {/* Business Insights */}
            <BusinessInsights />

            {/* Inventory Status */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Inventory Status</h3>
              <div className="space-y-3">
                <InventoryItem
                  name="Regional Delete Marathi"
                  status="In Stock"
                  quantity={150}
                  color="emerald"
                />
                <InventoryItem
                  name="Panadol Tablets"
                  status="Low Stock"
                  quantity={8}
                  color="amber"
                />
                <InventoryItem
                  name="Vitamin C"
                  status="Critical"
                  quantity={3}
                  color="red"
                />
              </div>
            </div>

            {/* Trending Products */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Trending Products</h3>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  +25%
                </Badge>
              </div>
              <div className="space-y-2">
                {topSellingProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-2"
                  >
                    <span className="text-sm text-foreground">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.sales} sold
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sales Metric Component
function SalesMetric({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "emerald" | "blue" | "amber" | "purple";
}) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// Interview Card Component
function InterviewCard({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: "emerald" | "blue" | "amber";
}) {
  const colorClasses = {
    emerald: "bg-emerald-500",
    blue: "bg-[#1e3a5f]",
    amber: "bg-amber-500",
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30 cursor-pointer">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
    </div>
  );
}

// Overview Stat Component
function OverviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

// Inventory Item Component
function InventoryItem({
  name,
  status,
  quantity,
  color,
}: {
  name: string;
  status: string;
  quantity: number;
  color: "emerald" | "amber" | "red";
}) {
  const statusClasses = {
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
      </div>
      <Badge className={statusClasses[color]}>{status}</Badge>
    </div>
  );
}
