import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEMPLATES } from '../data/templates';
import { CATEGORIES } from '../data/categories';
import { getStorage, setStorage, KEYS } from '../utils/storage';

const TemplateContext = createContext(null);

export const TemplateProvider = ({ children }) => {
  const [templates] = useState(TEMPLATES);
  const [categories] = useState(CATEGORIES);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedFavs = getStorage(KEYS.FAVORITES, ['tpl-1', 'tpl-13', 'tpl-23']);
    const storedRecents = getStorage(KEYS.RECENTLY_VIEWED, ['tpl-1', 'tpl-2', 'tpl-14']);
    setFavorites(storedFavs);
    setRecentlyViewed(storedRecents);
  }, []);

  const toggleFavorite = (templateId) => {
    let updated;
    let isFav = false;
    if (favorites.includes(templateId)) {
      updated = favorites.filter((id) => id !== templateId);
      isFav = false;
    } else {
      updated = [...favorites, templateId];
      isFav = true;
    }
    setFavorites(updated);
    setStorage(KEYS.FAVORITES, updated);
    return isFav;
  };

  const addRecentlyViewed = (templateId) => {
    if (!templateId) return;
    const filtered = recentlyViewed.filter((id) => id !== templateId);
    const updated = [templateId, ...filtered].slice(0, 10);
    setRecentlyViewed(updated);
    setStorage(KEYS.RECENTLY_VIEWED, updated);
  };

  const getFavoriteTemplates = () => {
    return templates.filter((t) => favorites.includes(t.id));
  };

  const getRecentlyViewedTemplates = () => {
    return recentlyViewed
      .map((id) => templates.find((t) => t.id === id))
      .filter(Boolean);
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        categories,
        favorites,
        recentlyViewed,
        toggleFavorite,
        addRecentlyViewed,
        getFavoriteTemplates,
        getRecentlyViewedTemplates,
        isFavorite: (id) => favorites.includes(id)
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};
