"use client";

import { useState } from "react";
import {
  BarChart3,
  Package,
  Users,
  Settings,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Pill,
  MapPin,
  DollarSign,
  Eye,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PharmacyOwnerDashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <Package className="h-5 w-5" />,
      submenu: [
        { id: "products", label: "All Products", icon: <Package className="h-5 w-5" /> },
        { id: "add-product", label: "Add Product", icon: <Package className="h-5 w-5" /> },
        { id: "stock-alerts", label: "Stock Alerts", icon: <AlertCircle className="h-5 w-5" />, badge: "3" },
        { id: "expiry-tracking", label: "Expiry Tracking", icon: <AlertCircle className="h-5 w-5" /> },
      ],
    },
    {
      id: "sales",
      label: "Sales",
      icon: <ShoppingCart className="h-5 w-5" />,
      submenu: [
        { id: "orders", label: "Orders", icon: <ShoppingCart className="h-5 w-5" /> },
        { id: "pricing", label: "Pricing", icon: <DollarSign className="h-5 w-5" /> },
        { id: "promotions", label: "Promotions", icon: <Zap className="h-5 w-5" /> },
      ],
    },
    {
      id: "staff",
      label: "Staff",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { id: "team", label: "Team Members", icon: <Users className="h-5 w-5" /> },
        { id: "roles", label: "Roles & Permissions", icon: <Users className="h-5 w-5" /> },
        { id: "activity", label: "Activity Log", icon: <Users className="h-5 w-5" /> },
      ],
    },
    {
      id: "customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { id: "all-customers", label: "All Customers", icon: <Users className="h-5 w-5" /> },
        { id: "customer-analytics", label: "Analytics", icon: <TrendingUp className="h-5 w-5" /> },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      submenu: [
        { id: "sales-report", label: "Sales Report", icon: <TrendingUp className="h-5 w-5" /> },
        { id: "insights", label: "AI Insights", icon: <Eye className="h-5 w-5" /> },
        { id: "stock-forecast", label: "Stock Forecast", icon: <TrendingUp className="h-5 w-5" /> },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        { id: "pharmacy-info", label: "Pharmacy Info", icon: <Settings className="h-5 w-5" /> },
        { id: "delivery-zones", label: "Delivery Zones", icon: <MapPin className="h-5 w-5" /> },
        { id: "payment-methods", label: "Payment Methods", icon: <DollarSign className="h-5 w-5" /> },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <DashboardLayout
      title="Pharmacy Manager"
      subtitle="Your Pharmacy Dashboard"
      navItems={navItems}
      onLogout={handleLogout}
      userRole="Pharmacy Owner"
      userName="Ahmed Hassan"
      userAvatar="AH"
      activeItem={activeView}
      onNavItemClick={setActiveView}
    >
      {activeView === "dashboard" && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Today's Sales</p>
                  <p className="text-3xl font-bold text-foreground mt-2">TZS 850K</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% from yesterday</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Products in Stock</p>
                  <p className="text-3xl font-bold text-foreground mt-2">243</p>
                  <p className="text-xs text-yellow-600 mt-1">12 low stock</p>
                </div>
                <Package className="h-12 w-12 text-blue-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Orders</p>
                  <p className="text-3xl font-bold text-foreground mt-2">18</p>
                  <p className="text-xs text-emerald-600 mt-1">3 ready for delivery</p>
                </div>
                <ShoppingCart className="h-12 w-12 text-emerald-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Customers</p>
                  <p className="text-3xl font-bold text-foreground mt-2">526</p>
                  <p className="text-xs text-purple-600 mt-1">42 new this week</p>
                </div>
                <Users className="h-12 w-12 text-purple-500/20" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart Placeholder */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-foreground mb-4">Sales This Week</h3>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Sales chart visualization</p>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
                <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
                <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white">
                  <Eye className="h-4 w-4 mr-2" />
                  AI Insights
                </Button>
                <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Staff
                </Button>
              </div>
            </Card>
          </div>

          {/* Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 border-yellow-200 bg-yellow-50">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-900">Low Stock Alert</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    12 products are running low. Check inventory now.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-yellow-300 text-yellow-900 hover:bg-yellow-100">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200 bg-blue-50">
              <div className="flex gap-4">
                <Pill className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900">Expiring Soon</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    3 products expire within the next 30 days
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-900 hover:bg-blue-100">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {[
                { name: "Panadol Tablets 500mg", sales: 245, revenue: "TZS 98K" },
                { name: "Facial Moisturizer Cream", sales: 189, revenue: "TZS 756K" },
                { name: "Vitamin C Supplements", sales: 156, revenue: "TZS 312K" },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                  </div>
                  <p className="font-bold text-green-600">{product.revenue}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Placeholder for other views */}
      {activeView !== "dashboard" && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {activeView.replace(/-/g, " ").toUpperCase()} section - Coming soon
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
