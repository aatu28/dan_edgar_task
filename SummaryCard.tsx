import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, accent }) => {
  return (
    <div className={`rounded-lg p-6 ${accent ? 'bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-600' : 'bg-gray-800 border border-gray-700'}`}>
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className={`text-3xl font-bold ${accent ? 'text-emerald-100' : 'text-white'} mb-1`}>
        {value}
      </div>
      {subtitle && (
        <p className={`text-sm ${accent ? 'text-emerald-200' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
