'use client';

import React from 'react';
import { PageId } from '../Navbar';
import { useGameStats, GameRecord } from '@/lib/context/GameStatsContext';
import {
  Trophy,
  BarChart3,
  RotateCcw,
  Play,
  Gamepad2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react';

interface ResultsPageProps {
  onNavigate: (page: PageId, game?: 'tictactoe' | 'connectfour') => void;
}

export function ResultsPage({ onNavigate }: ResultsPageProps) {
  const { overallStats, tictactoeStats, connectfourStats, history, resetStats } = useGameStats();

  const total = overallStats.total;
  const botWins = overallStats.botWins;
  const playerWins = overallStats.playerWins;
  const draws = overallStats.draws;

  const botWinPct = total > 0 ? Math.round((botWins / total) * 100) : 0;
  const playerWinPct = total > 0 ? Math.round((playerWins / total) * 100) : 0;
  const drawPct = total > 0 ? Math.round((draws / total) * 100) : 0;

  return (
    <div className="space-y-10 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>Session Intelligence</span>
            <span>·</span>
            <span>Empirical Match Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Results & Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Historical outcomes, win ratios, and game logs derived strictly from your active gameplay
            session.
          </p>
        </div>

        {total > 0 && (
          <button
            onClick={resetStats}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Clear Session History</span>
          </button>
        )}
      </div>

      {total === 0 ? (
        /* Attractive Empty State */
        <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-8 sm:p-12 text-center space-y-5 shadow-xl">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
            <Trophy className="h-8 w-8 text-slate-500" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white">No Match Data Recorded Yet</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Play matches against the Minimax bot in Tic-Tac-Toe or Connect Four to generate
              empirical win-loss distributions and state tree logs.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('live-demo', 'tictactoe')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Play Tic-Tac-Toe</span>
            </button>
            <button
              onClick={() => onNavigate('live-demo', 'connectfour')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-md"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Play Connect Four</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Global Statistics Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Total Matches</span>
              <div className="text-3xl font-extrabold text-white font-mono">{total}</div>
              <div className="text-[11px] text-slate-500">Across all engines</div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-1">
              <span className="text-[11px] font-mono text-purple-400 uppercase">Bot Wins</span>
              <div className="text-3xl font-extrabold text-purple-300 font-mono">{botWins}</div>
              <div className="text-[11px] text-purple-400 font-mono">{botWinPct}% Bot Win Rate</div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 uppercase">Player Wins</span>
              <div className="text-3xl font-extrabold text-cyan-300 font-mono">{playerWins}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{playerWinPct}% Player Win Rate</div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-1">
              <span className="text-[11px] font-mono text-amber-400 uppercase">Stalemates / Draws</span>
              <div className="text-3xl font-extrabold text-amber-300 font-mono">{draws}</div>
              <div className="text-[11px] text-amber-400 font-mono">{drawPct}% Draw Rate</div>
            </div>
          </div>

          {/* Game Comparison Section: Tic-Tac-Toe vs Connect Four */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tic-Tac-Toe Stats */}
            <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">❌⭕</span>
                  <h3 className="font-bold text-base text-white">Tic-Tac-Toe Statistics</h3>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {tictactoeStats.total} {tictactoeStats.total === 1 ? 'game' : 'games'}
                </span>
              </div>

              {tictactoeStats.total > 0 ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Bot</span>
                      <span className="text-sm font-bold text-purple-300">
                        {tictactoeStats.botWins}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Player</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {tictactoeStats.playerWins}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Draws</span>
                      <span className="text-sm font-bold text-amber-300">
                        {tictactoeStats.draws}
                      </span>
                    </div>
                  </div>

                  {/* Visual ratio bar */}
                  <div className="h-4 w-full rounded-md overflow-hidden flex bg-slate-900 border border-slate-800">
                    <div
                      style={{
                        width: `${(tictactoeStats.botWins / tictactoeStats.total) * 100}%`,
                      }}
                      className="bg-purple-600 transition-all"
                    />
                    <div
                      style={{
                        width: `${(tictactoeStats.draws / tictactoeStats.total) * 100}%`,
                      }}
                      className="bg-amber-500 transition-all"
                    />
                    <div
                      style={{
                        width: `${(tictactoeStats.playerWins / tictactoeStats.total) * 100}%`,
                      }}
                      className="bg-cyan-500 transition-all"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                    <span>Bot: {tictactoeStats.botWinRatePercent}%</span>
                    <span>Player: {tictactoeStats.winRatePercent}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  No Tic-Tac-Toe games played yet.
                </div>
              )}
            </div>

            {/* Connect Four Stats */}
            <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔴🟡</span>
                  <h3 className="font-bold text-base text-white">Connect Four Statistics</h3>
                </div>
                <span className="text-xs font-mono text-purple-400">
                  {connectfourStats.total} {connectfourStats.total === 1 ? 'game' : 'games'}
                </span>
              </div>

              {connectfourStats.total > 0 ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Bot</span>
                      <span className="text-sm font-bold text-amber-300">
                        {connectfourStats.botWins}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Player</span>
                      <span className="text-sm font-bold text-rose-300">
                        {connectfourStats.playerWins}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Draws</span>
                      <span className="text-sm font-bold text-amber-400">
                        {connectfourStats.draws}
                      </span>
                    </div>
                  </div>

                  {/* Visual ratio bar */}
                  <div className="h-4 w-full rounded-md overflow-hidden flex bg-slate-900 border border-slate-800">
                    <div
                      style={{
                        width: `${(connectfourStats.botWins / connectfourStats.total) * 100}%`,
                      }}
                      className="bg-amber-500 transition-all"
                    />
                    <div
                      style={{
                        width: `${(connectfourStats.draws / connectfourStats.total) * 100}%`,
                      }}
                      className="bg-amber-700 transition-all"
                    />
                    <div
                      style={{
                        width: `${(connectfourStats.playerWins / connectfourStats.total) * 100}%`,
                      }}
                      className="bg-rose-500 transition-all"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                    <span>Bot: {connectfourStats.botWinRatePercent}%</span>
                    <span>Player: {connectfourStats.winRatePercent}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  No Connect Four games played yet.
                </div>
              )}
            </div>
          </div>

          {/* Session Game History Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                <h3 className="font-semibold text-base text-white">Session Match History</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {history.length} logged matches
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Game</th>
                    <th className="py-2.5 px-3">Result</th>
                    <th className="py-2.5 px-3">Winner</th>
                    <th className="py-2.5 px-3">Moves (Plies)</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {history.map((record, index) => {
                    const isPlayerWin = record.winner === 'player';
                    const isBotWin = record.winner === 'bot';
                    const isDraw = record.winner === 'draw';

                    return (
                      <tr key={record.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3 text-slate-500">#{history.length - index}</td>
                        <td className="py-3 px-3 font-sans font-medium text-slate-200">
                          {record.gameType === 'tictactoe' ? '❌⭕ Tic-Tac-Toe' : '🔴🟡 Connect Four'}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              isPlayerWin
                                ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/60'
                                : isBotWin
                                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                            }`}
                          >
                            {isDraw ? 'Draw' : isPlayerWin ? 'Player Won' : 'Bot Won'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-sans">
                          {isPlayerWin
                            ? 'Human Player'
                            : isBotWin
                            ? 'Minimax AI Bot'
                            : 'Stalemate (Equilibrium)'}
                        </td>
                        <td className="py-3 px-3 text-slate-300">{record.movesCount} plies</td>
                        <td className="py-3 px-3 text-slate-400">{record.durationSeconds}s</td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">{record.timestamp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
