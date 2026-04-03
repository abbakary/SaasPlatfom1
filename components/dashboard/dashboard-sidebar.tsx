"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
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
  CreditCard,
  TrendingUp,
  AlertCircle,
  Truck,
  DollarSign,
  Activity,
  Menu,
  X,
  Home,
  Inbox,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface DashboardSidebarProps {
  role: "super_admin" | "pharmacy_owner" | "staff";
  pharmacyName?: string;
}

const superAdminNavSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/super-admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Pharmacies", href: "/super-admin/pharmacies", icon: <Store className="h-5 w-5" /> },
      { label: "Users", href: "/super-admin/users", icon: <Users className="h-5 w-5" /> },
      { label: "Subscriptions", href: "/super-admin/subscriptions", icon: <CreditCard className="h-5 w-5" /> },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", href: "/super-admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
      { label: "Activity Logs", href: "/super-admin/activity-logs", icon: <Activity className="h-5 w-5" /> },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/super-admin/settings", icon: <Settings className="h-5 w-5" /> },
    ],
  },
];

const pharmacyOwnerNavSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/pharmacy-owner", icon: <LayoutDashboard className="h-5 w-5" /> },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Inventory", href: "/pharmacy-owner/inventory", icon: <Package className="h-5 w-5" /> },
      { label: "Sales", href: "/pharmacy-owner/sales", icon: <ShoppingCart className="h-5 w-5" /> },
      { label: "Orders", href: "/pharmacy-owner/orders", icon: <Inbox className="h-5 w-5" /> },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Staff", href: "/pharmacy-owner/staff", icon: <Users className="h-5 w-5" /> },
      { label: "Customers", href: "/pharmacy-owner/customers", icon: <Home className="h-5 w-5" /> },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Reports", href: "/pharmacy-owner/reports", icon: <FileText className="h-5 w-5" /> },
      { label: "Analytics", href: "/pharmacy-owner/analytics", icon: <TrendingUp className="h-5 w-5" /> },
      { label: "Stock Alerts", href: "/pharmacy-owner/stock-alerts", icon: <AlertCircle className="h-5 w-5" /> },
    ],
  },
  {
    title: "Supply",
    items: [
      { label: "Suppliers", href: "/pharmacy-owner/suppliers", icon: <Truck className="h-5 w-5" /> },
      { label: "Billing", href: "/pharmacy-owner/billing", icon: <DollarSign className="h-5 w-5" /> },
    ],
  },
  {
    title: "Store",
    items: [
      { label: "Settings", href: "/pharmacy-owner/settings", icon: <Settings className="h-5 w-5" /> },
    ],
  },
];

const staffNavSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/staff", icon: <LayoutDashboard className="h-5 w-5" /> },
      { label: "POS System", href: "/staff/pos", icon: <ShoppingCart className="h-5 w-5" /> },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Inventory", href: "/staff/inventory", icon: <Package className="h-5 w-5" /> },
      { label: "Orders", href: "/staff/orders", icon: <FileText className="h-5 w-5" /> },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Customers", href: "/staff/customers", icon: <Users className="h-5 w-5" /> },
    ],
  },
];

export function DashboardSidebar({ role, pharmacyName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse, isMounted } = useSidebar();

  const navSections =
    role === "super_admin"
      ? superAdminNavSections
      : role === "pharmacy_owner"
      ? pharmacyOwnerNavSections
      : staffNavSections;

  const brandName = role === "super_admin" ? "MediCare" : pharmacyName || "MediCare";
  const brandSubtext = role === "super_admin" ? "Admin" : "Online";
  const roleLabel = role === "super_admin" ? "Super Admin" : role === "pharmacy_owner" ? "Pharmacy Owner" : "Staff";

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "sidebar-nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "sidebar-nav-item-active bg-[#2d4a6f] text-white"
            : "sidebar-nav-item-inactive text-white/80 hover:bg-[#2d4a6f] hover:text-white"
        )}
        title={isCollapsed ? item.label : undefined}
      >
        {item.icon}
        {!isCollapsed && <span className="flex-1">{item.label}</span>}
        {item.badge && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <aside className="sidebar flex h-screen w-64 flex-col bg-[#1e3a5f] text-white transition-all duration-300" />
    );
  }

  return (
    <aside
      className={cn(
        "sidebar flex h-screen flex-col bg-[#1e3a5f] text-white transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="sidebar-header flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500">
          <Pill className="h-6 w-6 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-white">{brandName}</span>
              <span className="text-lg font-normal text-emerald-400">{brandSubtext}</span>
            </div>
            <span className="text-xs font-medium text-white/60">{roleLabel}</span>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="sidebar-nav flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="sidebar-section space-y-1">
            {section.title && !isCollapsed && (
              <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">{section.items.map(renderNavItem)}</div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer border-t border-white/10 space-y-2 p-3">
        {role === "pharmacy_owner" || role === "staff" ? (
          <>
            {role === "staff" && (
              <button
                className="sidebar-quick-action flex w-full items-center gap-3 rounded-lg bg-emerald-500 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                title={isCollapsed ? "Go to POS" : undefined}
              >
                <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>POS System</span>}
              </button>
            )}
            <div className="sidebar-org-info">
              <button
                className="sidebar-org-button flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-[#2d4a6f] hover:text-white"
                title={isCollapsed ? pharmacyName : undefined}
              >
                <Building2 className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{pharmacyName || "MediCare"}</span>}
              </button>
            </div>
          </>
        ) : null}

        {/* Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="sidebar-collapse-btn flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-[#2d4a6f] hover:text-white"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          {!isCollapsed && <span>{isCollapsed ? "Expand" : "Collapse"}</span>}
        </button>

        {/* Logout */}
        <button className="sidebar-logout-btn flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-[#2d4a6f] hover:text-white">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
