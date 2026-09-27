'use client';

import React, { useState } from 'react';
import { GitBranch, Shield, Zap, Info, ChevronRight } from 'lucide-react';

interface TreeNode {
  id: string;
  name: string;
  type: 'MAX' | 'MIN' | 'LEAF';
  value: number;
  chosen: boolean;
  pruned?: boolean;
  alpha?: number;
  beta?: number;
  moveDescription: string;
  children?: TreeNode[];
}

// Sample academic Minimax tree representing a 2-ply adversarial search
const SAMPLE_TREE: TreeNode = {
  id: 'root',
  name: 'Current State',
  type: 'MAX',
  value: 10,
  chosen: true,
  moveDescription: 'Bot Turn (Max): Evaluate moves to maximize outcome',
  children: [
    {
      id: 'move-1',
      name: 'Move A (Center)',
      type: 'MIN',
      value: 10,
      chosen: true,
      moveDescription: 'Center position played by Bot. Opponent will try to minimize score.',
      children: [
        {
          id: 'leaf-1',
          name: 'Opponent Corner',
          type: 'LEAF',
          value: 10,
          chosen: true,
          moveDescription: 'Terminal State: Bot forces winning fork. Payoff: +10',
        },
        {
          id: 'leaf-2',
          name: 'Opponent Edge',
          type: 'LEAF',
          value: 10,
          chosen: false,
          moveDescription: 'Terminal State: Bot blocks & wins. Payoff: +10',
        },
      ],
    },
    {
      id: 'move-2',
      name: 'Move B (Corner)',
      type: 'MIN',
      value: 0,
      chosen: false,
      moveDescription: 'Corner position played. Opponent can force a draw.',
      children: [
        {
          id: 'leaf-3',
          name: 'Opponent Center',
          type: 'LEAF',
          value: 0,
          chosen: false,
          moveDescription: 'Draw state: No winning lines possible. Payoff: 0',
        },
        {
          id: 'leaf-4',
          name: 'Opponent Edge',
          type: 'LEAF',
          value: 10,
          chosen: false,
          moveDescription: 'Sub-optimal opponent response. Payoff: +10',
        },
      ],
    },
    {
      id: 'move-3',
      name: 'Move C (Edge)',
      type: 'MIN',
      value: -10,
      chosen: false,
      pruned: true,
      moveDescription: 'Edge position played: Gives opponent immediate winning triangle.',
      children: [
        {
          id: 'leaf-5',
          name: 'Opponent Win',
          type: 'LEAF',
          value: -10,
          chosen: false,
          moveDescription: 'Opponent wins. Payoff: -10',
        },
      ],
    },
  ],
};

export function DecisionTreeVisual() {
  const [selectedNode, setSelectedNode] = useState<TreeNode>(SAMPLE_TREE.children![0]);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-cyan-400" />
            <h3 className="font-semibold text-base text-[#F8FAFC]">
              Minimax Game Tree & Backpropagation Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing MAX and MIN layers, recursive leaf evaluation, and the optimal adversarial path
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Optimal Path
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            Pruned / Inferior
          </span>
        </div>
      </div>

      {/* Visual Tree Canvas */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[620px] flex flex-col items-center gap-6">
          {/* Level 0: Root (MAX) */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 mb-1">
              Level 0 · MAX Player (AI Bot)
            </div>
            <button
              onClick={() => setSelectedNode(SAMPLE_TREE)}
              className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all ${
                selectedNode.id === SAMPLE_TREE.id
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 ring-2 ring-cyan-500/30'
                  : 'border-indigo-500/50 bg-[#18203E] text-slate-200 hover:border-cyan-400/60'
              }`}
            >
              Root: Max Score = +{SAMPLE_TREE.value}
            </button>
          </div>

          {/* Connective Lines to Level 1 */}
          <div className="w-full max-w-md flex justify-between px-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-4 border-t-2 border-indigo-500/30" />
          </div>

          {/* Level 1: MIN (Opponent responses) */}
          <div className="w-full flex justify-around gap-4">
            {SAMPLE_TREE.children?.map((child) => (
              <div key={child.id} className="flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">
                  {child.pruned ? 'Cutoff' : 'MIN Node'}
                </span>
                <button
                  onClick={() => setSelectedNode(child)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${
                    selectedNode.id === child.id
                      ? 'border-cyan-400 bg-cyan-950/80 text-white ring-2 ring-cyan-500/40'
                      : child.chosen
                      ? 'border-indigo-400 bg-indigo-950/40 text-indigo-200 hover:border-indigo-300'
                      : child.pruned
                      ? 'border-rose-900/60 bg-rose-950/20 text-rose-300 line-through opacity-70'
                      : 'border-slate-800 bg-[#151B33] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>{child.name}</div>
                  <div className="text-[11px] font-mono mt-0.5 text-slate-400">
                    Val: {child.value >= 0 ? `+${child.value}` : child.value}
                  </div>
                </button>

                {/* Sub-children (Leaves) */}
                <div className="flex gap-2 mt-1">
                  {child.children?.map((leaf) => (
                    <button
                      key={leaf.id}
                      onClick={() => setSelectedNode(leaf)}
                      className={`px-2 py-1.5 rounded border text-[11px] font-mono transition-all ${
                        selectedNode.id === leaf.id
                          ? 'border-cyan-400 bg-cyan-900/60 text-cyan-200'
                          : leaf.chosen
                          ? 'border-emerald-600/60 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-800 bg-[#0F1426] text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {leaf.name.replace('Opponent ', '')}: {leaf.value >= 0 ? `+${leaf.value}` : leaf.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Inspector Callout */}
      <div className="mt-4 p-3.5 rounded-lg border border-slate-800 bg-[#0C1022] flex items-start gap-3">
        <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-semibold text-slate-200 flex items-center gap-2">
            <span>Selected Node: {selectedNode.name}</span>
            <span className="font-mono text-cyan-400">
              Minimax Payoff: {selectedNode.value >= 0 ? `+${selectedNode.value}` : selectedNode.value}
            </span>
          </div>
          <p className="text-slate-400 mt-1">{selectedNode.moveDescription}</p>
        </div>
      </div>
    </div>
  );
}
