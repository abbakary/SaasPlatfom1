'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface GrowthData {
  month: string;
  pharmacies: number;
  users: number;
  revenue: number;
}

interface StatusData {
  name: string;
  value: number;
}

const growthData: GrowthData[] = [
  { month: 'Jan', pharmacies: 5, users: 25, revenue: 49999 },
  { month: 'Feb', pharmacies: 8, users: 38, revenue: 79998 },
  { month: 'Mar', pharmacies: 12, users: 52, revenue: 119997 },
  { month: 'Apr', pharmacies: 15, users: 68, revenue: 159996 },
  { month: 'May', pharmacies: 18, users: 85, revenue: 199995 },
  { month: 'Jun', pharmacies: 20, users: 102, revenue: 239994 },
  { month: 'Jul', pharmacies: 23, users: 120, revenue: 279993 },
  { month: 'Aug', pharmacies: 25, users: 138, revenue: 319992 },
  { month: 'Sep', pharmacies: 27, users: 156, revenue: 359991 },
  { month: 'Oct', pharmacies: 28, users: 168, revenue: 399990 },
  { month: 'Nov', pharmacies: 29, users: 180, revenue: 439989 },
  { month: 'Dec', pharmacies: 30, users: 195, revenue: 479988 },
];

const subscriptionStatusData: StatusData[] = [
  { name: 'Active', value: 25 },
  { name: 'Pending', value: 3 },
  { name: 'Expired', value: 2 },
];

const userRoleData: StatusData[] = [
  { name: 'Super Admin', value: 1 },
  { name: 'Pharmacy Owner', value: 30 },
  { name: 'Staff', value: 85 },
  { name: 'Customer', value: 450 },
];

const topFeatures = [
  { name: 'POS System', usage: 98 },
  { name: 'Inventory Management', usage: 95 },
  { name: 'Sales Reports', usage: 87 },
  { name: 'Customer Management', usage: 82 },
  { name: 'Analytics', usage: 72 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

export default function AnalyticsPage() {
  const totalPharmacies = 30;
  const totalUsers = 195;
  const totalRevenue = 479988;
  const systemUptime = 99.8;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-2 text-muted-foreground">System-wide analytics and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Pharmacies</p>
            <p className="text-3xl font-bold">{totalPharmacies}</p>
            <p className="text-xs text-emerald-600">+5 this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">{totalUsers}</p>
            <p className="text-xs text-emerald-600">+15 this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold">TZS {(totalRevenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-emerald-600">+40K this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
            <p className="text-3xl font-bold">{systemUptime}%</p>
            <Badge className="mt-2 bg-emerald-100 text-emerald-800">Healthy</Badge>
          </div>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Growth Trend (2024)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pharmacies"
              stroke="#10b981"
              strokeWidth={2}
              name="Pharmacies"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Users"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Revenue (TZS)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Subscription Status */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Subscription Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {subscriptionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* User Role Distribution */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">User Distribution by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userRoleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Feature Usage */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Top Features Usage</h2>
        <div className="space-y-4">
          {topFeatures.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{feature.name}</span>
                <span className="text-sm font-semibold text-muted-foreground">{feature.usage}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${feature.usage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-bold">145ms</p>
            <p className="text-xs text-emerald-600">Excellent</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
            <p className="text-2xl font-bold">284</p>
            <p className="text-xs text-blue-600">Currently online</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Database Size</p>
            <p className="text-2xl font-bold">2.4 GB</p>
            <p className="text-xs text-muted-foreground">Growing steadily</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
