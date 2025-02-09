'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';




interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon'; // Add 'icon'
}


const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-2xl font-medium transition-all duration-200';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2 h-10 w-10 flex items-center justify-center', // Add styles for 'icon'
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
};

export default Button;