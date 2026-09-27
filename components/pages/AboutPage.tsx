'use client';

import React from 'react';
import { PageId } from '../Navbar';
import {
  Brain,
  Target,
  Layers,
  ArrowRight,
  Code2,
  CheckCircle2,
  Cpu,
  Shield,
  Sparkles,
  GitBranch,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const systemFlow = [
    { label: 'Player Move', sub: 'Human interacts via UI' },
    { label: 'Current Game State', sub: 'Matrix parsed & validated' },
    { label: 'Generate Possible Moves', sub: 'Legal unvisited plies identified' },
    { label: 'Minimax Search', sub: 'Adversarial recursion across MAX/MIN' },
    { label: 'Evaluate Future States', sub: 'Terminal win/loss/heuristic calculated' },
    { label: 'Select Optimal Move', sub: 'Best utility backpropagated' },
    { label: 'Bot Move', sub: 'AI action executed on board' },
  ];

  const technologies = [
    {
      name: 'React 19 & Next.js 15 (App Router)',
      category: 'Frontend & Architecture',
      detail:
        'Server-side and client component architecture with reactive state management for real-time game loops.',
    },
    {
      name: 'TypeScript 5.9',
      category: 'Static Typing & Algorithm Safety',
      detail:
        'Strict type safety for board states, game tree models, candidate evaluation interfaces, and move histories.',
    },
    {
      name: 'Tailwind CSS v4 & PostCSS',
      category: 'Styling & Design System',
      detail:
        'Engineered dark navy futuristic academic theme following strict WCAG AA contrast and zero-slop discipline.',
    },
    {
      name: 'Minimax & Alpha-Beta Engine',
      category: 'Core AI Implementation',
      detail:
        'Pure TypeScript adversarial search algorithms with zero external AI dependencies or fake mock delays.',
    },
    {
      name: 'Motion (motion/react)',
      category: 'Animation & Feedback',
      detail:
        'Hardware-accelerated visual transitions for Connect Four falling pieces and game tree node inspections.',
    },
    {
      name: 'Google GenAI SDK (@google/genai)',
      category: 'Optional Pedagogical LLM Layer',
      detail:
        'Server-side integration to translate numerical Minimax search values into student-friendly viva explanations.',
    },
  ];

  const features = [
    {
      title: 'Human vs AI Gameplay',
      desc: 'Interactive turn-based play against an AI bot that evaluates future outcomes using zero-sum game theory.',
    },
    {
      title: 'Minimax Decision-Making',
      desc: 'Decision-making powered by recursive backpropagation and heuristic scoring rather than random chance or pre-scripted moves.',
    },
    {
      title: 'Tic-Tac-Toe (Exhaustive)',
      desc: 'Complete 9-ply game tree search examining every possible leaf state, ensuring an unbeatable AI bot.',
    },
    {
      title: 'Connect Four (Heuristic)',
      desc: '4-ply to 5-ply depth-limited Minimax with Alpha-Beta pruning to tame the 4.5 trillion state combinatorial explosion.',
    },
    {
      title: 'Real-Time Session Statistics',
      desc: 'Tracks wins, draws, losses, and win percentages based strictly on matches completed in the session.',
    },
    {
      title: 'AI Explanation Layer',
      desc: 'Translates search depth, node counts, and payoff values into plain English tactical rationales for academic viva.',
    },
    {
      title: 'Responsive Cross-Device UI',
      desc: 'Optimized touch and mouse controls tailored for desktop, tablet, and mobile screens.',
    },
  ];

  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>Academic Project Documentation</span>
          <span>·</span>
          <span>B.Tech CSE-AIML</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">About the Project</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive project background, problem formulation, system design, and algorithmic
          foundations of the Minimax Game Playing Bot.
        </p>
      </div>

      {/* Project Overview */}
      <section className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-lg">
          <Brain className="h-5 w-5" />
          <h2>Project Overview</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>Minimax Game Playing Bot</strong> is an academic Computer Science & Engineering
          (CSE-AIML) capstone project designed to demonstrate the practical application of classical
          Artificial Intelligence in game playing. Unlike modern black-box machine learning models,
          the Minimax algorithm is fully explainable, mathematically provable, and rooted in
          combinatorial game theory (von Neumann&apos;s Minimax Theorem, 1928).
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The application implements two distinct adversarial games: <strong>Tic-Tac-Toe</strong> (an
          exhaustive search where every possible branch is computed) and <strong>Connect Four</strong>
          (a complex game where depth-limiting, heuristic evaluation, and Alpha-Beta pruning are
          strictly necessary due to combinatorial explosion).
        </p>
      </section>

      {/* Problem Statement & Objective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-base">
            <Target className="h-5 w-5" />
            <h3>Problem Statement</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In competitive two-player games with perfect information, human decision-making relies on
            tactical foresight, pattern recognition, and blunder prevention. Designing an automated
            software agent that consistently selects strategic moves requires solving the
            combinatorial challenge of evaluating exponentially growing future possibilities in
            real-time while maintaining responsiveness.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-base">
            <Shield className="h-5 w-5" />
            <h3>Project Objective</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To build a robust, modular, and pedagogical game-playing platform that demonstrates
            adversarial tree search, recursive backtracking, heuristic static evaluation, and
            pruning techniques. The system serves as a tangible viva demonstration linking core
            B.Tech subjects (Data Structures, C Programming logic, Algorithms) to Artificial
            Intelligence.
          </p>
        </section>
      </div>

      {/* How the System Works Flow */}
      <section className="rounded-2xl border border-slate-800 bg-[#0E1326] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Execution Lifecycle
          </div>
          <h3 className="text-xl font-bold text-white">How the System Works</h3>
          <p className="text-xs text-slate-400">
            Sequential flow from user interaction to terminal Minimax backpropagation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 pt-2">
          {systemFlow.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#141B33] border border-slate-800 flex flex-col justify-between space-y-2 relative"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400">
                <span>Phase {idx + 1}</span>
                {idx < systemFlow.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-slate-600 hidden lg:block" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-xs text-slate-100">{step.label}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Technologies */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Code2 className="h-5 w-5 text-indigo-400" />
          <h3>Key Technologies Used</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-1.5"
            >
              <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">
                {tech.category}
              </span>
              <h4 className="font-semibold text-sm text-slate-100">{tech.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tech.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Checklist */}
      <section className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">System Features</h3>
          <p className="text-xs text-slate-400">
            Production-grade capabilities built into the academic demonstration platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#090C19] border border-slate-850">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="font-semibold text-xs text-slate-200">{feat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
