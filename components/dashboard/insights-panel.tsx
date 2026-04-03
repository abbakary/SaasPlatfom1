"use client";

import { aiInsights, stockAlerts, topSellingProducts, formatTZS } from "@/lib/mock-data";
import { TrendingUp, AlertTriangle, Package, MapPin, BarChart3, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// AI Insights component
export function AIInsights() {
  const iconMap: Record<string, React.ReactNode> = {
    demand: <MapPin className="h-4 w-4" />,
    trending: <TrendingUp className="h-4 w-4" />,
    restock: <Package className="h-4 w-4" />,
    revenue: <BarChart3 className="h-4 w-4" />,
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">AI Insights</h3>
      <div className="space-y-3">
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e3a5f] text-white">
              {iconMap[insight.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{insight.title}</p>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Stock Alerts component
export function StockAlerts() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Stock Alerts</h3>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
          {stockAlerts.length}
        </span>
      </div>
      <div className="space-y-3">
        {stockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3",
              alert.severity === "critical" ? "bg-red-50" : "bg-amber-50"
            )}
          >
            <AlertTriangle
              className={cn(
                "h-5 w-5 shrink-0",
                alert.severity === "critical" ? "text-red-500" : "text-amber-500"
              )}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{alert.productName}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Top Selling Products
export function TopSellingProducts() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">Top Selling Products</h3>
      <div className="space-y-3">
        {topSellingProducts.slice(0, 5).map((product, index) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-lg border border-border p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sales} sales</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-600">
              {formatTZS(product.revenue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sales Performance metrics
export function SalesPerformance() {
  const metrics = [
    { label: "Demand Forecast", icon: <TrendingUp className="h-4 w-4" />, value: "+15%" },
    { label: "Stock Recommendations", icon: <Package className="h-4 w-4" />, value: "12 items" },
    { label: "Transaction Fill", icon: <BarChart3 className="h-4 w-4" />, value: "94%" },
    { label: "Total Orders", icon: <Bell className="h-4 w-4" />, value: "1,234" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">Sales Performance</h3>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f] text-white">
              {metric.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-sm font-semibold text-foreground">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Business Insights for pharmacy owner
export function BusinessInsights() {
  const insights = [
    { label: "Top Selling Items", icon: <TrendingUp className="h-4 w-4" />, color: "emerald" },
    { label: "Demand Forecast", icon: <BarChart3 className="h-4 w-4" />, color: "blue" },
    { label: "Stock Recommendations", icon: <Package className="h-4 w-4" />, color: "amber" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">Business Insights</h3>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30 cursor-pointer"
          >
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-white",
              insight.color === "emerald" ? "bg-emerald-500" :
              insight.color === "blue" ? "bg-[#1e3a5f]" : "bg-amber-500"
            )}>
              {insight.icon}
            </div>
            <span className="text-sm font-medium text-foreground">{insight.label}</span>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}
