import { IconCoinRupee, IconReceipt, IconReportAnalytics, } from '@tabler/icons-react';
import React from 'react'



const ReportsBillsCard = () => {

    const activities = [
        {
            title: 'BSNL Bill Generated',
            category: 'Finance',
            time: '2 hours ago',
            icon: <IconReceipt className="w-4 h-4" />,
        },
        {
            title: 'Cash Inflow Updated',
            category: 'Income',
            time: '4 hours ago',
            icon: <IconCoinRupee className="w-4 h-4" />,
        },
        {
            title: 'Monthly Statement Generated',
            category: 'Finance',
            time: '6 hours ago',
            icon: <IconReportAnalytics className="w-4 h-4" />,
        },

    ];
    return (
        <div className="space-y-6">
            {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        {activity.icon}
                    </div>
                    <div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.category}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReportsBillsCard