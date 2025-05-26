'use client';

import React from 'react';

import Select from '@/components/commons/Select';
import PieChart from '@/components/recharts/PieChart';
import SimpleBarChart from '@/components/recharts/SimpleBarChart';

type ViewBy = 'month' | 'year';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const data1 = [
  {
    name: 'January',
    prevMonth: 4000,
    currentMonth: 2400,
  },
  {
    name: 'February',
    prevMonth: 3000,
    currentMonth: 1398,
  },
  {
    name: 'March',
    prevMonth: 2000,
    currentMonth: 9800,
  },
  {
    name: 'April',
    prevMonth: 2780,
    currentMonth: 3908,
  },
  {
    name: 'May',
    prevMonth: 1890,
    currentMonth: 4800,
  },
  {
    name: 'June',
    prevMonth: 2390,
    currentMonth: 3800,
  },
  {
    name: 'July',
    prevMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: 'August',
    prevMonth: 1890,
    currentMonth: 4800,
  },
  {
    name: 'September',
    prevMonth: 2390,
    currentMonth: 3800,
  },
  {
    name: 'October',
    prevMonth: 3490,
    currentMonth: 4300,
  },
  {
    name: 'November',
    prevMonth: 2390,
    currentMonth: 3800,
  },
  {
    name: 'December',
    prevMonth: 3490,
    currentMonth: 4300,
  },
];

function AnalyticsPage() {
  const [viewBy, setViewBy] = React.useState<ViewBy>('month');
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-md font-semibold lg:text-xl xl:text-2xl">
            Analytics
          </h1>
          <p>
            Viewing for the {viewBy} :{' '}
            {viewBy === 'month' ? 'February' : '2024'}
          </p>
        </div>
        <Select
          data={[
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ]}
          className="w-40"
          label="View by"
          value={viewBy}
          onChange={(event) => setViewBy(event.currentTarget.value as ViewBy)}
        />
      </div>
      {viewBy === 'month' ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Income
            </h1>
            <p className="text-sm text-gray-500">Total income</p>
            <PieChart data={data} type="INCOME" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Expense
            </h1>
            <p className="text-sm text-gray-500">Total expense</p>
            <PieChart data={data} type="EXPENSE" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Savings
            </h1>
            <p className="text-sm text-gray-500">Total savings</p>
            <PieChart data={data} type="SAVINGS" />
          </div>
        </div>
      ) : (
        <div>
          {/* View by Year */}
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Income
            </h1>
            <p className="text-sm text-gray-500">Total income</p>
            <div className="mt-4">
              <SimpleBarChart data={data1} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Expense
            </h1>
            <p className="text-sm text-gray-500">Total expense</p>
            <div className="mt-4">
              <SimpleBarChart data={data1} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
              Savings
            </h1>
            <p className="text-sm text-gray-500">Total savings</p>
            <div className="mt-4">
              <SimpleBarChart data={data1} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPage;
