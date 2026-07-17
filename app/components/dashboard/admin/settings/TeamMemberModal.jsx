// app/components/dashboard/admin/settings/TeamMemberModal.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Checkbox } from '@/app/components/ui/checkbox';
import { AlertCircle } from 'lucide-react';

const defaultForm = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  allowedAdminSections: [],
  isActive: true,
};

export default function TeamMemberModal({
  isOpen,
  mode = 'add',
  onClose,
  onSubmit,
  initialData,
  isSaving,
  roleOptions = [],
  sectionOptions = [],
}) {
  const [form, setForm] = useState(defaultForm);
  const [submitError, setSubmitError] = useState(null);

  const getDefaultSectionsForRole = (role) => {
    const normalized = role?.toLowerCase();
    if (normalized === 'admin') return ['*'];
    if (normalized === 'social media manager') {
      return sectionOptions
        .filter((option) => ['/admin/publishers', '/admin/reporting'].includes(option.value))
        .map((option) => option.value);
    }
    if (normalized === 'data entry') {
      return sectionOptions
        .filter((option) => ['/admin/merchants', '/admin/networks', '/admin/reporting'].includes(option.value))
        .map((option) => option.value);
    }
    return [];
  };

  const sanitizeAllowedSections = (role, sections) => {
    const normalized = role?.toLowerCase();
    if (normalized === 'admin') return ['*'];
    const validValues = new Set(sectionOptions.map((option) => option.value));
    const filtered = (sections || []).filter((value) => validValues.has(value));
    if (filtered.length > 0) {
      return filtered;
    }
    return getDefaultSectionsForRole(role);
  };

  useEffect(() => {
    if (isOpen) {
      setSubmitError(null);
      if (mode === 'edit' && initialData) {
        setForm({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          role: initialData.role || roleOptions[0]?.value || 'social media manager',
          allowedAdminSections: sanitizeAllowedSections(
            initialData.role || roleOptions[0]?.value || 'social media manager',
            initialData.allowedAdminSections || []
          ),
          isActive: initialData.isActive ?? true,
        });
      } else {
        const defaultRole = roleOptions[0]?.value || 'social media manager';
        setForm({
          ...defaultForm,
          role: defaultRole,
          allowedAdminSections: getDefaultSectionsForRole(defaultRole),
        });
      }
    }
  }, [isOpen, mode, initialData, roleOptions, sectionOptions]);

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.role &&
    (!isSaving) &&
    (form.role === 'admin' || form.allowedAdminSections.length > 0);

  const handleChange = (field, value) => {
    if (field === 'role') {
      const defaults = getDefaultSectionsForRole(value);
      setForm((prev) => ({
        ...prev,
        role: value,
        allowedAdminSections: sanitizeAllowedSections(value, prev.allowedAdminSections.length ? prev.allowedAdminSections : defaults),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleSection = (section) => {
    setForm((prev) => {
      const set = new Set(prev.allowedAdminSections || []);
      if (set.has(section)) {
        set.delete(section);
      } else {
        set.add(section);
      }
      return {
        ...prev,
        allowedAdminSections: Array.from(set),
      };
    });
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    setSubmitError(null);
    if (!canSubmit) return;

    try {
      if (mode === 'add') {
        await onSubmit({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          role: form.role,
          allowedAdminSections: sanitizeAllowedSections(form.role, form.allowedAdminSections),
        });
      } else {
        await onSubmit({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          role: form.role,
          isActive: form.isActive,
          allowedAdminSections: sanitizeAllowedSections(form.role, form.allowedAdminSections),
        });
      }
    } catch (error) {
      setSubmitError(error.message || 'Failed to save team member.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Create a new teammate with the appropriate access level.'
              : 'Update the details and permissions for this teammate.'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'add' && (
            <p className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              We will email this teammate an invitation to accept and set their password.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team-first-name">First Name</Label>
              <Input
                id="team-first-name"
                value={form.firstName}
                onChange={(event) => handleChange('firstName', event.target.value)}
                placeholder="Jane"
                disabled={isSaving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-last-name">Last Name</Label>
              <Input
                id="team-last-name"
                value={form.lastName}
                onChange={(event) => handleChange('lastName', event.target.value)}
                placeholder="Doe"
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-email">Email address</Label>
            <Input
              id="team-email"
              type="email"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              placeholder="jane.doe@company.com"
              disabled={isSaving || mode === 'edit'}
          />
        </div>

  <div className="space-y-2">
    <Label>Role</Label>
    <Select value={form.role} onValueChange={(value) => handleChange('role', value)} disabled={isSaving}>
      <SelectTrigger>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
  </div>

          {form.role !== 'admin' && (
            <div className="space-y-2">
              <Label>Allowed Pages</Label>
              <p className="text-xs text-slate-500">
                Choose which admin pages this teammate can access.
              </p>
              <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                {sectionOptions.map((option) => {
                  const checked = form.allowedAdminSections.includes(option.value);
                  return (
                    <label key={option.value} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleToggleSection(option.value)}
                        disabled={isSaving}
                      />
                      <span className={checked ? 'text-slate-900 font-medium' : 'text-slate-600'}>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {form.role === 'admin' && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              Admins automatically have access to all admin pages.
            </div>
          )}

          {mode === 'edit' && (
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div>
                <p className="text-sm font-medium text-slate-700">Account active</p>
                <p className="text-xs text-slate-500">
                  {form.isActive ? 'This teammate can sign in.' : 'This teammate is currently deactivated.'}
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(value) => handleChange('isActive', value)}
                disabled={isSaving}
              />
            </div>
          )}

          {submitError && (
            <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isSaving ? 'Saving...' : mode === 'add' ? 'Invite Member' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
