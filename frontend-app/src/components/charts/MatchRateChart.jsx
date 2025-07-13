import React, { lazy, Suspense } from 'react';

// Lazy load recharts to reduce initial bundle size
const ChartComponents = lazy(() => 
  import('recharts').then(module => ({
    default: {
      ResponsiveContainer: module.ResponsiveContainer,
      AreaChart: module.AreaChart,
      Area: module.Area,
      XAxis: module.XAxis,
      YAxis: module.YAxis,
      Tooltip: module.Tooltip,
      CartesianGrid: module.CartesianGrid
    }
  }))
);

const ChartLoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
    <div className="animate-pulse text-gray-400">Loading chart...</div>
  </div>
);

const MatchRateChartContent = ({ data, components }) => {
  const { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } = components;
  
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Area type="monotone" dataKey="matchRate" stroke="#10b981" fill="#d1fae5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MatchRateChart = ({ data = [] }) => (
  <Suspense fallback={<ChartLoadingFallback />}>
    <ChartComponents>
      {(components) => <MatchRateChartContent data={data} components={components} />}
    </ChartComponents>
  </Suspense>
);

export default MatchRateChart;
