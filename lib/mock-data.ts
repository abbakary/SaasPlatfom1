// MediCare Online - Mock Data for Pharmacy Management System

export interface Pharmacy {
  id: string;
  name: string;
  subdomain: string;
  location: string;
  status: "active" | "pending" | "suspended";
  owner: string;
  phone: string;
  email: string;
  totalRevenue: number;
  monthlyRevenue: number;
  activeUsers: number;
  coordinates: [number, number];
}

export interface Product {
  id: string;
  name: string;
  category: "medicines" | "cosmetics" | "supplements";
  price: number;
  stock: number;
  expiryDate: string;
  image: string;
  description: string;
  requiresPrescription: boolean;
}

export interface Sale {
  id: string;
  pharmacyId: string;
  date: string;
  total: number;
  items: number;
  paymentMethod: "cash" | "mpesa" | "tigopesa" | "ligopesa";
  status: "completed" | "pending" | "refunded";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "pharmacy_owner" | "staff" | "customer";
  pharmacyId?: string;
  phone: string;
  avatar?: string;
  status: "active" | "inactive";
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export interface Order {
  id: string;
  customerId: string;
  pharmacyId: string;
  items: { productId: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "ready" | "delivered" | "cancelled";
  createdAt: string;
  deliveryAddress?: string;
}

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  type: "low_stock" | "expiring_soon" | "out_of_stock";
  message: string;
  severity: "warning" | "critical";
}

// Currency formatting for Tanzanian Shillings
export const formatTZS = (amount: number): string => {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Short format for large numbers
export const formatShortTZS = (amount: number): string => {
  if (amount >= 1000000) {
    return `TZS ${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `TZS ${(amount / 1000).toFixed(0)}K`;
  }
  return `TZS ${amount}`;
};

// Mock Pharmacies
export const pharmacies: Pharmacy[] = [
  {
    id: "ph-001",
    name: "MediCare Pharmacy",
    subdomain: "medicare",
    location: "Dar es Salaam",
    status: "active",
    owner: "Dr. John Mwamba",
    phone: "+255 712 345 678",
    email: "medicare@example.com",
    totalRevenue: 85430000,
    monthlyRevenue: 22500000,
    activeUsers: 144,
    coordinates: [-6.7924, 39.2083],
  },
  {
    id: "ph-002",
    name: "HealthPlus Pharmacy",
    subdomain: "healthplus",
    location: "Arusha",
    status: "active",
    owner: "Sarah Kimaro",
    phone: "+255 756 789 012",
    email: "healthplus@example.com",
    totalRevenue: 45200000,
    monthlyRevenue: 12800000,
    activeUsers: 89,
    coordinates: [-3.3869, 36.6830],
  },
  {
    id: "ph-003",
    name: "CarePharm",
    subdomain: "carepharm",
    location: "Mwanza",
    status: "active",
    owner: "Peter Masanja",
    phone: "+255 789 456 123",
    email: "carepharm@example.com",
    totalRevenue: 38500000,
    monthlyRevenue: 9500000,
    activeUsers: 67,
    coordinates: [-2.5164, 32.9175],
  },
  {
    id: "ph-004",
    name: "BeautyCare Pharmacy",
    subdomain: "beautycare",
    location: "Dodoma",
    status: "pending",
    owner: "Anna Joseph",
    phone: "+255 765 321 987",
    email: "beautycare@example.com",
    totalRevenue: 12000000,
    monthlyRevenue: 3200000,
    activeUsers: 34,
    coordinates: [-6.1630, 35.7516],
  },
  {
    id: "ph-005",
    name: "Dar Health Pharmacy",
    subdomain: "darhealth",
    location: "Dar es Salaam",
    status: "active",
    owner: "James Mtui",
    phone: "+255 713 456 789",
    email: "darhealth@example.com",
    totalRevenue: 62000000,
    monthlyRevenue: 18200000,
    activeUsers: 112,
    coordinates: [-6.8235, 39.2695],
  },
  {
    id: "ph-006",
    name: "Kilimanjaro Meds",
    subdomain: "kilimeds",
    location: "Moshi",
    status: "active",
    owner: "Grace Lyimo",
    phone: "+255 754 123 456",
    email: "kilimeds@example.com",
    totalRevenue: 28000000,
    monthlyRevenue: 7500000,
    activeUsers: 45,
    coordinates: [-3.3500, 37.3400],
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "prod-001",
    name: "Panadol Tablets",
    category: "medicines",
    price: 5000,
    stock: 150,
    expiryDate: "2027-06-15",
    image: "/products/panadol.jpg",
    description: "Pain relief tablets 500mg",
    requiresPrescription: false,
  },
  {
    id: "prod-002",
    name: "Nivea Face Cream",
    category: "cosmetics",
    price: 12000,
    stock: 45,
    expiryDate: "2026-12-20",
    image: "/products/nivea.jpg",
    description: "Moisturizing face cream 50ml",
    requiresPrescription: false,
  },
  {
    id: "prod-003",
    name: "Vitamin C Capsules",
    category: "supplements",
    price: 8000,
    stock: 8,
    expiryDate: "2026-08-10",
    image: "/products/vitaminc.jpg",
    description: "Vitamin C 1000mg - 30 capsules",
    requiresPrescription: false,
  },
  {
    id: "prod-004",
    name: "Cough Syrup",
    category: "medicines",
    price: 7500,
    stock: 62,
    expiryDate: "2026-09-30",
    image: "/products/cough-syrup.jpg",
    description: "Cough relief syrup 100ml",
    requiresPrescription: false,
  },
  {
    id: "prod-005",
    name: "Vaseline Lotion",
    category: "cosmetics",
    price: 15000,
    stock: 38,
    expiryDate: "2027-03-15",
    image: "/products/vaseline.jpg",
    description: "Body lotion 400ml",
    requiresPrescription: false,
  },
  {
    id: "prod-006",
    name: "Amoxicillin 500mg",
    category: "medicines",
    price: 12000,
    stock: 25,
    expiryDate: "2026-05-20",
    image: "/products/amoxicillin.jpg",
    description: "Antibiotic capsules - 21 pack",
    requiresPrescription: true,
  },
  {
    id: "prod-007",
    name: "Lipstick Red",
    category: "cosmetics",
    price: 8500,
    stock: 52,
    expiryDate: "2027-08-10",
    image: "/products/lipstick.jpg",
    description: "Matte red lipstick",
    requiresPrescription: false,
  },
  {
    id: "prod-008",
    name: "Omega-3 Fish Oil",
    category: "supplements",
    price: 25000,
    stock: 18,
    expiryDate: "2026-11-25",
    image: "/products/omega3.jpg",
    description: "Fish oil capsules - 60 count",
    requiresPrescription: false,
  },
  {
    id: "prod-009",
    name: "Aspirin Tablets",
    category: "medicines",
    price: 3500,
    stock: 120,
    expiryDate: "2027-02-28",
    image: "/products/aspirin.jpg",
    description: "Pain relief 325mg - 100 tablets",
    requiresPrescription: false,
  },
  {
    id: "prod-010",
    name: "Aloe Vera Gel",
    category: "cosmetics",
    price: 9500,
    stock: 65,
    expiryDate: "2026-10-15",
    image: "/products/aloevera.jpg",
    description: "Natural aloe vera gel 250ml",
    requiresPrescription: false,
  },
  {
    id: "prod-011",
    name: "Multivitamin Daily",
    category: "supplements",
    price: 18000,
    stock: 42,
    expiryDate: "2027-01-30",
    image: "/products/multivitamin.jpg",
    description: "Daily multivitamin - 90 tablets",
    requiresPrescription: false,
  },
  {
    id: "prod-012",
    name: "Doloca Syrup",
    category: "medicines",
    price: 6500,
    stock: 55,
    expiryDate: "2026-07-20",
    image: "/products/doloca.jpg",
    description: "Pain relief syrup 100ml",
    requiresPrescription: false,
  },
  {
    id: "prod-013",
    name: "Herbal Soap",
    category: "cosmetics",
    price: 4500,
    stock: 85,
    expiryDate: "2027-05-10",
    image: "/products/herbalsoap.jpg",
    description: "Natural herbal soap 100g",
    requiresPrescription: false,
  },
  {
    id: "prod-014",
    name: "Calcium Tablets",
    category: "supplements",
    price: 14000,
    stock: 30,
    expiryDate: "2026-12-05",
    image: "/products/calcium.jpg",
    description: "Calcium 500mg - 60 tablets",
    requiresPrescription: false,
  },
  {
    id: "prod-015",
    name: "Cetrizine Tablets",
    category: "medicines",
    price: 4000,
    stock: 90,
    expiryDate: "2027-04-18",
    image: "/products/cetrizine.jpg",
    description: "Allergy relief 10mg - 30 tablets",
    requiresPrescription: false,
  },
  {
    id: "prod-016",
    name: "Sunscreen SPF 50",
    category: "cosmetics",
    price: 22000,
    stock: 28,
    expiryDate: "2026-09-12",
    image: "/products/sunscreen.jpg",
    description: "UV protection lotion 100ml",
    requiresPrescription: false,
  },
  {
    id: "prod-017",
    name: "Paracetamol Tablets",
    category: "medicines",
    price: 3000,
    stock: 200,
    expiryDate: "2027-07-22",
    image: "/products/paracetamol.jpg",
    description: "Fever relief 500mg - 100 tablets",
    requiresPrescription: false,
  },
  {
    id: "prod-018",
    name: "Piritadol Tablets",
    category: "medicines",
    price: 4500,
    stock: 75,
    expiryDate: "2027-03-08",
    image: "/products/piritadol.jpg",
    description: "Cold and flu relief - 24 tablets",
    requiresPrescription: false,
  },
];

// Mock Sales Data
export const salesData: Sale[] = [
  { id: "sale-001", pharmacyId: "ph-001", date: "2026-04-03", total: 125000, items: 5, paymentMethod: "mpesa", status: "completed" },
  { id: "sale-002", pharmacyId: "ph-001", date: "2026-04-03", total: 85000, items: 3, paymentMethod: "cash", status: "completed" },
  { id: "sale-003", pharmacyId: "ph-001", date: "2026-04-02", total: 210000, items: 8, paymentMethod: "tigopesa", status: "completed" },
  { id: "sale-004", pharmacyId: "ph-002", date: "2026-04-03", total: 95000, items: 4, paymentMethod: "mpesa", status: "completed" },
  { id: "sale-005", pharmacyId: "ph-002", date: "2026-04-02", total: 150000, items: 6, paymentMethod: "cash", status: "completed" },
];

// Monthly revenue data for charts
export const monthlyRevenueData = [
  { month: "Jan", revenue: 18500000, sales: 342 },
  { month: "Feb", revenue: 21200000, sales: 398 },
  { month: "Mar", revenue: 19800000, sales: 367 },
  { month: "Apr", revenue: 23500000, sales: 421 },
  { month: "May", revenue: 25100000, sales: 445 },
  { month: "Jun", revenue: 22500000, sales: 412 },
];

// Daily sales data
export const dailySalesData = [
  { day: "Mon", sales: 850000 },
  { day: "Tue", sales: 920000 },
  { day: "Wed", sales: 780000 },
  { day: "Thu", sales: 1050000 },
  { day: "Fri", sales: 1200000 },
  { day: "Sat", sales: 1450000 },
  { day: "Sun", sales: 680000 },
];

// Mock Users
export const users: User[] = [
  { id: "user-001", name: "Admin User", email: "admin@medicare.co.tz", role: "super_admin", phone: "+255 700 000 001", status: "active" },
  { id: "user-002", name: "Dr. John Mwamba", email: "john@medicare.co.tz", role: "pharmacy_owner", pharmacyId: "ph-001", phone: "+255 712 345 678", status: "active" },
  { id: "user-003", name: "Sarah Kimaro", email: "sarah@healthplus.co.tz", role: "pharmacy_owner", pharmacyId: "ph-002", phone: "+255 756 789 012", status: "active" },
  { id: "user-004", name: "James Mtui", email: "james@medicare.co.tz", role: "staff", pharmacyId: "ph-001", phone: "+255 713 456 789", status: "active" },
  { id: "user-005", name: "Grace Lyimo", email: "grace@medicare.co.tz", role: "staff", pharmacyId: "ph-001", phone: "+255 754 123 456", status: "active" },
];

// Mock Customers
export const customers: Customer[] = [
  { id: "cust-001", name: "Mohamed Ali", phone: "+255 765 111 222", email: "mohamed@email.com", totalOrders: 15, totalSpent: 450000, lastOrder: "2026-04-02" },
  { id: "cust-002", name: "Fatima Hassan", phone: "+255 712 333 444", email: "fatima@email.com", totalOrders: 8, totalSpent: 280000, lastOrder: "2026-04-01" },
  { id: "cust-003", name: "Joseph Mwanga", phone: "+255 756 555 666", totalOrders: 22, totalSpent: 720000, lastOrder: "2026-04-03" },
  { id: "cust-004", name: "Anna Kimaro", phone: "+255 789 777 888", email: "anna@email.com", totalOrders: 5, totalSpent: 150000, lastOrder: "2026-03-28" },
];

// Stock Alerts
export const stockAlerts: StockAlert[] = [
  { id: "alert-001", productId: "prod-003", productName: "Vitamin C Capsules", type: "low_stock", message: "Only 8 units remaining", severity: "warning" },
  { id: "alert-002", productId: "prod-006", productName: "Amoxicillin 500mg", type: "expiring_soon", message: "Expires in 45 days", severity: "critical" },
  { id: "alert-003", productId: "prod-008", productName: "Omega-3 Fish Oil", type: "low_stock", message: "Only 18 units remaining", severity: "warning" },
];

// Top selling products
export const topSellingProducts = [
  { name: "Panadol Tablets", sales: 245, revenue: 1225000 },
  { name: "Nivea Face Cream", sales: 189, revenue: 2268000 },
  { name: "Cough Syrup", sales: 156, revenue: 1170000 },
  { name: "Vitamin C Capsules", sales: 134, revenue: 1072000 },
  { name: "Paracetamol Tablets", sales: 298, revenue: 894000 },
];

// AI Insights
export const aiInsights = [
  { type: "demand", title: "Regional Demand Analysis", description: "High demand for cold medicines in Arusha region" },
  { type: "trending", title: "Trending Products", description: "Vitamin supplements up 25% this month" },
  { type: "restock", title: "Restock Suggestions", description: "Consider restocking Panadol - projected stockout in 5 days" },
  { type: "revenue", title: "Revenue Trends", description: "Weekend sales 40% higher than weekdays" },
];

// Category stats
export const categoryStats = [
  { category: "Medicines", products: 156, revenue: 45000000, percentage: 55 },
  { category: "Cosmetics", products: 89, revenue: 22000000, percentage: 27 },
  { category: "Supplements", products: 45, revenue: 15000000, percentage: 18 },
];

// Platform overview stats
export const platformStats = {
  totalPharmacies: 24,
  activePharmacies: 22,
  pendingPharmacies: 2,
  totalUsers: 520,
  activeUsers: 144,
  totalRevenue: 85430000,
  monthlyRevenue: 22500000,
  totalCustomers: 12350,
  totalProducts: 890,
  lowStockProducts: 8,
  expiringProducts: 5,
};
