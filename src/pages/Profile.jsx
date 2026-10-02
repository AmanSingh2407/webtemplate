import React, { useState } from 'react';
import { User, Mail, Calendar, Save, CheckCircle2 } from 'lucide-react';
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

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      addToast('Name and email cannot be empty.', 'error');
      return;
    }
    updateProfile({ name, email, avatar });
    addToast('Profile updated successfully!', 'success');
  };

  const handleAvatarPreset = (seed) => {
    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
    setAvatar(url);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">My Profile</h1>
            <p className="text-sm text-neutral-400">Manage your personal account credentials and avatar.</p>
          </div>

          <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Header Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/10">
              <Avatar src={avatar} name={name} size="xl" className="shadow-2xl ring-4 ring-blue-600/30" />

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
              <div className="space-y-4">
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

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Avatar URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Quick Avatar Presets */}
                <div>
                  <span className="block text-xs font-semibold text-neutral-400 mb-2">Choose Avatar Style</span>
                  <div className="flex gap-3">
                    {['Aman', 'Sarah', 'Alex', 'Jordan'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAvatarPreset(preset)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 transition-colors cursor-pointer"
                      >
                        Style {preset}
                      </button>
                    ))}
                  </div>
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
