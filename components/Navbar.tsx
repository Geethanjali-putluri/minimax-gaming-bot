'use client';

import React, { useState } from 'react';
import { Menu, X, Bot, Play, Sparkles } from 'lucide-react';

export type PageId =
  | 'home'
  | 'dashboard'
  | 'about'
  | 'subjects'
  | 'ai-llm-layer'
  | 'live-demo'
  | 'results';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'about', label: 'About' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'ai-llm-layer', label: 'AI / LLM Layer' },
  { id: 'live-demo', label: 'Live Demo' },
  { id: 'results', label: 'Results' },
];

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080B18]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title, single line */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 group-hover:border-indigo-400/50 transition-colors">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#F8FAFC] group-hover:text-white transition-colors">
              MINIMAX BOT
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider">
              B.Tech CSE-AIML Project
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-150 rounded-md whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleNavClick('live-demo')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-500/40 rounded-lg shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Play Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-[#11162A] text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0B0F20]/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-left transition-colors ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
