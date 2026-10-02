import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import { useTemplates } from '../context/TemplateContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { TemplateGrid } from '../components/TemplateGrid';
import { TemplateFilters } from '../components/TemplateFilters';
import { TemplateSearch } from '../components/TemplateSearch';
import { getCategoryBySlug } from '../data/categories';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');

  const category = getCategoryBySlug(categorySlug);

  const categoryTemplates = useMemo(() => {
    return templates.filter((t) => t.category === categorySlug);
  }, [templates, categorySlug]);

  const filteredAndSortedTemplates = useMemo(() => {
    let result = [...categoryTemplates];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Badge filter
    if (activeFilter === 'popular') result = result.filter((t) => t.isPopular);
    if (activeFilter === 'new') result = result.filter((t) => t.isNew);
    if (activeFilter === 'free') result = result.filter((t) => !t.isPremium);
    if (activeFilter === 'premium') result = result.filter((t) => t.isPremium);

    // Sorting logic
    if (activeSort === 'popular') result.sort((a, b) => b.users - a.users);
    if (activeSort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (activeSort === 'used') result.sort((a, b) => b.users - a.users);
    if (activeSort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (activeSort === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [categoryTemplates, searchQuery, activeFilter, activeSort]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <Link to="/categories" className="text-blue-400 hover:underline text-sm">
            Back to Categories Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Back Button & Header */}
          <div>
            <button
              onClick={() => navigate('/categories')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Categories
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  Category Showcase
                </span>
                <h1 className="text-3xl font-extrabold text-white mb-2">{category.name} Templates</h1>
                <p className="text-sm text-neutral-400 max-w-2xl">{category.description}</p>
              </div>

              <div className="w-full md:w-80">
                <TemplateSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder={`Search ${category.name}...`}
                />
              </div>
            </div>
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
          <TemplateGrid
            templates={filteredAndSortedTemplates}
            emptyTitle={`No ${category.name} templates found`}
            emptyDescription="Try clearing your search query or switching filter tabs."
          />
        </main>
      </div>
    </div>
  );
};
