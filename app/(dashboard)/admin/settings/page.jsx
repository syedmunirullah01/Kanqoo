// app/dashboard/settings/page.jsx
'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { 
  Settings,
  User,
  Shield,
  Bell,
  CreditCard,
  Users,
  Globe,
  Download,
  Upload,
  Save,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Key,
  Database,
  Palette,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Plus,
  MoreVertical,
  Copy,
  FileCheck
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import TeamMemberModal from '@/app/components/dashboard/admin/settings/TeamMemberModal';
import { passwordRequirements, validatePassword as validatePasswordClient, getPasswordStrength } from '@/lib/passwordValidation';
import { getDefaultBranding } from '@/lib/siteBranding';

const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'EUR', 'CAD', 'BRL', 'JPY', 'AUD'];
const TEAM_ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'social media manager', label: 'Social Media Manager' },
  { value: 'data entry', label: 'Data Entry' },
];
const ADMIN_SECTION_OPTIONS = [
  { value: '/admin/merchants', label: 'Merchants' },
  { value: '/admin/publishers', label: 'Publishers' },
  { value: '/admin/networks', label: 'Networks' },
  { value: '/admin/reporting', label: 'Reporting' },
  { value: '/admin/settings', label: 'Settings' },
];
const VERIFICATION_MAX_FILE_SIZE_LABEL = '512 KB';
const DEFAULT_BRANDING_SETTINGS = getDefaultBranding();

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!session?.user?.id) {
        setProfileLoading(false);
        return;
      }
      setProfileLoading(true);
      setProfileError(null);
      try {
        const response = await fetch('/api/admin/profile');
        const payload = await response.json();

        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || 'Failed to load profile');
        }

        const nextProfile = {
          firstName: payload.data.firstName || '',
          lastName: payload.data.lastName || '',
          email: payload.data.email || '',
          phone: payload.data.phone || '',
          company: payload.data.company || '',
          jobTitle: payload.data.jobTitle || '',
        };

        if (isMounted) {
          setProfileData(nextProfile);
          setInitialProfileData(nextProfile);
        }
      } catch (error) {
        console.error('Profile load failed:', error);
        if (isMounted) {
          setProfileError(error.message || 'Failed to load profile');
        }
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.id]);

  const profileHasChanges = useMemo(() => {
    if (!initialProfileData) return false;
    return ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'].some((key) => {
      const currentValue = profileData[key] || '';
      const initialValue = initialProfileData[key] || '';
      return currentValue !== initialValue;
    });
  }, [initialProfileData, profileData]);

  const handleProfileReset = () => {
    if (initialProfileData) {
      setProfileData(initialProfileData);
      setProfileError(null);
    }
  };

  const handleProfileSave = async () => {
    if (!profileHasChanges) return;
    setProfileSaving(true);
    setProfileError(null);
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to update profile');
      }

      const updatedProfile = {
        firstName: payload.data.firstName || '',
        lastName: payload.data.lastName || '',
        email: payload.data.email || '',
        phone: payload.data.phone || '',
        company: payload.data.company || '',
        jobTitle: payload.data.jobTitle || '',
      };

      setProfileData(updatedProfile);
      setInitialProfileData(updatedProfile);
      showSuccessToast('Profile updated', 'Your profile information has been saved.');

      if (updateSession) {
        await updateSession({
          user: {
            ...session?.user,
            name: payload.data.fullName,
            email: payload.data.email,
          },
        });
      }
    } catch (error) {
      console.error('Profile save failed:', error);
      setProfileError(error.message || 'Failed to update profile');
      showErrorToast('Update failed', error.message || 'Could not save your changes.');
    } finally {
      setProfileSaving(false);
    }
  };

  const isProfileBusy = profileLoading || profileSaving;

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityError, setSecurityError] = useState(null);
  const [securitySuccess, setSecuritySuccess] = useState(null);
  const [securitySaving, setSecuritySaving] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamModalMode, setTeamModalMode] = useState('add');
  const [teamModalMember, setTeamModalMember] = useState(null);
  const [teamModalSaving, setTeamModalSaving] = useState(false);
  const [teamActionInProgress, setTeamActionInProgress] = useState(false);
  const securityValidation = useMemo(() => validatePasswordClient(securityData.newPassword), [securityData.newPassword]);
  const securityStrength = useMemo(() => getPasswordStrength(securityData.newPassword || ''), [securityData.newPassword]);
  const securityPasswordsMatch = useMemo(
    () => Boolean(securityData.newPassword) && securityData.newPassword === securityData.confirmPassword,
    [securityData.newPassword, securityData.confirmPassword]
  );
  const securityHasInput = useMemo(
    () => Boolean(securityData.currentPassword || securityData.newPassword || securityData.confirmPassword),
    [securityData.confirmPassword, securityData.currentPassword, securityData.newPassword]
  );
  const canSubmitSecurity = Boolean(
    securityData.currentPassword &&
    securityValidation.valid &&
    securityPasswordsMatch &&
    !securitySaving
  );

  const handleSecurityFieldChange = (field, value) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
    setSecurityError(null);
    setSecuritySuccess(null);
  };

  const handlePasswordUpdate = async () => {
    if (!canSubmitSecurity) return;
    setSecuritySaving(true);
    setSecurityError(null);
    setSecuritySuccess(null);
    try {
      const response = await fetch('/api/admin/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(securityData),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload?.error || `Failed to update password (${response.status})`);
      }

      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSecuritySuccess(payload.message || 'Password updated successfully.');
      showSuccessToast('Password updated', 'Your password has been changed.');
    } catch (error) {
      console.error('Password update failed:', error);
      const message = error.message || 'Failed to update password';
      setSecurityError(message);
      showErrorToast('Password update failed', message);
    } finally {
      setSecuritySaving(false);
    }
  };

  const loadTeamMembers = useCallback(async () => {
    const role = session?.user?.role ? String(session.user.role).toLowerCase() : '';
    if (role !== 'admin') {
      setTeamMembers([]);
      setTeamLoading(false);
      return;
    }

    setTeamLoading(true);
    setTeamError(null);
    try {
      const response = await fetch('/api/admin/team', { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to load team members');
      }
      setTeamMembers(payload.data || []);
    } catch (error) {
      console.error('Team load failed:', error);
      const message = error.message || 'Failed to load team members';
      setTeamError(message);
      showErrorToast('Team load failed', message);
    } finally {
      setTeamLoading(false);
    }
  }, [session?.user?.role]);

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  const handleOpenAddTeamMember = () => {
    setTeamModalMode('add');
    setTeamModalMember(null);
    setTeamModalOpen(true);
  };

  const handleOpenEditTeamMember = (member) => {
    setTeamModalMode('edit');
    setTeamModalMember(member);
    setTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    if (teamModalSaving) return;
    setTeamModalOpen(false);
    setTeamModalMember(null);
  };

  const handleSubmitTeamMember = async (payload) => {
    setTeamModalSaving(true);
    try {
      const method = teamModalMode === 'add' ? 'POST' : 'PUT';
      const body =
        teamModalMode === 'add'
          ? payload
          : {
              id: teamModalMember?.id,
              ...payload,
            };

      const response = await fetch('/api/admin/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Failed to save team member');
      }

      setTeamMembers(result.data || []);
      showSuccessToast('Team updated', result.message || 'Team member saved.');
      setTeamModalOpen(false);
      setTeamModalMember(null);
    } catch (error) {
      console.error('Team member save failed:', error);
      const message = error.message || 'Failed to save team member';
      showErrorToast('Team update failed', message);
      throw error;
    } finally {
      setTeamModalSaving(false);
    }
  };

  const handleToggleTeamMemberStatus = async (member, nextStatus) => {
    setTeamActionInProgress(true);
    try {
      const response = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, isActive: nextStatus }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to update team member');
      }
      setTeamMembers(payload.data || []);
      showSuccessToast(
        'Team updated',
        payload.message || `Team member ${nextStatus ? 'activated' : 'deactivated'}.`
      );
    } catch (error) {
      console.error('Team member status update failed:', error);
      showErrorToast('Update failed', error.message || 'Could not update team member.');
    } finally {
      setTeamActionInProgress(false);
    }
  };

  const handleDeactivateTeamMember = async (member) => {
    setTeamActionInProgress(true);
    try {
      const response = await fetch(`/api/admin/team?id=${member.id}`, {
        method: 'DELETE',
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to deactivate team member');
      }
      setTeamMembers(payload.data || []);
      showSuccessToast('Team updated', payload.message || 'Team member deactivated.');
    } catch (error) {
      console.error('Team member deactivation failed:', error);
      showErrorToast('Update failed', error.message || 'Could not update team member.');
    } finally {
      setTeamActionInProgress(false);
    }
  };

  const handleRemoveTeamMember = async (member) => {
    const confirmed = window.confirm(
      `Remove ${member.fullName || member.email} permanently? This cannot be undone.`
    );
    if (!confirmed) return;
    setTeamActionInProgress(true);
    try {
      const response = await fetch(`/api/admin/team?id=${member.id}&hard=true`, {
        method: 'DELETE',
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to delete team member');
      }
      setTeamMembers(payload.data || []);
      showSuccessToast('Team updated', payload.message || 'Team member deleted.');
    } catch (error) {
      console.error('Team member deletion failed:', error);
      showErrorToast('Delete failed', error.message || 'Could not delete team member.');
    } finally {
      setTeamActionInProgress(false);
    }
  };

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: false,
    weeklyReports: true,
    paymentAlerts: true,
    securityAlerts: true
  });

  const [billingInfo, setBillingInfo] = useState({
    plan: 'Professional',
    status: 'active',
    nextBilling: 'Dec 15, 2024',
    paymentMethod: '•••• •••• •••• 4242'
  });

  const [currencyRates, setCurrencyRates] = useState(() => ({
    baseCurrency: 'USD',
    rates: SUPPORTED_CURRENCIES.reduce((acc, code) => {
      acc[code] = code === 'USD' ? '1' : '';
      return acc;
    }, {}),
  }));
  const [currencyUpdatedAt, setCurrencyUpdatedAt] = useState(null);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [isCurrencySaving, setIsCurrencySaving] = useState(false);
  const [currencyError, setCurrencyError] = useState(null);
  const [currencySuccess, setCurrencySuccess] = useState(null);
  const [verificationFiles, setVerificationFiles] = useState([]);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationSaving, setVerificationSaving] = useState(false);
  const [verificationFileInputKey, setVerificationFileInputKey] = useState(0);
  const [verificationUpload, setVerificationUpload] = useState({
    provider: '',
    description: '',
    file: null,
    serveAtRoot: false,
  });
  const [brandingSettings, setBrandingSettings] = useState(DEFAULT_BRANDING_SETTINGS);
  const [brandingInitialSettings, setBrandingInitialSettings] = useState(DEFAULT_BRANDING_SETTINGS);
  const [brandingLoading, setBrandingLoading] = useState(true);
  const [brandingSaving, setBrandingSaving] = useState(false);
  const [brandingError, setBrandingError] = useState(null);


  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'verification', label: 'Verification Files', icon: FileCheck }
  ];

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleExportData = () => {
    alert('Data export started. You will receive an email when it\'s ready.');
  };

  const handleChangePlan = () => {
    alert('Redirecting to billing portal...');
  };

  const apiKeys = [
    { id: 1, name: 'Production API', key: 'sk_live_••••••••••••••••', created: 'Jan 15, 2024', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API', key: 'sk_test_••••••••••••••••', created: 'Feb 3, 2024', lastUsed: '5 days ago' }
  ];

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      setIsCurrencyLoading(true);
      setCurrencyError(null);
      setCurrencySuccess(null);
      try {
        const response = await fetch('/api/admin/currency-rates', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        if (!payload.success) {
          throw new Error(payload.error || 'Failed to load currency rates');
        }
        const data = payload.data || {};
        const normalizedRates = {};
        SUPPORTED_CURRENCIES.forEach((code) => {
          const raw = data.rates && data.rates[code] !== undefined ? data.rates[code] : (code === 'USD' ? 1 : '');
          normalizedRates[code] = raw === '' ? '' : String(raw);
        });
        setCurrencyRates({
          baseCurrency: (data.baseCurrency || 'USD').toUpperCase(),
          rates: normalizedRates,
        });
        setCurrencyUpdatedAt(data.updatedAt || null);
      } catch (error) {
        console.error('Currency rates fetch failed:', error);
        setCurrencyError(error.message);
      } finally {
        setIsCurrencyLoading(false);
      }
    };

    fetchCurrencyRates();
  }, []);

  const loadVerificationFiles = useCallback(async () => {
    setVerificationLoading(true);
    try {
      const response = await fetch('/api/admin/settings/verification-files', { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || 'Failed to load verification files');
      }
      setVerificationFiles(Array.isArray(payload.data) ? payload.data : []);
    } catch (error) {
      console.error('Verification files fetch failed:', error);
      showErrorToast('Load failed', error.message || 'Could not load verification files.');
    } finally {
      setVerificationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.role?.toLowerCase() === 'admin') {
      loadVerificationFiles();
    }
  }, [loadVerificationFiles, session?.user?.role]);

  const handleCurrencyRateChange = (code, value) => {
    const sanitized = value.replace(/[^0-9.]/g, '');
    setCurrencyRates((prev) => ({
      ...prev,
      rates: {
        ...prev.rates,
        [code]: sanitized,
      },
    }));
  };

  const handleSaveCurrencyRates = async () => {
    setIsCurrencySaving(true);
    setCurrencyError(null);
    setCurrencySuccess(null);
    try {
      const payloadRates = {};
      SUPPORTED_CURRENCIES.forEach((code) => {
        const raw = currencyRates.rates[code];
        const numeric = Number(raw);
        if (Number.isFinite(numeric) && numeric > 0) {
          payloadRates[code] = numeric;
        }
      });

      const response = await fetch('/api/admin/currency-rates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseCurrency: currencyRates.baseCurrency || 'USD',
          rates: payloadRates,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Save failed (${response.status})`);
      }

      const savedRates = {};
      SUPPORTED_CURRENCIES.forEach((code) => {
        const value = payload.data && payload.data.rates ? payload.data.rates[code] : undefined;
        if (value !== undefined) {
          savedRates[code] = String(value);
        } else if (code === 'USD') {
          savedRates[code] = '1';
        } else {
          savedRates[code] = '';
        }
      });

      setCurrencyRates({
        baseCurrency: payload.data?.baseCurrency ? payload.data.baseCurrency.toUpperCase() : (currencyRates.baseCurrency || 'USD'),
        rates: savedRates,
      });
      setCurrencyUpdatedAt(payload.data?.updatedAt || new Date().toISOString());
      setCurrencySuccess('Currency rates were updated successfully.');
    } catch (error) {
      console.error('Currency rates save failed:', error);
      setCurrencyError(error.message);
    } finally {
      setIsCurrencySaving(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch('/api/admin/settings/branding', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || 'Failed to load branding settings');
        }
        if (!isMounted) return;
        const nextSettings = {
          ...DEFAULT_BRANDING_SETTINGS,
          ...(payload.data || {}),
        };
        setBrandingSettings(nextSettings);
        setBrandingInitialSettings(nextSettings);
      })
      .catch((error) => {
        console.error('Branding settings load failed:', error);
        if (isMounted) {
          setBrandingError(error.message || 'Failed to load branding settings');
        }
      })
      .finally(() => {
        if (isMounted) {
          setBrandingLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const brandingHasChanges = useMemo(
    () => ['siteName', 'logoUrl', 'footerLogoUrl', 'logoAlt', 'faviconUrl'].some((key) => (brandingSettings[key] || '') !== (brandingInitialSettings[key] || '')),
    [brandingInitialSettings, brandingSettings]
  );

  const updateBrandingField = (field, value) => {
    setBrandingSettings((prev) => ({ ...prev, [field]: value }));
    setBrandingError(null);
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      showErrorToast('File too large', 'Please upload an image smaller than 2MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBrandingField(field, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBrandingSave = async () => {
    setBrandingSaving(true);
    setBrandingError(null);

    try {
      const response = await fetch('/api/admin/settings/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandingSettings),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Failed to save branding settings');
      }

      const nextSettings = {
        ...DEFAULT_BRANDING_SETTINGS,
        ...(payload.data || {}),
      };
      setBrandingSettings(nextSettings);
      setBrandingInitialSettings(nextSettings);
      showSuccessToast('Branding saved', 'Website logo and name settings were updated.');
    } catch (error) {
      console.error('Branding settings save failed:', error);
      setBrandingError(error.message || 'Failed to save branding settings');
      showErrorToast('Save failed', error.message || 'Could not save branding settings.');
    } finally {
      setBrandingSaving(false);
    }
  };

  const formatFileSize = (sizeBytes) => {
    const size = Number(sizeBytes);
    if (!Number.isFinite(size) || size < 0) return 'Unknown';
    if (size < 1024) return `${size} B`;
    return `${(size / 1024).toFixed(size >= 10 * 1024 ? 0 : 1)} KB`;
  };

  const formatDateTime = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString();
  };

  const resetVerificationUploadForm = () => {
    setVerificationUpload({
      provider: '',
      description: '',
      file: null,
      serveAtRoot: false,
    });
    setVerificationFileInputKey((prev) => prev + 1);
  };

  const handleVerificationUpload = async () => {
    if (verificationSaving) return;
    if (!verificationUpload.file) {
      showErrorToast('File required', 'Choose a verification file before uploading.');
      return;
    }

    setVerificationSaving(true);
    try {
      const formData = new FormData();
      formData.append('file', verificationUpload.file);
      formData.append('provider', verificationUpload.provider);
      formData.append('description', verificationUpload.description);
      formData.append('serveAtRoot', verificationUpload.serveAtRoot ? 'true' : 'false');

      const response = await fetch('/api/admin/settings/verification-files', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || 'Unable to upload verification file.');
      }

      resetVerificationUploadForm();
      await loadVerificationFiles();
      showSuccessToast('Upload complete', 'Verification file uploaded successfully.');
    } catch (error) {
      console.error('Verification file upload failed:', error);
      showErrorToast('Upload failed', error.message || 'Could not upload verification file.');
    } finally {
      setVerificationSaving(false);
    }
  };

  const handleVerificationFileToggle = async (file, nextIsActive) => {
    try {
      const response = await fetch(`/api/admin/settings/verification-files?id=${encodeURIComponent(file.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: nextIsActive }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || 'Unable to update verification file.');
      }

      setVerificationFiles((prev) => prev.map((entry) => (entry.id === file.id ? payload.data : entry)));
      showSuccessToast('Status updated', `Verification file ${nextIsActive ? 'enabled' : 'disabled'}.`);
    } catch (error) {
      console.error('Verification file update failed:', error);
      showErrorToast('Update failed', error.message || 'Could not update verification file.');
    }
  };

  const handleVerificationFileDelete = async (file) => {
    const confirmed = window.confirm(`Delete ${file.filename}? This cannot be undone.`);
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/settings/verification-files?id=${encodeURIComponent(file.id)}`, {
        method: 'DELETE',
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || 'Unable to delete verification file.');
      }

      setVerificationFiles((prev) => prev.filter((entry) => entry.id !== file.id));
      showSuccessToast('File deleted', 'Verification file removed successfully.');
    } catch (error) {
      console.error('Verification file deletion failed:', error);
      showErrorToast('Delete failed', error.message || 'Could not delete verification file.');
    }
  };

  const handleCopyVerificationUrl = async (publicUrl) => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      showSuccessToast('URL copied', 'Public verification URL copied to clipboard.');
    } catch (error) {
      console.error('Copy verification URL failed:', error);
      showErrorToast('Copy failed', 'Unable to copy verification URL.');
    }
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 ">
            {profileError && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>{profileError}</span>
              </div>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileLoading ? (
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="h-12 w-full animate-pulse rounded-lg bg-slate-100" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          disabled={isProfileBusy}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          disabled={isProfileBusy}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={isProfileBusy}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={isProfileBusy}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          disabled={isProfileBusy}
                          placeholder="Optional"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={profileData.jobTitle}
                          onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                          disabled={isProfileBusy}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleProfileReset}
                  disabled={!profileHasChanges || isProfileBusy || !initialProfileData}
                >
                  Reset
                </Button>
                <Button onClick={handleProfileSave} disabled={!profileHasChanges || isProfileBusy}>
                  {profileSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {profileSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            {brandingError && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>{brandingError}</span>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Website Branding</CardTitle>
                <CardDescription>
                  Control the logo and name shown in the public navbar, footer, and dashboard header.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {brandingLoading ? (
                  <div className="space-y-3">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="h-12 w-full animate-pulse rounded-lg bg-slate-100" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="branding-site-name">Site name</Label>
                        <Input
                          id="branding-site-name"
                          value={brandingSettings.siteName}
                          onChange={(event) => updateBrandingField('siteName', event.target.value)}
                          placeholder="Kanqoo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branding-logo-alt">Logo alt text</Label>
                        <Input
                          id="branding-logo-alt"
                          value={brandingSettings.logoAlt}
                          onChange={(event) => updateBrandingField('logoAlt', event.target.value)}
                          placeholder={brandingSettings.siteName || 'Kanqoo'}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-4">
                          {brandingSettings.logoUrl && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-slate-50 p-1">
                              <img src={brandingSettings.logoUrl} alt="Logo" className="h-full w-full object-contain" />
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('logoUrl', e)}
                            className="flex-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Footer Logo</Label>
                        <div className="flex items-center gap-4">
                          {(brandingSettings.footerLogoUrl || brandingSettings.logoUrl) && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-slate-900 p-1">
                              <img src={brandingSettings.footerLogoUrl || brandingSettings.logoUrl} alt="Footer Logo" className="h-full w-full object-contain" />
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('footerLogoUrl', e)}
                            className="flex-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Favicon</Label>
                        <div className="flex items-center gap-4">
                          {brandingSettings.faviconUrl && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-slate-50 p-1">
                              <img src={brandingSettings.faviconUrl} alt="Favicon" className="h-6 w-6 object-contain" />
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/x-icon,image/png,image/jpeg,image/svg+xml"
                            onChange={(e) => handleFileChange('faviconUrl', e)}
                            className="flex-1 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Navbar preview</p>
                        <div className="mt-4 flex h-16 items-center rounded-lg bg-slate-950 px-4">
                          {brandingSettings.logoUrl ? (
                            <img
                              src={brandingSettings.logoUrl}
                              alt={brandingSettings.logoAlt || brandingSettings.siteName}
                              className="h-10 w-auto max-w-[180px] object-contain"
                            />
                          ) : (
                            <span className="text-3xl font-bold text-white unbounded-600">{brandingSettings.siteName || 'Kanqoo'}</span>
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl border bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Footer preview</p>
                        <div className="mt-4 flex h-20 items-center rounded-lg bg-[#1B1B1B] px-4">
                          {brandingSettings.footerLogoUrl || brandingSettings.logoUrl ? (
                            <img
                              src={brandingSettings.footerLogoUrl || brandingSettings.logoUrl}
                              alt={brandingSettings.logoAlt || brandingSettings.siteName}
                              className="h-12 w-auto max-w-[220px] object-contain"
                            />
                          ) : (
                            <span className="text-4xl font-extrabold text-white unbounded-600">{brandingSettings.siteName || 'Kanqoo'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                      Use the final uploaded asset URL from your image host or existing upload flow. These fields persist the URL and make it available to public layout components.
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBrandingSettings(brandingInitialSettings);
                    setBrandingError(null);
                  }}
                  disabled={!brandingHasChanges || brandingLoading || brandingSaving}
                >
                  Reset
                </Button>
                <Button onClick={handleBrandingSave} disabled={!brandingHasChanges || brandingLoading || brandingSaving}>
                  {brandingSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {brandingSaving ? 'Saving...' : 'Save Branding'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      case 'security': {
        const strengthBadgeClass =
          securityStrength.tone === 'strong'
            ? 'bg-green-100 text-green-700 border-green-200'
            : securityStrength.variant === 'destructive'
            ? 'bg-red-50 text-red-700 border-red-200'
            : securityStrength.tone === 'weak'
            ? 'bg-amber-100 text-amber-700 border-amber-200'
            : undefined;
        const failedRequirementIds = new Set(securityValidation.failed || []);

        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5" />
                    <span>{securityError}</span>
                  </div>
                )}
                {securitySuccess && (
                  <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 className="w-4 h-4 mt-0.5" />
                    <span>{securitySuccess}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={securityData.currentPassword}
                      onChange={(e) => handleSecurityFieldChange('currentPassword', e.target.value)}
                      disabled={securitySaving}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={securityData.newPassword}
                      onChange={(e) => handleSecurityFieldChange('newPassword', e.target.value)}
                      disabled={securitySaving}
                      />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700">Password Strength</Label>
                    <Badge
                      variant={securityStrength.variant}
                      className={strengthBadgeClass}
                    >
                      {securityStrength.label}
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                    {passwordRequirements.map((req) => {
                      const passed = securityValidation.valid || !failedRequirementIds.has(req.id);
                      return (
                        <div key={req.id} className="flex items-center gap-2 text-sm">
                          {passed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-slate-400" />
                          )}
                          <span className={passed ? 'text-green-600 font-medium' : 'text-slate-600'}>{req.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => handleSecurityFieldChange('confirmPassword', e.target.value)}
                    disabled={securitySaving}
                  />
                  {securityHasInput && securityData.confirmPassword && !securityPasswordsMatch && (
                    <p className="text-xs text-red-600">Passwords do not match.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePasswordUpdate} disabled={!canSubmitSecurity}>
                  {securitySaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                  {securitySaving ? 'Updating...' : 'Update Password'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      }

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about different activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-slate-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-slate-600">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-slate-600">Receive important alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-alerts"
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-slate-600">Get weekly performance reports</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <p className="text-sm text-slate-600">Notifications about payments and earnings</p>
                  </div>
                  <Switch
                    id="payment-alerts"
                    checked={notificationSettings.paymentAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <p className="text-sm text-slate-600">Important security notifications</p>
                  </div>
                  <Switch
                    id="security-alerts"
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{billingInfo.plan} Plan</p>
                    <p className="text-sm text-slate-600">Next billing date: {billingInfo.nextBilling}</p>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {billingInfo.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-slate-600">{billingInfo.paymentMethod}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleChangePlan} variant="outline">
                  Change Plan
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your recent invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Invoice #INV-001</p>
                      <p className="text-sm text-slate-600">Oct 1, 2024 • Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$99.00</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Invoice #INV-002</p>
                      <p className="text-sm text-slate-600">Sep 1, 2024 • Professional Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$99.00</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'team': {
        const getAllowedLabels = (member) => {
          if (member.allowedAdminSections?.includes('*')) {
            return ['All admin pages'];
          }
          const lookup = new Map(ADMIN_SECTION_OPTIONS.map((option) => [option.value, option.label]));
          const labels = (member.allowedAdminSections || []).map((value) => lookup.get(value)).filter(Boolean);
          return labels.length ? labels : ['No pages assigned'];
        };

        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team members and their permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <span>{teamError}</span>
                  </div>
                )}

                {teamLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="h-16 w-full animate-pulse rounded-lg bg-slate-100" />
                    ))}
                  </div>
                ) : teamMembers.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                    No teammates yet. Invite colleagues to help manage publishers, campaigns, and data.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamMembers.map((member) => {
                      const roleLabel = TEAM_ROLE_OPTIONS.find((option) => option.value === member.role)?.label || member.role;
                      const invitePending = member.inviteStatus === 'pending';
                      const statusBadgeVariant = invitePending ? 'secondary' : member.isActive ? 'default' : 'secondary';
                      const statusLabel = invitePending ? 'Invite pending' : member.isActive ? 'Active' : 'Inactive';
                      const allowedLabels = getAllowedLabels(member);

                      return (
                        <div
                          key={member.id}
                          className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex items-start gap-3 md:items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                              <User className="h-5 w-5 text-slate-500" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {member.fullName || `${member.firstName} ${member.lastName}`.trim() || member.email}
                              </p>
                              <p className="text-sm text-slate-600">{member.email}</p>
                              <p className="text-xs text-slate-500">
                                Last active:{' '}
                                {member.lastLogin
                                  ? new Date(member.lastLogin).toLocaleString()
                                  : invitePending
                                    ? 'Awaiting acceptance'
                                    : 'No activity recorded'}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="capitalize">
                                  {roleLabel}
                                </Badge>
                                <Badge variant={statusBadgeVariant} className="capitalize">
                                  {statusLabel}
                                </Badge>
                                {invitePending && member.inviteExpiresAt && (
                                  <Badge variant="secondary" className="text-xs">
                                    Expires {new Date(member.inviteExpiresAt).toLocaleDateString()}
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {allowedLabels.map((label) => (
                                  <span key={label} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                    {label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end md:self-auto">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={teamActionInProgress || teamModalSaving}
                                >
                                  Manage
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem
                                onSelect={() => handleOpenEditTeamMember(member)}
                                disabled={teamActionInProgress}
                              >
                                Edit details & permissions
                              </DropdownMenuItem>
                              {member.isActive ? (
                                <DropdownMenuItem
                                  onSelect={() => handleDeactivateTeamMember(member)}
                                  disabled={teamActionInProgress}
                                >
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onSelect={() => handleToggleTeamMemberStatus(member, true)}
                                  disabled={teamActionInProgress}
                                >
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {member.role !== 'admin' && (
                                <DropdownMenuItem
                                  onSelect={() => handleRemoveTeamMember(member)}
                                  disabled={teamActionInProgress}
                                >
                                  Remove permanently
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleOpenAddTeamMember} disabled={teamModalSaving || teamActionInProgress}>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      }

      case 'api':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{apiKey.name}</p>
                        <p className="text-sm text-slate-600 font-mono">{apiKey.key}</p>
                        <p className="text-xs text-slate-500">Created: {apiKey.created} • Last used: {apiKey.lastUsed}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate New API Key
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Learn how to integrate with our API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">REST API Reference</p>
                      <p className="text-sm text-slate-600">Complete API endpoint documentation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Webhook Guide</p>
                      <p className="text-sm text-slate-600">Set up real-time notifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Database className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'verification':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Verification Files</CardTitle>
                <CardDescription>
                  Upload verification files supplied by networks so they can confirm domain ownership on your server.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Only upload files from trusted partners. Uploaded verification files become publicly accessible.
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="verification-provider">Provider / Network</Label>
                    <Input
                      id="verification-provider"
                      value={verificationUpload.provider}
                      onChange={(event) => setVerificationUpload((prev) => ({ ...prev, provider: event.target.value }))}
                      placeholder="Awin, CJ, Impact..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verification-file">Verification File</Label>
                    <Input
                      key={verificationFileInputKey}
                      id="verification-file"
                      type="file"
                      accept=".html,.htm,.txt,.xml,.json"
                      onChange={(event) => setVerificationUpload((prev) => ({ ...prev, file: event.target.files?.[0] || null }))}
                    />
                    <p className="text-xs text-slate-500">
                      Allowed: `.html`, `.htm`, `.txt`, `.xml`, `.json` up to {VERIFICATION_MAX_FILE_SIZE_LABEL}.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification-description">Description</Label>
                  <textarea
                    id="verification-description"
                    value={verificationUpload.description}
                    onChange={(event) => setVerificationUpload((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Optional notes about who requested this file."
                    className="flex min-h-[96px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-slate-400 focus-visible:border-slate-400"
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="space-y-1 pr-4">
                    <Label htmlFor="verification-root-switch">Serve at root</Label>
                    <p className="text-sm text-slate-600">
                      Enable only when the network requires the file at `/{'{filename}'}` instead of `/network-verification/{'{filename}'}`.
                    </p>
                  </div>
                  <Switch
                    id="verification-root-switch"
                    checked={verificationUpload.serveAtRoot}
                    onCheckedChange={(checked) => setVerificationUpload((prev) => ({ ...prev, serveAtRoot: checked }))}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={resetVerificationUploadForm} disabled={verificationSaving}>
                  Reset
                </Button>
                <Button onClick={handleVerificationUpload} disabled={verificationSaving} className="min-w-[220px]">
                  {verificationSaving ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Verification File
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>Manage active verification URLs and delete files that are no longer needed.</CardDescription>
              </CardHeader>
              <CardContent>
                {verificationLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading verification files...
                  </div>
                ) : verificationFiles.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                    No verification files uploaded yet.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filename</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Public URL</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verificationFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-900">{file.filename}</p>
                              <p className="text-xs text-slate-500">{formatFileSize(file.sizeBytes)}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm text-slate-900">{file.provider || 'Not specified'}</p>
                              {file.description ? <p className="text-xs text-slate-500">{file.description}</p> : null}
                            </div>
                          </TableCell>
                          <TableCell>
                            <a
                              href={file.publicUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="break-all text-sm text-blue-600 hover:text-blue-700"
                            >
                              {file.publicPath}
                            </a>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">{formatDateTime(file.uploadedAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Badge variant={file.isActive ? 'default' : 'secondary'}>
                                {file.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                              <Switch
                                checked={Boolean(file.isActive)}
                                onCheckedChange={(checked) => handleVerificationFileToggle(file, checked)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleCopyVerificationUrl(file.publicUrl)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleVerificationFileDelete(file)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Currency Conversion Rates</CardTitle>
                <CardDescription>Define how local network currencies convert into {currencyRates.baseCurrency || 'USD'} for unified reporting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currencyError && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium">Unable to load rates</p>
                      <p className="text-xs text-red-500">{currencyError}</p>
                    </div>
                  </div>
                )}

                {currencySuccess && (
                  <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium">Rates updated</p>
                      <p className="text-xs text-green-500">{currencySuccess}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {SUPPORTED_CURRENCIES.map((code) => (
                    <div key={code} className="space-y-2">
                      <Label htmlFor={`rate-${code}`}>{code} to {currencyRates.baseCurrency || 'USD'}</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id={`rate-${code}`}
                          value={currencyRates.rates[code] ?? ''}
                          onChange={(event) => handleCurrencyRateChange(code, event.target.value)}
                          placeholder="1.00"
                          inputMode="decimal"
                        />
                        <Badge variant="outline">1 {currencyRates.baseCurrency || 'USD'}</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {isCurrencyLoading && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading latest currency rates...
                  </div>
                )}

                {currencyUpdatedAt && (
                  <p className="text-xs text-slate-500">Last updated: {new Date(currencyUpdatedAt).toLocaleString()}</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSaveCurrencyRates}
                  disabled={isCurrencySaving || isCurrencyLoading}
                  className="min-w-[160px]"
                >
                  {isCurrencySaving ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Rates
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Network Currency Mapping</CardTitle>
                <CardDescription>These mappings drive Rakuten multi-country reporting and conversions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { country: 'United States', networkId: 1, currency: 'USD' },
                    { country: 'United Kingdom', networkId: 3, currency: 'GBP' },
                    { country: 'France', networkId: 7, currency: 'EUR' },
                    { country: 'Germany', networkId: 9, currency: 'EUR' },
                    { country: 'Canada', networkId: 5, currency: 'CAD' },
                    { country: 'Brazil', networkId: 8, currency: 'BRL' },
                    { country: 'Japan', networkId: 11, currency: 'JPY' },
                    { country: 'Australia', networkId: 41, currency: 'AUD' },
                  ].map((network) => (
                    <div key={network.country} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                      <div>
                        <p className="font-medium text-slate-900">{network.country}</p>
                        <p className="text-xs text-slate-500">Network #{network.networkId}</p>
                      </div>
                      <Badge>{network.currency}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
                <CardDescription>Customize the appearance of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme Mode</Label>
                    <p className="text-sm text-slate-600">Choose between light and dark themes</p>
                  </div>
                  <div className="flex items-center gap-2 border rounded-lg p-1">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      System
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-slate-600">Reduce padding for more compact layout</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-sm text-slate-600">Increase contrast for better accessibility</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 ">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600 mt-2">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
      <TeamMemberModal
        isOpen={teamModalOpen}
        mode={teamModalMode}
        onClose={handleCloseTeamModal}
        onSubmit={handleSubmitTeamMember}
        initialData={teamModalMember}
        isSaving={teamModalSaving}
        roleOptions={TEAM_ROLE_OPTIONS}
        sectionOptions={ADMIN_SECTION_OPTIONS}
      />
    </div>
  );
}


