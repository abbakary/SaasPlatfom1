"use client";

import Link from "next/link";
import {
  Pill,
  Shield,
  Store,
  Users,
  ShoppingCart,
  Smartphone,
  ChevronRight,
  MapPin,
  BarChart3,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const dashboards = [
    {
      title: "Super Admin Dashboard",
      description: "Manage all pharmacies, users, and platform analytics",
      href: "/super-admin",
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-600 to-blue-800",
      features: ["Multi-tenant management", "GIS Heatmap", "Revenue analytics"],
    },
    {
      title: "Pharmacy Owner Dashboard",
      description: "Manage your pharmacy inventory, sales, and staff",
      href: "/pharmacy-owner",
      icon: <Store className="h-8 w-8" />,
      color: "from-emerald-500 to-emerald-700",
      features: ["Sales tracking", "Inventory management", "Staff management"],
    },
    {
      title: "Staff POS System",
      description: "Point of sale interface for pharmacy staff",
      href: "/staff/pos",
      icon: <ShoppingCart className="h-8 w-8" />,
      color: "from-amber-500 to-amber-700",
      features: ["Quick product search", "Cart management", "M-Pesa payments"],
    },
    {
      title: "Customer Mobile App",
      description: "Mobile-first shopping experience for customers",
      href: "/customer",
      icon: <Smartphone className="h-8 w-8" />,
      color: "from-purple-500 to-purple-700",
      features: ["Product browsing", "Location-based", "Easy checkout"],
    },
  ];

  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Multi-Location Support",
      description: "Manage multiple pharmacy branches from a single platform",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Track sales, inventory, and customer insights in real-time",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Inventory Management",
      description: "Automatic stock alerts and expiry date tracking",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Online Ordering",
      description: "Customers can order anytime from their mobile devices",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3a5f]">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">MediCare</span>
              <span className="text-xl font-normal text-emerald-500"> Online</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/super-admin">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
            <Link href="/customer">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-balance">
            Complete Pharmacy Management System
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 text-balance">
            Multi-tenant SaaS platform for managing pharmacies across Tanzania.
            From inventory management to customer orders, all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/super-admin">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                <Shield className="mr-2 h-5 w-5" />
                Super Admin
              </Button>
            </Link>
            <Link href="/pharmacy-owner">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Store className="mr-2 h-5 w-5" />
                Pharmacy Owner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
            Role-Based Dashboards
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Access the right tools for your role in the pharmacy ecosystem
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {dashboards.map((dashboard) => (
              <Link key={dashboard.href} href={dashboard.href}>
                <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-[#1e3a5f] hover:shadow-lg">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white ${dashboard.color}`}
                    >
                      {dashboard.icon}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {dashboard.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {dashboard.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            Platform Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            Quick Access
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/super-admin">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
              >
                <Shield className="h-5 w-5" />
                Super Admin Dashboard
              </Button>
            </Link>
            <Link href="/pharmacy-owner">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
              >
                <Store className="h-5 w-5" />
                Pharmacy Owner Dashboard
              </Button>
            </Link>
            <Link href="/staff">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white"
              >
                <Users className="h-5 w-5" />
                Staff Dashboard
              </Button>
            </Link>
            <Link href="/staff/pos">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                POS System
              </Button>
            </Link>
            <Link href="/customer">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
              >
                <Smartphone className="h-5 w-5" />
                Customer App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[#1e3a5f] py-8 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Pill className="h-5 w-5" />
              </div>
              <span className="font-bold">MediCare Online</span>
            </div>
            <p className="text-sm text-white/70">
              Complete Pharmacy Management System for Tanzania
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>Multi-tenant SaaS Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
