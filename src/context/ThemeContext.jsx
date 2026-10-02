import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage, KEYS } from '../utils/storage';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const settings = getStorage(KEYS.SETTINGS, { darkMode: true });
    return settings.darkMode !== false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
    }

    // Persist in app_settings
    const currentSettings = getStorage(KEYS.SETTINGS, {});
    setStorage(KEYS.SETTINGS, { ...currentSettings, darkMode: isDarkMode });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
