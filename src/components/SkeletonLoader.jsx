import React from 'react';

export const TemplateSkeleton = () => (
  <div className="bg-[#101010] border border-white/10 rounded-2xl p-4 animate-pulse flex flex-col gap-4">
    <div className="w-full aspect-[16/10] bg-neutral-800 rounded-xl" />
    <div className="flex items-center justify-between">
      <div className="h-5 bg-neutral-800 rounded w-1/2" />
      <div className="h-4 bg-neutral-800 rounded w-1/6" />
    </div>
    <div className="h-4 bg-neutral-800 rounded w-3/4" />
    <div className="flex gap-2">
      <div className="h-6 bg-neutral-800 rounded-full w-16" />
      <div className="h-6 bg-neutral-800 rounded-full w-16" />
    </div>
    <div className="flex gap-3 pt-2">
      <div className="h-10 bg-neutral-800 rounded-xl flex-1" />
      <div className="h-10 bg-neutral-800 rounded-xl flex-1" />
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="bg-[#101010] border border-white/10 rounded-2xl p-6 animate-pulse flex flex-col gap-4">
    <div className="w-12 h-12 rounded-xl bg-neutral-800" />
    <div className="h-6 bg-neutral-800 rounded w-2/3" />
    <div className="h-4 bg-neutral-800 rounded w-full" />
    <div className="h-4 bg-neutral-800 rounded w-4/5" />
  </div>
);
