// lib/networks/awin/normalizer.js
export function formatCommissionRange(commissionRange, currencyCode) {
  if (!Array.isArray(commissionRange) || commissionRange.length === 0) {
    return 'Check Program Terms';
  }

  const range = commissionRange[0];
  if (!range) return 'Check Program Terms';

  const minNum = parseFloat(range.min);
  const maxNum = parseFloat(range.max);
  const type = String(range.type || '').toLowerCase();

  if (!Number.isFinite(minNum) && !Number.isFinite(maxNum)) {
    return 'Check Program Terms';
  }

  if (type === 'percentage') {
    if (minNum === maxNum) return `${minNum}%`;
    return `${minNum}% - ${maxNum}%`;
  }

  const currency = currencyCode || '';
  if (minNum === maxNum) {
    return currency ? `${currency} ${minNum}` : `${minNum}`;
  }

  return currency ? `${currency} ${minNum} - ${currency} ${maxNum}` : `${minNum} - ${maxNum}`;
}

export function normalizeProgrammeListItem(item) {
  if (!item?.id || !item?.name) return null;

  const countryCode = item.primaryRegion?.countryCode || '';

  return {
    mid: String(item.id),
    name: item.name,
    url: item.displayUrl || item.url || '',
    description: item.description || '',
    status: item.status === 'Active' ? 'active' : String(item.status || 'unknown').toLowerCase(),
    commission: 'N/A',
    returnDays: '',
    network: 'awin',
    country: countryCode,
    categories: item.primarySector ? [item.primarySector] : ['General'],
    shipsTo: countryCode ? [countryCode] : [],
    partnershipStatus: 'Joined',
    canPartner: true,
    logoUrl: item.logoUrl || '',
    raw: item,
  };
}

export function normalizeProgrammeDetails(detail) {
  const info = detail?.programmeInfo || {};
  if (!info?.id || !info?.name) return null;

  const countryCode = info.primaryRegion?.countryCode || '';
  const membershipStatus = info.membershipStatus || 'Joined';
  const active = info.linkStatus === 'online' || membershipStatus === 'Joined';

  return {
    mid: String(info.id),
    name: info.name,
    url: info.displayUrl || info.url || '',
    description: info.description || '',
    status: active ? 'active' : 'unknown',
    commission: formatCommissionRange(detail.commissionRange, info.currencyCode),
    returnDays: '',
    averagePaymentTime: detail.kpi?.averagePaymentTime ? String(detail.kpi.averagePaymentTime) : '',
    network: 'awin',
    country: countryCode,
    categories: info.primarySector ? [info.primarySector] : ['General'],
    shipsTo: countryCode ? [countryCode] : [],
    partnershipStatus: membershipStatus,
    canPartner: membershipStatus === 'Joined',
    logoUrl: info.logoUrl || '',
    raw: detail,
  };
}
