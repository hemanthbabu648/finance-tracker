import { statsType } from '@/types/finance'
import { IconArrowUpRight } from '@tabler/icons-react'
import React from 'react'

type StatsCardProps = {
    stats: statsType
}


const StatsCard: React.FC<StatsCardProps> = (
    {
        stats,
    }
) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`${stats.bgColor} p-3 rounded-lg`}>
                    {stats.icon}
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    {stats.change}
                    <IconArrowUpRight className="w-4 h-4" />
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stats.title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stats.category}</p>
        </div>
    )
}

export default StatsCard