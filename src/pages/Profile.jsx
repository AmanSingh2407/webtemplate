import React, { useState } from 'react';
import { User, Mail, Calendar, Save, Camera, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { formatDate } from '../utils/helpers';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const malePresetPhotos = [
    {
      name: 'Male Photo 1',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Male Photo 2',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Male Photo 3',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Male Photo 4',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      addToast('Name and email cannot be empty.', 'error');
      return;
    }
    updateProfile({ name, email, avatar });
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">My Profile</h1>
            <p className="text-sm text-neutral-400">Manage your personal account credentials and profile photo.</p>
          </div>

          <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/10">
              <div className="relative group">
                <Avatar src={avatar} name={name} size="xl" className="shadow-2xl ring-4 ring-blue-600/30" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                <p className="text-xs text-neutral-400">{user?.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-neutral-500 pt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Member since {formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave} className="py-8 space-y-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Male Profile Photo Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Select Male Profile Photo Preset
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {malePresetPhotos.map((preset, idx) => {
                      const isSelected = avatar === preset.url;
                      return (
                        <div
                          key={idx}
                          onClick={() => setAvatar(preset.url)}
                          className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 ring-2 ring-blue-500/40 scale-105'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-20 object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5 shadow">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Custom Image URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button type="submit" variant="primary" icon={Save}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
