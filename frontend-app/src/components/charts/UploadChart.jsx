import React, { lazy, Suspense } from 'react';

// Lazy load recharts to reduce initial bundle size
const ChartComponents = lazy(() => 
  import('recharts').then(module => ({
    default: {
      ResponsiveContainer: module.ResponsiveContainer,
      LineChart: module.LineChart,
      Line: module.Line,
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

const UploadChartContent = ({ data, components }) => {
  const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } = components;
  
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const UploadChart = ({ data = [] }) => (
  <Suspense fallback={<ChartLoadingFallback />}>
    <ChartComponents>
      {(components) => <UploadChartContent data={data} components={components} />}
    </ChartComponents>
  </Suspense>
);

export default UploadChart;
