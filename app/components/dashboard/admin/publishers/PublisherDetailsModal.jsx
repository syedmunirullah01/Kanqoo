'use client';

import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import { X, Mail, Phone, DollarSign, User, AlertTriangle, Archive, CheckCircle2, Clock, XCircle } from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const parseCurrency = (value) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
  return Number.isNaN(parsed) ? 0 : parsed;
};
const formatCurrency = (value) => currencyFormatter.format(parseCurrency(value));

const getStatusBadgeProps = (status) => {
  switch (status) {
    case 'approved':
      return { label: 'Approved', variant: 'default', className: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 };
    case 'suspended':
      return { label: 'Suspended', variant: 'destructive', className: 'bg-red-100 text-red-700 border-red-200', icon: XCircle };
    case 'declined':
      return { label: 'Declined', variant: 'destructive', className: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertTriangle };
    case 'faded':
      return { label: 'Deletion Pending', variant: 'outline', className: 'border-slate-300 text-slate-600', icon: Archive };
    case 'pending':
    default:
      return { label: 'Pending', variant: 'secondary', className: 'bg-amber-100 text-amber-600 border-amber-200', icon: Clock };
  }
};

const formatDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
      <Icon className="w-4 h-4 text-slate-600" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value || 'N/A'}</p>
    </div>
  </div>
);

export default function PublisherDetailsModal({ publisher, isOpen, onClose }) {
  if (!isOpen || !publisher) return null;

  const roleLabel = publisher.role ? publisher.role.replace(/\b\w/g, (c) => c.toUpperCase()) : 'N/A';
  const revShareLabel =
    publisher.role === 'publisher' && publisher.revShare ? publisher.revShare : publisher.role === 'publisher' ? 'Not set' : 'N/A';
  const statusBadge = getStatusBadgeProps(publisher.status);
  const previousStatusBadge = publisher.statusBeforeFade ? getStatusBadgeProps(publisher.statusBeforeFade) : null;
  const deletionDate = publisher.fadeUntil ? formatDate(publisher.fadeUntil) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-xl shadow-2xl border-0">
        <div className="flex justify-between items-center px-6 pt-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Publisher Details</h2>
            <p className="text-sm text-slate-500">Review profile, role, and performance metrics</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <CardContent className="px-6 pb-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{publisher.fullName}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="capitalize">{roleLabel}</Badge>
                <Badge
                  variant={statusBadge.variant}
                  className={`flex items-center gap-1 text-xs ${statusBadge.className} uppercase`}
                >
                  {statusBadge.icon && <statusBadge.icon className="w-3 h-3" />}
                  {statusBadge.label}
                </Badge>
                {publisher.pubId && (
                  <Badge variant="outline" className="text-xs">
                    {publisher.pubId}
                  </Badge>
                )}
              </div>
              {publisher.status === 'faded' && (
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  {previousStatusBadge && (
                    <p>Previous status: {previousStatusBadge.label}</p>
                  )}
                  {deletionDate && <p>Scheduled deletion: {deletionDate}</p>}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500">Joined</p>
              <p className="text-sm font-semibold text-slate-900">{formatDate(publisher.createdAt)}</p>
            </div>
          </div>

          {publisher.status === 'faded' && (
            <div className="flex items-start gap-2 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700">
              <Archive className="w-4 h-4 mt-0.5 text-slate-500" />
              <div>
                <p>This account is inactive and scheduled for permanent deletion{deletionDate ? ` on ${deletionDate}` : ' in 30 days'}.</p>
                <p>Use the revive action in the publisher list to restore access before the deletion date.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DetailRow icon={Mail} label="Email" value={publisher.email} />
            <DetailRow icon={Phone} label="Phone" value={publisher.phone || 'Not provided'} />
            <DetailRow icon={User} label="Handler" value={publisher.handlerName || 'N/A'} />
            <DetailRow icon={DollarSign} label="Revenue Share" value={revShareLabel} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Earnings</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(publisher.totalEarnings)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Pending Earnings</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(publisher.pendingEarnings)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Last Active</p>
              <p className="text-lg font-bold text-slate-900">{formatDate(publisher.lastActivity || publisher.lastLogin)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">User Type</p>
              <p className="text-sm font-semibold text-slate-900">{publisher.userType || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500">Last Login</p>
              <p className="text-sm font-semibold text-slate-900">{formatDate(publisher.lastLogin)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
