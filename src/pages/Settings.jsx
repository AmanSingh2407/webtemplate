import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Moon, Save } from 'lucide-react';
import { getStorage, setStorage, KEYS } from '../utils/storage';
import { useToast } from '../context/ToastContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';

export const Settings = () => {
  const { addToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [settings, setSettingsState] = useState(() =>
    getStorage(KEYS.SETTINGS, {
      emailNotifications: true,
      productUpdates: true,
      marketingEmails: false,
      darkMode: true,
      compactMode: false
    })
  );

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettingsState(updated);
    setStorage(KEYS.SETTINGS, updated);
    addToast('Preference updated', 'info');
  };

  const handleSave = () => {
    setStorage(KEYS.SETTINGS, settings);
    addToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          <div className="pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white mb-1">Platform Settings</h1>
            <p className="text-sm text-neutral-400">Configure your platform experience, security, and notifications.</p>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Notifications</h3>
                  <p className="text-xs text-neutral-400">Choose what updates you want to receive</p>
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
                    <p className="text-xs text-neutral-400">Notifications when new templates or features drop</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.productUpdates}
                    onChange={() => handleToggle('productUpdates')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-[#101010] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Appearance & UI</h3>
                  <p className="text-xs text-neutral-400">Customize dashboard visual density</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Dark Mode Interface</h4>
                    <p className="text-xs text-neutral-400">Modern dark SaaS theme (Enabled by default)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                    className="w-5 h-5 rounded bg-[#161616] border-white/20 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Compact Sidebar Layout</h4>
                    <p className="text-xs text-neutral-400">Minimize padding in builder navigation</p>
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

            <div className="flex justify-end">
              <Button variant="primary" onClick={handleSave} icon={Save}>
                Save Preferences
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
