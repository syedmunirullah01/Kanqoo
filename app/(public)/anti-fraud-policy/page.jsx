import React from 'react';
import AntiFraudSection from '@/app/components/website/anti-fraud/AntiFraudSection';

export const metadata = {
  title: 'Anti-Fraud Policy | Kanqoo',
  description: 'Learn about Kanqoo zero-tolerance stance on traffic fraud, click validation, and publisher auditing.',
};

export default function AntiFraudPolicyPage() {
  return (
    <div className="pt-20">
      <AntiFraudSection />
    </div>
  );
}
