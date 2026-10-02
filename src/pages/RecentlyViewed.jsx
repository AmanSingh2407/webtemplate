import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useTemplates } from '../context/TemplateContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { TemplateGrid } from '../components/TemplateGrid';
import { EmptyState } from '../components/EmptyState';

export const RecentlyViewed = () => {
  const navigate = useNavigate();
  const { getRecentlyViewedTemplates } = useTemplates();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const recentTemplates = getRecentlyViewedTemplates();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header */}
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">Recently Viewed Templates</h1>
            <p className="text-sm text-neutral-400">
              Browse templates you recently inspected or previewed (up to last 10).
            </p>
          </div>

          {recentTemplates.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No recently viewed templates"
              description="Start browsing our template marketplace to see your history here."
              actionText="Explore Templates"
              onAction={() => navigate('/templates')}
            />
          ) : (
            <TemplateGrid templates={recentTemplates} />
          )}
        </main>
      </div>
    </div>
  );
};
