import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

const AlertsCard = () => {
  const alerts = [
    {
      title: 'Amazon Prime Subscription',
      description: 'Auto renewing in 3 days',
      type: 'warning',
    },
    {
      title: 'TATA Credit Card',
      description: 'Payment due in 24 hours',
      type: 'urgent',
    },
    {
      title: 'System Update',
      description: 'New features available',
      type: 'info',
    },
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 rounded-lg p-4 ${
            alert.type === 'warning'
              ? 'bg-yellow-50'
              : alert.type === 'urgent'
                ? 'bg-red-50'
                : 'bg-blue-50'
          }`}
        >
          <div
            className={`rounded-full p-2 ${
              alert.type === 'warning'
                ? 'bg-yellow-100'
                : alert.type === 'urgent'
                  ? 'bg-red-100'
                  : 'bg-blue-100'
            }`}
          >
            <IconAlertCircle
              className={`h-4 w-4 ${
                alert.type === 'warning'
                  ? 'text-yellow-600'
                  : alert.type === 'urgent'
                    ? 'text-red-600'
                    : 'text-blue-600'
              }`}
            />
          </div>
          <div>
            <h3 className="font-medium">{alert.title}</h3>
            <p className="text-sm text-gray-500">{alert.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsCard;
