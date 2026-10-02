import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Sparkles, Star, Users, ArrowRight } from 'lucide-react';
import { TemplateImage } from './TemplateImage';
import { Badge } from './Badge';
import { Button } from './Button';
import { Modal } from './Modal';
import { useTemplates } from '../context/TemplateContext';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';

export const TemplateCard = ({ template }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useTemplates();
  const { createProject } = useProjects();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customProjectName, setCustomProjectName] = useState(`My ${template.name} Project`);
  const favorited = isFavorite(template.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const nowFav = toggleFavorite(template.id);
    addToast(
      nowFav ? `${template.name} added to favorites!` : `${template.name} removed from favorites`,
      nowFav ? 'success' : 'info'
    );
  };

  const handlePreviewClick = () => {
    addRecentlyViewed(template.id);
    navigate(`/template/${template.id}/preview`);
  };

  const handleOpenUseModal = () => {
    addRecentlyViewed(template.id);
    setIsModalOpen(true);
  };

  const handleConfirmCreateProject = () => {
    const project = createProject(template, customProjectName);
    addToast(`Project "${project.projectName}" created! Redirecting...`, 'success');
    setIsModalOpen(false);
    navigate(`/projects/${project.id}/customize`);
  };

  return (
    <>
      <div className="group relative bg-[#101010] hover:bg-[#141414] border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black flex flex-col justify-between overflow-hidden">
        <div>
          {/* Screenshot Container */}
          <div className="relative rounded-xl overflow-hidden mb-4 border border-white/5 group-hover:border-blue-500/30 transition-colors">
            <TemplateImage src={template.image} alt={template.name} aspectRatio="aspect-[16/10]" />

            {/* Top Overlay Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex gap-1.5 flex-wrap">
                {template.isPremium ? (
                  <Badge variant="premium">Premium</Badge>
                ) : (
                  <Badge variant="free">Free</Badge>
                )}
                {template.isPopular && <Badge variant="popular">Popular</Badge>}
                {template.isNew && <Badge variant="new">New</Badge>}
              </div>

              <button
                onClick={handleFavoriteClick}
                className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                  favorited
                    ? 'bg-rose-500/20 text-rose-500 border-rose-500/40 scale-110'
                    : 'bg-black/60 text-white/70 border-white/10 hover:text-white hover:bg-black/80 hover:scale-105'
                }`}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Quick hover preview banner overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 backdrop-blur-[2px]">
              <Button size="sm" variant="dark" onClick={handlePreviewClick} icon={Eye}>
                Quick Preview
              </Button>
              <Button size="sm" variant="primary" onClick={handleOpenUseModal} icon={Sparkles}>
                Use Template
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {template.categoryName}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{template.rating}</span>
              <span className="text-neutral-500 font-normal">({template.users})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-1">
            {template.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2.5">
          <Button variant="dark" size="sm" onClick={handlePreviewClick} icon={Eye} fullWidth>
            Preview
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenUseModal} icon={Sparkles} fullWidth>
            Use Template
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start Project with this Template"
      >
        <div className="flex flex-col gap-5">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <TemplateImage src={template.image} alt={template.name} aspectRatio="aspect-[16/9]" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-lg font-bold text-white">{template.name}</h4>
              <Badge variant={template.isPremium ? 'premium' : 'free'}>{template.price}</Badge>
            </div>
            <p className="text-xs text-neutral-400">{template.categoryName}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-300">Project Name</label>
            <input
              type="text"
              value={customProjectName}
              onChange={(e) => setCustomProjectName(e.target.value)}
              placeholder="e.g. My Online Store"
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed">
            This will create a new project draft in your dashboard where you can edit branding, colors, content, and sections in real-time.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmCreateProject} icon={ArrowRight}>
              Create Project
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
