// app\(auth)\layout.js
import '@/app/globals.css';
import Navbar from "@/app/components/website/layout/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#05070F] via-[#0A1128] to-[#12224A] overflow-x-hidden relative">
      
      {/* Global Navbar for Auth Pages */}
      <Navbar />

      {/* Background Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none"
      />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Centered wrapper */}
      <main className="min-h-screen w-full flex items-center justify-center p-4 pt-24 sm:pt-28 pb-8 sm:pb-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
