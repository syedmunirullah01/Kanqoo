import React from 'react';
import CreatorTipsSection from '@/app/components/website/creator-tips/CreatorTipsSection';

export const metadata = {
  title: 'Top Creator Tips | Kanqoo',
  description: 'Maximize your affiliate earnings and audience growth with powerful strategies, content tips, and analytics guides from Kanqoo.',
};

export default function CreatorTipsPage() {
  return (
    <div className="pt-20">
      <CreatorTipsSection />
    </div>
  );
}
