// app/publisher/settings/page.jsx
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import {
    User,
    CreditCard,
    Shield,
    Bell,
    Save,
    Mail,
    Globe,
    Building,
    Lock,
    QrCode,
    Download
} from 'lucide-react';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    // Account Details State
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'Tech Reviews Pro',
        website: 'https://techreviewspro.com',
        country: 'us'
    });

    // Payment & Tax State
    const [payment, setPayment] = useState({
        method: 'paypal',
        paypalEmail: 'john.doe@paypal.com',
        bankName: '',
        accountNumber: '',
        swiftCode: '',
        branchAddress: '',
        threshold: 100,
        taxStatus: 'pending'
    });

    // Security State
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false
    });

    // Notifications State
    const [notifications, setNotifications] = useState({
        promotional: true,
        performance: true,
        applicationAlerts: true,
        paymentAlerts: true,
        commissionAlerts: false
    });

    const countries = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' }
    ];

    const paymentMethods = [
        { value: 'paypal', label: 'PayPal' },
        { value: 'bank', label: 'Bank Transfer (ACH/Wire)' },
        { value: 'payoneer', label: 'Payoneer' },
        { value: 'wise', label: 'Wise' }
    ];

    const handleSave = async (section) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Saving ${section} settings...`);
        setIsLoading(false);
    };

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentChange = (field, value) => {
        setPayment(prev => ({ ...prev, [field]: value }));
    };

    const handleSecurityChange = (field, value) => {
        setSecurity(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationChange = (field, checked) => {
        setNotifications(prev => ({ ...prev, [field]: checked }));
    };

    const getTaxStatusBadge = (status) => {
        const statusConfig = {
            'approved': { color: 'bg-green-50 text-green-700 border-green-200', label: 'Approved' },
            'pending': { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending Review' },
            'rejected': { color: 'bg-red-50 text-red-700 border-red-200', label: 'Needs Revision' },
            'not_submitted': { color: 'bg-slate-50 text-slate-700 border-slate-200', label: 'Not Submitted' }
        };

        const config = statusConfig[status] || statusConfig.not_submitted;
        return <Badge variant="outline" className={config.color}>{config.label}</Badge>;
    };

    return (
        // <div className="min-h-screen bg-[var(--color-bg)]  py-8">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Account Settings
                    </h1>
                    <p className="text-lg text-slate-600 mt-2">
                        Manage your profile, payment methods, and security preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70 sticky top-6">
                            <CardContent className="p-4">
                                <nav className="space-y-1">
                                    {[
                                        { id: 'profile', label: 'Account Details', icon: User },
                                        { id: 'payment', label: 'Payment & Tax', icon: CreditCard },
                                        { id: 'security', label: 'Security', icon: Shield },
                                        { id: 'notifications', label: 'Notifications', icon: Bell }
                                    ].map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveSection(item.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-all duration-200 ${activeSection === item.id
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                                <span className="font-medium">{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Account Details Section */}
                        {activeSection === 'profile' && (
                            <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-500" />
                                        Account Details
                                    </CardTitle>
                                    <CardDescription>
                                        Update your personal information and business details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={profile.firstName}
                                                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={profile.lastName}
                                                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            disabled
                                            className="bg-slate-50"
                                        />
                                        <p className="text-sm text-slate-500">Email cannot be changed as it's used for login</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company" className="flex items-center gap-2">
                                            <Building className="w-4 h-4" />
                                            Company / Website Name
                                        </Label>
                                        <Input
                                            id="company"
                                            value={profile.company}
                                            onChange={(e) => handleProfileChange('company', e.target.value)}
                                            placeholder="Your business or blog name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website" className="flex items-center gap-2">
                                            <Globe className="w-4 h-4" />
                                            Primary Website URL
                                        </Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            value={profile.website}
                                            onChange={(e) => handleProfileChange('website', e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Select value={profile.country} onValueChange={(value) => handleProfileChange('country', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map(country => (
                                                    <SelectItem key={country.value} value={country.value}>
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={() => handleSave('profile')}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isLoading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Payment & Tax Section */}
                        {activeSection === 'payment' && (
                            <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-blue-500" />
                                        Payment & Tax Information
                                    </CardTitle>
                                    <CardDescription>
                                        Configure how you receive payments and manage tax documentation
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <Label htmlFor="paymentMethod">Payment Method</Label>
                                        <Select value={payment.method} onValueChange={(value) => handlePaymentChange('method', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {paymentMethods.map(method => (
                                                    <SelectItem key={method.value} value={method.value}>
                                                        {method.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Conditional Payment Fields */}
                                    {payment.method === 'paypal' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                                            <Input
                                                id="paypalEmail"
                                                type="email"
                                                value={payment.paypalEmail}
                                                onChange={(e) => handlePaymentChange('paypalEmail', e.target.value)}
                                                placeholder="your.email@paypal.com"
                                            />
                                        </div>
                                    )}

                                    {payment.method === 'bank' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="bankName">Bank Name</Label>
                                                <Input
                                                    id="bankName"
                                                    value={payment.bankName}
                                                    onChange={(e) => handlePaymentChange('bankName', e.target.value)}
                                                    placeholder="Enter bank name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="accountNumber">Account Number</Label>
                                                <Input
                                                    id="accountNumber"
                                                    value={payment.accountNumber}
                                                    onChange={(e) => handlePaymentChange('accountNumber', e.target.value)}
                                                    placeholder="Enter account number"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="swiftCode">IBAN/SWIFT Code</Label>
                                                <Input
                                                    id="swiftCode"
                                                    value={payment.swiftCode}
                                                    onChange={(e) => handlePaymentChange('swiftCode', e.target.value)}
                                                    placeholder="Enter SWIFT code"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="branchAddress">Branch Address</Label>
                                                <Input
                                                    id="branchAddress"
                                                    value={payment.branchAddress}
                                                    onChange={(e) => handlePaymentChange('branchAddress', e.target.value)}
                                                    placeholder="Enter branch address"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label htmlFor="threshold" className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Payment Threshold
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                                            <Input
                                                id="threshold"
                                                type="number"
                                                value={payment.threshold}
                                                onChange={(e) => handlePaymentChange('threshold', parseInt(e.target.value) || 0)}
                                                className="pl-8"
                                                placeholder="100"
                                            />
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            Payments are processed when your balance reaches this amount
                                        </p>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base">Tax Documentation</Label>
                                                <p className="text-sm text-slate-500">
                                                    Current status: {getTaxStatusBadge(payment.taxStatus)}
                                                </p>
                                            </div>
                                            <Button variant="outline" className="border-slate-300">
                                                <Download className="w-4 h-4 mr-2" />
                                                Submit Tax Form
                                            </Button>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Complete your W-9 (US) or W-8BEN (International) form to ensure timely payments and compliance.
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={() => handleSave('payment')}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isLoading ? 'Saving...' : 'Save Payment Settings'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Security Section */}
                        {activeSection === 'security' && (
                            <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-blue-500" />
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>
                                        Protect your account with strong security measures
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Change Password
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <Input
                                                    id="currentPassword"
                                                    type="password"
                                                    value={security.currentPassword}
                                                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                                                    placeholder="Enter current password"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <Input
                                                    id="newPassword"
                                                    type="password"
                                                    value={security.newPassword}
                                                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={security.confirmPassword}
                                                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                        >
                                            Update Password
                                        </Button>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="twoFactor" className="text-base font-semibold">
                                                    Two-Factor Authentication (2FA)
                                                </Label>
                                                <p className="text-sm text-slate-500">
                                                    Add an extra layer of security to your account
                                                </p>
                                            </div>
                                            <Switch
                                                id="twoFactor"
                                                checked={security.twoFactorEnabled}
                                                onCheckedChange={(checked) => handleSecurityChange('twoFactorEnabled', checked)}
                                            />
                                        </div>

                                        {security.twoFactorEnabled ? (
                                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <QrCode className="w-5 h-5 text-green-600" />
                                                    <span className="font-semibold text-green-800">2FA is Enabled</span>
                                                </div>
                                                <p className="text-sm text-green-700 mb-3">
                                                    Two-factor authentication is protecting your account. Save your recovery codes in a safe place.
                                                </p>
                                                <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                                                    View Recovery Codes
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                                <p className="text-sm text-amber-700">
                                                    Two-factor authentication is disabled. Enable it for enhanced security.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={() => handleSave('security')}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isLoading ? 'Saving...' : 'Save Security Settings'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Notifications Section */}
                        {activeSection === 'notifications' && (
                            <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-blue-500" />
                                        Notification Preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Choose which emails you'd like to receive from us
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="promotional"
                                                checked={notifications.promotional}
                                                onCheckedChange={(checked) => handleNotificationChange('promotional', checked)}
                                            />
                                            <Label htmlFor="promotional" className="font-normal">
                                                <div className="font-medium text-slate-900">Promotional Updates</div>
                                                <div className="text-sm text-slate-500">
                                                    Receive updates on new brands, special offers, and platform features
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="performance"
                                                checked={notifications.performance}
                                                onCheckedChange={(checked) => handleNotificationChange('performance', checked)}
                                            />
                                            <Label htmlFor="performance" className="font-normal">
                                                <div className="font-medium text-slate-900">Performance Summary</div>
                                                <div className="text-sm text-slate-500">
                                                    Send me my weekly and monthly performance reports
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="applicationAlerts"
                                                checked={notifications.applicationAlerts}
                                                onCheckedChange={(checked) => handleNotificationChange('applicationAlerts', checked)}
                                            />
                                            <Label htmlFor="applicationAlerts" className="font-normal">
                                                <div className="font-medium text-slate-900">Application Alerts</div>
                                                <div className="text-sm text-slate-500">
                                                    Notify me when my advertiser applications are approved or rejected
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="paymentAlerts"
                                                checked={notifications.paymentAlerts}
                                                onCheckedChange={(checked) => handleNotificationChange('paymentAlerts', checked)}
                                            />
                                            <Label htmlFor="paymentAlerts" className="font-normal">
                                                <div className="font-medium text-slate-900">Payment Notifications</div>
                                                <div className="text-sm text-slate-500">
                                                    Notify me when payments are processed and sent
                                                </div>
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="commissionAlerts"
                                                checked={notifications.commissionAlerts}
                                                onCheckedChange={(checked) => handleNotificationChange('commissionAlerts', checked)}
                                            />
                                            <Label htmlFor="commissionAlerts" className="font-normal">
                                                <div className="font-medium text-slate-900">Commission Alerts</div>
                                                <div className="text-sm text-slate-500">
                                                    Send an email for every new commission earned (may be frequent)
                                                </div>
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={() => handleSave('notifications')}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isLoading ? 'Saving...' : 'Save Preferences'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}