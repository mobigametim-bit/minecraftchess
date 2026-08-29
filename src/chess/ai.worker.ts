import { Chess } from 'chess.js';
import type { Move } from 'chess.js';

interface AiRequest {
  requestId: number;
  fen: string;
  depth: number;
  randomness: number;
}

interface AiResponse {
  requestId: number;
  move: { from: string; to: string; promotion?: string } | null;
}

const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20_000,
};

function terminalScore(game: Chess, depth: number): number | null {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -100_000 - depth : 100_000 + depth;
  }
  if (game.isDraw()) {
    return 0;
  }
  return null;
}

function evaluate(game: Chess): number {
  const terminal = terminalScore(game, 0);
  if (terminal !== null) {
    return terminal;
  }

  let score = 0;
  for (const row of game.board()) {
    for (const piece of row) {
      if (!piece) continue;
      const value = PIECE_VALUES[piece.type] ?? 0;
      score += piece.color === 'w' ? value : -value;
    }
  }

  return score;
}

function orderedMoves(game: Chess): Move[] {
  return game
    .moves({ verbose: true })
    .sort((a, b) => Number(Boolean(b.captured)) - Number(Boolean(a.captured)));
}

function search(
  game: Chess,
  depth: number,
  alphaStart: number,
  betaStart: number,
): number {
  const terminal = terminalScore(game, depth);
  if (terminal !== null || depth <= 0) {
    return terminal ?? evaluate(game);
  }

  let alpha = alphaStart;
  let beta = betaStart;
  const whiteToMove = game.turn() === 'w';
  let best = whiteToMove ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

  for (const move of orderedMoves(game)) {
    game.move({ from: move.from, to: move.to, promotion: move.promotion });
    const score = search(game, depth - 1, alpha, beta);
    game.undo();

    if (whiteToMove) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, best);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return best;
}

function chooseBlackMove(
  game: Chess,
  depth: number,
  randomness: number,
): Move | null {
  const moves = orderedMoves(game);
  if (moves.length === 0) {
    return null;
  }

  if (depth <= 0) {
    return moves[Math.floor(Math.random() * moves.length)] ?? null;
  }

  const scored = moves.map((move) => {
    game.move({ from: move.from, to: move.to, promotion: move.promotion });
    const score = search(
      game,
      depth - 1,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    );
    game.undo();
    return { move, score };
  });

  scored.sort((a, b) => a.score - b.score);
  const poolSize = Math.max(1, Math.ceil(scored.length * randomness));
  const pool = scored.slice(0, poolSize);
  const selected = pool[Math.floor(Math.random() * pool.length)] ?? scored[0];
  return selected?.move ?? null;
}

self.onmessage = (event: MessageEvent<AiRequest>) => {
  const request = event.data;
  const game = new Chess(request.fen);
  const move = chooseBlackMove(game, request.depth, request.randomness);
  const response: AiResponse = {
    requestId: request.requestId,
    move: move
      ? { from: move.from, to: move.to, promotion: move.promotion }
      : null,
  };
  self.postMessage(response);
};
