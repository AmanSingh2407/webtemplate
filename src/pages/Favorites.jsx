import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useTemplates } from '../context/TemplateContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { TemplateGrid } from '../components/TemplateGrid';
import { EmptyState } from '../components/EmptyState';

export const Favorites = () => {
  const navigate = useNavigate();
  const { getFavoriteTemplates } = useTemplates();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const favoriteTemplates = getFavoriteTemplates();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header */}
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">Saved Favorites</h1>
            <p className="text-sm text-neutral-400">
              Access your bookmarked templates quickly and convert them into projects anytime.
            </p>
          </div>

          {favoriteTemplates.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No saved templates yet"
              description="Explore our templates marketplace and click the heart icon to save templates for later."
              actionText="Explore Templates"
              onAction={() => navigate('/templates')}
            />
          ) : (
            <TemplateGrid templates={favoriteTemplates} />
          )}
        </main>
      </div>
    </div>
  );
};
