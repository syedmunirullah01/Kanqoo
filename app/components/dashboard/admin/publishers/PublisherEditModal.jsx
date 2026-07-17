// app/components/dashboard/admin/publishers/PublisherEditModal.jsx - modal for editing
'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import { X, Save, RefreshCw } from 'lucide-react';

export default function PublisherEditModal({ publisher, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        status: 'pending',
        role: 'publisher',
        revShare: '50%',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (publisher) {
            setFormData({
                fullName: publisher.fullName || '',
                email: publisher.email || '',
                phone: publisher.phone || '',
                status: publisher.status === 'faded' ? (publisher.statusBeforeFade || 'pending') : (publisher.status || 'pending'),
                role: publisher.role || 'publisher',
                revShare: publisher.revShare || (publisher.role === 'publisher' ? '50%' : ''),
            });
        }
    }, [publisher]);

    const handleInputChange = (field, value) => {
        setFormData(prev => {
            if (field === 'role' && value !== 'publisher') {
                return { ...prev, role: value, revShare: '' };
            }
            if (field === 'role' && value === 'publisher' && !prev.revShare) {
                return { ...prev, role: value, revShare: '50%' };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/publishers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: publisher.id, ...formData })
            });
            const result = await response.json();

            if (result.success) {
                onSave(result.data);
                showSuccessToast('Publisher Updated', 'Details saved successfully.');
                onClose();
            } else {
                showErrorToast('Update Failed', result.error);
            }
        } catch (error) {
            showErrorToast('Update Failed', 'Failed to update publisher.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !publisher) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Edit Publisher</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <Input value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="publisher">Publisher</SelectItem>
                                <SelectItem value="social media manager">Social Media Manager</SelectItem>
                                <SelectItem value="data entry">Data Entry</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Revenue Share</label>
                        <Input
                            value={formData.revShare}
                            onChange={(e) => handleInputChange('revShare', e.target.value)}
                            placeholder="e.g., 50%"
                            disabled={formData.role !== 'publisher'}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
