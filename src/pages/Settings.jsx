import React, { useState } from 'react';
import { Save, Bell, Shield, User, Globe, CheckCircle, QrCode, X, Smartphone } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [twoFactor, setTwoFactor] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  
  const [passwords, setPasswords] = useState({ current: '', new: '' });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new) return;
    setIsSavingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordUpdated(true);
      setPasswords({ current: '', new: '' });
      setTimeout(() => setPasswordUpdated(false), 3000);
    }, 1000);
  };

  const handle2FAToggle = () => {
    if (twoFactor) {
      // If already ON, just turn it off
      setTwoFactor(false);
    } else {
      // If OFF, open the setup modal
      setAuthCode('');
      setIs2FAModalOpen(true);
    }
  };

  const handleVerify2FA = () => {
    if (authCode.length !== 6) return;
    setIsVerifying2FA(true);
    setTimeout(() => {
      setIsVerifying2FA(false);
      setTwoFactor(true);
      setIs2FAModalOpen(false);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security & Auth', icon: <Shield size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'localization', label: 'Localization', icon: <Globe size={16} /> }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto font-sans p-6 lg:p-8">
      
      {/* Horizontal Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content Area */}
      <div className="space-y-6">
        
        {activeTab === 'general' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="p-6 md:p-8 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">General Profile</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Update your personal information and email address.</p>
              
              <div className="space-y-6 max-w-md">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin User" 
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-blue-500/20 focus:border-zinc-900 dark:focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@depi.edu" 
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-blue-500/20 focus:border-zinc-900 dark:focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input 
                    type="text" 
                    defaultValue="+20 123 456 7890" 
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-blue-500/20 focus:border-zinc-900 dark:focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 p-5 px-6 md:px-8 rounded-b-xl flex justify-end gap-3">
              <button className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-blue-600 rounded-lg hover:bg-zinc-800 dark:hover:bg-blue-700 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="p-6 md:p-8 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Security & Authentication</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Manage your password and security preferences.</p>
              
              <div className="space-y-6 max-w-md">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                  <input 
                    type="password" 
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-blue-500/20 focus:border-zinc-900 dark:focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                  <input 
                    type="password" 
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-blue-500/20 focus:border-zinc-900 dark:focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-3 mt-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">Two-factor authentication</p>
                      <p className="text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={twoFactor}
                      onClick={handle2FAToggle}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-blue-500 focus:ring-offset-2 ${
                        twoFactor ? 'bg-zinc-900 dark:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          twoFactor ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 p-5 px-6 md:px-8 rounded-b-xl flex justify-end gap-3">
              <button 
                onClick={handlePasswordUpdate}
                disabled={isSavingPassword || !passwords.current || !passwords.new}
                className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-blue-600 rounded-lg hover:bg-zinc-800 dark:hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSavingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : passwordUpdated ? (
                  <>
                    <CheckCircle size={16} />
                    Updated!
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        )}

        {(activeTab === 'notifications' || activeTab === 'localization') && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 flex flex-col items-center justify-center text-center py-24">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
              {activeTab === 'notifications' ? <Bell size={20} /> : <Globe size={20} />}
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Coming Soon</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              These settings are currently being integrated and will be available in the next release.
            </p>
          </div>
        )}

      </div>

      {/* 2FA Setup Modal */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enable 2FA</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Authenticator App</p>
                </div>
              </div>
              <button 
                onClick={() => setIs2FAModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                Scan this QR code with Google Authenticator, Authy, or your preferred 2FA app.
              </p>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center justify-center">
                <QrCode size={160} className="text-gray-900" strokeWidth={1} />
              </div>
              
              <div className="w-full mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                  Or enter this code manually:
                </label>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-lg text-center tracking-widest font-mono text-gray-800 dark:text-gray-200 text-lg border border-gray-200 dark:border-gray-700 select-all">
                  K7J2 9XQ1 P4L5 V8M3
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter 6-digit code to verify
                </label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-center tracking-[0.5em] text-2xl font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
              <button 
                onClick={() => setIs2FAModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleVerify2FA}
                disabled={authCode.length !== 6 || isVerifying2FA}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isVerifying2FA ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Enable'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
