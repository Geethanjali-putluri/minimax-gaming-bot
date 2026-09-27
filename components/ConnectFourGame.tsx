'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ConnectFourGrid,
  ROWS,
  COLS,
  EMPTY,
  PLAYER_HUMAN,
  PLAYER_BOT,
  createEmptyGrid,
  cloneGrid,
  checkConnectFourWinner,
  isConnectFourDraw,
  findBestMoveConnectFour,
  generateConnectFourExplanation,
  ConnectFourMinimaxResult,
  CellCoord,
} from '@/lib/engine/connectfour';
import { useGameStats } from '@/lib/context/GameStatsContext';
import { ExplainMoveModal } from './ExplainMoveModal';
import {
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  History,
  Trophy,
  Sliders,
  MousePointerClick,
} from 'lucide-react';

interface ConnectFourMoveHistory {
  ply: number;
  player: 'Player (Red)' | 'Bot (Yellow)';
  row: number;
  column: number;
}

export function ConnectFourGame() {
  const { recordGame } = useGameStats();

  const [grid, setGrid] = useState<ConnectFourGrid>(createEmptyGrid());
  const [turn, setTurn] = useState<number>(PLAYER_HUMAN); // 1 = Human, 2 = Bot
  const [isBotThinking, setIsBotThinking] = useState(false);

  const [winnerInfo, setWinnerInfo] = useState<{
    winner: 'human' | 'bot' | 'draw' | null;
    winningCells: [number, number][] | null;
  }>({ winner: null, winningCells: null });

  const [searchDepth, setSearchDepth] = useState<number>(3); // 3-ply Minimax for fast responsive cell search
  const [lastMinimaxResult, setLastMinimaxResult] = useState<ConnectFourMinimaxResult | null>(null);
  const [lastBotCell, setLastBotCell] = useState<CellCoord | null>(null);
  const [lastBotExplanation, setLastBotExplanation] = useState<string>('');
  const [moveHistory, setMoveHistory] = useState<ConnectFourMoveHistory[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showExplainModal, setShowExplainModal] = useState(false);

  const startTimeRef = useRef<number>(0);
  const gameRecordedRef = useRef<boolean>(false);

  // Initialize start time on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleGameOver = React.useCallback(
    (winner: 'player' | 'bot' | 'draw', movesCount: number) => {
      if (gameRecordedRef.current) return;
      gameRecordedRef.current = true;

      const start = startTimeRef.current || Date.now();
      const durationSeconds = Math.max(1, Math.round((Date.now() - start) / 1000));

      recordGame({
        gameType: 'connectfour',
        winner,
        movesCount,
        durationSeconds,
        details:
          winner === 'draw'
            ? 'Stalemate board filled'
            : winner === 'bot'
            ? `Minimax Depth ${searchDepth} Bot Victory`
            : 'Human Tactical Victory',
      });
    },
    [recordGame, searchDepth]
  );

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setTurn(PLAYER_HUMAN);
    setIsBotThinking(false);
    setWinnerInfo({ winner: null, winningCells: null });
    setLastMinimaxResult(null);
    setLastBotCell(null);
    setLastBotExplanation('');
    setMoveHistory([]);
    startTimeRef.current = Date.now();
    gameRecordedRef.current = false;
  };

  // Bot move effect
  useEffect(() => {
    if (turn === PLAYER_BOT && !winnerInfo.winner) {
      const timer = setTimeout(() => {
        const gridCopy = cloneGrid(grid);
        const result = findBestMoveConnectFour(gridCopy, searchDepth);

        const chosenCell = result.bestCell;
        if (chosenCell && grid[chosenCell.row][chosenCell.col] === EMPTY) {
          const nextGrid = cloneGrid(grid);
          nextGrid[chosenCell.row][chosenCell.col] = PLAYER_BOT;

          const explanation = generateConnectFourExplanation(grid, chosenCell, result);
          setLastMinimaxResult(result);
          setLastBotCell(chosenCell);
          setLastBotExplanation(explanation);

          setGrid(nextGrid);
          setMoveHistory((prev) => {
            const nextHistory: ConnectFourMoveHistory[] = [
              ...prev,
              {
                ply: prev.length + 1,
                player: 'Bot (Yellow)',
                row: chosenCell.row,
                column: chosenCell.col,
              },
            ];
            const botWin = checkConnectFourWinner(nextGrid, PLAYER_BOT);
            if (botWin.isWin) {
              setWinnerInfo({ winner: 'bot', winningCells: botWin.winningCells });
              handleGameOver('bot', nextHistory.length);
            } else if (isConnectFourDraw(nextGrid)) {
              setWinnerInfo({ winner: 'draw', winningCells: null });
              handleGameOver('draw', nextHistory.length);
            } else {
              setTurn(PLAYER_HUMAN);
            }
            return nextHistory;
          });
        }
        setIsBotThinking(false);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [turn, winnerInfo.winner, grid, searchDepth, handleGameOver]);

  /**
   * Directly places human piece into the exact clicked cell
   */
  const handleCellClick = (r: number, c: number) => {
    if (
      turn !== PLAYER_HUMAN ||
      grid[r][c] !== EMPTY ||
      !!winnerInfo.winner ||
      isBotThinking
    ) {
      return;
    }

    const nextGrid = cloneGrid(grid);
    nextGrid[r][c] = PLAYER_HUMAN;
    setGrid(nextGrid);

    const nextHistory: ConnectFourMoveHistory[] = [
      ...moveHistory,
      {
        ply: moveHistory.length + 1,
        player: 'Player (Red)',
        row: r,
        column: c,
      },
    ];
    setMoveHistory(nextHistory);

    const humanWin = checkConnectFourWinner(nextGrid, PLAYER_HUMAN);
    if (humanWin.isWin) {
      setWinnerInfo({ winner: 'human', winningCells: humanWin.winningCells });
      handleGameOver('player', nextHistory.length);
    } else if (isConnectFourDraw(nextGrid)) {
      setWinnerInfo({ winner: 'draw', winningCells: null });
      handleGameOver('draw', nextHistory.length);
    } else {
      setTurn(PLAYER_BOT);
      setIsBotThinking(true);
    }
  };

  const isWinningCell = (r: number, c: number) => {
    return winnerInfo.winningCells?.some(([wr, wc]) => wr === r && wc === c);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#11162A]/90">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400">
            <span className="font-bold text-sm">6x7</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white">
              Connect Four: Exact-Cell Minimax with Alpha-Beta
            </h3>
            <p className="text-xs text-slate-400">
              Player (Red) vs Minimax Bot (Yellow) · Click any cell to place piece directly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Depth selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800 bg-[#080B18] text-xs text-slate-400">
            <Sliders className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Depth:</span>
            <select
              value={searchDepth}
              onChange={(e) => setSearchDepth(Number(e.target.value))}
              disabled={isBotThinking || moveHistory.length > 0}
              className="bg-transparent text-cyan-300 font-mono focus:outline-none cursor-pointer"
            >
              <option value={2} className="bg-[#0D1224] text-white">
                2 Ply (Fast)
              </option>
              <option value={3} className="bg-[#0D1224] text-white">
                3 Ply (Balanced)
              </option>
              <option value={4} className="bg-[#0D1224] text-white">
                4 Ply (Deep)
              </option>
            </select>
          </div>

          {/* Turn / Game state badge */}
          <div className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 bg-[#080B18] border-slate-700">
            {winnerInfo.winner ? (
              winnerInfo.winner === 'draw' ? (
                <span className="text-amber-400 font-semibold">Game Over: Draw</span>
              ) : winnerInfo.winner === 'human' ? (
                <span className="text-rose-400 font-semibold flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" /> Player Won!
                </span>
              ) : (
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5" /> Bot Won!
                </span>
              )
            ) : isBotThinking ? (
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                Bot Evaluating (Depth {searchDepth})...
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Your Turn (Red)
              </span>
            )}
          </div>

          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Board and Analysis split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 6x7 Connect Four Board */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-slate-800 bg-[#0D1224] shadow-xl">
          <div className="w-full flex items-center justify-between pb-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <MousePointerClick className="h-3.5 w-3.5 text-cyan-400" />
              Click any specific cell to place your piece
            </span>
            <span className="font-mono text-[11px] text-slate-500">6 Rows × 7 Cols</span>
          </div>

          {/* Connect 4 Matrix Chassis (Each cell individually clickable) */}
          <div className="relative p-3 sm:p-4 rounded-2xl bg-[#132252] border-4 border-[#1E3A8A] shadow-[0_10px_35px_rgba(30,58,138,0.4)] w-full max-w-lg">
            <div className="grid grid-rows-6 gap-2 sm:gap-2.5">
              {Array.from({ length: ROWS }).map((_, r) => (
                <div key={r} className="grid grid-cols-7 gap-2 sm:gap-2.5">
                  {Array.from({ length: COLS }).map((_, c) => {
                    const cellVal = grid[r][c];
                    const isWinning = isWinningCell(r, c);
                    const isLastBot = lastBotCell?.row === r && lastBotCell?.col === c;
                    const isAvailable = cellVal === EMPTY && turn === PLAYER_HUMAN && !winnerInfo.winner && !isBotThinking;

                    return (
                      <button
                        key={c}
                        onClick={() => handleCellClick(r, c)}
                        disabled={cellVal !== EMPTY || turn !== PLAYER_HUMAN || !!winnerInfo.winner || isBotThinking}
                        className={`aspect-square w-full rounded-full transition-all duration-200 border flex items-center justify-center relative select-none ${
                          cellVal === EMPTY
                            ? isAvailable
                              ? 'bg-[#080C1D] border-slate-800 hover:border-rose-400/80 hover:bg-[#181124] hover:shadow-[0_0_12px_rgba(244,63,94,0.3)] cursor-pointer'
                              : 'bg-[#080C1D] border-slate-900/80 cursor-not-allowed opacity-60'
                            : cellVal === PLAYER_HUMAN
                            ? 'bg-gradient-to-br from-rose-500 to-rose-700 border-rose-400/80 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                            : 'bg-gradient-to-br from-amber-300 to-amber-500 border-amber-300/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        } ${isWinning ? 'ring-4 ring-cyan-400 animate-bounce' : ''} ${
                          isLastBot && !isWinning ? 'ring-2 ring-purple-400' : ''
                        }`}
                        aria-label={`Row ${r + 1}, Column ${c + 1}: ${
                          cellVal === EMPTY ? 'Empty' : cellVal === PLAYER_HUMAN ? 'Player Red' : 'Bot Yellow'
                        }`}
                      >
                        {isWinning && (
                          <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-cyan-300 animate-ping" />
                        )}
                        {cellVal === EMPTY && isAvailable && (
                          <span className="opacity-0 hover:opacity-40 text-[10px] text-rose-300 font-mono">
                            +
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend and coordinates */}
          <div className="mt-5 w-full flex items-center justify-between text-xs text-slate-400 px-2 max-w-lg">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span>Human: Red</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>Minimax Bot: Yellow</span>
            </div>
            <span>·</span>
            <span className="font-mono text-[11px]">4-in-a-row to win</span>
          </div>

          {/* Explain button if bot has moved */}
          {lastBotCell !== null && (
            <div className="mt-4 w-full max-w-lg">
              <button
                onClick={() => setShowExplainModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-700/50 text-cyan-300 hover:text-white hover:border-cyan-400/60 transition-all text-xs font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Explain Bot&apos;s Last Move (Minimax Heuristic)</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Connect Four Minimax Analysis & Plies */}
        <div className="lg:col-span-5 space-y-4">
          {/* Analysis Card */}
          <div className="rounded-xl border border-slate-800 bg-[#11162A]/90 p-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <h4 className="font-semibold text-xs sm:text-sm text-slate-200">
                  MINIMAX ADVERSARIAL ANALYSIS
                </h4>
              </div>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Toggle analysis panel"
              >
                {showAnalysis ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {showAnalysis && (
              <div className="mt-3 space-y-3 text-xs">
                {lastMinimaxResult ? (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Chosen Cell</span>
                        <div className="font-semibold text-amber-300 text-xs mt-0.5 truncate">
                          R{lastMinimaxResult.bestCell.row + 1}, C{lastMinimaxResult.bestCell.col + 1}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Heuristic Score</span>
                        <div className="font-semibold font-mono text-emerald-400 text-xs mt-0.5 truncate">
                          {lastMinimaxResult.score >= 0
                            ? `+${lastMinimaxResult.score.toLocaleString()}`
                            : lastMinimaxResult.score.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">States Explored</span>
                        <div className="font-semibold font-mono text-purple-300 text-xs mt-0.5">
                          {lastMinimaxResult.statesExplored.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Evaluated candidate cells ranked */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 mb-1.5">
                        <span>Candidate Cells Ranked by Minimax:</span>
                        <span className="text-slate-400 font-mono">Depth: {searchDepth} Ply</span>
                      </div>
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {lastMinimaxResult.candidateEvaluations.slice(0, 7).map((cEval) => {
                          const isChosen =
                            cEval.row === lastMinimaxResult.bestCell.row &&
                            cEval.col === lastMinimaxResult.bestCell.col;
                          return (
                            <div
                              key={`${cEval.row}-${cEval.col}`}
                              className={`flex items-center justify-between p-1.5 px-2.5 rounded-lg border text-[11px] font-mono ${
                                isChosen
                                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-300 font-semibold'
                                  : 'bg-[#080B18] border-slate-850 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500">#{cEval.rank}</span>
                                <span>Row {cEval.row + 1}, Col {cEval.col + 1}</span>
                              </div>
                              <span
                                className={
                                  cEval.score > 0
                                    ? 'text-emerald-400'
                                    : cEval.score < 0
                                    ? 'text-rose-400'
                                    : 'text-slate-300'
                                }
                              >
                                {cEval.score > 9000000
                                  ? 'Win'
                                  : cEval.score < -9000000
                                  ? 'Loss'
                                  : cEval.score > 0
                                  ? `+${cEval.score}`
                                  : cEval.score}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#090C1A] border border-slate-800/80 text-[11px] text-slate-400">
                      <strong>Tactical Summary:</strong> {lastBotExplanation}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    Click any dot/cell on the board to place your Red piece. The Minimax engine will
                    evaluate future branching states and display candidate calculations here.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Move History */}
          <div className="rounded-xl border border-slate-800 bg-[#11162A]/90 p-4 shadow-lg">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-indigo-400" />
                <h4 className="font-semibold text-xs sm:text-sm text-slate-200">MOVE HISTORY</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {moveHistory.length} {moveHistory.length === 1 ? 'ply' : 'plies'}
              </span>
            </div>

            <div className="mt-2.5 space-y-1 max-h-48 overflow-y-auto pr-1">
              {moveHistory.length === 0 ? (
                <div className="text-center py-4 text-slate-500 text-xs">
                  No moves played yet this match.
                </div>
              ) : (
                moveHistory.map((item) => (
                  <div
                    key={item.ply}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#0A0D1D] text-xs font-mono border border-slate-850"
                  >
                    <span className="text-slate-500">#{item.ply}</span>
                    <span
                      className={
                        item.player.includes('Player') ? 'text-rose-400' : 'text-amber-400'
                      }
                    >
                      {item.player}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">
                      → Row {item.row + 1}, Col {item.column + 1}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {lastBotCell !== null && lastMinimaxResult && (
        <ExplainMoveModal
          isOpen={showExplainModal}
          onClose={() => setShowExplainModal(false)}
          gameType="connectfour"
          moveDescription={`Row ${lastBotCell.row + 1}, Column ${lastBotCell.col + 1}`}
          minimaxScore={lastMinimaxResult.score}
          statesExplored={lastMinimaxResult.statesExplored}
          searchDepth={`${searchDepth}-Ply Minimax with Alpha-Beta`}
          deterministicExplanation={lastBotExplanation}
          boardSummary={`Connect 4 matrix with ${moveHistory.length} cells filled. Bot chose Row ${lastBotCell.row + 1}, Column ${lastBotCell.col + 1}.`}
          moveHistoryCount={moveHistory.length}
        />
      )}
    </div>
  );
}
