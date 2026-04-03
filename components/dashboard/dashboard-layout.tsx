"use client";

import { useState } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  submenu?: NavItem[];
  badge?: string | number;
}

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  children: React.ReactNode;
  onLogout?: () => void;
  userRole?: string;
  userName?: string;
  userAvatar?: string;
  activeItem?: string;
  onNavItemClick?: (itemId: string) => void;
}

export function DashboardLayout({
  title,
  subtitle,
  navItems,
  children,
  onLogout,
  userRole,
  userName,
  userAvatar,
  activeItem,
  onNavItemClick,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (itemId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavClick = (item: NavItem) => {
    if (item.submenu) {
      toggleMenu(item.id);
    } else if (item.onClick) {
      item.onClick();
    }
    if (onNavItemClick) {
      onNavItemClick(item.id);
    }
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleNavClick(item)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
            isActive
              ? "bg-emerald-500 text-white"
              : "text-foreground hover:bg-muted/50",
            level > 0 && "pl-8"
          )}
        >
          <span className="shrink-0">{item.icon}</span>
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {item.badge}
            </span>
          )}
          {item.submenu && (
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          )}
        </button>
        {item.submenu && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.submenu.map((subitem) => renderNavItem(subitem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1e3a5f] text-white border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div>
              <h1 className="text-lg font-bold">{title}</h1>
              {subtitle && <p className="text-xs text-white/70">{subtitle}</p>}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {userName && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{userName}</p>
                {userRole && (
                  <p className="text-xs text-white/70 capitalize">{userRole}</p>
                )}
              </div>
            )}
            {userAvatar ? (
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                {userAvatar}
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                A
              </div>
            )}
            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-border overflow-y-auto h-[calc(100vh-60px)] sticky top-16">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => renderNavItem(item))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
