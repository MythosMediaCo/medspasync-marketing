import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Toast } from './Toast';
import { 
  Download, Upload, Trash2, Play, RefreshCw, 
  HardDrive, Clock, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Backup {
  name: string;
  created_at: string;
  size?: number;
  status: 'completed' | 'failed' | 'in_progress';
}

interface BackupManagementProps {
  className?: string;
}

export const BackupManagement: React.FC<BackupManagementProps> = ({ className }) => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [confirmAction, setConfirmAction] = useState<'restore' | 'delete' | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch backups
  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/backups', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch backups');
      }

      const backupNames = await response.json();
      const backupList: Backup[] = backupNames.map((name: string) => ({
        name,
        created_at: extractDateFromBackupName(name),
        status: 'completed' // Assume completed for existing backups
      }));

      setBackups(backupList);
    } catch (error) {
      toast.error('Failed to fetch backups');
      console.error('Error fetching backups:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract date from backup name (backup_YYYYMMDD_HHMMSS)
  const extractDateFromBackupName = (name: string): string => {
    const match = name.match(/backup_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
    if (match) {
      const [, year, month, day, hour, minute, second] = match;
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    return name;
  };

  // Trigger backup
  const triggerBackup = async () => {
    try {
      setTriggering(true);
      const response = await fetch('/api/backups/trigger', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to trigger backup');
      }

      toast.success('Backup triggered successfully');
      fetchBackups();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to trigger backup');
    } finally {
      setTriggering(false);
    }
  };

  // Download backup
  const downloadBackup = async (backupName: string) => {
    try {
      setActionLoading(backupName);
      const response = await fetch(`/api/backups/${backupName}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download backup');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${backupName}_db.sql`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Backup downloaded successfully');
    } catch (error) {
      toast.error('Failed to download backup');
    } finally {
      setActionLoading(null);
    }
  };

  // Restore backup
  const restoreBackup = async (backupName: string) => {
    try {
      setActionLoading(backupName);
      const response = await fetch(`/api/backups/${backupName}/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to restore backup');
      }

      toast.success('Backup restored successfully');
      fetchBackups();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to restore backup');
    } finally {
      setActionLoading(null);
      setShowConfirmDialog(false);
      setConfirmAction(null);
      setSelectedBackup(null);
    }
  };

  // Delete backup
  const deleteBackup = async (backupName: string) => {
    try {
      setActionLoading(backupName);
      const response = await fetch(`/api/backups/${backupName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete backup');
      }

      toast.success('Backup deleted successfully');
      fetchBackups();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete backup');
    } finally {
      setActionLoading(null);
      setShowConfirmDialog(false);
      setConfirmAction(null);
      setSelectedBackup(null);
    }
  };

  // Cleanup old backups
  const cleanupOldBackups = async () => {
    try {
      const response = await fetch('/api/backups/cleanup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to cleanup old backups');
      }

      const result = await response.json();
      toast.success(result.message);
      fetchBackups();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cleanup old backups');
    }
  };

  // Handle confirm action
  const handleConfirmAction = () => {
    if (!selectedBackup || !confirmAction) return;

    if (confirmAction === 'restore') {
      restoreBackup(selectedBackup.name);
    } else if (confirmAction === 'delete') {
      deleteBackup(selectedBackup.name);
    }
  };

  // Handle action click
  const handleActionClick = (backup: Backup, action: 'restore' | 'delete') => {
    setSelectedBackup(backup);
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  // Effects
  useEffect(() => {
    fetchBackups();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Completed' },
      failed: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Failed' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', icon: RefreshCw, label: 'In Progress' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backup Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage database and file backups</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={cleanupOldBackups}
            variant="outline"
            size="sm"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Cleanup Old
          </Button>
          <Button
            onClick={triggerBackup}
            disabled={triggering}
          >
            {triggering ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {triggering ? 'Creating Backup...' : 'Create Backup'}
          </Button>
        </div>
      </div>

      {/* Backup Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backups.length}</div>
            <p className="text-xs text-muted-foreground">
              Available backups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Backup</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {backups.length > 0 ? 
                new Date(backups[backups.length - 1].created_at).toLocaleDateString() : 
                'None'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Most recent backup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {backups.length > 0 ? 
                `${(backups.length * 50).toFixed(0)}MB` : 
                '0MB'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated storage usage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Backups Table */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <div className="text-center py-8">
              <HardDrive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No backups found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first backup to get started
              </p>
              <Button onClick={triggerBackup} disabled={triggering}>
                {triggering ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {triggering ? 'Creating...' : 'Create First Backup'}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.name}>
                      <TableCell>
                        <div className="font-medium">{backup.name}</div>
                        <div className="text-sm text-gray-500">
                          Database backup
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(backup.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(backup.created_at).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(backup.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          ~50MB
                        </div>
                        <div className="text-xs text-gray-500">
                          Estimated size
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
                                  onClick={() => downloadBackup(backup.name)}
                                  disabled={actionLoading === backup.name}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Download Backup</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleActionClick(backup, 'restore')}
                                  disabled={actionLoading === backup.name}
                                >
                                  <Upload className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Restore Backup</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleActionClick(backup, 'delete')}
                                  disabled={actionLoading === backup.name}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Backup</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction === 'restore' ? 'Restore Backup' : 'Delete Backup'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {confirmAction === 'restore' ? (
                  <>
                    Are you sure you want to restore from backup <strong>{selectedBackup?.name}</strong>? 
                    This will overwrite the current database and files.
                  </>
                ) : (
                  <>
                    Are you sure you want to delete backup <strong>{selectedBackup?.name}</strong>? 
                    This action cannot be undone.
                  </>
                )}
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmDialog(false);
                  setConfirmAction(null);
                  setSelectedBackup(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={confirmAction === 'restore' ? 'default' : 'destructive'}
                onClick={handleConfirmAction}
                disabled={actionLoading === selectedBackup?.name}
              >
                {actionLoading === selectedBackup?.name ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  confirmAction === 'restore' ? <Upload className="w-4 h-4 mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />
                )}
                {confirmAction === 'restore' ? 'Restore' : 'Delete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 