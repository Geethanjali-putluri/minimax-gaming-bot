'use client';

import React from 'react';
import { PageId } from '../Navbar';
import { VivaAccordion, VivaQuestion } from '../VivaAccordion';
import {
  Brain,
  Sparkles,
  Bot,
  Cpu,
  Layers,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  Zap,
  Mic,
  Users,
  Smartphone,
  BarChart,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';

interface AiLlmLayerPageProps {
  onNavigate: (page: PageId) => void;
}

export function AiLlmLayerPage({ onNavigate }: AiLlmLayerPageProps) {
  const futureImprovements = [
    {
      title: 'Alpha-Beta Pruning Optimization',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      what: 'An algorithmic branch-and-bound optimization eliminating game tree branches that cannot influence the final decision.',
      how: 'Maintain alpha and beta values during DFS recursion; break when alpha >= beta. (Currently implemented in Connect Four; can be enhanced with dynamic transposition tables).',
      why: 'Doubles search depth under optimal move ordering, allowing Connect Four to search 8-10 plies ahead in real-time.',
    },
    {
      title: 'Dynamic Difficulty Levels',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      what: 'Configurable AI skill tiers: Easy (shallow depth + intentional randomness), Medium (depth 2-3), and Master (depth 5+ / exhaustive).',
      how: 'Add a ply limit slider and probabilistic exploration epsilon in the Minimax root move selector.',
      why: 'Allows casual players to enjoy the game without facing an unbeatable mathematical adversary on every turn.',
    },
    {
      title: 'Machine Learning (Neural Evaluation Function)',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
      what: 'Replacing hand-crafted heuristic formulas with a Convolutional Neural Network (CNN) trained on millions of expert positions.',
      how: 'Export board tensors to an ONNX runtime web model that outputs a position score between -1.0 and +1.0.',
      why: 'Eliminates human bias in heuristic weight tuning and unlocks complex positional pattern detection.',
    },
    {
      title: 'Reinforcement Learning (MCTS & Q-Learning)',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
      what: 'Self-play learning (similar to AlphaZero) using Monte Carlo Tree Search (MCTS) and temporal-difference reward signals.',
      how: 'Simulate millions of self-play matches offline, storing policy and value networks in a compact model.',
      why: 'Allows the system to discover novel strategies independently without needing any human-designed heuristics.',
    },
    {
      title: 'AI vs AI Arena',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
      what: 'An automated sandbox where different algorithms (Pure Minimax, Alpha-Beta, MCTS, Random) compete against one another.',
      how: 'Create an automated game coordinator dispatching alternate moves between two algorithm worker threads.',
      why: 'Provides empirical benchmarking of execution speed, nodes visited, and win-rate differentials.',
    },
    {
      title: 'LLM Game Coach & Post-Match Analyst',
      tag: 'POSSIBLE LLM FEATURE',
      tagColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
      what: 'A conversational grandmaster coach reviewing the game log to identify blunders and missed tactical combinations.',
      how: 'Pass the session move history array to an LLM API route with temperature 0.3 for structured strategic analysis.',
      why: 'Transforms an adversarial game into an educational coaching session that elevates human tactical ability.',
    },
    {
      title: 'Voice Assistant Interface',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
      what: 'Speech-to-text input allowing users to command moves audibly (e.g., "Play Center", "Drop Column 4").',
      how: 'Integrate the Web Speech API or Gemini Multimodal Live API for hands-free audio dialogue.',
      why: 'Enhances accessibility for visually impaired players and showcases multimodal AI interaction.',
    },
    {
      title: 'Real-Time Multiplayer (WebSocket)',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
      what: 'Online Human vs Human multiplayer rooms with live Minimax spectator evaluation bar.',
      how: 'Implement a Node.js WebSocket or WebRTC signaling server synchronizing board states between two peers.',
      why: 'Adds social competitiveness while letting players watch the real-time AI win-probability graph live.',
    },
    {
      title: 'Game Telemetry & Player Behavior Analytics',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      what: 'Aggregated analytics measuring human reaction time, opening move preferences, and blunder frequencies.',
      how: 'Log move timestamps, branch evaluations, and state matrices to a cloud analytics database.',
      why: 'Generates valuable research datasets for human-computer interaction and game psychology studies.',
    },
    {
      title: 'Progressive Web App (PWA) & Offline Mobile',
      tag: 'FUTURE ENHANCEMENT',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      what: 'Installing the application directly to mobile home screens with offline service worker caching.',
      how: 'Add web manifest, service worker caching for static assets, and touch gesture optimizations.',
      why: 'Enables instant mobile play anywhere without network connectivity, as Minimax runs 100% locally.',
    },
  ];

  const vivaQuestions: VivaQuestion[] = [
    {
      id: 'viva-ai-1',
      category: 'AI vs LLM Distinction',
      question: 'Is the Minimax algorithm itself a Large Language Model (LLM)?',
      answer:
        'No. Minimax is a classical, deterministic, search-based algorithm formulated in combinatorial game theory. It operates on structured state matrices, exploring game trees using mathematical recursion. In contrast, an LLM is a probabilistic generative deep neural network (transformer architecture) trained on vast corpuses of natural language text.',
      keyTakeaway:
        'Minimax is deterministic graph search; LLMs are probabilistic autoregressive transformers.',
    },
    {
      id: 'viva-ai-2',
      category: 'AI Architectures',
      question: 'What is the fundamental difference between traditional AI and Generative AI / LLMs?',
      answer:
        'Traditional AI (Symbolic AI, Search algorithms like Minimax, A*, Expert Systems) works with explicit rules, logic, and exact mathematical optimization to guarantee correctness or equilibrium. Generative AI / LLMs work with high-dimensional probability distributions, learning linguistic and conceptual associations to generate content, but they can hallucinate and lack formal guarantees of optimality.',
      keyTakeaway:
        'Traditional AI offers exact logic and mathematical guarantees; LLMs provide general language understanding and synthesis.',
    },
    {
      id: 'viva-ai-3',
      category: 'System Design',
      question: 'Why should an LLM NOT directly control the game-playing moves?',
      answer:
        'Because LLMs are prone to hallucinations, spatial reasoning errors, and rule violations. In a 7x6 grid, an LLM may output an illegal column, miss an immediate opponent win, or make sub-optimal moves due to its probabilistic nature. Minimax, on the other hand, strictly computes the optimal adversarial outcome under zero-sum game theory without error.',
      keyTakeaway:
        'Minimax guarantees legal, mathematically optimal moves; LLMs lack strict spatial verification.',
    },
    {
      id: 'viva-ai-4',
      category: 'Hybrid AI Integration',
      question: 'How can an LLM explain a Minimax decision without replacing it?',
      answer:
        'By operating as a pedagogical explanation layer: the Minimax engine passes its structured search metadata (chosen coordinate, heuristic score, search depth, number of nodes explored, evaluated candidate alternatives) to the LLM. The LLM then translates those exact numerical facts into natural language pedagogical prose, answering "Why was this move best?" without fabricating facts.',
      keyTakeaway:
        'Minimax provides the ground-truth decision and metrics; the LLM converts them into human explanations.',
    },
    {
      id: 'viva-ai-5',
      category: 'Algorithm Optimization',
      question: 'What is the difference between Minimax with Alpha-Beta and pure Minimax?',
      answer:
        'Both algorithms output the EXACT same move and score; Alpha-Beta does not alter the decision. However, Alpha-Beta pruning discards subtrees that are mathematically provable to have no impact on the root outcome. In the best case, it reduces search space from O(b^d) to O(b^(d/2)), enabling the bot to look twice as far ahead in the same duration.',
      keyTakeaway:
        'Alpha-Beta yields identical optimal moves while pruning up to 90% of redundant search branches.',
    },
    {
      id: 'viva-ai-6',
      category: 'Machine Learning',
      question: 'How could Machine Learning improve this system in future iterations?',
      answer:
        'In Connect Four, static heuristic formulas rely on human intuition (e.g. counting 2-in-a-row and 3-in-a-row windows). Machine Learning can train an evaluation neural network on millions of self-play games to learn subtle positional values, piece mobility, and tempo advantages that human heuristics overlook.',
      keyTakeaway:
        'Machine learning can replace hand-crafted heuristic formulas with data-driven neural evaluations.',
    },
    {
      id: 'viva-ai-7',
      category: 'Reinforcement Learning',
      question: 'What is Reinforcement Learning, and how does it apply to game playing?',
      answer:
        'Reinforcement Learning (RL) is a paradigm where an autonomous agent learns optimal actions through trial-and-error interaction with an environment, guided by reward signals (+1 for win, -1 for loss, 0 for draw). Algorithms like Q-learning, Policy Gradients, and AlphaZero use self-play to converge upon optimal game strategies without needing pre-existing human knowledge.',
      keyTakeaway:
        'Reinforcement Learning masters game strategy through autonomous self-play and reward signals.',
    },
  ];

  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>Architectural Separation</span>
          <span>·</span>
          <span>Traditional AI vs Generative LLM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">AI / LLM Layer Architecture</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          A rigorous academic comparison between the currently active Minimax adversarial decision
          engine and future pedagogical LLM enhancements.
        </p>
      </div>

      {/* Dual Visual Architecture Diagram */}
      <section className="rounded-2xl border border-slate-800 bg-[#0E1326] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            System Separation of Concerns
          </div>
          <h2 className="text-2xl font-bold text-white">Dual Engine Architecture</h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            The LLM assists and educates the user, while the Minimax engine remains strictly
            responsible for all game decisions.
          </p>
        </div>

        {/* Visual Dual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Path 1: Game Decision Engine */}
          <div className="p-5 rounded-2xl bg-[#121936] border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Cpu className="h-4 w-4" /> ENGINE PATH 1
              </span>
              <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/60">
                CURRENT IMPLEMENTATION
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Deterministic Minimax Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Responsible for calculating game moves, terminal win detection, state tree exploration,
              and heuristic payoffs.
            </p>

            {/* Vertical Flow */}
            <div className="space-y-1.5 pt-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#090D1F] border border-slate-800 text-center text-slate-300">
                User / Human Action
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (Player Drop / Mark)</div>
              <div className="p-2 rounded-lg bg-[#090D1F] border border-slate-800 text-center text-slate-300">
                Interactive Board Interface
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (Matrix State Sent)</div>
              <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-700/60 text-center text-cyan-200 font-semibold">
                Minimax Search & Pruning Engine
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (Optimal Backpropagated Move)</div>
              <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-700/60 text-center text-emerald-300 font-semibold">
                Bot Game Move Executed
              </div>
            </div>
          </div>

          {/* Path 2: LLM Pedagogical Assistant */}
          <div className="p-5 rounded-2xl bg-[#181538] border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> ASSISTANT PATH 2
              </span>
              <span className="text-[10px] font-mono bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-800/60">
                POSSIBLE LLM FEATURES
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Pedagogical LLM Layer</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Responsible for contextual move explanations, conversational viva tutoring, and
              student question answering.
            </p>

            {/* Vertical Flow */}
            <div className="space-y-1.5 pt-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#0E0C22] border border-slate-800 text-center text-slate-300">
                User Clicks &quot;Explain This Move&quot;
              </div>
              <div className="text-center text-purple-400 text-[10px]">↓ (Request Sent)</div>
              <div className="p-2 rounded-lg bg-[#0E0C22] border border-slate-800 text-center text-slate-300">
                Minimax Search Metrics Passed
              </div>
              <div className="text-center text-purple-400 text-[10px]">↓ (Ground Truth Fed)</div>
              <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-700/60 text-center text-purple-200 font-semibold">
                Gemini LLM Teacher / Local AI
              </div>
              <div className="text-center text-purple-400 text-[10px]">↓ (Pedagogical Rationale)</div>
              <div className="p-2 rounded-lg bg-indigo-950/50 border border-indigo-700/60 text-center text-indigo-300 font-semibold">
                Viva Concept & Strategy Displayed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of the Possible LLM Layer */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Curriculum Augmentation
          </div>
          <h2 className="text-2xl font-bold text-white">Four Educational Pillars of the LLM Layer</h2>
          <p className="text-xs text-slate-400">
            How natural language AI enhances understanding without replacing the search algorithm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
              <Bot className="h-4 w-4" />
              <h3>1. AI Explanation Assistant</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explains in human terms: <em>&quot;Why did the bot choose this move?&quot;</em> Grounded
              directly on true Minimax metrics (e.g. &quot;Selected position (1,1) because it prevents
              opponent win and maximizes 4 diagonal lines, exploring 1,420 states&quot;). No hallucinations.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
              <GraduationCap className="h-4 w-4" />
              <h3>2. Educational Tutor</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An on-demand tutor answering conceptual exam questions: Game tree construction, recursive
              backtracking, Alpha-Beta pruning, static heuristic evaluation functions, and asymptotic
              complexity.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
              <BarChart className="h-4 w-4" />
              <h3>3. Personalized Post-Match Feedback</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Post-game analysis parsing the session move history. Pinpoints player blunders, identifies
              missed winning forks, and recommends tactical adjustments for subsequent rounds.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
              <Sparkles className="h-4 w-4" />
              <h3>4. Natural Language Interaction</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Allows students to ask questions freely in natural language: <em>&quot;Why would
              playing Column 2 lose immediately?&quot;</em> or <em>&quot;What happens if I played
              the corner instead?&quot;</em>
            </p>
          </div>
        </div>
      </section>

      {/* 10 Future AI Improvements Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Roadmap & Capstone Scope
          </div>
          <h2 className="text-2xl font-bold text-white">Future AI Improvements (10 Key Dimensions)</h2>
          <p className="text-xs text-slate-400">
            Explicitly categorized research directions for higher semesters and postgraduate work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {futureImprovements.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#11162A]/90 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-slate-100">{item.title}</h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">What it is: </span>
                  <span className="text-slate-300">{item.what}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">How to integrate: </span>
                  <span className="text-slate-300">{item.how}</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-medium">Why it improves project: </span>
                  <span className="text-slate-300">{item.why}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI / LLM Viva Questions Section */}
      <section className="pt-4">
        <VivaAccordion
          title="AI & LLM Architecture Viva Questions & Answers"
          subtitle="Essential questions on why Minimax is distinct from LLMs and how hybrid architectures function."
          questions={vivaQuestions}
        />
      </section>
    </div>
  );
}
