import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Grid,
  Layers,
  FolderKanban,
  Heart,
  Clock,
  User,
  Settings,
  LogOut,
  LayoutGrid,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Avatar';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Categories', path: '/categories', icon: Grid },
    { name: 'Templates', path: '/templates', icon: Layers },
    { name: 'My Projects', path: '/projects', icon: FolderKanban },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Recently Viewed', path: '/recently-viewed', icon: Clock }
  ];

  const secondaryNavItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#080808] border-r border-white/10 w-64 p-4 select-none">
      {/* Header / Logo */}
      <div className="flex items-center justify-between pb-6 pt-2 px-2 border-b border-white/10">
        <NavLink to="/home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Template<span className="text-blue-500">Craft</span>
          </span>
        </NavLink>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation links */}
      <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
          Platform Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <div className="my-4 border-t border-white/10" />

        <div className="px-3 mb-2 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
          Account & Preferences
        </div>

        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User Card */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar src={user?.avatar} name={user?.name || 'User'} size="md" />
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</span>
            <span className="text-[11px] text-neutral-400 truncate">{user?.email || 'user@example.com'}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
