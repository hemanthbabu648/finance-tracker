import React from 'react'

type BaseCardProps = {
    title: string
    headerAction?: React.ReactElement
    children: React.ReactNode
    cardClassNames?: string
}

const BaseCard: React.FC<BaseCardProps> = (
    {
        title,
        headerAction,
        children,
        cardClassNames
    }
) => {
    return (
        <div className={`${cardClassNames} bg-white rounded-xl shadow-sm p-5`}>
            <div className='flex items-center justify-between mb-4'>
                <h2 className="text-lg font-medium">{title}</h2>
                <span>{headerAction}</span>
            </div>
            {children}
        </div>
    )
}

export default BaseCard