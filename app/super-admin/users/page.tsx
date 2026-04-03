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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Lock, Unlock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'pharmacy_owner' | 'staff' | 'customer';
  pharmacy?: string;
  status: 'active' | 'inactive' | 'locked';
  joinedDate: string;
  lastLogin?: string;
}

const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Admin User',
    email: 'admin@medicare.com',
    role: 'super_admin',
    status: 'active',
    joinedDate: '2024-01-01',
    lastLogin: '2024-12-20',
  },
  {
    id: 'U002',
    name: 'John Mwangi',
    email: 'john@superone.com',
    role: 'pharmacy_owner',
    pharmacy: 'Super One Pharmacy',
    status: 'active',
    joinedDate: '2024-01-15',
    lastLogin: '2024-12-20',
  },
  {
    id: 'U003',
    name: 'Sarah Kipchoge',
    email: 'sarah@florisse.com',
    role: 'pharmacy_owner',
    pharmacy: 'Florisse Pharmacy',
    status: 'active',
    joinedDate: '2024-02-20',
    lastLogin: '2024-12-19',
  },
  {
    id: 'U004',
    name: 'James Okonkwo',
    email: 'james@maff.com',
    role: 'pharmacy_owner',
    pharmacy: 'Maff Medical',
    status: 'active',
    joinedDate: '2024-01-10',
    lastLogin: '2024-12-20',
  },
  {
    id: 'U005',
    name: 'Peter Mutua',
    email: 'peter@superone.com',
    role: 'staff',
    pharmacy: 'Super One Pharmacy',
    status: 'active',
    joinedDate: '2024-03-01',
    lastLogin: '2024-12-20',
  },
  {
    id: 'U006',
    name: 'Grace Mwangi',
    email: 'grace@florisse.com',
    role: 'staff',
    pharmacy: 'Florisse Pharmacy',
    status: 'locked',
    joinedDate: '2024-03-15',
    lastLogin: '2024-12-10',
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.pharmacy?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'pharmacy_owner':
        return 'bg-blue-100 text-blue-800';
      case 'staff':
        return 'bg-emerald-100 text-emerald-800';
      case 'customer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'locked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleToggleLock = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'locked' ? 'active' : 'locked' }
          : u
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-2 text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Button onClick={handleAddUser} className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or pharmacy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(['all', 'super_admin', 'pharmacy_owner', 'staff', 'customer'] as const).map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="capitalize"
              >
                {role.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Pharmacy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleColor(user.role)} capitalize`}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.pharmacy || '—'}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} capitalize`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell>{user.lastLogin || '—'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => handleToggleLock(user.id)}
                        >
                          {user.status === 'locked' ? (
                            <>
                              <Unlock className="h-4 w-4" />
                              <span>Unlock Account</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4" />
                              <span>Lock Account</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  No users found matching your filters.
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
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-emerald-600">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Pharmacy Owners</p>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === 'pharmacy_owner').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Locked Accounts</p>
            <p className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.status === 'locked').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? 'Update user information' : 'Create a new system user'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input placeholder="User name" defaultValue={selectedUser?.name || ''} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="user@example.com"
                defaultValue={selectedUser?.email || ''}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Role</label>
              <select className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="super_admin">Super Admin</option>
                <option value="pharmacy_owner">Pharmacy Owner</option>
                <option value="staff">Staff</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Pharmacy (if applicable)</label>
              <Input placeholder="Select pharmacy" defaultValue={selectedUser?.pharmacy || ''} className="mt-1" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} className="flex-1">
                {selectedUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
