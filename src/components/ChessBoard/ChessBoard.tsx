import type { Move, PieceSymbol, Square } from 'chess.js';
import { Chess } from 'chess.js';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const PIECE_GLYPHS: Record<'w' | 'b', Record<PieceSymbol, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
};

interface ChessBoardProps {
  game: Chess;
  selected: Square | null;
  legalMoves: Move[];
  lastMove: { from: Square; to: Square } | null;
  disabled: boolean;
  onSquareClick: (square: Square) => void;
}

export function ChessBoard({
  game,
  selected,
  legalMoves,
  lastMove,
  disabled,
  onSquareClick,
}: ChessBoardProps) {
  const legalTargets = new Map<Square, Move[]>();
  for (const move of legalMoves) {
    const moves = legalTargets.get(move.to) ?? [];
    moves.push(move);
    legalTargets.set(move.to, moves);
  }

  return (
    <div className="chessboard" role="grid" aria-label="Шахматная доска">
      {RANKS.flatMap((rank, rankIndex) =>
        FILES.map((file, fileIndex) => {
          const square = `${file}${rank}` as Square;
          const piece = game.get(square);
          const targetMoves = legalTargets.get(square);
          const isLight = (rankIndex + fileIndex) % 2 === 0;
          const isSelected = selected === square;
          const isLastMove = lastMove?.from === square || lastMove?.to === square;
          const isLegal = Boolean(targetMoves?.length);
          const isCapture = Boolean(targetMoves?.some((move) => move.captured));

          return (
            <button
              key={square}
              type="button"
              role="gridcell"
              className={[
                'board-square',
                isLight ? 'light' : 'dark',
                isSelected ? 'selected' : '',
                isLastMove ? 'last-move' : '',
                isLegal ? 'legal' : '',
                isCapture ? 'capture-target' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={`${square}${piece ? ` ${piece.color === 'w' ? 'белая' : 'чёрная'} фигура` : ''}`}
              onClick={() => onSquareClick(square)}
              disabled={disabled}
            >
              {fileIndex === 0 && <span className="rank-label">{rank}</span>}
              {rankIndex === 7 && <span className="file-label">{file}</span>}
              {piece && (
                <span className={`piece piece-${piece.color}`} aria-hidden="true">
                  {PIECE_GLYPHS[piece.color][piece.type]}
                </span>
              )}
              {isLegal && !isCapture && <span className="move-dot" aria-hidden="true" />}
              {isCapture && <span className="capture-ring" aria-hidden="true" />}
            </button>
          );
        }),
      )}
    </div>
  );
}
