'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type GameType = 'tictactoe' | 'connectfour';
export type GameWinner = 'player' | 'bot' | 'draw';

export interface GameRecord {
  id: string;
  gameType: GameType;
  winner: GameWinner;
  movesCount: number;
  durationSeconds: number;
  timestamp: string;
  details?: string;
}

export interface GameStats {
  total: number;
  playerWins: number;
  botWins: number;
  draws: number;
  winRatePercent: number; // Player win rate
  botWinRatePercent: number;
}

interface GameStatsContextType {
  history: GameRecord[];
  overallStats: GameStats;
  tictactoeStats: GameStats;
  connectfourStats: GameStats;
  recordGame: (game: Omit<GameRecord, 'id' | 'timestamp'>) => void;
  resetStats: () => void;
}

const STORAGE_KEY = 'minimax_bot_session_stats';

const GameStatsContext = createContext<GameStatsContextType | null>(null);

function calculateStats(games: GameRecord[]): GameStats {
  const total = games.length;
  if (total === 0) {
    return {
      total: 0,
      playerWins: 0,
      botWins: 0,
      draws: 0,
      winRatePercent: 0,
      botWinRatePercent: 0,
    };
  }

  const playerWins = games.filter((g) => g.winner === 'player').length;
  const botWins = games.filter((g) => g.winner === 'bot').length;
  const draws = games.filter((g) => g.winner === 'draw').length;

  return {
    total,
    playerWins,
    botWins,
    draws,
    winRatePercent: Math.round((playerWins / total) * 100),
    botWinRatePercent: Math.round((botWins / total) * 100),
  };
}

export function GameStatsProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<GameRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to sessionStorage when history updates
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const recordGame = (game: Omit<GameRecord, 'id' | 'timestamp'>) => {
    const newRecord: GameRecord = {
      ...game,
      id: `game_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setHistory((prev) => [newRecord, ...prev]);
  };

  const resetStats = () => {
    setHistory([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const overallStats = useMemo(() => calculateStats(history), [history]);
  const tictactoeStats = useMemo(
    () => calculateStats(history.filter((g) => g.gameType === 'tictactoe')),
    [history]
  );
  const connectfourStats = useMemo(
    () => calculateStats(history.filter((g) => g.gameType === 'connectfour')),
    [history]
  );

  return (
    <GameStatsContext.Provider
      value={{
        history,
        overallStats,
        tictactoeStats,
        connectfourStats,
        recordGame,
        resetStats,
      }}
    >
      {children}
    </GameStatsContext.Provider>
  );
}

export function useGameStats(): GameStatsContextType {
  const context = useContext(GameStatsContext);
  if (!context) {
    throw new Error('useGameStats must be used within a GameStatsProvider');
  }
  return context;
}
