import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface OccupancyChartProps {
  occupiedPercentage?: number;
  availablePercentage?: number;
}

export const OccupancyChart: React.FC<OccupancyChartProps> = ({
  occupiedPercentage = 65,
  availablePercentage = 35,
}) => {
  const data = [
    { name: 'Occupied', value: occupiedPercentage },
    { name: 'Available', value: availablePercentage },
  ];

  return (
    <div className="card bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Occupancy Rate
      </h3>
      <div className="flex items-center justify-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#FF6B6B" />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-brand-primary rounded" />
            <span className="text-gray-700 dark:text-gray-300">
              Occupied: {occupiedPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <span className="text-gray-700 dark:text-gray-300">
              Available: {availablePercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
