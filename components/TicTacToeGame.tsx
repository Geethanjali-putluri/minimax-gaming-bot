'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BoardState,
  CellValue,
  Player,
  checkWinner,
  findBestMoveTicTacToe,
  getPositionName,
  generateTicTacToeExplanation,
  MinimaxResult,
} from '@/lib/engine/tictactoe';
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
  AlertCircle,
  HelpCircle,
  Play,
} from 'lucide-react';

interface MoveHistoryItem {
  moveNumber: number;
  player: 'Player (X)' | 'Bot (O)';
  cellIndex: number;
  positionName: string;
}

export function TicTacToeGame() {
  const { recordGame } = useGameStats();

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X'); // X is Human, O is Bot
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState<{
    winner: Player | 'draw' | null;
    line: number[] | null;
  }>({ winner: null, line: null });

  const [moveHistory, setMoveHistory] = useState<MoveHistoryItem[]>([]);
  const [lastMinimaxResult, setLastMinimaxResult] = useState<MinimaxResult | null>(null);
  const [lastBotMove, setLastBotMove] = useState<number | null>(null);
  const [lastBotMoveExplanation, setLastBotMoveExplanation] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showExplainModal, setShowExplainModal] = useState(false);

  const startTimeRef = useRef<number>(0);
  const gameRecordedRef = useRef<boolean>(false);

  // Initialize start time on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleGameOver = React.useCallback(
    (winner: Player | 'draw', movesCount: number) => {
      if (gameRecordedRef.current) return;
      gameRecordedRef.current = true;

      const start = startTimeRef.current || Date.now();
      const durationSeconds = Math.max(1, Math.round((Date.now() - start) / 1000));

      let resultWinner: 'player' | 'bot' | 'draw' = 'draw';
      if (winner === 'X') resultWinner = 'player';
      if (winner === 'O') resultWinner = 'bot';

      recordGame({
        gameType: 'tictactoe',
        winner: resultWinner,
        movesCount,
        durationSeconds,
        details:
          winner === 'draw'
            ? 'Minimax equilibrium achieved (Draw)'
            : winner === 'O'
            ? 'Minimax Bot Victory'
            : 'Human Player Victory',
      });
    },
    [recordGame]
  );

  // Initialize or reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setIsBotThinking(false);
    setWinnerInfo({ winner: null, line: null });
    setMoveHistory([]);
    setLastMinimaxResult(null);
    setLastBotMove(null);
    setLastBotMoveExplanation('');
    startTimeRef.current = Date.now();
    gameRecordedRef.current = false;
  };

  // Bot move execution effect
  useEffect(() => {
    if (turn === 'O' && !winnerInfo.winner) {
      // Short delay for natural feel and animation
      const timer = setTimeout(() => {
        const boardCopy = [...board];
        const result = findBestMoveTicTacToe(boardCopy);

        if (result.bestMove !== -1) {
          const move = result.bestMove;
          const updatedBoard = [...board];
          updatedBoard[move] = 'O';

          const explanation = generateTicTacToeExplanation(board, move, result);
          setLastMinimaxResult(result);
          setLastBotMove(move);
          setLastBotMoveExplanation(explanation);

          setBoard(updatedBoard);
          setMoveHistory((prev) => {
            const nextHistory: MoveHistoryItem[] = [
              ...prev,
              {
                moveNumber: prev.length + 1,
                player: 'Bot (O)',
                cellIndex: move,
                positionName: getPositionName(move),
              },
            ];
            const check = checkWinner(updatedBoard);
            if (check.winner) {
              setWinnerInfo(check);
              handleGameOver(check.winner, nextHistory.length);
            } else {
              setTurn('X');
            }
            return nextHistory;
          });
        }
        setIsBotThinking(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [turn, winnerInfo.winner, board, handleGameOver]);

  const handleCellClick = (index: number) => {
    // Disallow clicking if not human's turn, cell occupied, or game over
    if (turn !== 'X' || board[index] !== null || winnerInfo.winner || isBotThinking) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = 'X';
    setBoard(updatedBoard);

    const nextHistory: MoveHistoryItem[] = [
      ...moveHistory,
      {
        moveNumber: moveHistory.length + 1,
        player: 'Player (X)',
        cellIndex: index,
        positionName: getPositionName(index),
      },
    ];
    setMoveHistory(nextHistory);

    const check = checkWinner(updatedBoard);
    if (check.winner) {
      setWinnerInfo(check);
      handleGameOver(check.winner, nextHistory.length);
    } else {
      setTurn('O');
      setIsBotThinking(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-[#11162A]/90">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <span className="font-bold text-sm">3x3</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-white">
              Tic-Tac-Toe: Adversarial Minimax
            </h3>
            <p className="text-xs text-slate-400">
              Player (X) vs Minimax Bot (O) · Exhaustive game tree evaluation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Turn / Game state badge */}
          <div className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 bg-[#080B18] border-slate-700">
            {winnerInfo.winner ? (
              winnerInfo.winner === 'draw' ? (
                <span className="text-amber-400 font-semibold">Game Over: Draw</span>
              ) : winnerInfo.winner === 'X' ? (
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" /> Player Won!
                </span>
              ) : (
                <span className="text-purple-400 font-semibold flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5" /> Bot Won!
                </span>
              )
            ) : isBotThinking ? (
              <span className="text-purple-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                Bot Searching Tree...
              </span>
            ) : (
              <span className="text-cyan-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Your Turn (X)
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

      {/* Main Grid & Panels Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3x3 Board Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-800 bg-[#0D1224] shadow-xl">
          <div className="relative grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#080B18] border border-slate-800/90 shadow-inner w-72 h-72 sm:w-80 sm:h-80">
            {board.map((cell, idx) => {
              const isWinningCell = winnerInfo.line?.includes(idx);
              const isLastBotCell = lastBotMove === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={cell !== null || turn !== 'X' || !!winnerInfo.winner || isBotThinking}
                  className={`relative flex items-center justify-center rounded-xl text-3xl sm:text-4xl font-black transition-all duration-150 select-none ${
                    cell === null
                      ? 'bg-[#11172E] hover:bg-[#18203E] cursor-pointer hover:border-cyan-500/40 border border-slate-800/80'
                      : cell === 'X'
                      ? 'bg-[#121A38] text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                      : 'bg-[#1C1438] text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  } ${isWinningCell ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''} ${
                    isLastBotCell && !isWinningCell ? 'ring-1 ring-purple-400' : ''
                  }`}
                  aria-label={`Square ${idx}, ${cell || 'Empty'}`}
                >
                  {cell}
                </button>
              );
            })}
          </div>

          {/* Quick status bar beneath board */}
          <div className="mt-5 w-full flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Human: [X]</span>
            <span>·</span>
            <span>Minimax Bot: [O]</span>
            <span>·</span>
            <span>Complexity: 9! (362,880)</span>
          </div>

          {/* Explain button if bot has moved */}
          {lastBotMove !== null && (
            <div className="mt-4 w-full">
              <button
                onClick={() => setShowExplainModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-700/50 text-cyan-300 hover:text-white hover:border-cyan-400/60 transition-all text-xs font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Explain Bot&apos;s Last Move (Minimax Rationale)</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Minimax Analysis & Move History */}
        <div className="lg:col-span-6 space-y-4">
          {/* Collapsible Minimax Analysis Card */}
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
                aria-label="Toggle Minimax Analysis"
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
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Best Move</span>
                        <div className="font-semibold text-cyan-300 text-xs truncate mt-0.5">
                          {getPositionName(lastMinimaxResult.bestMove)}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Score</span>
                        <div className="font-semibold font-mono text-emerald-400 text-xs mt-0.5">
                          {lastMinimaxResult.score >= 0
                            ? `+${lastMinimaxResult.score}`
                            : lastMinimaxResult.score}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#0A0D1D] border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">States Explored</span>
                        <div className="font-semibold font-mono text-purple-300 text-xs mt-0.5">
                          {lastMinimaxResult.nodesExplored.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Evaluated root moves breakdown */}
                    <div>
                      <span className="text-[11px] font-medium text-slate-300 block mb-1.5">
                        Evaluated Candidate Moves (Ranked by Minimax):
                      </span>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {lastMinimaxResult.moveEvaluations.map((evalItem) => (
                          <div
                            key={evalItem.index}
                            className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-mono ${
                              evalItem.index === lastMinimaxResult.bestMove
                                ? 'bg-indigo-950/40 border-cyan-500/50 text-cyan-300'
                                : 'bg-[#080B18] border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">#{evalItem.rank}</span>
                              <span>{evalItem.positionName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Score:</span>
                              <span
                                className={`font-semibold ${
                                  evalItem.score > 0
                                    ? 'text-emerald-400'
                                    : evalItem.score < 0
                                    ? 'text-rose-400'
                                    : 'text-slate-300'
                                }`}
                              >
                                {evalItem.score > 0 ? `+${evalItem.score}` : evalItem.score}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#090C1A] border border-slate-800/80 text-[11px] text-slate-400">
                      <strong>Tactical Summary:</strong> {lastBotMoveExplanation}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    Make your first move as Player (X). The Minimax engine will explore the game tree
                    and display its candidate evaluations here.
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

            <div className="mt-2.5 space-y-1 max-h-40 overflow-y-auto pr-1">
              {moveHistory.length === 0 ? (
                <div className="text-center py-4 text-slate-500 text-xs">
                  No moves recorded yet this round.
                </div>
              ) : (
                moveHistory.map((item) => (
                  <div
                    key={item.moveNumber}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#0A0D1D] text-xs font-mono border border-slate-850"
                  >
                    <span className="text-slate-500">#{item.moveNumber}</span>
                    <span
                      className={
                        item.player.includes('Player') ? 'text-cyan-300' : 'text-purple-300'
                      }
                    >
                      {item.player}
                    </span>
                    <span className="text-slate-300 font-sans text-[11px]">
                      → {item.positionName}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {lastBotMove !== null && lastMinimaxResult && (
        <ExplainMoveModal
          isOpen={showExplainModal}
          onClose={() => setShowExplainModal(false)}
          gameType="tictactoe"
          moveDescription={getPositionName(lastBotMove)}
          minimaxScore={lastMinimaxResult.score}
          statesExplored={lastMinimaxResult.nodesExplored}
          searchDepth={lastMinimaxResult.depthReached}
          deterministicExplanation={lastBotMoveExplanation}
          boardSummary={`Board contains ${board.filter((c) => c !== null).length} marks. Bot played ${getPositionName(lastBotMove)}.`}
          moveHistoryCount={moveHistory.length}
        />
      )}
    </div>
  );
}
