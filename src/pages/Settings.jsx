import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Moon,
  Save,
  Lock,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  Palette
} from 'lucide-react';
import { getStorage, setStorage, removeStorage, KEYS } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';

export const Settings = () => {
  const { user, changePassword } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Settings State
  const [settings, setSettingsState] = useState(() =>
    getStorage(KEYS.SETTINGS, {
      emailNotifications: true,
      productUpdates: true,
      marketingEmails: false,
      darkMode: true,
      compactMode: false,
      accentColor: 'blue'
    })
  );

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettingsState(updated);
    setStorage(KEYS.SETTINGS, updated);
    addToast('Preference updated', 'info');
  };

  const handleSaveSettings = () => {
    setStorage(KEYS.SETTINGS, settings);
    addToast('Platform settings saved successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const res = changePassword(currentPassword, newPassword);
    if (res.success) {
      addToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setPasswordError(res.message);
    }
  };

  const handleClearHistory = () => {
    removeStorage(KEYS.RECENTLY_VIEWED);
    addToast('Recently viewed history cleared!', 'info');
  };

  const handleExportData = () => {
    const userData = {
      user,
      settings,
      favorites: getStorage(KEYS.FAVORITES, []),
      projects: getStorage(KEYS.PROJECTS, []),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `templatecraft-data-${user?.name.replace(/\s+/g, '-').toLowerCase() || 'user'}.json`;
    a.click();
    addToast('User data exported as JSON file', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">Platform Settings</h1>
            <p className="text-sm text-neutral-400">
              Manage your account security, notification preferences, appearance, and data storage.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. Account & Security (Change Password) */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Security & Password</h3>
                  <p className="text-xs text-neutral-400">Update your account login password</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                {passwordError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    {passwordError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Current Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">New Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 chars"
                        className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full bg-[#161616] border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="secondary" size="sm" icon={Save}>
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            {/* 2. Notifications */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Notifications</h3>
                  <p className="text-xs text-neutral-400">Manage alert preferences and email updates</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Notifications</h4>
                    <p className="text-xs text-neutral-400">Receive project activity and alert summaries</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Product & Template Updates</h4>
                    <p className="text-xs text-neutral-400">Get notified when new templates drop</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.productUpdates}
                    onChange={() => handleToggle('productUpdates')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Marketing & Offer Emails</h4>
                    <p className="text-xs text-neutral-400">Special discounts and newsletter offers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.marketingEmails}
                    onChange={() => handleToggle('marketingEmails')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 3. Appearance & Theme */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Appearance & Theme</h3>
                  <p className="text-xs text-neutral-400">Customize visual density and theme accents</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {isDarkMode ? 'Dark Mode Interface' : 'Day (Light) Mode Interface'}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {isDarkMode ? 'Currently active: Dark SaaS Theme' : 'Currently active: Day / Light SaaS Theme'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Compact Sidebar Layout</h4>
                    <p className="text-xs text-neutral-400">Reduce spacing for denser navigation</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.compactMode}
                    onChange={() => handleToggle('compactMode')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 4. Data & Danger Zone */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Data & Storage Management</h3>
                  <p className="text-xs text-neutral-400">Export your local workspace data or clear cache</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Button variant="dark" size="sm" onClick={handleExportData} icon={Download}>
                  Export Data JSON
                </Button>

                <Button variant="danger" size="sm" onClick={handleClearHistory} icon={Trash2}>
                  Clear Recently Viewed History
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={handleSaveSettings} icon={Save}>
                Save Platform Preferences
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
