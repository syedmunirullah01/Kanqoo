// app/components/dashboard/admin/networks/RakutenSetupModal.jsx
'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { showNetworkSuccessToast, showNetworkErrorToast, showValidationErrorToast } from '@/lib/toast-utils';
import {
    X,
    ExternalLink,
    Key,
    Info,
    CheckCircle2,
    AlertCircle,
    Building,
    Mail,
    Globe,
    CreditCard,
    Shield,
    Download,
    BookOpen
} from 'lucide-react';
import adapterManager from '@/lib/adapters/adapter-manager';

export default function RakutenSetupModal({ isOpen, onClose, onNetworkAdded }) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Rakuten Advertising',
        sid: '',
        clientId: '',
        clientSecret: '',
        website: 'https://rakutenadvertising.com',
        supportEmail: 'support@rakutenmarketing.com',
        commission: '3-15%',
        description: 'Global affiliate network with thousands of merchants worldwide'
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const rakutenAdapter = adapterManager.getAdapter('rakuten');
    const networkInfo = rakutenAdapter.getNetworkInfo();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateCredentials = () => {
        const credentials = {
            sid: formData.sid,
            clientId: formData.clientId,
            clientSecret: formData.clientSecret
        };

        const validationErrors = rakutenAdapter.validateCredentials(credentials);
        const newErrors = {};

        validationErrors.forEach(error => {
            if (error.includes('SID')) newErrors.sid = error;
            if (error.includes('Client ID')) newErrors.clientId = error;
            if (error.includes('Client Secret')) newErrors.clientSecret = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateCredentials()) {
            showValidationErrorToast();
            setErrors({ submit: 'Please fix validation errors' });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/networks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    website: formData.website,
                    supportEmail: formData.supportEmail,
                    commission: formData.commission,
                    adapter: 'rakuten',
                    credentials: {
                        sid: formData.sid,
                        clientId: formData.clientId,
                        clientSecret: formData.clientSecret
                    },
                    status: 'connected',
                    apiStatus: 'active'
                }),
            });

            const result = await response.json().catch(() => ({ success: false, error: 'Invalid JSON response' }));

            if (response.ok && result.success) {
                showNetworkSuccessToast("Rakuten Advertising");
                onNetworkAdded(result.data);
                setTimeout(() => onClose(), 2000);
            } else {
                const errMsg = result?.error || `Server returned ${response.status}`;
                showNetworkErrorToast("Rakuten", errMsg);
                setErrors({ submit: errMsg });
            }
        } catch (error) {
            console.error('Add Rakuten network error:', error);
            showNetworkErrorToast("Rakuten", 'Failed to add network');
            setErrors({ submit: 'Failed to add network' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setFormData({
            name: 'Rakuten Advertising',
            sid: '',
            clientId: '',
            clientSecret: '',
            website: 'https://rakutenadvertising.com',
            supportEmail: 'support@rakutenmarketing.com',
            commission: '3-15%',
            description: 'Global affiliate network with thousands of merchants worldwide'
        });
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Add Rakuten Advertising</h2>
                            <p className="text-slate-600 text-sm">Connect your Rakuten affiliate account</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
                    <div className="space-y-6">
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-blue-900">Rakuten Advertising</h3>
                                        <p className="text-blue-700 text-sm">{networkInfo.description}</p>
                                    </div>
                                    <Badge variant="default" className="bg-blue-600">
                                        v{networkInfo.version}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-blue-600" />
                                        <a href={networkInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Official Website
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                        <a
                                            href="https://rakutenadvertising.com/developer"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            API Documentation
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Key className="w-5 h-5 text-amber-600" />
                                    API Credentials
                                </CardTitle>
                                <CardDescription>
                                    Enter your Rakuten Advertising API credentials
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        SID (Account ID) *
                                    </label>
                                    <Input
                                        value={formData.sid}
                                        onChange={(e) => handleInputChange('sid', e.target.value)}
                                        placeholder="Your Rakuten Account ID"
                                        className={errors.sid ? 'border-red-500' : ''}
                                    />
                                    {errors.sid && (
                                        <p className="text-red-500 text-sm mt-1">{errors.sid}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Client ID *
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.clientId}
                                        onChange={(e) => handleInputChange('clientId', e.target.value)}
                                        placeholder="Generated in Developer Portal"
                                        className={errors.clientId ? 'border-red-500' : ''}
                                    />
                                    {errors.clientId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Client Secret *
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.clientSecret}
                                        onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                                        placeholder="Generated in Developer Portal"
                                        className={errors.clientSecret ? 'border-red-500' : ''}
                                    />
                                    {errors.clientSecret && (
                                        <p className="text-red-500 text-sm mt-1">{errors.clientSecret}</p>
                                    )}
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-amber-800">Where to find credentials?</p>
                                            <p className="text-xs text-amber-700 mt-1">
                                                Log into your Rakuten Advertising account, go to Developer Settings,
                                                and generate OAuth credentials. SID is your Account ID from dashboard.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-purple-600" />
                                    Available Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {networkInfo.capabilities.map((capability, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            <span className="text-sm text-slate-700 capitalize">
                                                {capability.replace('_', ' ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {errors.submit && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">{errors.submit}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setFormData({
                                    name: 'Rakuten Advertising',
                                    sid: '',
                                    clientId: '',
                                    clientSecret: '',
                                    website: 'https://rakutenadvertising.com',
                                    supportEmail: 'support@rakutenmarketing.com',
                                    commission: '3-15%',
                                    description: 'Global affiliate network with thousands of merchants worldwide'
                                });
                                setErrors({});
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4" />
                            )}
                            {isLoading ? 'Adding Network...' : 'Add Rakuten Network'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
