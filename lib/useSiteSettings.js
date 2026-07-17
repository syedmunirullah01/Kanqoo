'use client';

import { useEffect, useState } from 'react';
import { getDefaultBranding, withLegacyBrandingAliases } from '@/lib/siteBranding';

export function useSiteSettings() {
  const [settings, setSettings] = useState(() => withLegacyBrandingAliases(getDefaultBranding()));

  useEffect(() => {
    let active = true;

    fetch('/api/public/branding', { cache: 'no-store' })
      .then((response) => response.json())
      .then((payload) => {
        if (!active) return;
        setSettings(withLegacyBrandingAliases(payload || {}));
      })
      .catch(() => {
        if (active) setSettings(withLegacyBrandingAliases(getDefaultBranding()));
      });

    return () => {
      active = false;
    };
  }, []);

  return settings;
}
