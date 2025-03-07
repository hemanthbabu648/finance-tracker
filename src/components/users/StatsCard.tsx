import { IconArrowUpRight } from '@tabler/icons-react';
import React from 'react';

import { StatsResponse } from '@/types/ui';

type StatsCardProps = {
  stats: StatsResponse[];
  loading: boolean;
};

const StatsCard: React.FC<StatsCardProps> = ({ stats = [], loading }) => {
  return (
    <div>
      {!loading && stats.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              className="rounded-xl bg-white p-6 shadow-sm"
              key={index + stat.title}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                    {stat.change}
                    <IconArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {stat.category ? stat.category : stat.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Fallback UI (loading skeleton)
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="h-12 w-12 rounded-lg bg-gray-200 p-3"></div>
                <div className="h-4 w-10 rounded bg-gray-200"></div>
              </div>
              <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
              <div className="mb-1 h-8 w-32 rounded bg-gray-300"></div>
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
