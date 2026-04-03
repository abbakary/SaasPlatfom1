'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, Trash2, AlertCircle } from 'lucide-react';

interface Subscription {
  id: string;
  pharmacy: string;
  plan: 'basic' | 'standard' | 'professional';
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  amount: number;
  users: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB001',
    pharmacy: 'Super One Pharmacy',
    plan: 'professional',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    amount: 9999,
    users: 15,
    paymentStatus: 'paid',
  },
  {
    id: 'SUB002',
    pharmacy: 'Florisse Pharmacy',
    plan: 'standard',
    status: 'active',
    startDate: '2024-02-20',
    endDate: '2025-02-19',
    amount: 5999,
    users: 10,
    paymentStatus: 'paid',
  },
  {
    id: 'SUB003',
    pharmacy: 'Maff Medical',
    plan: 'professional',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2025-01-09',
    amount: 9999,
    users: 20,
    paymentStatus: 'overdue',
  },
  {
    id: 'SUB004',
    pharmacy: 'Health Plus Pharmacy',
    plan: 'basic',
    status: 'expired',
    startDate: '2023-11-05',
    endDate: '2024-11-04',
    amount: 2999,
    users: 5,
    paymentStatus: 'paid',
  },
  {
    id: 'SUB005',
    pharmacy: 'Care Pharmacy',
    plan: 'standard',
    status: 'pending',
    startDate: '2024-12-20',
    endDate: '2025-12-19',
    amount: 5999,
    users: 8,
    paymentStatus: 'pending',
  },
];

const planPrices = {
  basic: { name: 'Basic', price: 2999, users: 5 },
  standard: { name: 'Standard', price: 5999, users: 10 },
  professional: { name: 'Professional', price: 9999, users: 'Unlimited' },
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Subscription['status']>('all');

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length;
  const totalRevenue = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
          <p className="mt-2 text-muted-foreground">Monitor and manage pharmacy subscriptions</p>
        </div>
      </div>

      {/* Pricing Plans Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(planPrices).map(([key, plan]) => (
          <Card key={key} className="p-6">
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold text-primary">
              TZS {typeof plan.price === 'number' ? plan.price.toLocaleString() : plan.price}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {typeof plan.users === 'number' ? `Up to ${plan.users} users` : plan.users}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center">✓ Cloud storage</p>
              <p className="flex items-center">✓ Analytics</p>
              <p className="flex items-center">✓ API access</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by pharmacy name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'pending', 'expired', 'cancelled'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pharmacy</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.pharmacy}</TableCell>
                  <TableCell className="capitalize">{subscription.plan}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(subscription.status)} capitalize`}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.endDate}</TableCell>
                  <TableCell>TZS {subscription.amount.toLocaleString()}</TableCell>
                  <TableCell>{subscription.users}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {subscription.paymentStatus === 'overdue' && (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge className={`${getPaymentColor(subscription.paymentStatus)} capitalize`}>
                        {subscription.paymentStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <Edit className="h-4 w-4" />
                          <span>Edit Plan</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Renew Subscription</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          <span>Cancel</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                  No subscriptions found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Subscriptions</p>
            <p className="text-2xl font-bold">{subscriptions.length}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
            <p className="text-2xl font-bold text-emerald-600">{activeSubscriptions}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold">TZS {(totalRevenue / 100000).toFixed(1)}K</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
