import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { getCategoryColorClasses } from '../utils/helpers';

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const IconComponent = Icons[category.icon] || Icons.Folder;
  const colors = getCategoryColorClasses(category.color);

  return (
    <div
      onClick={() => navigate(`/category/${category.slug}`)}
      className={`group relative bg-[#101010] hover:bg-[#151515] border border-white/10 ${colors.hoverBorder} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 cursor-pointer flex flex-col justify-between overflow-hidden`}
    >
      {/* Background glow accent */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full ${colors.bg} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

      <div>
        {/* Header with Icon and Circular Arrow */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} border ${colors.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
            <IconComponent className="w-7 h-7" />
          </div>

          <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-blue-600 border border-white/10 group-hover:border-blue-500 text-neutral-400 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 shadow-sm">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      {/* Footer stat badge */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500">Available Templates</span>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${colors.badge}`}>
          {category.templateCount} Templates
        </span>
      </div>
    </div>
  );
};
