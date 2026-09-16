import React from 'react';
import HowItWorksSection from '@/app/components/website/how-it-works/HowItWorksSection';

export const metadata = {
  title: 'How Kanqoo Works | Kanqoo',
  description: 'Learn how Kanqoo connects publishers with top affiliate opportunities, tracking, attribution, and reporting.',
};

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      <HowItWorksSection />
    </div>
  );
}
