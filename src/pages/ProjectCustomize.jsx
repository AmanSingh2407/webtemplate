import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Palette,
  Layout,
  Type,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const ProjectCustomize = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById, updateProject } = useProjects();
  const { addToast } = useToast();

  const project = getProjectById(projectId);

  const [activeTab, setActiveTab] = useState('branding');
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop | tablet | mobile
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Customization Form State
  const [customization, setCustomization] = useState({
    brandName: '',
    logo: '',
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
    fontStyle: 'Inter / System',
    heroHeading: '',
    heroDescription: '',
    ctaText: 'Explore Collection',
    contactEmail: '',
    phone: '',
    address: ''
  });

  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName);
      if (project.customization) {
        setCustomization({
          brandName: project.customization.brandName || project.projectName,
          logo: project.customization.logo || '',
          primaryColor: project.customization.primaryColor || '#3b82f6',
          secondaryColor: project.customization.secondaryColor || '#6366f1',
          fontStyle: project.customization.fontStyle || 'Inter / System',
          heroHeading: project.customization.heroHeading || `Welcome to ${project.projectName}`,
          heroDescription: project.customization.heroDescription || 'High performance digital solution tailored for growth.',
          ctaText: project.customization.ctaText || 'Get Started Now',
          contactEmail: project.customization.contactEmail || 'support@mybrand.com',
          phone: project.customization.phone || '+1 (555) 019-2834',
          address: project.customization.address || '100 Technology Plaza, San Francisco, CA'
        });
      }
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Button variant="primary" onClick={() => navigate('/projects')}>
            Back to My Projects
          </Button>
        </div>
      </div>
    );
  }

  const handleFieldChange = (field, value) => {
    setCustomization((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProject(projectId, customization, { projectName });
    addToast('Project changes saved successfully!', 'success');
  };

  const handlePublish = () => {
    handleSave();
    setIsPublishModalOpen(true);
  };

  const sidebarTabs = [
    { id: 'branding', label: 'Branding & Theme', icon: Palette },
    { id: 'homepage', label: 'Hero & Homepage', icon: Layout },
    { id: 'contact', label: 'Contact Details', icon: Mail },
    { id: 'settings', label: 'Project Settings', icon: Settings }
  ];

  return (
    <div className="h-screen bg-[#080808] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Bar Header */}
      <header className="h-16 bg-[#0c0c0c] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent text-sm font-bold text-white focus:bg-[#161616] px-2 py-1 rounded-lg border border-transparent focus:border-white/20 focus:outline-none max-w-[200px] sm:max-w-xs truncate"
            />
            <span className="text-[10px] bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 font-semibold hidden md:inline-block">
              {project.category}
            </span>
          </div>
        </div>

        {/* Device Switcher & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Device Controls */}
          <div className="hidden md:flex items-center bg-[#141414] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <Button variant="dark" size="sm" onClick={handleSave} icon={Save}>
            Save
          </Button>

          <Button variant="primary" size="sm" onClick={handlePublish} icon={Globe}>
            Publish
          </Button>
        </div>
      </header>

      {/* Builder Workspace: Sidebar Form + Live Preview */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Builder Left Sidebar Panel */}
        <aside className="w-80 sm:w-96 bg-[#0f0f0f] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
          {/* Tab Selection Navigation */}
          <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none bg-[#121212]">
            {sidebarTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-3 flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#181818] text-blue-400 border-b-2 border-blue-500'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Settings Content */}
          <div className="p-5 space-y-6 flex-1">
            {activeTab === 'branding' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Brand & Aesthetics
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Brand Name</label>
                  <input
                    type="text"
                    value={customization.brandName}
                    onChange={(e) => handleFieldChange('brandName', e.target.value)}
                    placeholder="e.g. Urban Chic"
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Primary Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customization.primaryColor}
                        onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                        className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customization.primaryColor}
                        onChange={(e) => handleFieldChange('primaryColor', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Secondary Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customization.secondaryColor}
                        onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                        className="w-8 h-8 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customization.secondaryColor}
                        onChange={(e) => handleFieldChange('secondaryColor', e.target.value)}
                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Typography Style</label>
                  <select
                    value={customization.fontStyle}
                    onChange={(e) => handleFieldChange('fontStyle', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Inter / System">Inter Modern</option>
                    <option value="Roboto / Tech">Roboto Tech</option>
                    <option value="Playfair / Luxury">Playfair Luxury</option>
                    <option value="Space Grotesk">Space Grotesk SaaS</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'homepage' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Hero Banner Content
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Hero Main Title</label>
                  <input
                    type="text"
                    value={customization.heroHeading}
                    onChange={(e) => handleFieldChange('heroHeading', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={customization.heroDescription}
                    onChange={(e) => handleFieldChange('heroDescription', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">CTA Button Label</label>
                  <input
                    type="text"
                    value={customization.ctaText}
                    onChange={(e) => handleFieldChange('ctaText', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Footer & Contact Info
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Support Email</label>
                  <input
                    type="email"
                    value={customization.contactEmail}
                    onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={customization.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Office Address</label>
                  <input
                    type="text"
                    value={customization.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Project General Settings
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-400">
                  <span className="block font-semibold text-white mb-1">Base Template:</span>
                  {project.templateName} ({project.category})
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Live Interactive Preview Canvas Frame */}
        <main className="flex-1 bg-[#050505] p-4 sm:p-8 flex justify-center items-center overflow-auto">
          <div
            className={`w-full transition-all duration-300 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              deviceMode === 'mobile'
                ? 'max-w-[375px] h-[667px]'
                : deviceMode === 'tablet'
                ? 'max-w-[768px] h-[750px]'
                : 'max-w-5xl h-full'
            }`}
          >
            {/* Live Frame Browser Header */}
            <div className="bg-[#141414] px-4 py-2 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] text-neutral-400 bg-black/40 px-3 py-0.5 rounded border border-white/5 truncate max-w-xs">
                https://{customization.brandName.toLowerCase().replace(/\s+/g, '') || 'mybrand'}.craft.app
              </div>
              <span className="text-[10px] text-blue-400 font-semibold uppercase">Live Mode</span>
            </div>

            {/* Simulated Live Website Render */}
            <div className="flex-1 overflow-y-auto p-6 space-y-12">
              {/* Site Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    {customization.brandName ? customization.brandName[0] : 'B'}
                  </div>
                  <span className="font-extrabold text-white text-base">
                    {customization.brandName || 'Brand Name'}
                  </span>
                </div>

                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow transition-all"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  {customization.ctaText}
                </button>
              </div>

              {/* Hero Banner */}
              <div className="text-center py-10 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {customization.heroHeading}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  {customization.heroDescription}
                </p>
                <div className="pt-2">
                  <button
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xl transition-all"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    {customization.ctaText}
                  </button>
                </div>
              </div>

              {/* Base Template Image Card */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <img src={project.image} alt="Template render" className="w-full h-48 sm:h-64 object-cover" />
              </div>

              {/* Contact Footer */}
              <div className="pt-8 border-t border-white/10 text-xs text-neutral-400 space-y-2 text-center">
                <p className="font-semibold text-white">{customization.brandName}</p>
                <p>Email: {customization.contactEmail} | Phone: {customization.phone}</p>
                <p>{customization.address}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Publish Modal */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Project Published Successfully!"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">Your Project is Live!</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Project <strong className="text-white">{projectName}</strong> has been saved and deployed to your custom demo domain:
          </p>

          <div className="p-3 bg-[#141414] rounded-xl border border-white/10 text-xs text-blue-400 font-mono break-all">
            https://{customization.brandName.toLowerCase().replace(/\s+/g, '') || 'project'}.craft.app
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="primary" onClick={() => setIsPublishModalOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
