import { IconClock, IconPencil, IconSchool, IconWallet } from '@tabler/icons-react'
import React from 'react'

const UpcomingTasksCard = () => {
    const upcomingTasks = [
        {
            title: 'Create Invoice',
            category: 'Finance',
            deadline: 'Tomorrow, 10:00 AM',
            priority: 'High',
            icon: <IconWallet className="w-4 h-4" />,
        },
        {
            title: 'Java Script Blog Post',
            category: 'Writing',
            deadline: 'Today, 2:00 PM',
            priority: 'Low',
            icon: <IconPencil className="w-4 h-4" />,
        },

        {
            title: 'Course: DSA',
            category: 'Education',
            deadline: 'Friday, 11:00 AM',
            priority: 'Medium',
            icon: <IconSchool className="w-4 h-4" />,
        },
    ];
    return (
        <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg">
                            {task.icon}
                        </div>
                        <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-500">{task.category}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <IconClock className="w-4 h-4" />
                            {task.deadline}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'High'
                            ? 'bg-red-100 text-red-600'
                            : task.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                            {task.priority}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UpcomingTasksCard