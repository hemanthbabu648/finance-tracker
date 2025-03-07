import { HoverCard as MHoverCard, HoverCardProps } from '@mantine/core';
import React from 'react';

interface Props extends HoverCardProps {
  dropdownComponent?: React.ReactElement;
}

const HoverCard: React.FC<Props> = ({
  dropdownComponent,
  children,
  ...props
}) => {
  return (
    <MHoverCard {...props}>
      <MHoverCard.Target>{children}</MHoverCard.Target>
      <MHoverCard.Dropdown style={{ overflow: 'hidden' }}>
        {dropdownComponent}
      </MHoverCard.Dropdown>
    </MHoverCard>
  );
};

export default HoverCard;
