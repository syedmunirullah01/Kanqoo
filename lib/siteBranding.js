export const BRANDING_SETTINGS_KEY = 'branding';

export function getDefaultBranding() {
  return {
    siteName: 'Kanqoo',
    logoUrl: '',
    footerLogoUrl: '',
    logoAlt: 'Kanqoo',
    faviconUrl: '',
  };
}

const cleanString = (value) => (typeof value === 'string' ? value.trim() : '');

export function normalizeBranding(value = {}) {
  const defaults = getDefaultBranding();
  const siteName = cleanString(value.siteName) || defaults.siteName;
  const logoUrl = cleanString(value.logoUrl || value.siteLogoUrl);
  const footerLogoUrl = cleanString(value.footerLogoUrl);
  const logoAlt = cleanString(value.logoAlt || value.siteLogoAlt) || siteName;
  const faviconUrl = cleanString(value.faviconUrl);

  return {
    siteName,
    logoUrl,
    footerLogoUrl,
    logoAlt,
    faviconUrl,
  };
}

export function withLegacyBrandingAliases(value = {}) {
  const branding = normalizeBranding(value);

  return {
    ...branding,
    siteLogoUrl: branding.logoUrl,
    siteLogoAlt: branding.logoAlt,
  };
}

export async function getSiteBranding() {
  try {
    const [{ default: dbConnect }, { default: SiteSetting }] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/SiteSetting'),
    ]);
    await dbConnect();
    const setting = await SiteSetting.findOne({ key: BRANDING_SETTINGS_KEY }).lean();
    return normalizeBranding(setting?.value || {});
  } catch (error) {
    console.error('getSiteBranding error:', error);
    return getDefaultBranding();
  }
}

export async function saveSiteBranding(payload = {}) {
  const branding = normalizeBranding(payload);
  const [{ default: dbConnect }, { default: SiteSetting }] = await Promise.all([
    import('@/lib/mongodb'),
    import('@/models/SiteSetting'),
  ]);

  await dbConnect();
  const setting = await SiteSetting.findOneAndUpdate(
    { key: BRANDING_SETTINGS_KEY },
    {
      $set: {
        key: BRANDING_SETTINGS_KEY,
        value: branding,
        updatedAt: new Date(),
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return normalizeBranding(setting?.value || branding);
}
