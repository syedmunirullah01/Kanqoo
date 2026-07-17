'use client';

import { useEffect } from 'react';

export default function DynamicFavicon() {
  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const response = await fetch('/api/public/branding', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (data?.faviconUrl) {
          // Update any existing rel="icon" links
          const links = document.querySelectorAll("link[rel*='icon']");
          if (links.length > 0) {
            links.forEach((link) => {
              link.href = data.faviconUrl;
            });
          } else {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = data.faviconUrl;
            document.head.appendChild(link);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic favicon:', error);
      }
    };

    fetchBranding();
  }, []);

  return null;
}
