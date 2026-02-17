import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { NextPage } from 'next';
import { Button, Input } from '@/components/ui';

const SettingsPage: NextPage = () => {
  const [settings, setSettings] = useState({
    username: 'demo-user',
    email: 'demo@example.com',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: '0.7',
  });
  
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // In production, this would save to database/API
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      username: 'demo-user',
      email: 'demo@example.com',
      apiKey: '',
      model: 'gpt-3.5-turbo',
      temperature: '0.7',
    });
  };

  return (
    <>
      <Head>
        <title>Settings - Open WebUI</title>
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">Settings</h1>
              <p className="text-sm text-gray-400">Configure your preferences</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Success Message */}
          {saved && (
            <div className="mb-6 px-4 py-3 bg-green-900/50 border border-green-600 rounded-lg">
              <p className="text-green-400">✓ Settings saved successfully!</p>
            </div>
          )}

          {/* Settings Form */}
          <div className="space-y-6">
            {/* Profile Section */}
            <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
              <div className="space-y-4">
                <Input
                  label="Username"
                  value={settings.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Enter username"
                />
                <Input
                  label="Email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email"
                />
              </div>
            </section>

            {/* API Configuration */}
            <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
              <div className="space-y-4">
                <Input
                  label="API Key"
                  type="password"
                  value={settings.apiKey}
                  onChange={(e) => handleChange('apiKey', e.target.value)}
                  placeholder="Enter your API key"
                  helperText="Your API key is stored securely and never shared"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Default Model
                  </label>
                  <select
                    value={settings.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="llama2">Llama 2</option>
                    <option value="mistral">Mistral 7B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Temperature: {settings.temperature}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => handleChange('temperature', e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Precise (0)</span>
                    <span>Balanced (1)</span>
                    <span>Creative (2)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleSave}>
                Save Settings
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Note:</strong> This is a demonstration settings page. In production,
              settings would be persisted to a database and synchronized across sessions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
