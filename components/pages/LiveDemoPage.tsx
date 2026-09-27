'use client';

import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { TicTacToeGame } from '../TicTacToeGame';
import { ConnectFourGame } from '../ConnectFourGame';
import { Bot, Sparkles, Trophy, Cpu, Swords, ArrowRight } from 'lucide-react';

interface LiveDemoPageProps {
  initialGame?: 'tictactoe' | 'connectfour';
  onNavigate: (page: PageId) => void;
}

export function LiveDemoPage({ initialGame = 'tictactoe', onNavigate }: LiveDemoPageProps) {
  const [selectedGame, setSelectedGame] = useState<'tictactoe' | 'connectfour'>(initialGame);

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>Interactive Game Testing Arena</span>
            <span>·</span>
            <span>Genuine Adversarial AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Live Game Demo</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Challenge the Minimax algorithm in real-time. Inspect state trees, explore plies, and
            request move rationales.
          </p>
        </div>

        {/* View Results Shortcut */}
        <button
          onClick={() => onNavigate('results')}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
        >
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span>View Session Results</span>
        </button>
      </div>

      {/* SELECT GAME - Segmented Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-300">SELECT GAME</span>
          <span className="font-mono text-[11px]">Click a card to switch game engines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Tic-Tac-Toe */}
          <button
            onClick={() => setSelectedGame('tictactoe')}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
              selectedGame === 'tictactoe'
                ? 'bg-gradient-to-br from-[#121A38] to-[#0E142B] border-cyan-500/60 shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/40'
                : 'bg-[#11162A]/80 border-slate-800 hover:border-slate-700 hover:bg-[#151C36]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">❌⭕</span>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    TIC-TAC-TOE
                  </h3>
                  <p className="text-xs text-slate-400">3x3 Grid · Pure Minimax (Exhaustive)</p>
                </div>
              </div>
              {selectedGame === 'tictactoe' && (
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
              <span>Human (X) vs Bot (O)</span>
              <span className="text-cyan-400">Unbeatable Draw</span>
            </div>
          </button>

          {/* Card 2: Connect Four */}
          <button
            onClick={() => setSelectedGame('connectfour')}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
              selectedGame === 'connectfour'
                ? 'bg-gradient-to-br from-[#1A1338] to-[#120D2B] border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/40'
                : 'bg-[#11162A]/80 border-slate-800 hover:border-slate-700 hover:bg-[#151C36]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">🔴🟡</span>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                    CONNECT FOUR
                  </h3>
                  <p className="text-xs text-slate-400">6x7 Matrix · Depth-Limited Alpha-Beta</p>
                </div>
              </div>
              {selectedGame === 'connectfour' && (
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/80">
              <span>Human (Red) vs Bot (Yellow)</span>
              <span className="text-purple-400">4-Ply Heuristic</span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Game Interface Area */}
      <div className="pt-2">
        {selectedGame === 'tictactoe' ? <TicTacToeGame /> : <ConnectFourGame />}
      </div>
    </div>
  );
}
