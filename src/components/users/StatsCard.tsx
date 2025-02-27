import { StatsResponse } from '@/types/ui';
import { IconArrowUpRight } from '@tabler/icons-react';
import React from 'react';

type StatsCardProps = {
    stats: StatsResponse[];
    loading: boolean;
};

const StatsCard: React.FC<StatsCardProps> = ({ stats = [], loading }) => {
    return (
        <div>
            {!loading && stats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div className="bg-white rounded-xl shadow-sm p-6" key={index + stat.title}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                    {stat.icon}
                                </div>
                                {stat.change && (
                                    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                        {stat.change}
                                        <IconArrowUpRight className="w-4 h-4" />
                                    </span>
                                )}
                            </div>
                            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{stat.category ? stat.category : stat.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                // Fallback UI (loading skeleton)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
                                <div className="w-10 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-32 h-8 bg-gray-300 rounded mb-1"></div>
                            <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default StatsCard