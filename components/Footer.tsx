import React from 'react';
import { PageId } from './Navbar';
import { Bot, Terminal, Cpu } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-850 bg-[#060814] text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <Bot className="h-4 w-4" />
              </div>
              <span className="font-semibold text-sm text-[#F8FAFC]">
                MINIMAX GAME PLAYING BOT
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              An academic B.Tech CSE-AIML capstone project demonstrating adversarial game tree
              search, heuristic evaluation, and recursive decision-making using the pure Minimax
              algorithm and depth-limited Alpha-Beta pruning.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>B.Tech CSE - Artificial Intelligence & Machine Learning</span>
              <span>·</span>
              <span>Curriculum Capstone</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-200 mb-3 text-xs tracking-wider uppercase">
              Project Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Dashboard & Stats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subjects')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Curriculum Subjects & Viva
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-llm-layer')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI / LLM Layer Architecture
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-slate-200 mb-3 text-xs tracking-wider uppercase">
              Games & Algorithms
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('live-demo')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Tic-Tac-Toe (Exhaustive Minimax)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('live-demo')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Connect Four (Alpha-Beta Search)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Session Analytics & History
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Problem Statement & Objectives
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Minimax Game Playing Bot · B.Tech CSE-AIML Department
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400/90">
              <Cpu className="h-3 w-3" />
              Minimax Engine: Client & Server Side
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
