import React from 'react';

interface ProgressChartProps {
  data: number[];
  labels: string[];
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, labels, title }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((value, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 w-12">
              {labels[index]}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-900 w-10">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;