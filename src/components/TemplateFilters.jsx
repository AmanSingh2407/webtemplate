import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const TemplateFilters = ({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  totalCount
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Templates' },
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New' },
    { id: 'free', label: 'Free' },
    { id: 'premium', label: 'Premium' }
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
    { id: 'used', label: 'Most Used' },
    { id: 'name-asc', label: 'Name (A-Z)' },
    { id: 'name-desc', label: 'Name (Z-A)' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#101010] border border-white/10 mb-8 backdrop-blur-md">
      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
        <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0 ml-1 mr-1 hidden sm:block" />
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onFilterChange(opt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-blue-500'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
        <span className="text-xs text-neutral-400 font-medium">
          Showing <strong className="text-white">{totalCount}</strong> templates
        </span>

        <div className="relative flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#161616] border border-white/10 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#101010] text-white">
                Sort by: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
