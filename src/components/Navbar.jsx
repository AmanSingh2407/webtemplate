import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Bell, User, LogOut, Check, Sparkles, Menu, X, ChevronDown, FolderPlus, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getStorage, setStorage, KEYS } from '../utils/storage';
import { Avatar } from './Avatar';
import { Button } from './Button';

export const Navbar = ({ isPublic = false, toggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(() => getStorage(KEYS.NOTIFICATIONS, []));
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobilePublicMenu, setMobilePublicMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    setStorage(KEYS.NOTIFICATIONS, updated);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Public Landing Page Navbar
  if (isPublic) {
    return (
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Template<span className="text-blue-500">Craft</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <Link to="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>

            {isAuthenticated ? (
              <Button variant="primary" onClick={() => navigate('/home')} icon={Sparkles}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button variant="primary" onClick={() => navigate('/signup')} icon={Sparkles}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-400 hover:text-white"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>
            <button
              onClick={() => setMobilePublicMenu(!mobilePublicMenu)}
              className="p-2 text-neutral-400 hover:text-white"
            >
              {mobilePublicMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Public Nav Drawer */}
        {mobilePublicMenu && (
          <div className="md:hidden bg-[#0d0d0d] border-b border-white/10 px-4 pt-2 pb-6 flex flex-col gap-4 animate-fade-in">
            <Link
              to="/"
              onClick={() => setMobilePublicMenu(false)}
              className="text-neutral-300 py-2 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobilePublicMenu(false)}
              className="text-neutral-300 py-2 border-b border-white/5"
            >
              Categories
            </Link>
            <Link
              to="/templates"
              onClick={() => setMobilePublicMenu(false)}
              className="text-neutral-300 py-2 border-b border-white/5"
            >
              Templates
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isAuthenticated ? (
                <Button variant="primary" onClick={() => navigate('/home')} fullWidth>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate('/login')} fullWidth>
                    Log in
                  </Button>
                  <Button variant="primary" onClick={() => navigate('/signup')} fullWidth>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }

  // Authenticated Dashboard Header Topbar
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile drawer toggle */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Topbar Page title / quick greeting */}
        <h2 className="text-sm sm:text-base font-semibold text-neutral-200 hidden sm:block">
          Platform Workspace
        </h2>
      </div>

      {/* Right side controls: Theme Toggle + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Dark / Day Mode Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
          title={isDarkMode ? 'Switch to Day (Light) Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full ring-4 ring-[#080808] animate-pulse" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-fade-in">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 transition-colors ${
                        !n.read ? 'bg-blue-500/5' : 'hover:bg-white/5'
                      }`}
                    >
                      <h5 className="text-xs font-semibold text-white mb-1">{n.title}</h5>
                      <p className="text-xs text-neutral-400 leading-snug">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Avatar src={user?.avatar} name={user?.name || 'User'} size="md" />
            <span className="text-sm font-medium text-white hidden md:inline-block max-w-[120px] truncate">
              {user?.name || 'User'}
            </span>
            <ChevronDown className="w-4 h-4 text-neutral-400 hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl animate-fade-in divide-y divide-white/5">
              <div className="px-3 py-2.5">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-neutral-400 truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/projects');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4 text-neutral-400" />
                  My Projects
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
