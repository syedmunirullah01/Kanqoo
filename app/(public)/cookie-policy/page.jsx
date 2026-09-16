import React from 'react';
import CookiePolicySection from '@/app/components/website/cookie-policy/CookiePolicySection';

export const metadata = {
  title: 'Cookie Policy | Kanqoo',
  description: 'Learn how Kanqoo uses cookies and tracking technologies for security, analytics, and affiliate tracking.',
};

export default function CookiePolicyPage() {
  return (
    <div className="pt-20">
      <CookiePolicySection />
    </div>
  );
}
