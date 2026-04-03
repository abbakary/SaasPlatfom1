'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Lock, Globe, Users, Database, Mail, Check, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [savedMessage, setSavedMessage] = useState('');
  const [formValues, setFormValues] = useState({
    companyName: 'MediCare SaaS Platform',
    contactEmail: 'support@medicare.com',
    contactPhone: '+255 123 456 789',
    website: 'https://medicare.com',
    timezone: 'Africa/Dar_es_Salaam',
    currency: 'TZS',
    emailFrom: 'noreply@medicare.com',
    emailHost: 'smtp.medicare.com',
    emailPort: '587',
    twoFactorEnabled: true,
    passwordMinLength: '8',
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    autoBackup: true,
    backupFrequency: 'daily',
    maxStorageGB: '500',
    maintenanceMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = (section: string) => {
    setSavedMessage(`${section} settings saved successfully!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">Configure system settings and preferences</p>
      </div>

      {/* Save Notification */}
      {savedMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          <Check className="h-5 w-5" />
          {savedMessage}
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Globe className="h-5 w-5" />
              General Settings
            </h2>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <Input
                    name="companyName"
                    value={formValues.companyName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Contact Email</label>
                  <Input
                    type="email"
                    name="contactEmail"
                    value={formValues.contactEmail}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Contact Phone</label>
                  <Input
                    name="contactPhone"
                    value={formValues.contactPhone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <Input
                    type="url"
                    name="website"
                    value={formValues.website}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Timezone</label>
                  <select
                    name="timezone"
                    value={formValues.timezone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="Africa/Dar_es_Salaam">Africa/Dar es Salaam</option>
                    <option value="Africa/Nairobi">Africa/Nairobi</option>
                    <option value="Africa/Johannesburg">Africa/Johannesburg</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Currency</label>
                  <select
                    name="currency"
                    value={formValues.currency}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="TZS">TZS - Tanzanian Shilling</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                    <option value="USD">USD - US Dollar</option>
                  </select>
                </div>
              </div>

              <Button onClick={() => handleSave('General')} className="w-full md:w-auto">
                Save General Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Lock className="h-5 w-5" />
              Security Settings
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="twoFactorEnabled"
                      checked={formValues.twoFactorEnabled}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Minimum Password Length</label>
                  <Input
                    type="number"
                    name="passwordMinLength"
                    value={formValues.passwordMinLength}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    name="sessionTimeout"
                    value={formValues.sessionTimeout}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Max Login Attempts</label>
                <Input
                  type="number"
                  name="maxLoginAttempts"
                  value={formValues.maxLoginAttempts}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <Button onClick={() => handleSave('Security')} className="w-full md:w-auto">
                Save Security Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Mail className="h-5 w-5" />
              Email Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">From Email Address</label>
                <Input
                  type="email"
                  name="emailFrom"
                  value={formValues.emailFrom}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">SMTP Host</label>
                  <Input
                    name="emailHost"
                    value={formValues.emailHost}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">SMTP Port</label>
                  <Input
                    name="emailPort"
                    value={formValues.emailPort}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button variant="outline" className="w-full md:w-auto">
                Test Email Connection
              </Button>

              <Button onClick={() => handleSave('Email')} className="w-full md:w-auto">
                Save Email Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Storage Settings */}
        <TabsContent value="storage" className="space-y-4">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Database className="h-5 w-5" />
              Storage & Backup
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Automatic Backup</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup system data
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="autoBackup"
                      checked={formValues.autoBackup}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Backup Frequency</label>
                  <select
                    name="backupFrequency"
                    value={formValues.backupFrequency}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Max Storage (GB)</label>
                  <Input
                    type="number"
                    name="maxStorageGB"
                    value={formValues.maxStorageGB}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Current Usage: 245.8 GB / 500 GB</p>
                    <p className="mt-1">Last backup: 2024-12-20 14:32:15</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('Storage')} className="w-full md:w-auto">
                Save Storage Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="h-5 w-5" />
              System Settings
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Maintenance Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Take the system offline for maintenance
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={formValues.maintenanceMode}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-red-500 peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                <h3 className="font-medium text-foreground">System Information</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Version: 1.0.0</p>
                  <p>Build: 2024.12.20</p>
                  <p>Environment: Production</p>
                  <p>Database: PostgreSQL 15.2</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  View Logs
                </Button>
                <Button variant="outline" className="flex-1">
                  System Health
                </Button>
                <Button variant="destructive" className="flex-1">
                  Restart System
                </Button>
              </div>

              <Button onClick={() => handleSave('System')} className="w-full">
                Save System Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
