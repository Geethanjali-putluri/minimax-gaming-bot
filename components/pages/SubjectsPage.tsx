'use client';

import React from 'react';
import { PageId } from '../Navbar';
import { VivaAccordion, VivaQuestion } from '../VivaAccordion';
import {
  Database,
  Terminal,
  BookOpen,
  Layers,
  Table,
} from 'lucide-react';

interface SubjectsPageProps {
  onNavigate: (page: PageId) => void;
}

export function SubjectsPage({ onNavigate }: SubjectsPageProps) {
  const summaryTable = [
    {
      subject: 'Data Structures',
      code: 'CS201',
      relevance: 'Directly Relevant (Primary)',
      relevanceBadge: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
      topics: 'Arrays / 2D Arrays, Trees / Game Trees, Recursion, Searching, Time & Space Complexity, Stack / Call Stack',
      howUsed:
        'Board representation matrices, game tree hierarchy, recursive minimax backtracking, adversarial DFS, call stack state storage.',
    },
    {
      subject: 'C Programming',
      code: 'CS101',
      relevance: 'Direct Programming Foundation',
      relevanceBadge: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60',
      topics: 'Arrays, Functions, Loops, Conditional Statements, Recursion, Basic Problem Solving',
      howUsed:
        'Procedural logic for matrix iteration, 4-in-a-row alignment checks, base case termination, and deterministic game rules.',
    },
    {
      subject: 'English & Technical Communication',
      code: 'HS101',
      relevance: 'Communication & Documentation',
      relevanceBadge: 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60',
      topics: 'Project Documentation, Technical Communication, UI Explanations, Project Report, Presentation, Viva Defense',
      howUsed:
        'Writing comprehensive academic reports, structuring UI microcopy and move explanations, presenting algorithmic rationale to examiners.',
    },
  ];

  const vivaQuestions: VivaQuestion[] = [
    {
      id: 'viva-1',
      category: 'Artificial Intelligence & Minimax',
      question: 'Why is Minimax considered an Artificial Intelligence algorithm?',
      answer:
        'Minimax is a foundational classical AI algorithm because it enables an autonomous agent to exhibit rational decision-making in competitive environments. By modeling future human actions and choosing moves that optimize its guaranteed payoff (rather than following hardcoded rules or random chance), it simulates foresight and strategic intelligence.',
      keyTakeaway:
        'Minimax embodies rational agent theory: optimizing utility against an intelligent adversary.',
    },
    {
      id: 'viva-2',
      category: 'Data Structures: Trees',
      question: 'Why is a tree useful for representing game states?',
      answer:
        'A game is inherently hierarchical and branching: from any single board state (the root), multiple distinct moves can be made (child nodes), each leading to further opponent responses. A tree data structure naturally maps this sequential turn-based state space, allowing recursive depth-first exploration and value backpropagation from terminal leaves to the root.',
      keyTakeaway:
        'Trees naturally represent branching sequential decisions in 2-player turn-based games.',
    },
    {
      id: 'viva-3',
      category: 'Data Structures: Recursion & Call Stack',
      question: 'Where are recursion and the call stack used in the Minimax algorithm?',
      answer:
        'Recursion is the engine of Minimax: the minimax() function calls itself repeatedly to simulate alternate player turns (swapping the isMaximizing boolean flag between true for Bot and false for Human). The runtime call stack stores each hypothetical board state and depth level until a base case (win, loss, draw, or depth cutoff) is reached, whereupon values unwind back to the root.',
      keyTakeaway:
        'Recursion simulates alternating plies down to leaf base cases, unwinding to return optimal scores.',
    },
    {
      id: 'viva-4',
      category: 'Complexity Analysis',
      question: 'What is the time and space complexity of the Minimax algorithm?',
      answer:
        'The time complexity is O(b^d), where b is the branching factor (average number of legal moves at each turn) and d is the maximum search depth (ply). Space complexity is linear O(b*d) due to the maximum depth of the recursive call stack. In Tic-Tac-Toe, b <= 9 and d <= 9, resulting in at most 9! (362,880) leaf nodes, making exhaustive search computationally feasible.',
      keyTakeaway:
        'Time complexity is exponential O(b^d); space complexity is linear O(d) due to DFS call stack frames.',
    },
    {
      id: 'viva-5',
      category: 'Complexity Analysis',
      question: 'Why does Minimax become computationally expensive for larger games like Connect Four?',
      answer:
        'Because of combinatorial explosion. In Connect Four, with 42 total cells, the full game tree has approximately 4.53 * 10^12 reachable states. An exhaustive search would require billions of years on modern hardware. Hence, depth-limited search coupled with static heuristic evaluation and Alpha-Beta pruning is mandatory.',
      keyTakeaway:
        'Combinatorial state explosion makes exhaustive search intractable; depth limiting is necessary.',
    },
    {
      id: 'viva-6',
      category: 'Optimization & Algorithms',
      question: 'What is Alpha-Beta Pruning, and how does it optimize Minimax?',
      answer:
        'Alpha-Beta pruning is an algorithmic optimization that prunes (disregards) branches that cannot possibly influence the final decision. Alpha represents the best score guaranteed to the Maximizer so far, and Beta represents the best score guaranteed to the Minimizer. Whenever alpha >= beta, the current branch is pruned. In the ideal move-ordering case, it reduces effective time complexity from O(b^d) to O(b^(d/2)), effectively doubling the search depth reachable within the same time.',
      keyTakeaway:
        'Alpha-Beta pruning eliminates provably sub-optimal subtrees without altering the final minimax decision.',
    },
    {
      id: 'viva-7',
      category: 'Data Structures: Arrays',
      question: 'Why are arrays useful in board games, and how are they represented?',
      answer:
        'Arrays provide O(1) random-access lookups and contiguous memory layout. In Tic-Tac-Toe, a 1D array of 9 elements maps directly to grid coordinates (row = index / 3, col = index % 3). In Connect Four, a 2D matrix of 6 rows by 7 columns allows immediate constant-time cell verification, row/column traversals, and diagonal window sliding.',
      keyTakeaway:
        'Arrays provide O(1) constant-time access for state representation and win-condition checking.',
    },
    {
      id: 'viva-8',
      category: 'C Programming Concepts',
      question: 'How do procedural C programming concepts translate to this project?',
      answer:
        'C programming provides the core procedural building blocks: multidimensional arrays for matrix storage, nested loops for horizontal/vertical/diagonal window evaluation, conditional if-else structures for base cases, and modular functions separating board state, move generation, and evaluation.',
      keyTakeaway:
        'C programming provides the foundational syntax and algorithmic logic for matrix manipulation and recursion.',
    },
    {
      id: 'viva-9',
      category: 'Curriculum Mapping',
      question: 'Which subject contributed most directly to the implementation of this project?',
      answer:
        'Data Structures & Algorithms (CS201). Concepts of 1D/2D array representations, game tree traversals, recursive call stacks, time/space trade-offs, and asymptotic complexity form the direct technical core of both the Tic-Tac-Toe and Connect Four decision engines.',
      keyTakeaway:
        'Data Structures (Trees, Arrays, Recursion, Search Complexity, Call Stack) is the primary foundation.',
    },
    {
      id: 'viva-10',
      category: 'English & Technical Communication',
      question: 'What is the role of English & Technical Communication in this engineering project?',
      answer:
        'Technical Communication enables clear formulation of the problem statement, writing comprehensive project reports and system documentation, crafting unambiguous UI microcopy for moves and game states, and defending algorithmic design choices during the oral viva examination.',
      keyTakeaway:
        'Technical English bridges algorithmic implementation with academic reporting and oral presentation.',
    },
  ];

  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>Curriculum Subject Integration</span>
          <span>·</span>
          <span>Academic Viva Preparation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Curriculum Subject Mapping
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          An in-depth academic analysis explaining how foundational B.Tech CSE curriculum subjects
          — Data Structures, C Programming, and Technical Communication — directly enable the
          Minimax Game Playing Bot.
        </p>
      </div>

      {/* Visual Curriculum Summary Table */}
      <section className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-cyan-400" />
            <h3 className="font-semibold text-base text-white">
              Relevant Curriculum Subjects Matrix
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">B.Tech Syllabus Mapping</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Relevance</th>
                <th className="py-2.5 px-3">Core Topics Involved</th>
                <th className="py-2.5 px-3">How It Is Used in This Project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {summaryTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-200 whitespace-nowrap">
                    <div>{row.subject}</div>
                    <span className="text-[10px] font-mono text-slate-500">{row.code}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${row.relevanceBadge}`}
                    >
                      {row.relevance}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs">{row.topics}</td>
                  <td className="py-3 px-3 text-slate-400 leading-relaxed max-w-md">
                    {row.howUsed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep Dive Subject Tabs / Accordions */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Subject-by-Subject Deep Dive</h2>
          <span className="text-xs text-slate-400">Detailed conceptual and algorithmic breakdown</span>
        </div>

        {/* 1. DATA STRUCTURES (MOST DETAILED SECTION) */}
        <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">1. Data Structures (CS201)</h3>
                  <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/60">
                    Directly Relevant · Primary Technical Core
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Provides the state matrices, recursive trees, search algorithms, call stacks, and complexity models.
                </p>
              </div>
            </div>
          </div>

          {/* 6 Data Structures Topics */}
          <div className="space-y-6 pt-2">
            {/* Topic 1: Arrays / 2D Arrays */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  A. Arrays / 2D Arrays (State Matrices)
                </h4>
                <span className="text-[10px] font-mono text-slate-400">O(1) Random Access</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> An array is a linear collection of elements stored at contiguous memory locations, accessible in constant time O(1) via an index offset. A 2D array extends this to a grid with row and column dimensions.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How it is used in the Minimax Bot:</strong>
                <br />• <strong>Tic-Tac-Toe:</strong> Represented as a 9-element 1D array <code className="text-cyan-400 font-mono">[0..8]</code> where each index corresponds to a cell.
                <br />• <strong>Connect Four:</strong> Represented as a 2D matrix <code className="text-cyan-400 font-mono">grid[6][7]</code> of 6 rows and 7 columns. Each cell stores <code className="text-slate-300 font-mono">0 (Empty)</code>, <code className="text-rose-400 font-mono">1 (Human Red)</code>, or <code className="text-amber-400 font-mono">2 (Bot Yellow)</code>.
              </p>

              {/* Visual representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-lg bg-[#0F1426] border border-slate-800 font-mono text-[11px]">
                  <div className="text-slate-300 font-sans font-semibold mb-2 text-xs">
                    Tic-Tac-Toe 1D Array Mapping:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-32 text-center text-slate-200">
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">0</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">1</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">2</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">3</div>
                    <div className="border border-cyan-500 bg-cyan-950/60 text-cyan-300 py-1.5 rounded font-bold">
                      4*
                    </div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">5</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">6</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">7</div>
                    <div className="border border-slate-700 bg-slate-900 py-1.5 rounded">8</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2">
                    *Index 4 (Center) intersects 4 winning lines (2 orthogonal, 2 diagonal)
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0F1426] border border-slate-800 font-mono text-[11px]">
                  <div className="text-slate-300 font-sans font-semibold mb-2 text-xs">
                    Connect Four 2D Matrix (6×7):
                  </div>
                  <div className="text-[10px] text-slate-400 space-y-1">
                    <div>Row 0 (Top): [0, 0, 0, 0, 0, 0, 0]</div>
                    <div>Row 1: [0, 0, 0, 0, 0, 0, 0]</div>
                    <div>Row 2: [0, 0, <span className="text-rose-400">1</span>, <span className="text-amber-400">2</span>, 0, 0, 0]</div>
                    <div>Row 3: [0, 0, <span className="text-amber-400">2</span>, <span className="text-rose-400">1</span>, 0, 0, 0]</div>
                    <div>Row 4: [0, 0, 0, 0, 0, 0, 0]</div>
                    <div>Row 5 (Bottom): [0, 0, 0, 0, 0, 0, 0]</div>
                  </div>
                  <div className="text-[10px] text-cyan-400 mt-2">
                    Direct cell placement allows O(1) state check at any (row, col)
                  </div>
                </div>
              </div>
            </div>

            {/* Topic 2: Trees / Game Trees */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  B. Trees / Game Trees (Adversarial State Space)
                </h4>
                <span className="text-[10px] font-mono text-purple-400">Hierarchical Graph</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> A tree is a non-linear, connected, acyclic data structure where each child node has exactly one parent. In game theory, a Game Tree represents all possible legal moves from the root (current game board), branching outward at each ply.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How it is used in the Minimax Bot:</strong> Minimax builds and traverses an adversarial game tree where alternate levels represent MAX (Bot seeking maximum score) and MIN (Human seeking minimum score). Terminal leaves are scored, and optimal scores are propagated upward.
              </p>

              {/* Simple tree visual */}
              <div className="p-3.5 rounded-lg bg-[#0E1326] border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed">
                <div className="text-cyan-300 font-sans font-semibold mb-1 text-xs">
                  Adversarial Game Tree Traversal:
                </div>
                Level 0 (Root - MAX / Bot Turn)<br />
                ├── Branch A: Cell (1,1) → Score: +10 [OPTIMAL MOVE CHOSEN]<br />
                │&nbsp;&nbsp;&nbsp;├── MIN Player Response A1 → Leaf Score: +10<br />
                │&nbsp;&nbsp;&nbsp;└── MIN Player Response A2 → Leaf Score: +10<br />
                ├── Branch B: Cell (0,0) → Score: 0 [FORCES DRAW]<br />
                │&nbsp;&nbsp;&nbsp;├── MIN Player Response B1 → Leaf Score: 0<br />
                │&nbsp;&nbsp;&nbsp;└── MIN Player Response B2 → Leaf Score: +10<br />
                └── Branch C: Cell (0,1) → Score: -10 [PRUNED / SUBOPTIMAL]
              </div>
            </div>

            {/* Topic 3: Recursion */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  C. Recursion (Self-Referential Backtracking)
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">Divide & Conquer</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> Recursion is a programming technique where a function calls itself with a reduced problem state until base termination conditions are met, whereupon intermediate return values unwind back up the execution chain.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How it is used in the Minimax Bot:</strong> The <code className="font-mono text-cyan-400">minimax()</code> function recursively tests a hypothetical candidate move, toggles the active player, invokes <code className="font-mono text-cyan-400">minimax(depth + 1)</code>, and then performs <em>backtracking</em> (restoring <code className="font-mono text-cyan-400">board[r][c] = EMPTY</code>) to preserve state correctness.
              </p>
              <div className="p-3 rounded-lg bg-[#0F1426] border border-slate-800 font-mono text-[11px] text-slate-300">
                <span className="text-purple-300">function</span> minimax(board, depth, isMaximizing):<br />
                &nbsp;&nbsp;<span className="text-slate-500">{'// 1. Base cases: win, loss, draw, depth limit'}</span><br />
                &nbsp;&nbsp;<span className="text-indigo-300">if</span> (isTerminal(board)) <span className="text-indigo-300">return</span> evaluateScore(board)<br />
                &nbsp;&nbsp;<span className="text-slate-500">{'// 2. Recursive step & backtracking'}</span><br />
                &nbsp;&nbsp;board[cell] = piece<br />
                &nbsp;&nbsp;score = minimax(board, depth + 1, !isMaximizing)<br />
                &nbsp;&nbsp;board[cell] = EMPTY <span className="text-cyan-400">{'// Backtrack'}</span>
              </div>
            </div>

            {/* Topic 4: Searching */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  D. Searching (Depth-First Adversarial Search)
                </h4>
                <span className="text-[10px] font-mono text-indigo-400">DFS Graph Traversal</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> Searching is the systematic process of inspecting reachable nodes in a graph or tree to find an optimal solution. Adversarial search operates against an active opponent whose choices oppose the searcher.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How it is used in the Minimax Bot:</strong> The engine executes a Depth-First Search (DFS) along each candidate game branch, searching deep down to terminal leaves or cutoff depths before exploring alternative sibling branches.
              </p>
            </div>

            {/* Topic 5: Time and Space Complexity */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  E. Time and Space Complexity (Asymptotic Notation)
                </h4>
                <span className="text-[10px] font-mono text-amber-400">O(b^d) Exponential</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> Asymptotic notation measures computational resource consumption as problem size grows. In game trees, time complexity depends on branching factor <code className="font-mono text-cyan-400">b</code> and search depth <code className="font-mono text-cyan-400">d</code>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-[#0F1426] border border-slate-800 space-y-1">
                  <div className="font-semibold text-slate-200">Tic-Tac-Toe Complexity</div>
                  <div className="font-mono text-cyan-300 text-[11px]">Time: O(b^d) = O(9!) = 362,880</div>
                  <div className="font-mono text-purple-300 text-[11px]">Space: O(d) = 9 stack frames</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Exhaustive evaluation completes in ~20–30ms in JavaScript.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0F1426] border border-slate-800 space-y-1">
                  <div className="font-semibold text-slate-200">Connect Four Complexity</div>
                  <div className="font-mono text-cyan-300 text-[11px]">Total States: ~4.53 × 10¹²</div>
                  <div className="font-mono text-purple-300 text-[11px]">Full Tree: Intractable</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Requires depth limiting (depth 3-4) + Alpha-Beta pruning to keep search time under 150ms.
                  </p>
                </div>
              </div>
            </div>

            {/* Topic 6: Stack / Call Stack */}
            <div className="p-5 rounded-xl bg-[#090C19] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-cyan-300">
                  F. Stack / Call Stack (LIFO Memory Frame Management)
                </h4>
                <span className="text-[10px] font-mono text-rose-400">LIFO Data Structure</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>What it means:</strong> A Stack is a linear Last-In, First-Out (LIFO) data structure. The runtime Call Stack automatically allocates a memory stack frame whenever a function is called, storing parameters, local variables, and the return address.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How it is used in the Minimax Bot:</strong> Every level of minimax recursion pushes a new frame containing the current board matrix snapshot, depth counter, and alpha/beta bounds onto the JavaScript call stack. When a terminal leaf is reached, frames are popped in LIFO sequence, unwinding scores back to the root decision.
              </p>

              {/* Call stack visual */}
              <div className="p-3.5 rounded-lg bg-[#0E1326] border border-slate-800 font-mono text-[11px] text-slate-300">
                <div className="text-rose-300 font-sans font-semibold mb-2 text-xs">
                  Call Stack LIFO Unwinding Pipeline:
                </div>
                <div className="space-y-1 max-w-sm">
                  <div className="p-1.5 rounded bg-rose-950/60 border border-rose-800/60 text-rose-200 text-center">
                    [Top of Stack] minimax(depth=3, isMaximizing=false) → Evaluates Leaf
                  </div>
                  <div className="p-1.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-200 text-center">
                    minimax(depth=2, isMaximizing=true)
                  </div>
                  <div className="p-1.5 rounded bg-indigo-950/60 border border-indigo-800/60 text-indigo-200 text-center">
                    minimax(depth=1, isMaximizing=false)
                  </div>
                  <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-200 text-center font-bold">
                    [Stack Base] findBestMove() → Root Decision Frame
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. C PROGRAMMING */}
        <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">2. C Programming (CS101)</h3>
                <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/60">
                  Algorithmic Programming Paradigm
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Foundational programming concepts that directly implement game logic and algorithmic control flow.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            While this application runs in TypeScript in the browser, the underlying logic is a direct translation of core C programming concepts taught in the introductory curriculum:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">1. Arrays (Multidimensional)</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Directly mirrors 2D C arrays (<code className="font-mono text-cyan-400">int grid[6][7]</code>) with index-based addressing, memory boundaries, and matrix indexing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">2. Functions & Modular Design</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Separation into dedicated modular functions (<code className="font-mono text-cyan-400">checkWinner</code>, <code className="font-mono text-cyan-400">evaluateWindow</code>, <code className="font-mono text-cyan-400">minimax</code>) adhering to procedural C programming best practices.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">3. Loops (Nested for-loops)</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Iterating across rows, columns, and diagonal windows using double-nested loops to check for 4-in-a-row alignments and legal moves.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">4. Conditional Statements</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Multi-branch <code className="font-mono text-cyan-400">if-else</code> structures evaluate terminal wins, draws, base conditions, and alpha-beta cutoff triggers (<code className="font-mono text-cyan-400">alpha &gt;= beta</code>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">5. Recursion</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Applies the C recursive function model, emphasizing base case condition checks to prevent infinite loops and stack overflow.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-slate-200 text-sm">6. Basic Problem Solving</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Formulating step-by-step pseudo-code, tracing state transitions through variable tables, and debugging boundary index conditions.
              </p>
            </div>
          </div>
        </div>

        {/* 3. ENGLISH & TECHNICAL COMMUNICATION */}
        <div className="rounded-2xl border border-slate-800 bg-[#11162A]/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">3. English & Technical Communication (HS101)</h3>
                <span className="text-[10px] font-mono bg-indigo-950/80 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800/60">
                  Communication & Presentation
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Practical communication skills required for engineering reports, UI clarity, and viva defense.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Software engineering requires not only writing code but also communicating complex technical ideas clearly to users, teammates, and evaluators. English and Professional Communication plays an essential role across:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">1. Project Documentation</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Authoring formal software specifications, architecture diagrams, algorithmic summaries, and clear code comments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">2. Technical Communication</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Translating complex mathematical game theory (payoffs, game trees, alpha-beta cutoffs) into clear technical English.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">3. UI Explanations & Microcopy</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Drafting human-readable move explanations, instructions, buttons, and telemetry labels that guide user gameplay.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">4. Project Report Writing</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Structuring the formal B.Tech academic thesis, problem formulation, literature review, and complexity benchmarking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">5. Presentation Delivery</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Structuring slide decks, executive summaries, and visual walkthroughs for technical review committees.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C19] border border-slate-850 space-y-1.5">
              <div className="font-semibold text-indigo-300 text-sm">6. Viva Voce Defense</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Articulating concise, structured verbal answers to faculty examiner inquiries regarding algorithmic trade-offs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Viva Questions Section */}
      <section className="pt-4">
        <VivaAccordion
          title="Curriculum & Algorithm Viva Questions & Answers"
          subtitle="Curated questions focused exclusively on Data Structures, C Programming logic, and Technical Presentation."
          questions={vivaQuestions}
        />
      </section>
    </div>
  );
}
