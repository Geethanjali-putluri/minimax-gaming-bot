'use client';

import React from 'react';
import { PageId } from '../Navbar';
import { DecisionTreeVisual } from '../DecisionTreeVisual';
import {
  Bot,
  Play,
  LayoutDashboard,
  ArrowRight,
  Cpu,
  GitBranch,
  ShieldCheck,
  Zap,
  Target,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const steps = [
    { title: 'Game State', desc: 'Current board matrix captured in array memory' },
    { title: 'Generate Possible Moves', desc: 'Identify legal unvisited cells or columns' },
    { title: 'Build Game Tree', desc: 'Recursive branch expansion across MAX and MIN layers' },
    { title: 'Evaluate States', desc: 'Heuristic payoff values computed at leaf states' },
    { title: 'Minimax Decision', desc: 'Backpropagate maximum guaranteed utility' },
    { title: 'Best Move', desc: 'Optimal adversarial action executed on the board' },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-tight">
          MINIMAX <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            GAME PLAYING BOT
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An AI-powered game-playing system that uses the Minimax algorithm to make intelligent
          decisions against human players with mathematical precision.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('live-demo')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all active:scale-95"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Play Games</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#11162A] hover:bg-[#18203E] text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm transition-all"
          >
            <LayoutDashboard className="h-4 w-4 text-cyan-400" />
            <span>Explore Dashboard</span>
          </button>
        </div>

        {/* Verification badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" /> Zero Mock Data
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5 text-purple-400" /> Genuine Adversarial Search
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Game-Theoretic Optimal
          </span>
        </div>
      </section>

      {/* Decision Tree Visual Showcase */}
      <section className="max-w-5xl mx-auto">
        <DecisionTreeVisual />
      </section>

      {/* Two Game Showcase Cards */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Available Adversarial Games</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Experience the Minimax algorithm across two different state space complexities:
            exhaustive search and depth-limited heuristic pruning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tic Tac Toe Card */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#11162A] to-[#0D1224] p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-lg font-black">
                3x3
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40">
                Pure Minimax (Exhaustive)
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Tic-Tac-Toe
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Classic strategy game powered by Minimax. Explores up to 9 plies to guarantee an
                unbeatable game-theoretic equilibrium.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Tree Size</span>
                <span className="font-mono text-slate-200">~255,168 Leaves</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Guarantee</span>
                <span className="font-mono text-emerald-400">Never Loses</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => onNavigate('live-demo')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 hover:text-white font-medium text-xs transition-colors"
              >
                <span>Play Tic-Tac-Toe</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Connect Four Card */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#11162A] to-[#0D1224] p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400 text-lg font-black">
                6x7
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-800/40">
                Depth-Limited + Alpha-Beta
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Connect Four
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strategic board game demonstrating deeper adversarial search. Utilizes 4-in-a-row
                window heuristic evaluation and branch cutoffs.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Tree Size</span>
                <span className="font-mono text-slate-200">4.53 × 10¹² States</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Optimization</span>
                <span className="font-mono text-purple-300">Alpha-Beta Pruning</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => onNavigate('live-demo')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-700/60 text-purple-300 hover:text-white font-medium text-xs transition-colors"
              >
                <span>Play Connect Four</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-[#0E1326] p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            Algorithmic Pipeline
          </div>
          <h2 className="text-2xl font-bold text-white">How Minimax Works</h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            From current board representation to optimal move backpropagation in mathematical
            sequence
          </p>
        </div>

        {/* Step-by-step visual pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-xl bg-[#141B33] border border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>0{idx + 1}</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-slate-600 hidden lg:block" />
                  )}
                </div>
                <h4 className="font-semibold text-xs text-slate-100">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
