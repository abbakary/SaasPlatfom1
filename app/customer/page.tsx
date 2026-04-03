"use client";

import { useState, useEffect } from "react";
import { products, pharmacies, formatTZS } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { LocationPicker } from "@/components/customer/location-picker";
import {
  Search,
  MapPin,
  ShoppingCart,
  Home,
  Heart,
  User,
  X,
  Plus,
  Minus,
  ChevronRight,
  Pill,
  Sparkles,
  Leaf,
  Package,
  Phone,
  Camera,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  History,
  CreditCard,
  MapPinned,
  Shield,
  Trash2,
  SlidersHorizontal,
  QrCode,
  Flashlight,
  Image,
  FileText,
  CheckCircle2,
  Eye,
  EyeOff,
  Clock,
  Edit3,
  UserPlus,
  LogIn,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CartItem {
  product: Product;
  quantity: number;
}

interface WishlistItem {
  product: Product;
  addedAt: Date;
}

type CategoryType = "all" | "medicines" | "cosmetics" | "supplements";
type ViewType = "home" | "search" | "scan" | "wishlist" | "account";
type AuthViewType = "login" | "register" | "profile" | "edit-profile" | "addresses";
type ScanMode = "barcode" | "prescription" | "qrcode";

// Mock order history
const mockOrders = [
  { id: "ORD001", date: "2024-01-15", status: "delivered", total: 45000, items: 3 },
  { id: "ORD002", date: "2024-01-10", status: "delivered", total: 32000, items: 2 },
  { id: "ORD003", date: "2024-01-05", status: "cancelled", total: 18000, items: 1 },
];

export default function CustomerPWA() {
  const { user, isLoading: authLoading, login, loginWithPin, register, logout, updateLocation } = useAuth();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [authView, setAuthView] = useState<AuthViewType>("login");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [selectedPharmacy] = useState(pharmacies[0]);
  const [scanMode, setScanMode] = useState<ScanMode>("barcode");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<"all" | "price-low" | "price-high" | "popular">("all");
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Show auth page first if not authenticated
  useEffect(() => {
    if (!authLoading && !user && activeView !== "account") {
      setActiveView("account");
      setAuthView("login");
    }
  }, [authLoading, user, activeView]);

  // Auth form states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [usePin, setUsePin] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Registration form states
  const [regFullName, setRegFullName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPhone, setRegPhone] = useState("+255 ");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regSetPin, setRegSetPin] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLocation, setRegLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [regError, setRegError] = useState("");
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [showRegLocationPicker, setShowRegLocationPicker] = useState(false);

  const categories = [
    { id: "all" as const, label: "All", icon: <Package className="h-5 w-5" /> },
    { id: "medicines" as const, label: "Medicines", icon: <Pill className="h-5 w-5" /> },
    { id: "cosmetics" as const, label: "Cosmetics", icon: <Sparkles className="h-5 w-5" /> },
    { id: "supplements" as const, label: "Supplements", icon: <Leaf className="h-5 w-5" /> },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (searchFilter === "price-low") return a.price - b.price;
      if (searchFilter === "price-high") return b.price - a.price;
      return 0;
    });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date() }];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (scanMode === "barcode") {
        setScanResult("Product Found: Panadol Tablets 500mg");
      } else if (scanMode === "prescription") {
        setScanResult("Prescription uploaded successfully");
      } else {
        setScanResult("QR Code scanned - Pharmacy verified");
      }
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    let result;
    if (usePin) {
      result = await loginWithPin(loginUsername, loginPin);
    } else {
      result = await login(loginUsername, loginPassword);
    }

    if (!result.success) {
      setLoginError(result.error || "Login failed");
    } else {
      setAuthView("profile");
    }
    setIsLoginLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    // Validation
    if (!regFullName.trim()) {
      setRegError("Please enter your full name");
      return;
    }
    if (!regUsername.trim()) {
      setRegError("Please enter a username");
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setRegError("Please enter a valid phone number");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match");
      return;
    }
    if (regSetPin && (!regPin || regPin.length < 4)) {
      setRegError("PIN must be at least 4 digits");
      return;
    }
    if (!regLocation) {
      setRegError("Please select your delivery location");
      return;
    }

    setIsRegLoading(true);

    const result = await register({
      fullName: regFullName,
      username: regUsername,
      phone: regPhone,
      password: regPassword,
      pin: regSetPin ? regPin : undefined,
      location: regLocation,
    });

    if (!result.success) {
      setRegError(result.error || "Registration failed");
    } else {
      // Clear form
      setRegFullName("");
      setRegUsername("");
      setRegPhone("+255 ");
      setRegPassword("");
      setRegConfirmPassword("");
      setRegPin("");
      setRegSetPin(false);
      setRegLocation(null);
      setAuthView("profile");
    }
    setIsRegLoading(false);
  };

  const handleLogout = () => {
    logout();
    setAuthView("login");
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Login View Component
  function LoginView() {
    return (
      <div className="pb-24 px-4 py-6">
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-white mx-auto mb-4">
            <Pill className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {loginError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="johnmwalimu"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {!usePin ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">PIN Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter your 4-digit PIN"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value.slice(0, 4))}
                  maxLength={4}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-6"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <LogIn className="h-4 w-4 mr-2" />
            )}
            Sign In
          </Button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            className="w-full text-sm text-emerald-600 font-medium hover:underline text-center"
            onClick={() => setUsePin(!usePin)}
          >
            {usePin ? "Use Password instead" : "Use PIN code instead"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {"Don't have an account? "}
            <button
              className="text-emerald-600 font-medium hover:underline"
              onClick={() => setAuthView("register")}
            >
              Register
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 rounded-xl bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground font-medium mb-2">Demo Credentials:</p>
          <p className="text-xs text-muted-foreground">Username: johnmwalimu</p>
          <p className="text-xs text-muted-foreground">Password: password123</p>
          <p className="text-xs text-muted-foreground">Or PIN: 1234</p>
        </div>
      </div>
    );
  }

  // Register View Component
  function RegisterView() {
    return (
      <div className="pb-24 px-4 py-6">
        {/* Back Button */}
        <button
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
          onClick={() => setAuthView("login")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to Login</span>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-1">Join MediCare Online today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {regError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {regError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="John Mwalimu"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="johnmwalimu"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="+255 712 345 678"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Delivery Location *</label>
            <button
              type="button"
              onClick={() => setShowRegLocationPicker(true)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                regLocation
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-border bg-background hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                regLocation ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
              )}>
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                {regLocation ? (
                  <>
                    <p className="font-medium text-foreground text-sm">Location Selected</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {regLocation.address}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-foreground text-sm">Pick Your Location</p>
                    <p className="text-xs text-muted-foreground">
                      Tap to select on map
                    </p>
                  </>
                )}
              </div>
              {regLocation && (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showRegPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowRegPassword(!showRegPassword)}
              >
                {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showRegPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="setup-pin"
                checked={regSetPin}
                onChange={(e) => setRegSetPin(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="setup-pin" className="text-sm font-medium text-foreground cursor-pointer">
                Also set up a PIN code (optional)
              </label>
            </div>
          </div>

          {regSetPin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">PIN Code (4 digits)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  value={regPin}
                  onChange={(e) => setRegPin(e.target.value.slice(0, 4))}
                  maxLength={4}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-6"
            disabled={isRegLoading}
          >
            {isRegLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            Create Account
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Location Picker Modal */}
        {showRegLocationPicker && (
          <LocationPicker
            onLocationSelect={(location) => {
              setRegLocation(location);
              setShowRegLocationPicker(false);
            }}
            onClose={() => setShowRegLocationPicker(false)}
            initialLocation={regLocation ? { lat: regLocation.lat, lng: regLocation.lng } : undefined}
            showContinueButton={true}
          />
        )}
      </div>
    );
  }

  // Profile View Component (Logged In)
  function ProfileView() {
    if (!user) return <LoginView />;

    return (
      <div className="pb-24">
        {/* Profile Header */}
        <div className="bg-[#1e3a5f] px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white text-2xl font-bold">
              {user.fullName.charAt(0)}
            </div>
            <div className="text-white flex-1">
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-sm text-white/70">{user.email}</p>
              <p className="text-xs text-white/50">{user.phone}</p>
            </div>
            <button
              onClick={() => setAuthView("edit-profile")}
              className="text-white/70 hover:text-white"
            >
              <Edit3 className="h-5 w-5" />
            </button>
          </div>

          {/* Location Banner */}
          <button
            onClick={() => setShowLocationPicker(true)}
            className="mt-4 w-full flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2"
          >
            <MapPin className="h-4 w-4 text-red-400" />
            <div className="flex-1 text-left">
              <p className="text-xs text-white/50">Delivery Location</p>
              <p className="text-sm text-white font-medium truncate">
                {user.location?.address || "No location set"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-white/50" />
          </button>
          
          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{mockOrders.length}</p>
              <p className="text-xs text-white/70">Orders</p>
            </div>
            <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{wishlist.length}</p>
              <p className="text-xs text-white/70">Wishlist</p>
            </div>
            <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">1</p>
              <p className="text-xs text-white/70">Addresses</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="px-4 py-4">
          {/* Orders Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Orders
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <MenuItem
                icon={<History className="h-5 w-5" />}
                label="Order History"
                badge={mockOrders.length.toString()}
              />
              <MenuItem
                icon={<Clock className="h-5 w-5" />}
                label="Track Orders"
              />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Recent Orders
            </h3>
            <div className="space-y-2">
              {mockOrders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-border bg-card p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.date} - {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">
                        {formatTZS(order.total)}
                      </p>
                      <Badge
                        variant={order.status === "delivered" ? "default" : "destructive"}
                        className={cn(
                          "text-xs",
                          order.status === "delivered" && "bg-emerald-500"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Account
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <MenuItem
                icon={<User className="h-5 w-5" />}
                label="Edit Profile"
                onClick={() => setAuthView("edit-profile")}
              />
              <MenuItem
                icon={<MapPinned className="h-5 w-5" />}
                label="Saved Addresses"
                badge="1"
                onClick={() => setShowLocationPicker(true)}
              />
              <MenuItem
                icon={<CreditCard className="h-5 w-5" />}
                label="Payment Methods"
              />
              <MenuItem
                icon={<Bell className="h-5 w-5" />}
                label="Notifications"
              />
            </div>
          </div>

          {/* Support */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Support
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <MenuItem
                icon={<HelpCircle className="h-5 w-5" />}
                label="Help Center"
              />
              <MenuItem
                icon={<Phone className="h-5 w-5" />}
                label="Contact Us"
              />
              <MenuItem
                icon={<Shield className="h-5 w-5" />}
                label="Privacy Policy"
              />
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-500 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Member since {user.createdAt}
          </p>
        </div>

        {/* Location Picker Modal */}
        {showLocationPicker && (
          <LocationPicker
            onLocationSelect={(location) => {
              updateLocation(location);
              setShowLocationPicker(false);
            }}
            onClose={() => setShowLocationPicker(false)}
            initialLocation={user.location ? { lat: user.location.lat, lng: user.location.lng } : undefined}
          />
        )}
      </div>
    );
  }

  // Render different views based on activeView
  const renderContent = () => {
    switch (activeView) {
      case "search":
        return <SearchView />;
      case "scan":
        return <ScanView />;
      case "wishlist":
        return <WishlistView />;
      case "account":
        return <AccountView />;
      default:
        return <HomeView />;
    }
  };

  // Home View Component
  function HomeView() {
    return (
      <>
        {/* Location Banner */}
        <div className="bg-white border-b border-border px-4 py-2">
          <button
            onClick={() => {
              if (user) {
                setShowLocationPicker(true);
              } else {
                setActiveView("account");
                setAuthView("login");
              }
            }}
            className="flex items-center gap-2 text-sm w-full"
          >
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-foreground font-medium flex-1 text-left truncate">
              {user?.location?.address || "Dar es Salaam - Set delivery location"}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Map Preview */}
        <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-blue-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/50" />
              <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-xs shadow">
            <span className="font-medium text-foreground">
              {selectedPharmacy.name}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs font-medium transition-colors min-w-[70px]",
                  activeCategory === category.id
                    ? "bg-[#1e3a5f] text-white"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="px-4 py-3 pb-24">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Popular Products
          </h2>
          <div className="space-y-3">
            {filteredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                  <Package className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-foreground truncate pr-2">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="shrink-0"
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatTZS(product.price)}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => addToCart(product)}
                  className="bg-emerald-500 hover:bg-emerald-600 shrink-0"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>

          {/* More Products Grid */}
          <h2 className="mt-6 mb-3 text-sm font-semibold text-foreground">
            More Products
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.slice(6, 12).map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-border bg-card p-3"
              >
                <div className="relative mb-2">
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                    <Package className="h-10 w-10 text-[#1e3a5f]" />
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-1 right-1"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isInWishlist(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-600">
                    {formatTZS(product.price)}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Picker for Home */}
        {showLocationPicker && user && (
          <LocationPicker
            onLocationSelect={(location) => {
              updateLocation(location);
              setShowLocationPicker(false);
            }}
            onClose={() => setShowLocationPicker(false)}
            initialLocation={user.location ? { lat: user.location.lat, lng: user.location.lng } : undefined}
          />
        )}
      </>
    );
  }

  // Search View Component
  function SearchView() {
    return (
      <div className="pb-24">
        {/* Search Header */}
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines, cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                autoFocus
              />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Filter Tabs */}
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {[
              { id: "all", label: "All" },
              { id: "price-low", label: "Price: Low" },
              { id: "price-high", label: "Price: High" },
              { id: "popular", label: "Popular" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSearchFilter(filter.id as typeof searchFilter)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap",
                  searchFilter === filter.id
                    ? "bg-[#1e3a5f] text-white"
                    : "bg-muted text-foreground"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                activeCategory === category.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-border text-foreground"
              )}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="px-4">
          <p className="text-sm text-muted-foreground mb-3">
            {filteredProducts.length} products found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                  <Package className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {product.category}
                      </p>
                    </div>
                    <button onClick={() => toggleWishlist(product)}>
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-bold text-emerald-600">
                      {formatTZS(product.price)}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Scan View Component
  function ScanView() {
    return (
      <div className="pb-24 bg-black min-h-[calc(100vh-120px)]">
        {/* Scan Header */}
        <div className="bg-[#1e3a5f] px-4 py-3">
          <h2 className="text-lg font-semibold text-white text-center">
            Scan Products
          </h2>
          <p className="text-xs text-white/70 text-center mt-1">
            Scan barcodes, QR codes, or prescriptions
          </p>
        </div>

        {/* Scan Mode Tabs */}
        <div className="bg-[#1e3a5f] px-4 pb-4">
          <div className="flex gap-2">
            {[
              { id: "barcode" as const, label: "Barcode", icon: <QrCode className="h-4 w-4" /> },
              { id: "prescription" as const, label: "Prescription", icon: <FileText className="h-4 w-4" /> },
              { id: "qrcode" as const, label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setScanMode(mode.id);
                  setScanResult(null);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  scanMode === mode.id
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 text-white/80"
                )}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Camera View Placeholder */}
        <div className="relative flex-1 flex items-center justify-center py-12">
          <div className="relative">
            {/* Scan Frame */}
            <div className="w-64 h-64 relative">
              {/* Corner Markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-lg" />
              
              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute left-0 right-0 h-1 bg-emerald-500 animate-pulse" style={{ top: "50%" }} />
                </div>
              )}

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {scanMode === "barcode" && (
                  <QrCode className="h-16 w-16 text-white/30" />
                )}
                {scanMode === "prescription" && (
                  <FileText className="h-16 w-16 text-white/30" />
                )}
                {scanMode === "qrcode" && (
                  <QrCode className="h-16 w-16 text-white/30" />
                )}
              </div>
            </div>

            {/* Instructions */}
            <p className="text-white/70 text-sm text-center mt-6">
              {scanMode === "barcode" && "Point camera at product barcode"}
              {scanMode === "prescription" && "Take a photo of your prescription"}
              {scanMode === "qrcode" && "Scan pharmacy or product QR code"}
            </p>
          </div>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className="mx-4 mb-4 rounded-xl bg-emerald-500/20 border border-emerald-500 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-white font-medium">{scanResult}</p>
            </div>
            {scanMode === "barcode" && (
              <Button
                className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => {
                  addToCart(products[0]);
                  setScanResult(null);
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-4 space-y-3">
          <Button
            className={cn(
              "w-full py-6 text-lg",
              isScanning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            )}
            onClick={() => {
              if (isScanning) {
                setIsScanning(false);
              } else {
                simulateScan();
              }
            }}
          >
            {isScanning ? "Cancel Scan" : "Start Scanning"}
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Flashlight className="h-4 w-4 mr-2" />
              Flash
            </Button>
            <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Image className="h-4 w-4 mr-2" />
              Gallery
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist View Component
  function WishlistView() {
    return (
      <div className="pb-24">
        {/* Wishlist Header */}
        <div className="bg-white border-b border-border px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground">My Wishlist</h2>
          <p className="text-sm text-muted-foreground">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Save items you love by tapping the heart icon
            </p>
            <Button
              onClick={() => setActiveView("home")}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="px-4 py-3 space-y-3">
            {wishlist.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                  <Package className="h-10 w-10 text-[#1e3a5f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize mb-1">
                    {item.product.category}
                  </p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatTZS(item.product.price)}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.product)}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleWishlist(item.product)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Account View Component - Routes to Login/Register/Profile
  function AccountView() {
    if (authLoading) {
      return (
        <div className="pb-24 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      );
    }

    if (user) {
      return <ProfileView />;
    }

    return authView === "register" ? <RegisterView /> : <LoginView />;
  }

  // Menu Item Component
  function MenuItem({
    icon,
    label,
    badge,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="flex-1 text-foreground">{label}</span>
        {badge && (
          <Badge variant="secondary" className="text-xs">
            {badge}
          </Badge>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="mx-auto max-w-md bg-background min-h-screen relative">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-[#1e3a5f] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <Pill className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold">MediCare Online</h1>
              <p className="text-xs text-white/70">
                {user ? `Hi, ${user.fullName.split(" ")[0]}` : "Your health, our priority"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  setActiveView("account");
                  setAuthView("profile");
                }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold">
                  {user.fullName.charAt(0)}
                </div>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  setActiveView("account");
                  setAuthView("login");
                }}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 relative"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar - Only on Home */}
        {activeView === "home" && (
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setActiveView("search")}
              className="bg-white pl-9 text-foreground"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      {renderContent()}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-auto rounded-t-2xl bg-white">
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-4 py-3">
              <h2 className="text-lg font-semibold text-foreground">
                Your Cart ({cartCount})
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCart(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <ShoppingCart className="mx-auto mb-2 h-12 w-12" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100">
                        <Package className="h-7 w-7 text-[#1e3a5f]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-emerald-600">
                          {formatTZS(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatTZS(cartTotal)}
                  </span>
                </div>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 py-6 text-lg"
                  onClick={() => {
                    if (!user) {
                      setShowCart(false);
                      setActiveView("account");
                      setAuthView("login");
                    }
                  }}
                >
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && !showCart && activeView !== "scan" && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-20 left-4 right-4 mx-auto max-w-md flex items-center justify-between rounded-xl bg-[#1e3a5f] px-4 py-3 text-white shadow-lg z-30"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">View Cart ({cartCount})</span>
          </div>
          <span className="font-bold">{formatTZS(cartTotal)}</span>
        </button>
      )}

      {/* Bottom Navigation - Only visible when logged in */}
      {!authLoading && user && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white">
          <div className="mx-auto max-w-md flex items-center justify-around py-2">
            <NavItem
              icon={<Home className="h-5 w-5" />}
              label="Home"
              active={activeView === "home"}
              onClick={() => setActiveView("home")}
            />
            <NavItem
              icon={<Search className="h-5 w-5" />}
              label="Search"
              active={activeView === "search"}
              onClick={() => setActiveView("search")}
            />
            <NavItem
              icon={<Camera className="h-5 w-5" />}
              label="Scan"
              active={activeView === "scan"}
              onClick={() => setActiveView("scan")}
              highlight
            />
            <NavItem
              icon={<Heart className="h-5 w-5" />}
              label="Wishlist"
              active={activeView === "wishlist"}
              onClick={() => setActiveView("wishlist")}
              badge={wishlist.length > 0 ? wishlist.length : undefined}
            />
            <NavItem
              icon={<User className="h-5 w-5" />}
              label="Account"
              active={activeView === "account"}
              onClick={() => {
                setActiveView("account");
                if (user) {
                  setAuthView("profile");
                }
              }}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
  highlight,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 px-3 py-1 relative",
        highlight && active
          ? "text-white"
          : active
          ? "text-[#1e3a5f]"
          : "text-muted-foreground"
      )}
    >
      {highlight ? (
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full -mt-4 shadow-lg transition-colors",
            active ? "bg-[#1e3a5f]" : "bg-emerald-500 text-white"
          )}
        >
          {icon}
        </div>
      ) : (
        <div className="relative">
          {icon}
          {badge && badge > 0 && (
            <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}
        </div>
      )}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
