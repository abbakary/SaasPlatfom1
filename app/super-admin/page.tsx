"use client";

import { useState } from "react";
import {
  BarChart3,
  Building2,
  Users,
  Settings,
  Database,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Shield,
  FileText,
  Brain,
  Activity,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "pharmacies",
      label: "Pharmacies",
      icon: <Building2 className="h-5 w-5" />,
      submenu: [
        { id: "all-pharmacies", label: "All Pharmacies", icon: <Building2 className="h-5 w-5" /> },
        { id: "create-pharmacy", label: "Create Pharmacy", icon: <Building2 className="h-5 w-5" /> },
        { id: "pharmacy-analytics", label: "Analytics", icon: <TrendingUp className="h-5 w-5" /> },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { id: "all-users", label: "All Users", icon: <Users className="h-5 w-5" /> },
        { id: "user-roles", label: "Roles & Permissions", icon: <Shield className="h-5 w-5" /> },
        { id: "user-activity", label: "Activity Logs", icon: <Activity className="h-5 w-5" /> },
      ],
    },
    {
      id: "intelligence",
      label: "AI Intelligence",
      icon: <Brain className="h-5 w-5" />,
      submenu: [
        { id: "insights", label: "Insights Hub", icon: <Brain className="h-5 w-5" /> },
        { id: "demand-trends", label: "Demand Trends", icon: <TrendingUp className="h-5 w-5" /> },
        { id: "pricing-analytics", label: "Pricing Analytics", icon: <CreditCard className="h-5 w-5" /> },
      ],
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="h-5 w-5" />,
      submenu: [
        { id: "transactions", label: "Transactions", icon: <CreditCard className="h-5 w-5" /> },
        { id: "payment-methods", label: "Payment Methods", icon: <CreditCard className="h-5 w-5" /> },
        { id: "payouts", label: "Payouts", icon: <CreditCard className="h-5 w-5" /> },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        { id: "sales-report", label: "Sales Report", icon: <TrendingUp className="h-5 w-5" /> },
        { id: "inventory-report", label: "Inventory Report", icon: <Database className="h-5 w-5" /> },
        { id: "user-report", label: "User Report", icon: <Users className="h-5 w-5" /> },
      ],
    },
    {
      id: "system",
      label: "System",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
        { id: "security", label: "Security", icon: <Shield className="h-5 w-5" /> },
        { id: "backup", label: "Backup & Recovery", icon: <Database className="h-5 w-5" /> },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      subtitle="System Management & Intelligence Hub"
      navItems={navItems}
      onLogout={handleLogout}
      userRole="Super Admin"
      userName="System Admin"
      userAvatar="SA"
      activeItem={activeView}
      onNavItemClick={setActiveView}
    >
      {activeView === "dashboard" && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Welcome Back!</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Pharmacies</p>
                  <p className="text-3xl font-bold text-foreground mt-2">24</p>
                </div>
                <Building2 className="h-12 w-12 text-emerald-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-foreground mt-2">1,240</p>
                </div>
                <Users className="h-12 w-12 text-blue-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground mt-2">TZS 45M</p>
                </div>
                <CreditCard className="h-12 w-12 text-green-500/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Transactions</p>
                  <p className="text-3xl font-bold text-foreground mt-2">3.2K</p>
                </div>
                <TrendingUp className="h-12 w-12 text-orange-500/20" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-foreground mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-900">Database</p>
                    <p className="text-sm text-green-700">All systems operational</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-900">API Server</p>
                    <p className="text-sm text-green-700">Running smoothly</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-yellow-900">Cache Server</p>
                    <p className="text-sm text-yellow-700">83% capacity</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  Create Pharmacy
                </Button>
                <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white">
                  <Brain className="h-4 w-4 mr-2" />
                  View Intelligence
                </Button>
                <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </div>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="p-6 border-yellow-200 bg-yellow-50">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-900">System Alert</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  3 pharmacies require license renewal within the next 30 days
                </p>
                <Button variant="outline" size="sm" className="mt-3 border-yellow-300 text-yellow-900 hover:bg-yellow-100">
                  View Details
                </Button>
              </div>
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
