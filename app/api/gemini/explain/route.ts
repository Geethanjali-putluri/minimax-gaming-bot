import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      gameType,
      moveDescription,
      minimaxAnalysis,
      boardSummary,
      playerMoveHistory,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is not present, return structured fallback without error
    if (!apiKey) {
      return NextResponse.json({
        isLiveAi: false,
        explanation:
          minimaxAnalysis?.defaultExplanation ||
          `Minimax selected ${moveDescription} by evaluating terminal states and maximizing utility. (Live LLM integration is ready; configure GEMINI_API_KEY in environment to activate neural tutoring).`,
        academicInsight:
          'Minimax is an exhaustive or depth-limited adversarial search algorithm. In zero-sum games with perfect information, it guarantees an optimal payoff assuming rational opponent play.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are an academic Computer Science & Artificial Intelligence (CSE-AIML) professor explaining an actual Minimax move to a B.Tech student in an oral examination / viva.

Context of the game:
- Game: ${gameType === 'tictactoe' ? '3x3 Tic-Tac-Toe' : 'Connect Four (6 rows x 7 cols)'}
- Move chosen by Minimax Bot: ${moveDescription}
- Minimax Heuristic / Payoff Score: ${minimaxAnalysis?.score ?? 'N/A'}
- Search Depth: ${minimaxAnalysis?.searchDepth ?? (gameType === 'tictactoe' ? 'Full Tree (up to 9 ply)' : '4-ply')}
- Total Game Tree States Explored: ${minimaxAnalysis?.statesExplored?.toLocaleString() ?? 'N/A'}
- Recent Board Context: ${boardSummary || 'Mid-game board state'}
- Move History Count: ${playerMoveHistory?.length || 0} moves played

Please provide a concise, high-impact 2-part pedagogical answer:
1. Tactical & Game Tree Rationale: Explain why the Minimax algorithm chose this move instead of others (evaluating branching factor, potential countermoves, defensive blocking or offensive forks).
2. Viva / Exam Concept: Relate this move directly to a B.Tech Data Structures / AI concept (such as tree backtracking, recursion, alpha-beta cutoffs, or heuristic evaluation functions).

Keep the explanation clear, professional, rigorous, and without fluff. Length: 100-140 words.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({
      isLiveAi: true,
      explanation: response.text || minimaxAnalysis?.defaultExplanation,
      academicInsight:
        'Analyzed using Gemini LLM connected to server-side Minimax search metadata.',
    });
  } catch (error) {
    console.error('Gemini explanation error:', error);
    return NextResponse.json(
      {
        isLiveAi: false,
        explanation:
          'The Minimax algorithm computed the optimal branch value by simulating all downstream opponent responses, ensuring no worse outcome occurs under adversarial play.',
        academicInsight:
          'Fallback explanation active: Minimax guarantees game-theoretic equilibrium (Nash equilibrium in zero-sum games).',
      },
      { status: 200 }
    );
  }
}
