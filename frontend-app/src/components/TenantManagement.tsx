import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Select } from './Select';
import { Tabs } from './Tabs';
import FormInput from './FormInput';
import { Toast } from './Toast';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Play, Pause, X, TrendingUp, Users, Calendar,
  HardDrive, CreditCard, Settings, Activity
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Tenant form schemas
const tenantCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  domain: z.string().optional(),
  contact_email: z.string().email('Invalid email format'),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  country: z.string().default('US'),
  business_name: z.string().min(1, 'Business name is required'),
  business_type: z.string().optional(),
  tax_id: z.string().optional(),
  license_number: z.string().optional(),
  timezone: z.string().default('UTC'),
  currency: z.string().default('USD'),
  language: z.string().default('en'),
  date_format: z.string().default('MM/DD/YYYY'),
  time_format: z.string().default('12h'),
  subscription_plan: z.enum(['basic', 'professional', 'enterprise', 'custom']).default('basic'),
  billing_email: z.string().email('Invalid email format').optional(),
  billing_address: z.string().optional(),
  start_trial: z.boolean().default(false),
  trial_days: z.number().min(1).max(90).default(14),
  subscription_days: z.number().min(1).optional()
});

const tenantUpdateSchema = tenantCreateSchema.partial();

type TenantCreateForm = z.infer<typeof tenantCreateSchema>;
type TenantUpdateForm = z.infer<typeof tenantUpdateSchema>;

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain?: string;
  status: string;
  subscription_plan: string;
  contact_email: string;
  business_name: string;
  created_at: string;
  updated_at: string;
  usage_summary: {
    storage_usage_gb: number;
    storage_limit_gb: number;
    storage_usage_percentage: number;
    subscription_status: string;
    trial_days_remaining: number;
    subscription_days_remaining: number;
  };
}

interface TenantManagementProps {
  className?: string;
}

