import React from 'react';
import { Instagram, Video } from 'lucide-react';

interface PlatformData {
  platform: string;
  totalViews: number;
  avgViews: number;
  avgNextDayRevenue: number;
  postCount: number;
}

interface PlatformPerformanceProps {
  platforms: PlatformData[];
}

export const PlatformPerformance: React.FC<PlatformPerformanceProps> = ({ platforms }) => {
  const getPlatformIcon = (platform: string) => {
    if (platform === 'instagram') return <Instagram className="w-6 h-6" />;
    if (platform === 'tiktok') return <Video className="w-6 h-6" />;
    return null;
  };

  const topPlatform = platforms.sort((a, b) => b.avgNextDayRevenue - a.avgNextDayRevenue)[0];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white text-lg font-semibold mb-4">
        Platform Performance: Next-Day Revenue Efficiency
      </h3>
      <div className="space-y-4">
        {platforms.map((platform) => {
          const isTop = platform.platform === topPlatform.platform;
          return (
            <div
              key={platform.platform}
              className={`p-4 rounded-lg ${
                isTop
                  ? 'bg-gradient-to-r from-emerald-900/50 to-emerald-800/30 border border-emerald-600'
                  : 'bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${isTop ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {getPlatformIcon(platform.platform)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-white font-semibold capitalize">
                        {platform.platform}
                      </h4>
                      {isTop && (
                        <span className="px-2 py-1 text-xs font-medium bg-emerald-500 text-white rounded">
                          Top Performer
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {platform.postCount} posts • Avg {(platform.avgViews / 1000).toFixed(1)}k views per post
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${isTop ? 'text-emerald-400' : 'text-white'}`}>
                    £{platform.avgNextDayRevenue}
                  </div>
                  <p className="text-gray-400 text-sm">Avg Next-Day Revenue</p>
                </div>
              </div>
              <div className="mt-3 h-2 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className={`h-full ${isTop ? 'bg-emerald-500' : 'bg-gray-600'}`}
                  style={{
                    width: `${(platform.avgNextDayRevenue / topPlatform.avgNextDayRevenue) * 100}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
