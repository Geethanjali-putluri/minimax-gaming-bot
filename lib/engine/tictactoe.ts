/**
 * Academic B.Tech CSE-AIML Implementation
 * Genuine Minimax Algorithm for 3x3 Tic-Tac-Toe
 * 
 * Game Theory Principles:
 * - Zero-sum, perfect-information, 2-player turn-based game
 * - Player X: Minimizing Player (Human)
 * - Player O: Maximizing Player (AI Bot)
 * - Payoff function:
 *     Bot Win (O) = +10 - depth (incentivizes fast wins)
 *     Human Win (X) = depth - 10 (delays unavoidable loss)
 *     Draw = 0
 */

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[]; // 9 elements: 0..8

export interface MinimaxMoveEval {
  index: number;
  positionName: string;
  score: number;
  rank: number;
}

export interface MinimaxResult {
  bestMove: number;
  score: number;
  nodesExplored: number;
  moveEvaluations: MinimaxMoveEval[];
  depthReached: number;
}

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Center column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

const POSITION_NAMES: Record<number, string> = {
  0: 'Top-Left (0,0)',
  1: 'Top-Center (0,1)',
  2: 'Top-Right (0,2)',
  3: 'Middle-Left (1,0)',
  4: 'Center (1,1)',
  5: 'Middle-Right (1,2)',
  6: 'Bottom-Left (2,0)',
  7: 'Bottom-Center (2,1)',
  8: 'Bottom-Right (2,2)',
};

export function getPositionName(index: number): string {
  return POSITION_NAMES[index] || `Square #${index}`;
}

/**
 * Checks terminal state of the 3x3 board
 * Returns winner ('X' | 'O'), 'draw', or null if game is ongoing
 */
export function checkWinner(board: BoardState): {
  winner: Player | 'draw' | null;
  line: number[] | null;
} {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: combo };
    }
  }

  const isFull = board.every((cell) => cell !== null);
  if (isFull) {
    return { winner: 'draw', line: null };
  }

  return { winner: null, line: null };
}

/**
 * Get indices of all legal/unoccupied moves
 */
export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Minimax recursive core function
 * Depth-first adversarial game tree search
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  counter: { count: number; maxDepth: number }
): number {
  counter.count++;
  if (depth > counter.maxDepth) {
    counter.maxDepth = depth;
  }

  const result = checkWinner(board);

  // Base Case 1: Bot ('O') won
  if (result.winner === 'O') {
    return 10 - depth;
  }
  // Base Case 2: Human ('X') won
  if (result.winner === 'X') {
    return depth - 10;
  }
  // Base Case 3: Draw
  if (result.winner === 'draw') {
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    // Maximizing player (Bot - O): maximize score
    let maxEval = -Infinity;
    for (const move of availableMoves) {
      board[move] = 'O';
      const evaluation = minimax(board, depth + 1, false, counter);
      board[move] = null; // Backtracking
      maxEval = Math.max(maxEval, evaluation);
    }
    return maxEval;
  } else {
    // Minimizing player (Human - X): minimize score
    let minEval = Infinity;
    for (const move of availableMoves) {
      board[move] = 'X';
      const evaluation = minimax(board, depth + 1, true, counter);
      board[move] = null; // Backtracking
      minEval = Math.min(minEval, evaluation);
    }
    return minEval;
  }
}

/**
 * Executes Minimax from current root state and evaluates all available legal moves.
 * Guarantees optimal adversarial decision.
 */
export function findBestMoveTicTacToe(board: BoardState): MinimaxResult {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    return {
      bestMove: -1,
      score: 0,
      nodesExplored: 0,
      moveEvaluations: [],
      depthReached: 0,
    };
  }

  // Fast path for opening empty board: Center (4) or corners are game-theoretically optimal
  // We still run minimax to get accurate node counts, but board is small enough that pure minimax executes in ~30ms
  const counter = { count: 0, maxDepth: 0 };
  const moveEvaluations: MinimaxMoveEval[] = [];

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    board[move] = 'O'; // Bot plays
    const score = minimax(board, 0, false, counter);
    board[move] = null; // Backtrack

    moveEvaluations.push({
      index: move,
      positionName: getPositionName(move),
      score,
      rank: 0,
    });

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  // Sort evaluations in descending order of value
  moveEvaluations.sort((a, b) => b.score - a.score);
  moveEvaluations.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return {
    bestMove,
    score: bestScore,
    nodesExplored: counter.count,
    moveEvaluations,
    depthReached: counter.maxDepth,
  };
}

/**
 * Pedagogical Explanation Generator
 * Translates minimax numerical values and game-state geometry into rigorous academic explanations.
 */
export function generateTicTacToeExplanation(
  boardBeforeMove: BoardState,
  chosenMove: number,
  minimaxResult: MinimaxResult
): string {
  const { score, nodesExplored, moveEvaluations } = minimaxResult;
  const moveName = getPositionName(chosenMove);

  // Check if this move immediately wins the game
  const testWinBoard = [...boardBeforeMove];
  testWinBoard[chosenMove] = 'O';
  if (checkWinner(testWinBoard).winner === 'O') {
    return `Minimax selected ${moveName} because it immediately completes a 3-in-a-row alignment, delivering an optimal terminal win (+${score}) without allowing any further counterplay. Explored ${nodesExplored.toLocaleString()} game states.`;
  }

  // Check if human had an immediate winning threat that was blocked
  for (let i = 0; i < 9; i++) {
    if (boardBeforeMove[i] === null) {
      const testHumanBoard = [...boardBeforeMove];
      testHumanBoard[i] = 'X';
      if (checkWinner(testHumanBoard).winner === 'X' && i === chosenMove) {
        return `Minimax detected an immediate winning fork/line for Player X at ${moveName}. By occupying this cell, the bot neutralized the human player's threat. Minimax evaluated this defensive move as the highest minimax value (${score}), exploring ${nodesExplored.toLocaleString()} sub-branches.`;
      }
    }
  }

  // Strategic position analysis
  if (chosenMove === 4) {
    return `Minimax chose the Center square (1,1). In Tic-Tac-Toe graph theory, the center node intersects four winning lines (two orthogonals and two diagonals), maximizing branching utility and limiting the opponent's degrees of freedom. Search verified ${nodesExplored.toLocaleString()} permutations.`;
  }

  if ([0, 2, 6, 8].includes(chosenMove)) {
    return `Minimax selected corner position ${moveName} (heuristic score ${score}). Corner nodes each intersect three winning lines, enabling fork creation while denying adjacent edges to the opponent. Verified across ${nodesExplored.toLocaleString()} game tree nodes.`;
  }

  const runnerUp = moveEvaluations[1];
  const diffExplanation = runnerUp
    ? ` It scored ${score} vs ${runnerUp.score} for ${runnerUp.positionName}.`
    : '';

  return `Minimax selected ${moveName} after exploring ${nodesExplored.toLocaleString()} potential future game states.${diffExplanation} Under optimal play from both sides, this branch yields an adversarial minimax value of ${score} (guaranteed draw or win).`;
}
