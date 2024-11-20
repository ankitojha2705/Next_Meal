import React from 'react';
import clsx from 'clsx';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  ...props 
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        {
          'px-4 py-2': size === 'md',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-6 py-3': size === 'lg',
          'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;