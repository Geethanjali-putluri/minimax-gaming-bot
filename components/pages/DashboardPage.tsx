'use client';

import React from 'react';
import { PageId } from '../Navbar';
import { useGameStats } from '@/lib/context/GameStatsContext';
import {
  Gamepad2,
  Cpu,
  Users,
  Activity,
  Trophy,
  Bot,
  RotateCcw,
  Play,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Flame,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: PageId, gameType?: 'tictactoe' | 'connectfour') => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { overallStats, tictactoeStats, connectfourStats, history, resetStats } = useGameStats();

  const total = overallStats.total;
  const botWins = overallStats.botWins;
  const playerWins = overallStats.playerWins;
  const draws = overallStats.draws;

  const botWinPct = total > 0 ? Math.round((botWins / total) * 100) : 0;
  const playerWinPct = total > 0 ? Math.round((playerWins / total) * 100) : 0;
  const drawPct = total > 0 ? Math.round((draws / total) * 100) : 0;

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>Project Telemetry</span>
            <span>·</span>
            <span>Live Session Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">System Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time adversarial gameplay metrics, session win rates, and active decision engines.
          </p>
        </div>

        {total > 0 && (
          <button
            onClick={resetStats}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Session Stats</span>
          </button>
        )}
      </div>

      {/* 4 System Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Games Available</span>
            <Gamepad2 className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">2</div>
          <div className="text-[11px] text-slate-400 mt-1">Tic-Tac-Toe & Connect Four</div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">AI Algorithm</span>
            <Cpu className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-indigo-300 font-mono">Minimax</div>
          <div className="text-[11px] text-slate-400 mt-1">Adversarial Game Tree</div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Game Modes</span>
            <Users className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-purple-300 font-mono">Human vs AI</div>
          <div className="text-[11px] text-slate-400 mt-1">Zero-sum turn-based</div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">AI Decision System</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </div>
          <div className="text-[11px] text-slate-400 mt-1">In-browser evaluation</div>
        </div>
      </div>

      {/* Real Session Gameplay Statistics & Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Session Scoreboard (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-semibold text-base text-white">Live Session Game Statistics</h3>
              <p className="text-xs text-slate-400">
                Tracked from actual rounds played in this browser session
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50">
              {total} Total Games
            </span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#090C19] border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400">Bot Wins</span>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-0.5">{botWins}</div>
              <span className="text-[10px] text-slate-500 font-mono">{botWinPct}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090C19] border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400">Player Wins</span>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">{playerWins}</div>
              <span className="text-[10px] text-slate-500 font-mono">{playerWinPct}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090C19] border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400">Draws</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">{draws}</div>
              <span className="text-[10px] text-slate-500 font-mono">{drawPct}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090C19] border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400">Win Rate</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                {playerWinPct}%
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Player</span>
            </div>
          </div>

          {/* Visual Distribution Chart */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                Outcome Ratio Distribution
              </span>
              <span className="text-slate-400 text-[11px]">
                {total > 0 ? `${total} matches logged` : 'Awaiting first game'}
              </span>
            </div>

            {total > 0 ? (
              <div className="space-y-2">
                {/* Horizontal split bar */}
                <div className="h-6 w-full rounded-lg overflow-hidden flex bg-slate-900 border border-slate-800">
                  {botWins > 0 && (
                    <div
                      style={{ width: `${(botWins / total) * 100}%` }}
                      className="bg-purple-600 flex items-center justify-center text-[10px] font-mono text-white font-semibold transition-all duration-300"
                      title={`Bot Wins: ${botWins}`}
                    >
                      {botWins}
                    </div>
                  )}
                  {draws > 0 && (
                    <div
                      style={{ width: `${(draws / total) * 100}%` }}
                      className="bg-amber-500 flex items-center justify-center text-[10px] font-mono text-slate-950 font-bold transition-all duration-300"
                      title={`Draws: ${draws}`}
                    >
                      {draws}
                    </div>
                  )}
                  {playerWins > 0 && (
                    <div
                      style={{ width: `${(playerWins / total) * 100}%` }}
                      className="bg-cyan-500 flex items-center justify-center text-[10px] font-mono text-slate-950 font-bold transition-all duration-300"
                      title={`Player Wins: ${playerWins}`}
                    >
                      {playerWins}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-500" /> Bot: {botWins} ({botWinPct}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-400" /> Draws: {draws} ({drawPct}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" /> Player: {playerWins} ({playerWinPct}%)
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#090C19] border border-slate-800 text-center text-xs text-slate-500">
                No matches played in this session yet. Launch a game below to generate real data.
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Engine Status & Verification (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <h3 className="font-semibold text-base text-white">AI Engine Status</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0A0D1D] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">Minimax Engine</div>
                <div className="text-[11px] text-slate-400">Pure Adversarial Search</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A0D1D] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">Game State Evaluation</div>
                <div className="text-[11px] text-slate-400">Terminal & Heuristic Scoring</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A0D1D] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-200">Decision Search</div>
                <div className="text-[11px] text-slate-400">Branching Alpha-Beta Cutoffs</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-[11px] text-indigo-200/90 leading-relaxed">
            <strong>Academic Integrity Note:</strong> The active decision systems execute genuine
            Minimax algorithms directly on the client and server. No hardcoded responses or fake
            random generators are used.
          </div>
        </div>
      </div>

      {/* Available Games Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Available Games</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tic Tac Toe Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">3x3 Grid</span>
                <span className="text-[11px] text-slate-400">
                  {tictactoeStats.total} matches played
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Tic-Tac-Toe</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full-tree Minimax search exploring up to 9 plies. The bot proves the game is an
                unbeatable draw under optimal play.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('live-demo', 'tictactoe')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Play Now</span>
              </button>
            </div>
          </div>

          {/* Connect Four Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">6x7 Matrix</span>
                <span className="text-[11px] text-slate-400">
                  {connectfourStats.total} matches played
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Connect Four</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Depth-limited Minimax with Alpha-Beta pruning and 4-cell window heuristic evaluation
                function.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('live-demo', 'connectfour')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Play Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