export const TenantManagement: React.FC<TenantManagementProps> = ({ className }) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [planFilter, setPlanFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const createForm = useForm<TenantCreateForm>({
    resolver: zodResolver(tenantCreateSchema),
    defaultValues: {
      country: 'US',
      timezone: 'UTC',
      currency: 'USD',
      language: 'en',
      date_format: 'MM/DD/YYYY',
      time_format: '12h',
      subscription_plan: 'basic',
      start_trial: false,
      trial_days: 14
    }
  });

  const updateForm = useForm<TenantUpdateForm>({
    resolver: zodResolver(tenantUpdateSchema)
  });

  // Fetch tenants
  const fetchTenants = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        skip: ((currentPage - 1) * 100).toString(),
        limit: '100',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(planFilter && { plan: planFilter })
      });

      const response = await fetch(`/api/tenants?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tenants');
      }

      const data = await response.json();
      setTenants(data.tenants);
      setTotalPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to fetch tenants');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, planFilter]);

  // Create tenant
  const createTenant = async (data: TenantCreateForm) => {
    try {
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create tenant');
      }

      toast.success('Tenant created successfully');
      setShowCreateDialog(false);
      createForm.reset();
      fetchTenants();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create tenant');
    }
  };

  // Update tenant
  const updateTenant = async (data: TenantUpdateForm) => {
    if (!selectedTenant) return;

    try {
      const response = await fetch(`/api/tenants/${selectedTenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update tenant');
      }

      toast.success('Tenant updated successfully');
      setShowEditDialog(false);
      setSelectedTenant(null);
      updateForm.reset();
      fetchTenants();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update tenant');
    }
  };

  // Tenant actions
  const performTenantAction = async (tenantId: number, action: string, reason?: string) => {
    try {
      setActionLoading(tenantId);
      const url = `/api/tenants/${tenantId}/${action}`;
      const params = reason ? `?reason=${encodeURIComponent(reason)}` : '';
      
      const response = await fetch(`${url}${params}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to ${action} tenant`);
      }

      toast.success(`Tenant ${action}d successfully`);
      fetchTenants();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Failed to ${action} tenant`);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete tenant
  const deleteTenant = async (tenantId: number) => {
    if (!confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(tenantId);
      const response = await fetch(`/api/tenants/${tenantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete tenant');
      }

      toast.success('Tenant deleted successfully');
      fetchTenants();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete tenant');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle edit
  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    updateForm.reset({
      name: tenant.name,
      slug: tenant.slug,
      domain: tenant.domain,
      contact_email: tenant.contact_email,
      business_name: tenant.business_name,
      subscription_plan: tenant.subscription_plan as any
    });
    setShowEditDialog(true);
  };

  // Handle view details
  const handleViewDetails = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowDetailsDialog(true);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      suspended: { color: 'bg-yellow-100 text-yellow-800', label: 'Suspended' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      trial: { color: 'bg-blue-100 text-blue-800', label: 'Trial' },
      pending: { color: 'bg-gray-100 text-gray-800', label: 'Pending' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Get plan badge color
  const getPlanBadge = (plan: string) => {
    const planConfig = {
      basic: { color: 'bg-gray-100 text-gray-800', label: 'Basic' },
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professional' },
      enterprise: { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' },
      custom: { color: 'bg-orange-100 text-orange-800', label: 'Custom' }
    };

    const config = planConfig[plan as keyof typeof planConfig] || planConfig.basic;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Effects
  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, planFilter]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tenant Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all tenants and their subscriptions</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Tenant
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <Input
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Plan
              </label>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All plans</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setPlanFilter('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tenants ({tenants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-gray-500">{tenant.slug}</div>
                        {tenant.domain && (
                          <div className="text-xs text-gray-400">{tenant.domain}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{tenant.business_name}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(tenant.status)}
                    </TableCell>
                    <TableCell>
                      {getPlanBadge(tenant.subscription_plan)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{tenant.contact_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {tenant.usage_summary.storage_usage_gb.toFixed(1)}GB / {tenant.usage_summary.storage_limit_gb}GB
                        </div>
                        <div className="text-xs text-gray-500">
                          {tenant.usage_summary.storage_usage_percentage.toFixed(1)}% used
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(tenant.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(tenant)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(tenant)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Tenant</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {tenant.status === 'suspended' && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => performTenantAction(tenant.id, 'activate')}
                                  disabled={actionLoading === tenant.id}
                                >
                                  <Play className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Activate</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}

                        {tenant.status === 'active' && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => performTenantAction(tenant.id, 'suspend')}
                                  disabled={actionLoading === tenant.id}
                                >
                                  <Pause className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Suspend</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTenant(tenant.id)}
                                disabled={actionLoading === tenant.id}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Tenant Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
          </DialogHeader>
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(createTenant)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={createForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createForm.control}
                  name="subscription_plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit">Create Tenant</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
          </DialogHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(updateTenant)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="subscription_plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit">Update Tenant</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Tenant Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            {getStatusBadge(selectedTenant.status)}
                          </div>
                          <div className="flex justify-between">
                            <span>Plan:</span>
                            {getPlanBadge(selectedTenant.subscription_plan)}
                          </div>
                          <div className="flex justify-between">
                            <span>Created:</span>
                            <span>{new Date(selectedTenant.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Updated:</span>
                            <span>{new Date(selectedTenant.updated_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Contact
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Email:</span>
                            <span>{selectedTenant.contact_email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Business:</span>
                            <span>{selectedTenant.business_name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Slug:</span>
                            <span>{selectedTenant.slug}</span>
                          </div>
                          {selectedTenant.domain && (
                            <div className="flex justify-between">
                              <span>Domain:</span>
                              <span>{selectedTenant.domain}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5" />
                        Storage Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Storage Used:</span>
                          <span className="font-medium">
                            {selectedTenant.usage_summary.storage_usage_gb.toFixed(1)}GB / {selectedTenant.usage_summary.storage_limit_gb}GB
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(100, selectedTenant.usage_summary.storage_usage_percentage)}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedTenant.usage_summary.storage_usage_percentage.toFixed(1)}% used
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Subscription
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="font-medium">{selectedTenant.usage_summary.subscription_status}</span>
                        </div>
                        {selectedTenant.usage_summary.trial_days_remaining > 0 && (
                          <div className="flex justify-between">
                            <span>Trial Days Remaining:</span>
                            <span className="font-medium">{selectedTenant.usage_summary.trial_days_remaining}</span>
                          </div>
                        )}
                        {selectedTenant.usage_summary.subscription_days_remaining > 0 && (
                          <div className="flex justify-between">
                            <span>Subscription Days Remaining:</span>
                            <span className="font-medium">{selectedTenant.usage_summary.subscription_days_remaining}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTenant.status === 'suspended' && (
                          <Button
                            onClick={() => performTenantAction(selectedTenant.id, 'activate')}
                            disabled={actionLoading === selectedTenant.id}
                            className="w-full"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Activate Tenant
                          </Button>
                        )}

                        {selectedTenant.status === 'active' && (
                          <Button
                            variant="outline"
                            onClick={() => performTenantAction(selectedTenant.id, 'suspend')}
                            disabled={actionLoading === selectedTenant.id}
                            className="w-full"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Suspend Tenant
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          onClick={() => performTenantAction(selectedTenant.id, 'cancel')}
                          disabled={actionLoading === selectedTenant.id}
                          className="w-full"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel Tenant
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() => deleteTenant(selectedTenant.id)}
                          disabled={actionLoading === selectedTenant.id}
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Tenant
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}; 