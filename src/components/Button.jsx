import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon: Icon = null,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30 focus:ring-blue-500',
    secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 focus:ring-neutral-500',
    dark: 'bg-[#141414] hover:bg-[#1f1f1f] text-neutral-200 border border-white/10 focus:ring-neutral-600',
    outline: 'bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 text-white focus:ring-neutral-400',
    ghost: 'bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white focus:ring-neutral-400',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 border border-red-400/30 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />}
      {children}
    </button>
  );
};
