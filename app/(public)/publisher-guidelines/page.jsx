import React from 'react';
import PublisherGuidelinesSection from '@/app/components/website/publisher-guidelines/PublisherGuidelinesSection';

export const metadata = {
  title: 'Publisher Guidelines | Kanqoo',
  description: 'Expected behavior, content standards, and best practices for publishers and affiliates using Kanqoo.',
};

export default function PublisherGuidelinesPage() {
  return (
    <div className="pt-20">
      <PublisherGuidelinesSection />
    </div>
  );
}
