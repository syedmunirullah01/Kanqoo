import React from 'react';
import FAQSection from '@/app/components/website/home/FAQSection';

export const metadata = {
  title: 'Frequently Asked Questions | Kanqoo',
  description: 'Everything you need to know about Kanqoo, our publisher network, campaign tracking, and payouts.',
};

export default function FAQsPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <FAQSection />
    </div>
  );
}
