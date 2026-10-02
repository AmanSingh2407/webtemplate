import React, { useState, useMemo } from 'react';
import { useTemplates } from '../context/TemplateContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { TemplateGrid } from '../components/TemplateGrid';
import { TemplateFilters } from '../components/TemplateFilters';
import { TemplateSearch } from '../components/TemplateSearch';

export const TemplatesPage = () => {
  const { templates, categories } = useTemplates();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');

  const filteredAndSortedTemplates = useMemo(() => {
    let result = [...templates];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Badge filter
    if (activeFilter === 'popular') result = result.filter((t) => t.isPopular);
    if (activeFilter === 'new') result = result.filter((t) => t.isNew);
    if (activeFilter === 'free') result = result.filter((t) => !t.isPremium);
    if (activeFilter === 'premium') result = result.filter((t) => t.isPremium);

    // Sort
    if (activeSort === 'popular') result.sort((a, b) => b.users - a.users);
    if (activeSort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (activeSort === 'used') result.sort((a, b) => b.users - a.users);
    if (activeSort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (activeSort === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [templates, selectedCategory, searchQuery, activeFilter, activeSort]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Template Marketplace</h1>
              <p className="text-sm text-neutral-400 max-w-2xl">
                Browse our complete library of 30+ professionally designed, conversion-focused templates.
              </p>
            </div>

            <div className="w-full md:w-80">
              <TemplateSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Category Quick Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-[#101010] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === c.slug
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-[#101010] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <TemplateFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            totalCount={filteredAndSortedTemplates.length}
          />

          {/* Template Grid */}
          <TemplateGrid templates={filteredAndSortedTemplates} />
        </main>
      </div>
    </div>
  );
};
