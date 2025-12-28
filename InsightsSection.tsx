import React from 'react';
import { TrendingUp, Target, Lightbulb, Calendar } from 'lucide-react';

interface Insight {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: 'strategy' | 'quick-win' | 'timing';
}

export const InsightsSection: React.FC = () => {
  const insights: Insight[] = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Timing Strategy: 48-Hour Content-to-Sales Cycle',
      description:
        'Your TikTok videos (avg 60k+ views) drive significant revenue spikes exactly 48 hours later. To maximize weekend sales, schedule your high-reach TikTok unboxings and demos for Wednesday mornings.',
      type: 'strategy',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Quick Win: Instagram Posts for Immediate Impact',
      description:
        'Instagram posts drive the highest immediate conversion with £661 average next-day revenue. Use these for limited-time offers, flash sales, and urgent product announcements.',
      type: 'quick-win',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Opportunity: TikTok Viral Potential',
      description:
        'Your top-performing TikTok videos (100k+ views) correlate with 30-40% revenue increases 2 days later. Double down on reaction videos, duets, and styling challenges to amplify reach.',
      type: 'timing',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Content Mix Recommendation',
      description:
        'THE BOX drives 55% of all sales. Create more unboxing content, gift guides, and "complete routine" videos featuring THE BOX as the hero product, especially during peak buying seasons.',
      type: 'strategy',
    },
  ];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'strategy':
        return 'border-emerald-600 bg-emerald-900/20';
      case 'quick-win':
        return 'border-amber-600 bg-amber-900/20';
      case 'timing':
        return 'border-blue-600 bg-blue-900/20';
      default:
        return 'border-gray-600 bg-gray-800';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'strategy':
        return 'text-emerald-400';
      case 'quick-win':
        return 'text-amber-400';
      case 'timing':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Actionable Insights for you, Dan Edgar</h2>
        <p className="text-gray-400">Data-driven recommendations to optimize content strategy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 ${getInsightStyle(insight.type)} transition-all hover:scale-105`}
          >
            <div className="flex items-start space-x-4">
              <div className={`${getIconColor(insight.type)} flex-shrink-0`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
