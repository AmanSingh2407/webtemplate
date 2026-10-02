import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage, KEYS } from '../utils/storage';
import { generateId } from '../utils/helpers';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects = getStorage(KEYS.PROJECTS, []);
    // Seed sample initial project if user has no projects
    if (storedProjects.length === 0 && user) {
      const sampleProject = {
        id: 'proj-demo-1',
        userId: user.id,
        templateId: 'tpl-1',
        templateName: 'Fashion Store',
        projectName: 'Urban Chic Boutique',
        category: 'eCommerce Development',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'Active',
        customization: {
          brandName: 'Urban Chic',
          logo: '',
          primaryColor: '#ec4899',
          secondaryColor: '#8b5cf6',
          fontStyle: 'Modern Sans',
          heroHeading: 'Summer Collection 2026',
          heroDescription: 'Discover luxury apparel designed for urban elegance and everyday comfort.',
          ctaText: 'Shop New Arrivals',
          contactEmail: 'contact@urbanchic.com',
          phone: '+1 (800) 555-0199',
          address: '450 Fifth Avenue, New York, NY'
        }
      };
      setProjects([sampleProject]);
      setStorage(KEYS.PROJECTS, [sampleProject]);
    } else {
      setProjects(storedProjects);
    }
  }, [user]);

  const createProject = (template, customName) => {
    const newProject = {
      id: generateId('proj'),
      userId: user ? user.id : 'guest',
      templateId: template.id,
      templateName: template.name,
      projectName: customName || `My ${template.name} Project`,
      category: template.categoryName || template.category,
      image: template.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'In Progress',
      customization: {
        brandName: customName || `My ${template.name}`,
        logo: '',
        primaryColor: '#3b82f6',
        secondaryColor: '#6366f1',
        fontStyle: 'Inter / System',
        heroHeading: `Turn Ideas into Reality with ${template.name}`,
        heroDescription: template.description || 'Custom digital experience tailored for performance and scale.',
        ctaText: 'Get Started Now',
        contactEmail: user ? user.email : 'support@myproject.com',
        phone: '+1 (555) 019-2834',
        address: '100 Technology Plaza, San Francisco, CA'
      }
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    setStorage(KEYS.PROJECTS, updated);
    return newProject;
  };

  const updateProject = (projectId, customizationData, additionalFields = {}) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          ...additionalFields,
          customization: {
            ...p.customization,
            ...customizationData
          },
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });

    setProjects(updated);
    setStorage(KEYS.PROJECTS, updated);
  };

  const deleteProject = (projectId) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    setStorage(KEYS.PROJECTS, updated);
  };

  const duplicateProject = (projectId) => {
    const target = projects.find((p) => p.id === projectId);
    if (!target) return null;

    const duplicated = {
      ...target,
      id: generateId('proj'),
      projectName: `${target.projectName} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Draft'
    };

    const updated = [duplicated, ...projects];
    setProjects(updated);
    setStorage(KEYS.PROJECTS, updated);
    return duplicated;
  };

  const getProjectById = (projectId) => {
    return projects.find((p) => p.id === projectId) || null;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        getProjectById
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
