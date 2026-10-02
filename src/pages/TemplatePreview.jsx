import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Sparkles,
  ShoppingBag,
  Star,
  Check,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  Sliders,
  Smartphone
} from 'lucide-react';
import { useTemplates } from '../context/TemplateContext';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { getTemplateById } from '../data/templates';

export const TemplatePreview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useTemplates();
  const { createProject } = useProjects();
  const { addToast } = useToast();

  const template = getTemplateById(templateId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState('');

  useEffect(() => {
    if (template) {
      addRecentlyViewed(template.id);
      setProjectNameInput(`My ${template.name} Project`);
    }
  }, [templateId]);

  if (!template) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Template Not Found</h2>
          <Button variant="primary" onClick={() => navigate('/templates')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(template.id);

  const handleFavoriteClick = () => {
    const nowFav = toggleFavorite(template.id);
    addToast(
      nowFav ? `${template.name} saved to favorites` : `${template.name} removed from favorites`,
      nowFav ? 'success' : 'info'
    );
  };

  const handleConfirmCreateProject = () => {
    const project = createProject(template, projectNameInput);
    addToast(`Project "${project.projectName}" created! Opening customization...`, 'success');
    setIsModalOpen(false);
    navigate(`/projects/${project.id}/customize`);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      {/* Sticky Preview Header */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {template.name}
              <Badge variant={template.isPremium ? 'premium' : 'free'}>{template.price}</Badge>
            </h1>
            <p className="text-[11px] text-neutral-400 hidden sm:block">{template.categoryName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              favorited
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle Favorite"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} icon={Sparkles}>
            Use This Template
          </Button>
        </div>
      </header>

      {/* Realistic Interactive Website Preview Frame */}
      <div className="flex-1 overflow-y-auto bg-[#050505]">
        {/* Simulated Website Header */}
        <div className="border-b border-white/10 bg-[#0c0c0c] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {template.name[0]}
            </div>
            <span className="font-extrabold text-white text-base tracking-tight">{template.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-neutral-300 font-medium">
            <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#catalog" className="hover:text-blue-400 transition-colors">Catalog</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#reviews" className="hover:text-blue-400 transition-colors">Reviews</a>
          </div>

          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors">
            Get Started
          </button>
        </div>

        {/* Simulated Hero Section */}
        <section id="hero" className="relative py-20 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Official Demo Preview
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Elevate Your Experience with <span className="text-blue-500">{template.name}</span>
          </h2>

          <p className="text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
            {template.description} Experience ultimate performance, responsive layouts, and seamless user conversion.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              Use This Template Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Simulated Feature Highlight Grid */}
        <section id="features" className="py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Included Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {template.features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#101010] border border-white/10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">{feat}</h4>
                <p className="text-xs text-neutral-400">Pre-configured and ready to deploy in your project.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Preview Screenshot Frame */}
        <section className="py-12 px-6 max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 overflow-hidden bg-[#101010] shadow-2xl">
            <div className="bg-[#181818] px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-4 text-xs text-neutral-400 bg-black/40 px-4 py-1 rounded-md border border-white/5 flex-1 max-w-md truncate">
                https://demo.templatecraft.app/{template.slug}
              </div>
            </div>
            <img src={template.image} alt={template.name} className="w-full h-auto object-cover" />
          </div>
        </section>

        {/* Bottom CTA Bar inside Preview */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30">
            <h3 className="text-3xl font-extrabold text-white mb-3">Like what you see?</h3>
            <p className="text-sm text-neutral-300 mb-6">
              Start building your custom project with "{template.name}" in seconds.
            </p>
            <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)} icon={Sparkles}>
              Start Project with this Template
            </Button>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Project from Template"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            Selected Template: <strong className="text-white">{template.name}</strong> ({template.categoryName})
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Project Name</label>
            <input
              type="text"
              value={projectNameInput}
              onChange={(e) => setProjectNameInput(e.target.value)}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmCreateProject} icon={ArrowRight}>
              Confirm & Customize
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
