import { Store, Link2, TrendingUp } from 'lucide-react';

export default function MarketplaceHeader({ totalAdvertisers, activeLinks, ctr, resultCount }) {
  const safeTotal = Number.isFinite(totalAdvertisers) ? totalAdvertisers : 0;
  const safeActive = Number.isFinite(activeLinks) ? activeLinks : 0;
  const safeCtr = Number.isFinite(ctr) ? ctr : null;
  const safeVisible = Number.isFinite(resultCount) ? resultCount : 0;

  const catalogueCoverage = safeTotal > 0 ? Math.round((safeVisible / safeTotal) * 100) : 0;
  const activeCoverage = safeTotal > 0 ? Math.round((safeActive / safeTotal) * 100) : 0;

  const stats = [
    {
      label: "Total Advertisers",
      value: safeTotal.toLocaleString(),
      icon: Store,
      color: "blue",
      badge: safeTotal === safeVisible
        ? "Entire catalogue in view"
        : `${safeVisible.toLocaleString()} shown (${catalogueCoverage}% of total)`,
      description: "Brands available inside Kanqoo"
    },
    {
      label: "Live Tracking Links",
      value: safeActive.toLocaleString(),
      icon: Link2,
      color: "emerald",
      badge: safeTotal > 0
        ? `${activeCoverage}% of catalogue linked`
        : "No catalogue data yet",
      description: safeActive > 0
        ? "Links currently delivering data"
        : "Activate a link to start tracking"
    },
    {
      label: "Click-through Rate",
      value: safeCtr !== null ? `${safeCtr.toFixed(1)}%` : "—",
      icon: TrendingUp,
      color: "violet",
      badge: safeActive > 0
        ? `Across ${safeActive.toLocaleString()} active links`
        : "No click data yet",
      description: "Rolling performance across active links"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        lightBg: 'bg-blue-50',
        border: 'border-blue-100'
      },
      emerald: {
        bg: 'bg-emerald-500',
        text: 'text-emerald-600',
        lightBg: 'bg-emerald-50',
        border: 'border-emerald-100'
      },
      violet: {
        bg: 'bg-violet-500',
        text: 'text-violet-600',
        lightBg: 'bg-violet-50',
        border: 'border-violet-100'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10 ">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div
            key={index}
            className="group relative bg-white rounded-2xl border-none p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 rounded-xl ${colorClasses.lightBg} ${colorClasses.border} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
              </div>
              <div className={`px-3 py-1.5 rounded-full ${colorClasses.lightBg} ${colorClasses.border}`}>
                <span className={`text-xs font-semibold ${colorClasses.text}`}>
                  {stat.badge}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-gray-900 font-unbounded">
                {stat.value}
              </h3>
              <p className="text-base font-semibold text-gray-700">
                {stat.label}
              </p>
              <p className="text-sm text-gray-500">
                {stat.description}
              </p>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500"
              style={{
                borderImage: 'linear-gradient(135deg, rgba(75, 164, 180, 0.35), rgba(180, 91, 75, 0.3)) 1',
                boxShadow: '0 25px 45px -28px rgba(15, 23, 42, 0.35)'
              }}
            />

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white/40 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        );
      })}
    </div>
  );
}
