/**
 * Academic B.Tech CSE-AIML Implementation
 * Genuine Depth-Limited Minimax Algorithm with Alpha-Beta Pruning & Heuristic Evaluation for Connect Four
 * 
 * Game Specs:
 * - 6 Rows (row 0 = top, row 5 = bottom)
 * - 7 Columns (col 0 = leftmost, col 6 = rightmost)
 * - Human: 1 (Red) - Minimizing Player
 * - AI Bot: 2 (Yellow) - Maximizing Player
 * - Empty: 0
 * 
 * Direct Cell Placement Model:
 * - Each individual cell (row, col) is independently clickable and selectable.
 * - Pieces remain in the exact cell where they are placed (no gravity fall).
 * - Win conditions: 4-in-a-row horizontally, vertically, or diagonally.
 * - Adversarial Search: Depth-limited Minimax with Alpha-Beta pruning evaluates candidate cells.
 */

export const ROWS = 6;
export const COLS = 7;
export const TOTAL_CELLS = ROWS * COLS;
export const EMPTY = 0;
export const PLAYER_HUMAN = 1; // Red
export const PLAYER_BOT = 2;   // Yellow

export type ConnectFourGrid = number[][]; // 6 rows x 7 cols

export interface CellCoord {
  row: number;
  col: number;
}

export interface CandidateMoveEval {
  row: number;
  col: number;
  score: number;
  rank: number;
}

export interface ConnectFourMinimaxResult {
  bestCell: CellCoord;
  score: number;
  statesExplored: number;
  searchDepth: number;
  candidateEvaluations: CandidateMoveEval[];
}

export function createEmptyGrid(): ConnectFourGrid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

/**
 * Clones the 2D grid matrix
 */
export function cloneGrid(grid: ConnectFourGrid): ConnectFourGrid {
  return grid.map((row) => [...row]);
}

/**
 * Checks if the entire board is filled (draw)
 */
export function isConnectFourDraw(grid: ConnectFourGrid): boolean {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === EMPTY) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks whether player has a 4-in-a-row anywhere on the 6x7 board
 * Supports Horizontal, Vertical, and both Diagonals
 */
export function checkConnectFourWinner(
  grid: ConnectFourGrid,
  piece: number
): { isWin: boolean; winningCells: [number, number][] | null } {
  // 1. Horizontal check (any 4 in a row)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        grid[r][c] === piece &&
        grid[r][c + 1] === piece &&
        grid[r][c + 2] === piece &&
        grid[r][c + 3] === piece
      ) {
        return {
          isWin: true,
          winningCells: [
            [r, c],
            [r, c + 1],
            [r, c + 2],
            [r, c + 3],
          ],
        };
      }
    }
  }

  // 2. Vertical check (any 4 in a column)
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (
        grid[r][c] === piece &&
        grid[r + 1][c] === piece &&
        grid[r + 2][c] === piece &&
        grid[r + 3][c] === piece
      ) {
        return {
          isWin: true,
          winningCells: [
            [r, c],
            [r + 1, c],
            [r + 2, c],
            [r + 3, c],
          ],
        };
      }
    }
  }

  // 3. Positively sloped diagonal (bottom-left to top-right)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        grid[r][c] === piece &&
        grid[r - 1][c + 1] === piece &&
        grid[r - 2][c + 2] === piece &&
        grid[r - 3][c + 3] === piece
      ) {
        return {
          isWin: true,
          winningCells: [
            [r, c],
            [r - 1, c + 1],
            [r - 2, c + 2],
            [r - 3, c + 3],
          ],
        };
      }
    }
  }

  // 4. Negatively sloped diagonal (top-left to bottom-right)
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        grid[r][c] === piece &&
        grid[r + 1][c + 1] === piece &&
        grid[r + 2][c + 2] === piece &&
        grid[r + 3][c + 3] === piece
      ) {
        return {
          isWin: true,
          winningCells: [
            [r, c],
            [r + 1, c + 1],
            [r + 2, c + 2],
            [r + 3, c + 3],
          ],
        };
      }
    }
  }

  return { isWin: false, winningCells: null };
}

/**
 * Returns all unoccupied cells in the 6x7 grid
 * Prioritizes center positions and cells neighboring existing pieces for efficient Alpha-Beta cutoffs
 */
export function getAvailableCells(grid: ConnectFourGrid): CellCoord[] {
  const cells: CellCoord[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === EMPTY) {
        cells.push({ row: r, col: c });
      }
    }
  }

  // Check if board has any pieces
  const hasPieces = cells.length < TOTAL_CELLS;

  // Strategic move ordering:
  // Center bonus: closer to row 2-3 and col 3
  // Neighbor bonus: cells adjacent (orthogonally or diagonally) to existing pieces
  cells.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Center proximity score
    scoreA += (3 - Math.abs(a.row - 2.5)) * 4 + (3.5 - Math.abs(a.col - 3)) * 5;
    scoreB += (3 - Math.abs(b.row - 2.5)) * 4 + (3.5 - Math.abs(b.col - 3)) * 5;

    if (hasPieces) {
      // Check neighbors for piece proximity
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nrA = a.row + dr;
          const ncA = a.col + dc;
          if (nrA >= 0 && nrA < ROWS && ncA >= 0 && ncA < COLS && grid[nrA][ncA] !== EMPTY) {
            scoreA += 15;
          }
          const nrB = b.row + dr;
          const ncB = b.col + dc;
          if (nrB >= 0 && nrB < ROWS && ncB >= 0 && ncB < COLS && grid[nrB][ncB] !== EMPTY) {
            scoreB += 15;
          }
        }
      }
    }

    return scoreB - scoreA;
  });

  return cells;
}

