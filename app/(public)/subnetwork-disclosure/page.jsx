import React from 'react';
import SubnetworkSection from '@/app/components/website/subnetwork/SubnetworkSection';

export const metadata = {
  title: 'Subnetwork Disclosure | Kanqoo',
  description: 'Learn about Kanqoo master subnetwork architecture, subpublisher vetting, and tracking transparency.',
};

export default function SubnetworkDisclosurePage() {
  return (
    <div className="pt-20">
      <SubnetworkSection />
    </div>
  );
}
