import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderPlus,
  Compass,
  FolderKanban,
  Heart,
  Eye,
  Grid,
  Sparkles,
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTemplates } from '../context/TemplateContext';
import { useProjects } from '../context/ProjectContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { TemplateCard } from '../components/TemplateCard';
import { formatDate, formatTimeAgo } from '../utils/helpers';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories, templates, favorites, recentlyViewed } = useTemplates();
  const { projects } = useProjects();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Dynamic Statistics
  const totalProjects = projects.length;
  const totalFavorites = favorites.length;
  const totalViewed = recentlyViewed.length;
  const totalCategories = categories.length;

  const recentProjects = projects.slice(0, 3);
  const popularTemplates = templates.filter((t) => t.isPopular).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-10">
          {/* Greeting Banner & Main CTA */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-[#101010] border border-blue-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dashboard Overview</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {getGreeting()}, <span className="text-blue-400">{user?.name || 'Creator'}</span>
              </h1>
              <p className="text-sm text-neutral-400 max-w-xl">
                What would you like to build today? Choose from over 30+ production-ready templates or continue customizing your existing projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/templates')}
                icon={FolderPlus}
                className="shadow-xl"
              >
                + Create New Project
              </Button>
            </div>
          </div>

          {/* Dynamic Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-[#101010] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-medium mb-1">My Projects</p>
                <h3 className="text-2xl font-extrabold text-white">{totalProjects}</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#101010] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-medium mb-1">Favorites</p>
                <h3 className="text-2xl font-extrabold text-white">{totalFavorites}</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#101010] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-medium mb-1">Templates Viewed</p>
                <h3 className="text-2xl font-extrabold text-white">{totalViewed}</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#101010] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-medium mb-1">Categories Explored</p>
                <h3 className="text-2xl font-extrabold text-white">{totalCategories}</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Grid className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/templates')}
                className="p-4 rounded-2xl bg-[#101010] hover:bg-[#161616] border border-white/10 hover:border-blue-500/40 text-left transition-all group cursor-pointer"
              >
                <FolderPlus className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white mb-0.5">+ Create Project</h4>
                <p className="text-[11px] text-neutral-400">Pick a template</p>
              </button>

              <button
                onClick={() => navigate('/categories')}
                className="p-4 rounded-2xl bg-[#101010] hover:bg-[#161616] border border-white/10 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
              >
                <Compass className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white mb-0.5">Explore Categories</h4>
                <p className="text-[11px] text-neutral-400">Browse 12 industries</p>
              </button>

              <button
                onClick={() => navigate('/projects')}
                className="p-4 rounded-2xl bg-[#101010] hover:bg-[#161616] border border-white/10 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
              >
                <FolderKanban className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white mb-0.5">My Projects</h4>
                <p className="text-[11px] text-neutral-400">{totalProjects} active draft</p>
              </button>

              <button
                onClick={() => navigate('/favorites')}
                className="p-4 rounded-2xl bg-[#101010] hover:bg-[#161616] border border-white/10 hover:border-rose-500/40 text-left transition-all group cursor-pointer"
              >
                <Heart className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white mb-0.5">Saved Favorites</h4>
                <p className="text-[11px] text-neutral-400">{totalFavorites} templates</p>
              </button>
            </div>
          </div>

          {/* Recent Projects Section */}
          {recentProjects.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                    Work in Progress
                  </h2>
                  <h3 className="text-xl font-extrabold text-white">Recent Projects</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/projects')} icon={ArrowRight}>
                  View All Projects
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#101010] border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/5">
                        <img src={project.image} alt={project.projectName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-blue-400">{project.category}</span>
                        <span className="text-[10px] bg-white/5 text-neutral-400 px-2 py-0.5 rounded-full border border-white/5">
                          Updated {formatTimeAgo(project.updatedAt)}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{project.projectName}</h4>
                      <p className="text-xs text-neutral-400 mb-4">Based on {project.templateName}</p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/projects/${project.id}/customize`)}
                      fullWidth
                    >
                      Continue Editing
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explore Categories Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                  Categorized Solutions
                </h2>
                <h3 className="text-xl font-extrabold text-white">Explore Categories</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/categories')} icon={ArrowRight}>
                View All Categories
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>

          {/* Popular Templates */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Community Highlights
                </h2>
                <h3 className="text-xl font-extrabold text-white">Popular Templates</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/templates')} icon={ArrowRight}>
                Explore All Templates
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
