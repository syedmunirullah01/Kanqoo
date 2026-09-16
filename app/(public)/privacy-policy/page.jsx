import React from 'react';
import PrivacySection from '@/app/components/website/privacy-policy/PrivacySection';

export const metadata = {
  title: 'Privacy Policy | Kanqoo',
  description: 'Understand how Kanqoo collects, uses, and safeguards your personal data and privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <PrivacySection />
    </div>
  );
}