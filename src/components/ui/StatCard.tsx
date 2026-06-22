import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <div className="card bg-white dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
        <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('primary', 'brand-primary/20')}`}>
        {icon}
      </div>
    </div>
  </div>
);
