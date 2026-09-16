import React from 'react';
import ImprintSection from '@/app/components/website/imprint/ImprintSection';

export const metadata = {
  title: 'Imprint | Kanqoo',
  description: 'Legal disclosure, company info, address, and official contacts for Kanqoo.',
};

export default function ImprintPage() {
  return (
    <div className="pt-20">
      <ImprintSection />
    </div>
  );
}
