import React from 'react';
import CompliancePolicySection from '@/app/components/website/compliance/CompliancePolicySection';

export const metadata = {
  title: 'Compliance Policy | Kanqoo',
  description: 'Understand Kanqoo guidelines on brand safety, regulatory adherence, and publisher compliance.',
};

export default function CompliancePolicyPage() {
  return (
    <div className="pt-20">
      <CompliancePolicySection />
    </div>
  );
}
