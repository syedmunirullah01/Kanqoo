import React from 'react';
import TermsSection from '@/app/components/website/terms-and-conditions/TermsSection';

export const metadata = {
  title: 'Terms & Conditions | Kanqoo',
  description: 'Read the official Terms and Conditions for accessing and using the Kanqoo platform.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-20">
      <TermsSection />
    </div>
  );
}