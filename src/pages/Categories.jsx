import React, { useState } from 'react';
import { useTemplates } from '../context/TemplateContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { CategoryGrid } from '../components/CategoryGrid';
import { Search } from 'lucide-react';

export const Categories = () => {
  const { categories } = useTemplates();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Explore Categories</h1>
              <p className="text-sm text-neutral-400 max-w-2xl">
                Choose a business category to browse curated production-ready templates built for modern platforms.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories..."
                className="w-full bg-[#101010] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          <CategoryGrid categories={filteredCategories} />
        </main>
      </div>
    </div>
  );
};
