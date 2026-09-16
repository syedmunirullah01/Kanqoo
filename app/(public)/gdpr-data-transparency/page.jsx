import React from 'react';
import GdprSection from '@/app/components/website/gdpr/GdprSection';

export const metadata = {
  title: 'GDPR & Data Transparency | Kanqoo',
  description: 'Learn how Kanqoo protects user privacy, enforces GDPR compliance, and handles Data Subject Access Requests.',
};

export default function GdprDataTransparencyPage() {
  return (
    <div className="pt-20">
      <GdprSection />
    </div>
  );
}
