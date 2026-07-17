import './globals.css';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/app/components/AuthProvider';
import DynamicFavicon from '@/app/components/DynamicFavicon';
import CustomScrollbar from '@/app/components/CustomScrollbar';
import ScrollToTop from '@/app/components/ScrollToTop';

import { getSiteBranding } from '@/lib/siteBranding';

export async function generateMetadata() {
  const branding = await getSiteBranding();
  const siteName = branding?.siteName || 'Kanqoo';
  const favicon = branding?.faviconUrl || '/favicon.ico';

  return {
    title: `${siteName} - Influencer Network Platform`,
    description: 'Connect brands with creators through affiliate marketing',
    icons: {
      icon: favicon,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DynamicFavicon />
          <CustomScrollbar />
          <ScrollToTop />
          {children}
          <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
          />
        </AuthProvider>
      </body>
    </html>
  );
}