/**
 * Window Evaluation function for 4-cell clusters
 * Scores relative advantage for BOT (Yellow = 2) vs HUMAN (Red = 1)
 */
function evaluateWindow(window: number[], piece: number): number {
  let score = 0;
  const oppPiece = piece === PLAYER_BOT ? PLAYER_HUMAN : PLAYER_BOT;

  const countPiece = window.filter((cell) => cell === piece).length;
  const countEmpty = window.filter((cell) => cell === EMPTY).length;
  const countOpp = window.filter((cell) => cell === oppPiece).length;

  if (countPiece === 4) {
    score += 100000;
  } else if (countPiece === 3 && countEmpty === 1) {
    score += 120;
  } else if (countPiece === 2 && countEmpty === 2) {
    score += 15;
  }

  // Defensive evaluation: penalize opponent threat heavily
  if (countOpp === 3 && countEmpty === 1) {
    score -= 150;
  } else if (countOpp === 4) {
    score -= 100000;
  }

  return score;
}

/**
 * Static Heuristic Board Evaluation Function
 */
export function evaluateBoardScore(grid: ConnectFourGrid, piece: number): number {
  let score = 0;

  // Center column strategic bonus
  const centerCol = 3;
  let centerCount = 0;
  for (let r = 0; r < ROWS; r++) {
    if (grid[r][centerCol] === piece) centerCount++;
  }
  score += centerCount * 8;

  // Horizontal windows
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [grid[r][c], grid[r][c + 1], grid[r][c + 2], grid[r][c + 3]];
      score += evaluateWindow(window, piece);
    }
  }

  // Vertical windows
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      const window = [grid[r][c], grid[r + 1][c], grid[r + 2][c], grid[r + 3][c]];
      score += evaluateWindow(window, piece);
    }
  }

  // Positively sloped diagonals
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [
        grid[r][c],
        grid[r - 1][c + 1],
        grid[r - 2][c + 2],
        grid[r - 3][c + 3],
      ];
      score += evaluateWindow(window, piece);
    }
  }

  // Negatively sloped diagonals
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [
        grid[r][c],
        grid[r + 1][c + 1],
        grid[r + 2][c + 2],
        grid[r + 3][c + 3],
      ];
      score += evaluateWindow(window, piece);
    }
  }

  return score;
}

/**
 * Depth-Limited Minimax with Alpha-Beta Pruning across legal empty cells
 */
function minimaxAlphaBeta(
  grid: ConnectFourGrid,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  counter: { count: number }
): { cell: CellCoord | null; score: number } {
  counter.count++;

  const botWin = checkConnectFourWinner(grid, PLAYER_BOT).isWin;
  const humanWin = checkConnectFourWinner(grid, PLAYER_HUMAN).isWin;
  const available = getAvailableCells(grid);
  const isTerminal = botWin || humanWin || available.length === 0;

  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (botWin) {
        return { cell: null, score: 10000000 + depth };
      } else if (humanWin) {
        return { cell: null, score: -10000000 - depth };
      } else {
        return { cell: null, score: 0 }; // Draw
      }
    } else {
      return { cell: null, score: evaluateBoardScore(grid, PLAYER_BOT) };
    }
  }

  // Limit branching factor at deeper levels to ensure real-time responsiveness (<150ms)
  const candidateCells = available.slice(0, depth >= 2 ? 14 : 10);

  if (isMaximizing) {
    let value = -Infinity;
    let chosenCell = candidateCells[0];

    for (const cell of candidateCells) {
      grid[cell.row][cell.col] = PLAYER_BOT;
      const { score } = minimaxAlphaBeta(grid, depth - 1, alpha, beta, false, counter);
      grid[cell.row][cell.col] = EMPTY; // Backtrack

      if (score > value) {
        value = score;
        chosenCell = cell;
      }
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        break; // Beta cutoff / prune
      }
    }
    return { cell: chosenCell, score: value };
  } else {
    let value = Infinity;
    let chosenCell = candidateCells[0];

    for (const cell of candidateCells) {
      grid[cell.row][cell.col] = PLAYER_HUMAN;
      const { score } = minimaxAlphaBeta(grid, depth - 1, alpha, beta, true, counter);
      grid[cell.row][cell.col] = EMPTY; // Backtrack

      if (score < value) {
        value = score;
        chosenCell = cell;
      }
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        break; // Alpha cutoff / prune
      }
    }
    return { cell: chosenCell, score: value };
  }
}

/**
 * Finds optimal Connect Four move using Minimax with Alpha-Beta pruning on 6x7 individual cells
 */
