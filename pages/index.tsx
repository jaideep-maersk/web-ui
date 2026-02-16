import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Open WebUI - Next.js</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Open WebUI
            </h1>
            <p className="text-xl text-gray-300">
              Next.js + TypeScript Migration
            </p>
          </header>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              title="🚀 Next.js 14"
              description="Modern React framework with App Router and Server Components"
            />
            <FeatureCard
              title="📘 TypeScript"
              description="Full type safety across frontend and backend"
            />
            <FeatureCard
              title="🎨 Tailwind CSS"
              description="Utility-first CSS framework for rapid UI development"
            />
            <FeatureCard
              title="🔌 API Routes"
              description="Backend endpoints powered by Next.js API routes"
            />
            <FeatureCard
              title="⚡ Performance"
              description="Optimized builds with SSR and SSG capabilities"
            />
            <FeatureCard
              title="🛠️ Developer Experience"
              description="Hot reload, TypeScript IntelliSense, and modern tooling"
            />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex gap-4">
              <Link
                href="/chat"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Go to Chat
              </Link>
              <Link
                href="/api/health"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Test API
              </Link>
            </div>
          </div>

          {/* Status */}
          {mounted && (
            <div className="mt-16 text-center">
              <div className="inline-block px-4 py-2 bg-green-900/50 border border-green-600 rounded-lg">
                <span className="text-green-400">✓ Next.js App Running</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default Home;
