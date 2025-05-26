import Link from 'next/link';
import React from 'react';

type Size = 'sm' | 'md' | 'lg';

type Variant = 'primary' | 'secondary' | 'outline-primary' | 'primaryBlue';

type Props = {
  label: string;
  href: string;
  customClasses?: string;
  variant?: Variant;
  size?: Size;
  rightIcon?: React.ReactNode;
};

const variantClasses = {
  primary: 'bg-primary text-white rounded-md',
  primaryBlue: 'bg-primary-blue-light text-white rounded-md',
  secondary: 'bg-primary-light text-white rounded-md',
  'outline-primary': 'border border-gray-400 rounded-md text-base font-medium',
};

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-9 py-3 text-lg',
};

const ButtonLink: React.FC<Props> = ({
  label,
  href,
  customClasses = '',
  variant = 'primary', // Default variant is 'primary'
  size = 'md', // Default size is 'md'
  rightIcon,
}) => {
  // Combine the variant, size, and custom classes
  const buttonClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${customClasses}`;

  return (
    <Link href={href} className={`inline-block rounded-md ${buttonClasses}`}>
      {label} {rightIcon}
    </Link>
  );
};

export default ButtonLink;
