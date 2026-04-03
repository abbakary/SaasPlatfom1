"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color: "blue" | "green" | "orange" | "red" | "yellow";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  showDropdown?: boolean;
  className?: string;
}

const colorClasses = {
  blue: "bg-[#1e3a5f] text-white",
  green: "bg-emerald-500 text-white",
  orange: "bg-orange-500 text-white",
  red: "bg-red-500 text-white",
  yellow: "bg-amber-400 text-gray-900",
};

const iconBgClasses = {
  blue: "bg-[#2d4a6f]",
  green: "bg-emerald-600",
  orange: "bg-orange-600",
  red: "bg-red-600",
  yellow: "bg-amber-500",
};

export function MetricCard({
  title,
  value,
  icon,
  color,
  trend,
  showDropdown = true,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl p-4 shadow-sm",
        colorClasses[color],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-90">{title}</span>
        {showDropdown && (
          <button className="flex h-6 w-6 items-center justify-center rounded bg-white/20 transition-colors hover:bg-white/30">
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconBgClasses[color]
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <div className="flex items-center gap-1 text-xs opacity-80">
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>
                {trend.direction === "up" ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stats card for smaller metrics
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
