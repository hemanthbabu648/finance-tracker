import { statsType } from '@/types/finance'
import { IconArrowUpRight, IconMoneybag, IconPigMoney, IconReportMoney, IconWallet } from '@tabler/icons-react'
import React from 'react'

type StatsCardProps = {
    stats?: statsType
}


const StatsCard: React.FC<StatsCardProps> = (

) => {

    const stats = [
        {
            title: 'Total Balance',
            value: '$12,450',
            change: '+10%',
            category: 'Finance',
            icon: <IconWallet className="w-6 h-6 text-blue-600" />,
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Cash Inflow',
            value: '$24',
            change: '+4',
            category: 'Income',
            icon: <IconMoneybag className="w-6 h-6 text-purple-600" />,
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Cash Outflow',
            value: '$12',
            change: '-15%',
            category: 'Expense',
            icon: <IconReportMoney className="w-6 h-6 text-red-600" />,
            bgColor: 'bg-red-100',
        },
        {
            title: 'Savings',
            value: '$8',
            change: '+2',
            category: 'Savings',
            icon: <IconPigMoney className="w-6 h-6 text-orange-600" />,
            bgColor: 'bg-orange-50',
        },
    ];
    return (
        <>
            {stats.map((stat, index) => (
                <div className="bg-white rounded-xl shadow-sm p-6" key={index + stat.title}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.bgColor} p-3 rounded-lg`}>
                            {stat.icon}
                        </div>
                        <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                            {stat.change}
                            <IconArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.category}</p>
                </div>
            ))}

        </>
    )
}

export default StatsCard