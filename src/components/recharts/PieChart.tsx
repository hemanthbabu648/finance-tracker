import { transactionTypeValue } from '@/types/finance';
import React from 'react';
import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Sector } from 'recharts';



type DataType = {
    name: string
    value: number
}

type PieChartProps = {
    type: transactionTypeValue | 'SAVINGS'
    data: DataType[]
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const PieChart: React.FC<PieChartProps> = ({
    type,
    data
}) => {

    const [activeIndex, setActiveIndex] = React.useState<number>(0);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderActiveShape = (props: any) => {

        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000000">
                    {type}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <div className='h-[450px]'>
            <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={85}
                        fill="#8884d8"
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        onMouseEnter={onPieEnter}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </RePieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;
