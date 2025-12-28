import React, { useMemo } from 'react';

interface ChartDataPoint {
  date: string;
  revenue: number;
  views: number;
}

interface CorrelationChartProps {
  data: ChartDataPoint[];
}

export const CorrelationChart: React.FC<CorrelationChartProps> = ({ data }) => {
  const { maxRevenue, maxViews, chartData } = useMemo(() => {
    const maxRev = Math.max(...data.map(d => d.revenue));
    const maxView = Math.max(...data.map(d => d.views));

    return {
      maxRevenue: maxRev,
      maxViews: maxView,
      chartData: data,
    };
  }, [data]);

  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 60, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getYRevenue = (revenue: number) => {
    return padding.top + chartHeight - (revenue / maxRevenue) * chartHeight;
  };

  const getYViews = (views: number) => {
    return padding.top + chartHeight - (views / maxViews) * chartHeight;
  };

  const revenuePoints = chartData.map((d, i) => `${getX(i)},${getYRevenue(d.revenue)}`).join(' ');
  const viewsPoints = chartData.map((d, i) => `${getX(i)},${getYViews(d.views)}`).join(' ');

  const revenuePath = `M ${revenuePoints}`;
  const viewsPath = `M ${viewsPoints}`;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-white text-lg font-semibold mb-4">
        Content Views vs Revenue (2-Day Lag Adjusted)
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Views are shifted forward by 2 days to show impact on sales
      </p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: '600px' }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="#374151"
            strokeWidth="2"
          />

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartHeight - ratio * chartHeight;
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-400"
                >
                  £{Math.round(maxRevenue * ratio)}
                </text>
              </g>
            );
          })}

          <path
            d={`${revenuePath} L ${getX(data.length - 1)},${padding.top + chartHeight} L ${padding.left},${padding.top + chartHeight} Z`}
            fill="url(#revenueGradient)"
          />
          <polyline
            points={revenuePoints}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          {chartData.map((d, i) => (
            <circle
              key={`revenue-${i}`}
              cx={getX(i)}
              cy={getYRevenue(d.revenue)}
              r="4"
              fill="#10b981"
              className="hover:r-6 transition-all"
            />
          ))}

          <path
            d={`${viewsPath} L ${getX(data.length - 1)},${padding.top + chartHeight} L ${padding.left},${padding.top + chartHeight} Z`}
            fill="url(#viewsGradient)"
          />
          <polyline
            points={viewsPoints}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          {chartData.map((d, i) => (
            <circle
              key={`views-${i}`}
              cx={getX(i)}
              cy={getYViews(d.views)}
              r="4"
              fill="#f59e0b"
              className="hover:r-6 transition-all"
            />
          ))}

          {chartData.map((d, i) => {
            if (i % 3 === 0 || i === chartData.length - 1) {
              return (
                <text
                  key={`label-${i}`}
                  x={getX(i)}
                  y={padding.top + chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {new Date(d.date).getDate()}/{new Date(d.date).getMonth() + 1}
                </text>
              );
            }
            return null;
          })}

          <g transform={`translate(${width - padding.right + 10}, ${padding.top + 20})`}>
            <line x1="0" y1="0" x2="20" y2="0" stroke="#10b981" strokeWidth="3" />
            <text x="25" y="4" className="text-xs fill-gray-300">Revenue</text>
          </g>
          <g transform={`translate(${width - padding.right + 10}, ${padding.top + 40})`}>
            <line x1="0" y1="0" x2="20" y2="0" stroke="#f59e0b" strokeWidth="3" />
            <text x="25" y="4" className="text-xs fill-gray-300">Views (Lag-2)</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
