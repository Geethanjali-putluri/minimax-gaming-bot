'use client';

import React, { useState } from 'react';
import { X, Bot, Sparkles, Brain, Award, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

interface ExplainMoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: 'tictactoe' | 'connectfour';
  moveDescription: string;
  minimaxScore: number;
  statesExplored: number;
  searchDepth: number | string;
  deterministicExplanation: string;
  boardSummary?: string;
  moveHistoryCount?: number;
}

export function ExplainMoveModal({
  isOpen,
  onClose,
  gameType,
  moveDescription,
  minimaxScore,
  statesExplored,
  searchDepth,
  deterministicExplanation,
  boardSummary,
  moveHistoryCount = 0,
}: ExplainMoveModalProps) {
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmData, setLlmData] = useState<{
    explanation: string;
    academicInsight: string;
    isLiveAi: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const handleFetchLlmExplanation = async () => {
    setLlmLoading(true);
    try {
      const res = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameType,
          moveDescription,
          minimaxAnalysis: {
            score: minimaxScore,
            statesExplored,
            searchDepth,
            defaultExplanation: deterministicExplanation,
          },
          boardSummary,
          playerMoveHistory: Array(moveHistoryCount).fill('move'),
        }),
      });
      const data = await res.json();
      setLlmData(data);
    } catch {
      setLlmData({
        isLiveAi: false,
        explanation: deterministicExplanation,
        academicInsight:
          'Minimax guarantees optimal adversarial play by minimizing the maximum possible loss (von Neumann Minimax Theorem).',
      });
    } finally {
      setLlmLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-[#0E1326] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-[#F8FAFC]">
                  Minimax Move Explanation
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  {gameType === 'tictactoe' ? 'Tic-Tac-Toe' : 'Connect Four'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mathematical rationale computed by the adversarial decision engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Minimax Metrics Banner */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3 rounded-xl bg-[#090C19] border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400">Chosen Move</span>
            <div className="text-sm font-semibold text-cyan-300 truncate mt-0.5">
              {moveDescription}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#090C19] border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400">Payoff Score</span>
            <div className="text-sm font-semibold font-mono text-emerald-400 mt-0.5">
              {minimaxScore > 0 ? `+${minimaxScore}` : minimaxScore}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#090C19] border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono text-slate-400">States Explored</span>
            <div className="text-sm font-semibold font-mono text-purple-300 mt-0.5">
              {statesExplored.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Deterministic Minimax Rationale */}
        <div className="space-y-3 my-4">
          <div className="rounded-xl bg-[#141A33] border border-indigo-900/40 p-4 text-xs leading-relaxed text-slate-200">
            <div className="flex items-center gap-2 font-medium text-cyan-300 mb-1.5">
              <Bot className="h-4 w-4" />
              <span>Algorithmic Rationale (Ground Truth Minimax):</span>
            </div>
            <p>{deterministicExplanation}</p>
          </div>

          {/* Academic Principle Callout */}
          <div className="rounded-xl bg-[#0B0F22] border border-slate-800/80 p-3.5 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-indigo-300">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span>Adversarial Search Properties:</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Minimax is mathematically sound: assuming the opponent acts to minimize the bot&apos;s
              payoff, this chosen branch delivers the highest guaranteed lower bound on the final
              utility.
            </p>
          </div>
        </div>

        {/* Optional LLM Pedagogical Tutor layer */}
        <div className="pt-3 border-t border-slate-800/80">
          {!llmData ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-800/40">
              <div className="text-xs text-slate-300 text-center sm:text-left">
                <span className="font-semibold text-white block">
                  Ask AI Tutor for B.Tech Viva Explanation
                </span>
                <span className="text-[11px] text-slate-400">
                  Generates viva-style concept breakdown connected to Data Structures & AI
                </span>
              </div>
              <button
                onClick={handleFetchLlmExplanation}
                disabled={llmLoading}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm disabled:opacity-50"
              >
                {llmLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing Tree...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Generate Viva Explanation</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/50 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-indigo-300 font-semibold text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>AI Tutor (LLM Viva Guidance):</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {llmData.isLiveAi ? 'Gemini 2.5 Flash' : 'Academic Fallback'}
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed text-xs">{llmData.explanation}</p>
              {llmData.academicInsight && (
                <div className="pt-2 border-t border-indigo-900/60 text-[11px] text-cyan-300/90 flex items-start gap-1.5">
                  <CheckCircle className="h-3 w-3 shrink-0 mt-0.5 text-cyan-400" />
                  <span>{llmData.academicInsight}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
