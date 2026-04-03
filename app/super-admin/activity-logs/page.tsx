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
import { Search, Filter, Download } from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'download';
  resource: string;
  resourceType: string;
  status: 'success' | 'failed';
  details: string;
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    timestamp: '2024-12-20 14:32:45',
    user: 'admin@medicare.com',
    action: 'create',
    resource: 'Super One Pharmacy',
    resourceType: 'Pharmacy',
    status: 'success',
    details: 'New pharmacy tenant created with subscription plan: Professional',
  },
  {
    id: 'LOG002',
    timestamp: '2024-12-20 14:28:12',
    user: 'john@superone.com',
    action: 'update',
    resource: 'Inventory',
    resourceType: 'Product',
    status: 'success',
    details: 'Updated 15 product stock levels',
  },
  {
    id: 'LOG003',
    timestamp: '2024-12-20 14:15:30',
    user: 'admin@medicare.com',
    action: 'login',
    resource: 'System',
    resourceType: 'Auth',
    status: 'success',
    details: 'Super admin logged in from 192.168.1.100',
  },
  {
    id: 'LOG004',
    timestamp: '2024-12-20 13:45:22',
    user: 'sarah@florisse.com',
    action: 'delete',
    resource: 'Expired Product Batch',
    resourceType: 'Inventory',
    status: 'success',
    details: 'Deleted 1 expired product batch with 50 units',
  },
  {
    id: 'LOG005',
    timestamp: '2024-12-20 13:20:15',
    user: 'james@maff.com',
    action: 'download',
    resource: 'Monthly Sales Report',
    resourceType: 'Report',
    status: 'success',
    details: 'Downloaded sales report for November 2024',
  },
  {
    id: 'LOG006',
    timestamp: '2024-12-20 12:55:40',
    user: 'peter@superone.com',
    action: 'login',
    resource: 'System',
    resourceType: 'Auth',
    status: 'failed',
    details: 'Failed login attempt - invalid credentials',
  },
  {
    id: 'LOG007',
    timestamp: '2024-12-20 12:30:20',
    user: 'admin@medicare.com',
    action: 'update',
    resource: 'Grace Mwangi',
    resourceType: 'User',
    status: 'success',
    details: 'Locked user account due to multiple failed login attempts',
  },
  {
    id: 'LOG008',
    timestamp: '2024-12-20 11:45:10',
    user: 'sarah@florisse.com',
    action: 'create',
    resource: 'Customer Order #ORD-2024-1234',
    resourceType: 'Order',
    status: 'success',
    details: 'New customer order created with 5 items',
  },
];

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | ActivityLog['action']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesType = typeFilter === 'all' || log.resourceType === typeFilter;
    return matchesSearch && matchesAction && matchesStatus && matchesType;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-emerald-100 text-emerald-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'login':
        return 'bg-purple-100 text-purple-800';
      case 'logout':
        return 'bg-gray-100 text-gray-800';
      case 'download':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-100 text-emerald-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const uniqueTypes = Array.from(new Set(logs.map((log) => log.resourceType)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="mt-2 text-muted-foreground">View all system activity and audit trail</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by user, resource, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              {(['all', 'create', 'update', 'delete', 'login', 'logout', 'download'] as const).map(
                (action) => (
                  <Button
                    key={action}
                    variant={actionFilter === action ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActionFilter(action)}
                    className="capitalize"
                  >
                    {action}
                  </Button>
                )
              )}
            </div>
            <div className="flex gap-2">
              {(['all', 'success', 'failed'] as const).map((status) => (
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

          {uniqueTypes.length > 1 && (
            <div className="flex gap-2">
              {(['all', ...uniqueTypes] as const).map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Activity Logs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource Type</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge className={`${getActionColor(log.action)} capitalize`}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {log.resourceType}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{log.resource}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(log.status)} capitalize`}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  No activity logs found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
            <p className="text-2xl font-bold">{logs.length}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Successful</p>
            <p className="text-2xl font-bold text-emerald-600">
              {logs.filter((l) => l.status === 'success').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold text-red-600">
              {logs.filter((l) => l.status === 'failed').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Unique Users</p>
            <p className="text-2xl font-bold">
              {new Set(logs.map((l) => l.user)).size}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
