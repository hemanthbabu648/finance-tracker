import {
  IconCoinRupee,
  IconReceipt,
  IconReportAnalytics,
} from '@tabler/icons-react';
import React from 'react';

const ReportsBillsCard = () => {
  const activities = [
    {
      title: 'BSNL Bill Generated',
      category: 'Finance',
      time: '2 hours ago',
      icon: <IconReceipt className="h-4 w-4" />,
    },
    {
      title: 'Cash Inflow Updated',
      category: 'Income',
      time: '4 hours ago',
      icon: <IconCoinRupee className="h-4 w-4" />,
    },
    {
      title: 'Monthly Statement Generated',
      category: 'Finance',
      time: '6 hours ago',
      icon: <IconReportAnalytics className="h-4 w-4" />,
    },
  ];
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="rounded-lg bg-gray-100 p-2">{activity.icon}</div>
          <div>
            <h3 className="font-medium">{activity.title}</h3>
            <p className="text-sm text-gray-500">{activity.category}</p>
            <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsBillsCard;
