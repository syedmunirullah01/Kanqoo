import React from 'react';
import PublisherOnboardingSection from '@/app/components/website/publisher-onboarding/PublisherOnboardingSection';

export const metadata = {
  title: 'Publisher Onboarding | Kanqoo',
  description: 'Learn how publishers, creators, and digital marketers apply, get approved, and start earning with Kanqoo.',
};

export default function PublisherOnboardingPage() {
  return (
    <div className="pt-20">
      <PublisherOnboardingSection />
    </div>
  );
}
