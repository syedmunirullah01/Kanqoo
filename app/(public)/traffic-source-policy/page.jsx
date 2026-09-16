import React from 'react';
import TrafficSourceSection from '@/app/components/website/traffic-source/TrafficSourceSection';

export const metadata = {
  title: 'Traffic Source Policy | Kanqoo',
  description: 'Approved marketing channels, PPC rules, and restricted traffic rules for publishers on Kanqoo.',
};

export default function TrafficSourcePolicyPage() {
  return (
    <div className="pt-20">
      <TrafficSourceSection />
    </div>
  );
}
