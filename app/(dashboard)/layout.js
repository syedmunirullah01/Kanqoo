'use client';

import { SessionProvider } from "next-auth/react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ToastProvider from "../components/ToastProvider";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader />
          {children}
        </div>
      </ToastProvider>
    </SessionProvider>
  );
}
