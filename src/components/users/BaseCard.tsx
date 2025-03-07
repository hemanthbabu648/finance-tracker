import React from 'react';

type BaseCardProps = {
  title: string;
  headerAction?: React.ReactElement;
  children: React.ReactNode;
  cardClassNames?: string;
};

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  headerAction,
  children,
  cardClassNames,
}) => {
  return (
    <div className={`${cardClassNames} rounded-xl bg-white p-5 shadow-sm`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <span>{headerAction}</span>
      </div>
      {children}
    </div>
  );
};

export default BaseCard;
