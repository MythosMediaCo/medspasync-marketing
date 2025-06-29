import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MatchRateChart = ({ data = [] }) => (
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

export default MatchRateChart;
