"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteSettings } from '@/lib/useSiteSettings';

const NAV_ITEMS = {
  admin: [
    { label: 'Home', href: '/admin' },
    { label: 'Merchants', href: '/admin/merchants' },
    { label: 'Publishers', href: '/admin/publishers' },
    { label: 'Networks', href: '/admin/networks' },
    { label: 'Reporting', href: '/admin/reporting' },
    { label: 'Settings', href: '/admin/settings' },
  ],
  'social media manager': [
    { label: 'Publishers', href: '/admin/publishers' },
    { label: 'Reporting', href: '/admin/reporting' },
  ],
  'data entry': [
    { label: 'Merchants', href: '/admin/merchants' },
    { label: 'Networks', href: '/admin/networks' },
    { label: 'Reporting', href: '/admin/reporting' },
  ],
  publisher: [
    { label: 'Home', href: '/publisher' },
    { label: 'Marketplace', href: '/publisher/marketplace' },
    { label: 'Reporting', href: '/publisher/reporting' },
    { label: 'Settings', href: '/publisher/settings' },
  ],
};

const DashboardHeader = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const siteSettings = useSiteSettings();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setIsProfileDropdownOpen(false);

      // Sign out with NextAuth
      await signOut({
        redirect: true,
        callbackUrl: '/login'
      });
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
      toast.error('Logout Failed', {
        description: 'Failed to logout. Please try again.'
      });
    }
  };

  const activeRole = useMemo(() => {
    const sessionRole = session?.user?.role?.toLowerCase();
    if (sessionRole && NAV_ITEMS[sessionRole]) {
      return sessionRole;
    }

    const pathSegment = pathname?.split('/')?.[1]?.toLowerCase();
    return NAV_ITEMS[pathSegment] ? pathSegment : 'admin';
  }, [pathname, session?.user?.role]);

  const allowedSections = useMemo(
    () => (Array.isArray(session?.user?.allowedAdminSections) ? session.user.allowedAdminSections : []),
    [session?.user?.allowedAdminSections]
  );
  const navItemsForRole = NAV_ITEMS[activeRole] ?? NAV_ITEMS.admin;
  const filterNavItemsForRole = useMemo(() => {
    if (activeRole === 'admin' || allowedSections.includes('*')) {
      return navItemsForRole;
    }
    if (['social media manager', 'data entry'].includes(activeRole)) {
      const allowedSet = new Set(allowedSections);
      return navItemsForRole.filter((item) => allowedSet.has(item.href));
    }
    return navItemsForRole;
  }, [activeRole, navItemsForRole, allowedSections]);
  const currentNavItems = filterNavItemsForRole;
  const isPublisherRole = activeRole === 'publisher';
  const adminFamilyRoles = ['admin', 'social media manager', 'data entry'];
  const isAdminLikeRole = adminFamilyRoles.includes(activeRole);
  const headerTitle = isPublisherRole
    ? siteSettings.siteName
    : siteSettings.logoUrl
      ? 'Admin'
      : `${siteSettings.siteName} Admin`;
  const headerBadgeLabel = isPublisherRole ? 'Publisher Dashboard' : 'Admin Dashboard';
  const defaultAdminRoute = currentNavItems[0]?.href || '/admin';
  const profileHref = isPublisherRole ? '/publisher/settings' : defaultAdminRoute;
  const settingsHref = isPublisherRole ? '/publisher/settings' : '/admin/settings';
  const canAccessSettingsLink = activeRole === 'admin' || isPublisherRole;
  const fallbackDisplayName = session?.user?.name || (isPublisherRole ? 'Publisher' : 'Admin');

  const getLinkStyles = (href) => {
    if (!pathname) {
      return 'text-gray-700 dark:text-gray-300 font-semibold transition-colors';
    }

    const isActive =
      pathname === href ||
      pathname.startsWith(`${href}/`);

    return isActive
      ? 'text-primary dark:text-[#4BA4B4] font-semibold transition-colors hover:text-primary dark:hover:text-[#4BA4B4]'
      : 'text-gray-700 dark:text-gray-300 font-semibold hover:text-primary dark:hover:text-[#4BA4B4] transition-colors';
  };

  return (
    <header className="bg-white dark:bg-[#02010a] shadow-sm border-b-4 border-b-[var(--color-secondary)] dark:border-b-[#4BA4B4] flex items-center px-8 py-4 relative z-[100] transition-colors duration-300">
      <div className="flex items-center gap-3">
        {siteSettings.logoUrl ? (
          <img
            src={siteSettings.logoUrl}
            alt={siteSettings.logoAlt || siteSettings.siteName}
            className="h-9 w-auto max-w-[150px] object-contain"
          />
        ) : null}
        <span className="text-2xl font-black text-primary dark:text-[#4BA4B4] tracking-tight">{headerTitle}</span>
        <span className="bg-primary/10 dark:bg-[#4BA4B4]/20 text-primary dark:text-[#4BA4B4] px-3 py-1 rounded-full text-xs font-semibold ml-2">{headerBadgeLabel}</span>
      </div>

      <nav className="flex-1 flex justify-center items-center gap-8">
        {currentNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={getLinkStyles(item.href)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-6">

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            disabled={isLoggingOut}
          >
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=48&h=48&facepad=2"
              alt={fallbackDisplayName}
              className="w-10 h-10 rounded-full border-2 border-primary dark:border-[#4BA4B4]"
            />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {fallbackDisplayName}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="fixed right-8 mt-2 w-48 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg dark:shadow-2xl py-2 border border-gray-100 dark:border-gray-800 z-[101] transition-colors duration-300">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
                  {session?.user?.email || "admin@kanqoo.com"}
                </p>
              </div>

              <Link
                href={profileHref}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-[#4BA4B4] transition-colors"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <User className="w-4 h-4" />
                {isAdminLikeRole ? 'Admin Home' : 'Your Profile'}
              </Link>

              {canAccessSettingsLink && (
                <Link
                  href={settingsHref}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-[#4BA4B4] transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              )}

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? (
                  <>
                    <span>Signing out...</span>
                    <div className="ml-auto w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <span>Sign out</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay when logging out */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-[102]">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 shadow-xl flex items-center gap-4 transition-colors duration-300">
            <div className="w-6 h-6 border-3 border-primary dark:border-[#4BA4B4] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 dark:text-gray-200 font-semibold">Signing out...</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
