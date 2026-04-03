"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  BarChart3,
  Settings,
  Package,
  ShoppingCart,
  FileText,
  LogOut,
  ChevronDown,
  Pill,
  Building2,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardSidebarProps {
  role: "super_admin" | "pharmacy_owner" | "staff";
  pharmacyName?: string;
}

const superAdminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/super-admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Pharmacies", href: "/super-admin/pharmacies", icon: <Store className="h-5 w-5" /> },
  { label: "Users", href: "/super-admin/users", icon: <Users className="h-5 w-5" /> },
  { label: "Analytics", href: "/super-admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { label: "Settings", href: "/super-admin/settings", icon: <Settings className="h-5 w-5" /> },
];

const pharmacyOwnerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/pharmacy-owner", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Inventory", href: "/pharmacy-owner/inventory", icon: <Package className="h-5 w-5" /> },
  { label: "Pharmacies", href: "/pharmacy-owner/pharmacies", icon: <Store className="h-5 w-5" /> },
  { label: "Users", href: "/pharmacy-owner/users", icon: <Users className="h-5 w-5" /> },
  { label: "Sales", href: "/pharmacy-owner/sales", icon: <ShoppingCart className="h-5 w-5" /> },
  { label: "Customers", href: "/pharmacy-owner/customers", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/pharmacy-owner/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/pharmacy-owner/settings", icon: <Settings className="h-5 w-5" /> },
];

const staffNavItems: NavItem[] = [
  { label: "Dashboard", href: "/staff", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "POS", href: "/staff/pos", icon: <ShoppingCart className="h-5 w-5" /> },
  { label: "Inventory", href: "/staff/inventory", icon: <Package className="h-5 w-5" /> },
  { label: "Orders", href: "/staff/orders", icon: <FileText className="h-5 w-5" /> },
  { label: "Customers", href: "/staff/customers", icon: <Users className="h-5 w-5" /> },
];

export function DashboardSidebar({ role, pharmacyName }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navItems =
    role === "super_admin"
      ? superAdminNavItems
      : role === "pharmacy_owner"
      ? pharmacyOwnerNavItems
      : staffNavItems;

  const brandName = role === "super_admin" ? "MediCare" : pharmacyName || "MediCare";
  const brandSubtext = role === "super_admin" ? "Admin" : "Online";

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#1e3a5f] text-white">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
          <Pill className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-white">{brandName}</span>
            <span className="text-lg font-normal text-emerald-400">{brandSubtext}</span>
          </div>
        </div>
        <ChevronDown className="ml-auto h-4 w-4 text-white/60" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#2d4a6f] text-white"
                  : "text-white/80 hover:bg-[#2d4a6f] hover:text-white"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {role !== "super_admin" && (
          <Link
            href="/staff/pos"
            className="mb-2 flex items-center gap-3 rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Pharmacy Sales</span>
          </Link>
        )}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-[#2d4a6f] hover:text-white">
          <Building2 className="h-5 w-5" />
          <span>Super1 Indano</span>
        </button>
      </div>
    </aside>
  );
}
