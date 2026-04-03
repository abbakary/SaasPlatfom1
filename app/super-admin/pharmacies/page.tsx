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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  location: string;
  owner: string;
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  subscription: string;
  users: number;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: 'PH001',
    name: 'Super One Pharmacy',
    location: 'Dar es Salaam, Tanzania',
    owner: 'John Mwangi',
    status: 'active',
    createdDate: '2024-01-15',
    subscription: 'Professional',
    users: 8,
  },
  {
    id: 'PH002',
    name: 'Florisse Pharmacy',
    location: 'Arusha, Tanzania',
    owner: 'Sarah Kipchoge',
    status: 'active',
    createdDate: '2024-02-20',
    subscription: 'Standard',
    users: 5,
  },
  {
    id: 'PH003',
    name: 'Maff Medical',
    location: 'Nairobi, Kenya',
    owner: 'James Okonkwo',
    status: 'active',
    createdDate: '2024-01-10',
    subscription: 'Professional',
    users: 12,
  },
  {
    id: 'PH004',
    name: 'Health Plus Pharmacy',
    location: 'Dar es Salaam, Tanzania',
    owner: 'Maria Garcia',
    status: 'inactive',
    createdDate: '2023-11-05',
    subscription: 'Basic',
    users: 2,
  },
  {
    id: 'PH005',
    name: 'Care Pharmacy',
    location: 'Mombasa, Kenya',
    owner: 'Ahmed Hassan',
    status: 'suspended',
    createdDate: '2023-09-12',
    subscription: 'Standard',
    users: 4,
  },
];

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddPharmacy = () => {
    setSelectedPharmacy(null);
    setIsDialogOpen(true);
  };

  const handleEditPharmacy = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsDialogOpen(true);
  };

  const handleDeletePharmacy = (id: string) => {
    setPharmacies(pharmacies.filter((p) => p.id !== id));
  };

  const handleSuspendPharmacy = (id: string) => {
    setPharmacies(
      pharmacies.map((p) =>
        p.id === id ? { ...p, status: p.status === 'suspended' ? 'active' : 'suspended' } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacies</h1>
          <p className="mt-2 text-muted-foreground">Manage all pharmacy tenants in the system</p>
        </div>
        <Button onClick={handleAddPharmacy} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Pharmacy
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by pharmacy name, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'inactive', 'suspended'] as const).map((status) => (
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

      {/* Pharmacies Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pharmacy Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>{pharmacy.location}</TableCell>
                  <TableCell>{pharmacy.owner}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(pharmacy.status)} capitalize`}>
                      {pharmacy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{pharmacy.subscription}</TableCell>
                  <TableCell>{pharmacy.users}</TableCell>
                  <TableCell>{pharmacy.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => handleEditPharmacy(pharmacy)}
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onClick={() => handleSuspendPharmacy(pharmacy.id)}
                        >
                          <span>{pharmacy.status === 'suspended' ? 'Reactivate' : 'Suspend'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-red-600"
                          onClick={() => handleDeletePharmacy(pharmacy.id)}
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
                  No pharmacies found matching your filters.
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
            <p className="text-sm font-medium text-muted-foreground">Total Pharmacies</p>
            <p className="text-2xl font-bold">{pharmacies.length}</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-emerald-600">
              {pharmacies.filter((p) => p.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold text-gray-600">
              {pharmacies.filter((p) => p.status === 'inactive').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Suspended</p>
            <p className="text-2xl font-bold text-red-600">
              {pharmacies.filter((p) => p.status === 'suspended').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Add/Edit Pharmacy Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy'}</DialogTitle>
            <DialogDescription>
              {selectedPharmacy
                ? 'Update the pharmacy information below'
                : 'Fill in the details to create a new pharmacy tenant'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Pharmacy Name</label>
              <Input
                placeholder="e.g., Super One Pharmacy"
                defaultValue={selectedPharmacy?.name || ''}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Owner Name</label>
              <Input placeholder="Owner name" defaultValue={selectedPharmacy?.owner || ''} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location</label>
              <Input
                placeholder="City, Country"
                defaultValue={selectedPharmacy?.location || ''}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Subscription Plan</label>
              <select className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} className="flex-1">
                {selectedPharmacy ? 'Update Pharmacy' : 'Create Pharmacy'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
