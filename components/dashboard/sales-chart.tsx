"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyRevenueData, dailySalesData } from "@/lib/mock-data";

interface SalesChartProps {
  type?: "monthly" | "daily";
  title?: string;
}

export function SalesChart({ type = "monthly", title = "Sales Overview" }: SalesChartProps) {
  const data = type === "monthly" ? monthlyRevenueData : dailySalesData;
  const dataKey = type === "monthly" ? "revenue" : "sales";

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey={type === "monthly" ? "month" : "day"}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) =>
                value >= 1000000
                  ? `${(value / 1000000).toFixed(0)}M`
                  : `${(value / 1000).toFixed(0)}K`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [
                `TZS ${value.toLocaleString()}`,
                type === "monthly" ? "Revenue" : "Sales",
              ]}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Revenue stats component for the sidebar
export function RevenueStats() {
  const stats = [
    { label: "Avg Monthly", value: "TZS 21.5M" },
    { label: "Growth", value: "+12.5%" },
    { label: "Peak Month", value: "May" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">Revenue Stats</h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-medium text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
