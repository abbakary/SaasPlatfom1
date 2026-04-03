"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { PharmacyTable } from "@/components/dashboard/pharmacy-table";
import { AIInsights, StockAlerts } from "@/components/dashboard/insights-panel";
import { MapPlaceholder } from "@/components/dashboard/pharmacy-map";
import { platformStats, formatTZS, formatShortTZS } from "@/lib/mock-data";
import { Store, Users, DollarSign, TrendingUp, AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboard() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Platform Overview" subtitle="Total Admin" />

      <div className="p-6">
        {/* Top Metrics Row */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Total Pharmacies"
            value={platformStats.totalPharmacies}
            icon={<Store className="h-5 w-5" />}
            color="blue"
          />
          <MetricCard
            title="Active Users"
            value={platformStats.activeUsers}
            icon={<Users className="h-5 w-5" />}
            color="green"
            trend={{ value: 12, direction: "up" }}
          />
          <MetricCard
            title="Monthly Revenue"
            value={formatShortTZS(platformStats.monthlyRevenue)}
            icon={<DollarSign className="h-5 w-5" />}
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Overview Chart */}
            <SalesChart type="monthly" title="System Overview" />

            {/* GIS Heatmap */}
            <MapPlaceholder title="GIS Heatmap" />

            {/* Pharmacy Overview Table */}
            <PharmacyTable />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* System Insights */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">System Insights</h3>
              <div className="space-y-3">
                <InsightItem
                  icon={<TrendingUp className="h-4 w-4" />}
                  title="Trending Products"
                  description="Vitamin supplements up 25%"
                  color="emerald"
                />
                <InsightItem
                  icon={<AlertTriangle className="h-4 w-4" />}
                  title="Expiring/Low Stocks"
                  description="8 products need attention"
                  color="amber"
                />
                <InsightItem
                  icon={<Package className="h-4 w-4" />}
                  title="Stock Alerts"
                  description="3 critical alerts"
                  color="red"
                />
              </div>
            </div>

            {/* AI Insights */}
            <AIInsights />

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-[#1e3a5f] hover:bg-[#2d4a6f]">
                  <Store className="mr-2 h-4 w-4" />
                  Add New Pharmacy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Insight Item Component
function InsightItem({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "emerald" | "amber" | "red" | "blue";
}) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
