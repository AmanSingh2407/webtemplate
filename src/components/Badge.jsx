import React from 'react';

export const Badge = ({ variant = 'default', children, className = '' }) => {
  const variants = {
    default: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    primary: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    premium: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40',
    free: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    new: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    popular: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
};
