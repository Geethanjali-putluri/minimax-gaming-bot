'use client';

import React, { useState, useEffect } from 'react';
import { GameStatsProvider } from '@/lib/context/GameStatsContext';
import { Navbar, PageId } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/components/pages/HomePage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { SubjectsPage } from '@/components/pages/SubjectsPage';
import { AiLlmLayerPage } from '@/components/pages/AiLlmLayerPage';
import { LiveDemoPage } from '@/components/pages/LiveDemoPage';
import { ResultsPage } from '@/components/pages/ResultsPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [initialLiveDemoGame, setInitialLiveDemoGame] = useState<'tictactoe' | 'connectfour'>('tictactoe');

  // Sync with browser URL hash for direct links and bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'dashboard',
        'about',
        'subjects',
        'ai-llm-layer',
        'live-demo',
        'results',
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, gameType?: 'tictactoe' | 'connectfour') => {
    if (gameType) {
      setInitialLiveDemoGame(gameType);
    }
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GameStatsProvider>
      <div className="min-h-screen bg-[#080B18] text-[#F8FAFC] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar activePage={activePage} onNavigate={(p) => handleNavigate(p)} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {activePage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
          {activePage === 'about' && <AboutPage onNavigate={handleNavigate} />}
          {activePage === 'subjects' && <SubjectsPage onNavigate={handleNavigate} />}
          {activePage === 'ai-llm-layer' && <AiLlmLayerPage onNavigate={handleNavigate} />}
          {activePage === 'live-demo' && (
            <LiveDemoPage initialGame={initialLiveDemoGame} onNavigate={handleNavigate} />
          )}
          {activePage === 'results' && <ResultsPage onNavigate={handleNavigate} />}
        </main>

        <Footer onNavigate={(p) => handleNavigate(p)} />
      </div>
    </GameStatsProvider>
  );
}