export function findBestMoveConnectFour(
  grid: ConnectFourGrid,
  searchDepth = 3
): ConnectFourMinimaxResult {
  const counter = { count: 0 };
  const available = getAvailableCells(grid);

  if (available.length === 0) {
    return {
      bestCell: { row: 0, col: 0 },
      score: 0,
      statesExplored: 0,
      searchDepth,
      candidateEvaluations: [],
    };
  }

  // 1. Immediate 1-ply winning check (speed heuristic)
  for (const cell of available) {
    grid[cell.row][cell.col] = PLAYER_BOT;
    if (checkConnectFourWinner(grid, PLAYER_BOT).isWin) {
      grid[cell.row][cell.col] = EMPTY;
      return {
        bestCell: cell,
        score: 10000000,
        statesExplored: 1,
        searchDepth,
        candidateEvaluations: [
          { row: cell.row, col: cell.col, score: 10000000, rank: 1 },
        ],
      };
    }
    grid[cell.row][cell.col] = EMPTY;
  }

  // 2. Immediate 1-ply blocking check (defensive imperative)
  for (const cell of available) {
    grid[cell.row][cell.col] = PLAYER_HUMAN;
    if (checkConnectFourWinner(grid, PLAYER_HUMAN).isWin) {
      grid[cell.row][cell.col] = EMPTY;
      return {
        bestCell: cell,
        score: 999999,
        statesExplored: available.length,
        searchDepth,
        candidateEvaluations: [
          { row: cell.row, col: cell.col, score: 999999, rank: 1 },
        ],
      };
    }
    grid[cell.row][cell.col] = EMPTY;
  }

  // 3. Full adversarial search across top candidates
  const candidateEvaluations: CandidateMoveEval[] = [];
  let bestCell = available[0];
  let bestScore = -Infinity;

  // Search across top available candidate cells
  const topCandidates = available.slice(0, 16);

  for (const cell of topCandidates) {
    grid[cell.row][cell.col] = PLAYER_BOT;
    const { score } = minimaxAlphaBeta(
      grid,
      searchDepth - 1,
      -Infinity,
      Infinity,
      false,
      counter
    );
    grid[cell.row][cell.col] = EMPTY;

    candidateEvaluations.push({
      row: cell.row,
      col: cell.col,
      score,
      rank: 0,
    });

    if (score > bestScore) {
      bestScore = score;
      bestCell = cell;
    }
  }

  // Sort candidate evaluations descending
  candidateEvaluations.sort((a, b) => b.score - a.score);
  candidateEvaluations.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return {
    bestCell,
    score: bestScore,
    statesExplored: counter.count,
    searchDepth,
    candidateEvaluations,
  };
}

/**
 * Pedagogical Explanation Generator for Connect Four individual cell placement
 */
export function generateConnectFourExplanation(
  gridBeforeMove: ConnectFourGrid,
  chosenCell: CellCoord,
  result: ConnectFourMinimaxResult
): string {
  const { score, statesExplored, searchDepth, candidateEvaluations } = result;
  const cellName = `Row ${chosenCell.row + 1}, Col ${chosenCell.col + 1}`;

  // Check if immediate win
  const testWinGrid = cloneGrid(gridBeforeMove);
  testWinGrid[chosenCell.row][chosenCell.col] = PLAYER_BOT;
  if (checkConnectFourWinner(testWinGrid, PLAYER_BOT).isWin) {
    return `Minimax detected an immediate winning sequence! Occupying ${cellName} completes a 4-in-a-row alignment with terminal evaluation +${score.toLocaleString()}.`;
  }

  // Check if defensive block
  const testBlockGrid = cloneGrid(gridBeforeMove);
  testBlockGrid[chosenCell.row][chosenCell.col] = PLAYER_HUMAN;
  if (checkConnectFourWinner(testBlockGrid, PLAYER_HUMAN).isWin) {
    return `Critical defensive block: Minimax detected that Player Red was 1 move away from completing a 4-in-a-row at ${cellName}. The bot placed its piece here to neutralize the threat, exploring ${statesExplored.toLocaleString()} states.`;
  }

  // Central dominance
  if ((chosenCell.row === 2 || chosenCell.row === 3) && (chosenCell.col === 2 || chosenCell.col === 3 || chosenCell.col === 4)) {
    return `Minimax placed its piece at ${cellName} (center quadrant). Center cells participate in the maximum number of potential horizontal, vertical, and diagonal 4-in-a-row lines. Evaluated ${statesExplored.toLocaleString()} states with heuristic score ${score}.`;
  }

  const runnerUp = candidateEvaluations.find(
    (c) => c.row !== chosenCell.row || c.col !== chosenCell.col
  );

  return `Minimax selected ${cellName} at search depth ${searchDepth} (exploring ${statesExplored.toLocaleString()} potential future game states). The heuristic evaluation yielded ${score}${
    runnerUp
      ? ` (outperforming alternative Row ${runnerUp.row + 1}, Col ${runnerUp.col + 1} at ${runnerUp.score})`
      : ''
  }, maximizing alignment potential across active rows and diagonals.`;
}
