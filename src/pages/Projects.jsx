import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Edit3,
  Copy,
  Trash2,
  Eye,
  Plus,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { formatTimeAgo, formatDate } from '../utils/helpers';

export const Projects = () => {
  const navigate = useNavigate();
  const { projects, deleteProject, duplicateProject } = useProjects();
  const { addToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteProject(deleteTargetId);
      addToast('Project deleted successfully', 'info');
      setDeleteTargetId(null);
    }
  };

  const handleDuplicate = (projectId, projectName) => {
    const duplicated = duplicateProject(projectId);
    if (duplicated) {
      addToast(`Duplicated "${projectName}" as "${duplicated.projectName}"`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-1">My Projects</h1>
              <p className="text-sm text-neutral-400">
                Manage, customize, duplicate, and publish your template-based web projects.
              </p>
            </div>

            <Button variant="primary" onClick={() => navigate('/templates')} icon={Plus}>
              New Project
            </Button>
          </div>

          {/* Projects Grid or Empty State */}
          {projects.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects created yet"
              description="Explore our templates marketplace and click 'Use This Template' to start your first project."
              actionText="Explore Templates"
              onAction={() => navigate('/templates')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#101010] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/5 bg-neutral-900 group">
                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-blue-400 border border-white/10">
                        {project.status || 'Active'}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Updated {formatTimeAgo(project.updatedAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                      {project.projectName}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-5">
                      Template: <span className="text-neutral-300 font-medium">{project.templateName}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-3 border-t border-white/5">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/projects/${project.id}/customize`)}
                      icon={Edit3}
                      fullWidth
                    >
                      Customize & Edit
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => navigate(`/template/${project.templateId}/preview`)}
                        icon={Eye}
                        title="Preview Template"
                      />
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => handleDuplicate(project.id, project.projectName)}
                        icon={Copy}
                        title="Duplicate Project"
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteTargetId(project.id)}
                        icon={Trash2}
                        title="Delete Project"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        title="Delete Project Confirmation"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-300 leading-relaxed">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" onClick={() => setDeleteTargetId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} icon={Trash2}>
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
