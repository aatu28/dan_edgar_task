import React, { useMemo } from 'react';
import { TrendingUp, Package, ShoppingCart } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { CorrelationChart } from './CorrelationChart';
import { PlatformPerformance } from './PlatformPerformance';
import { InsightsSection } from './InsightsSection';
import {
  calculateTotalRevenue,
  calculateTotalOrders,
  getTopProduct,
  getLagAdjustedData,
  getPlatformPerformance,
} from '../utils/dataProcessing';

export const Dashboard: React.FC = () => {
  const totalRevenue = useMemo(() => calculateTotalRevenue(), []);
  const totalOrders = useMemo(() => calculateTotalOrders(), []);
  const topProduct = useMemo(() => getTopProduct(), []);
  const lagAdjustedData = useMemo(() => getLagAdjustedData(2), []);
  const platformPerformance = useMemo(() => getPlatformPerformance(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-8 h-8 text-emerald-500" />
            <h1 className="text-3xl font-bold text-white">Monsieur Grooming</h1>
          </div>
          <p className="text-gray-400 text-lg">Content Performance Insights Dashboard</p>
          <p className="text-emerald-400 text-sm mt-1">December 1-16, 2025</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Top Revenue Driver"
            value={topProduct.name}
            subtitle={`${topProduct.unitsSold} units sold • £${topProduct.price} each`}
            accent
          />
          <SummaryCard
            title="Total Revenue"
            value={`£${totalRevenue.toLocaleString()}`}
            subtitle="16-day period"
          />
          <SummaryCard
            title="Total Orders"
            value={totalOrders}
            subtitle={`Avg £${Math.round(totalRevenue / totalOrders)} per order`}
          />
        </div>

        <div className="mb-8">
          <CorrelationChart data={lagAdjustedData} />
        </div>

        <div className="mb-8">
          <PlatformPerformance platforms={platformPerformance} />
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-emerald-600">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Key Finding: The 48-Hour Effect</h3>
              <p className="text-gray-300 leading-relaxed">
                Content views directly correlate with sales revenue with a <span className="text-emerald-400 font-semibold">2-day lag</span>.
                When you post high-reach content on Wednesday, sales spike on Friday. This pattern is consistent across all content types,
                with TikTok videos showing the strongest correlation at 60k+ average views per video.
              </p>
            </div>
          </div>
        </div>

        <InsightsSection />

        <footer className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              Data analysis powered by content and sales metrics
            </p>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-500 text-sm">Monsieur Grooming Analytics</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
