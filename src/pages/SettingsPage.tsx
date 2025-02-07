import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Save } from 'lucide-react';
import { useProfile } from '../store/profile';
import { useAuth } from '../store/auth';
import { cn } from '../lib/utils';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile, fetchProfile } = useProfile();
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ name });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Profile Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                    "focus:border-purple-500 focus:ring-purple-500 sm:text-sm",
                    "dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  )}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={cn(
                    "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
                    "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "dark:focus:ring-offset-gray-900"
                  )}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Sign out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}