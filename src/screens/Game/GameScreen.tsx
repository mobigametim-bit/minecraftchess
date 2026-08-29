import { useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import type { Move, PieceSymbol, Square } from 'chess.js';
import type { DifficultyConfig } from '../../config/difficulties';
import type { GameOutcome } from '../../economy/rewards';
import { ChessBoard } from '../../components/ChessBoard/ChessBoard';

export interface GameFinish {
  outcome: GameOutcome;
  reason: string;
}

export interface GameResult extends GameFinish {
  reward: number;
}

interface GameScreenProps {
  difficulty: DifficultyConfig;
  result: GameResult | null;
  onFinish: (finish: GameFinish) => void;
  onRematch: () => void;
  onMenu: () => void;
}

interface AiResponse {
  requestId: number;
  move: { from: string; to: string; promotion?: string } | null;
}

interface PendingPromotion {
  from: Square;
  to: Square;
  moves: Move[];
}

const PROMOTION_OPTIONS: readonly PieceSymbol[] = ['q', 'r', 'b', 'n'];
const PROMOTION_LABELS: Record<PieceSymbol, string> = {
  p: 'Пешка',
  n: 'Конь',
  b: 'Слон',
  r: 'Ладья',
  q: 'Ферзь',
  k: 'Король',
};
const PROMOTION_GLYPHS: Record<PieceSymbol, string> = {
  p: '♙',
  n: '♘',
  b: '♗',
  r: '♖',
  q: '♕',
  k: '♔',
};

function terminalResult(game: Chess): GameFinish | null {
  if (game.isCheckmate()) {
    return game.turn() === 'w'
      ? { outcome: 'loss', reason: 'Мат' }
      : { outcome: 'win', reason: 'Мат' };
  }
  if (game.isStalemate()) {
    return { outcome: 'draw', reason: 'Пат' };
  }
  if (game.isThreefoldRepetition()) {
    return { outcome: 'draw', reason: 'Троекратное повторение позиции' };
  }
  if (game.isInsufficientMaterial()) {
    return { outcome: 'draw', reason: 'Недостаточно материала' };
  }
  if (game.isDraw()) {
    return { outcome: 'draw', reason: 'Ничья' };
  }
  return null;
}

export function GameScreen({
  difficulty,
  result,
  onFinish,
  onRematch,
  onMenu,
}: GameScreenProps) {
  const gameRef = useRef(new Chess());
  const finishSentRef = useRef(false);
  const aiRequestRef = useRef(0);
  const [fen, setFen] = useState(() => gameRef.current.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);

  const game = gameRef.current;

  useEffect(() => {
    if (finishSentRef.current || result) {
      return;
    }
    const finish = terminalResult(gameRef.current);
    if (finish) {
      finishSentRef.current = true;
      onFinish(finish);
    }
  }, [fen, onFinish, result]);

  useEffect(() => {
    if (result || gameRef.current.isGameOver() || gameRef.current.turn() !== 'b') {
      return;
    }

    let cancelled = false;
    const requestId = ++aiRequestRef.current;
    const delay =
      difficulty.ai.thinkMinMs +
      Math.random() * (difficulty.ai.thinkMaxMs - difficulty.ai.thinkMinMs);
    const worker = new Worker(new URL('../../chess/ai.worker.ts', import.meta.url), {
      type: 'module',
    });

    setAiThinking(true);
    const timer = window.setTimeout(() => {
      worker.postMessage({
        requestId,
        fen: gameRef.current.fen(),
        depth: difficulty.ai.depth,
        randomness: difficulty.ai.randomness,
      });
    }, delay);

    let completed = false;

    const playFallbackMove = () => {
      if (cancelled || completed || gameRef.current.turn() !== 'b') {
        return;
      }
      completed = true;
      const moves = gameRef.current.moves({ verbose: true });
      const fallback = moves[Math.floor(Math.random() * moves.length)];
      if (fallback) {
        const played = gameRef.current.move({
          from: fallback.from,
          to: fallback.to,
          promotion: fallback.promotion,
        });
        setLastMove({ from: played.from, to: played.to });
        setFen(gameRef.current.fen());
      }
      setAiThinking(false);
    };

    worker.onmessage = (event: MessageEvent<AiResponse>) => {
      if (cancelled || completed || event.data.requestId !== requestId) {
        return;
      }

      const move = event.data.move;
      if (!move) {
        playFallbackMove();
        return;
      }

      completed = true;
      const played = gameRef.current.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      });
      setLastMove({ from: played.from, to: played.to });
      setFen(gameRef.current.fen());
      setAiThinking(false);
    };

    worker.onerror = playFallbackMove;

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      worker.terminate();
    };
  }, [difficulty, fen, result]);

  const statusText = useMemo(() => {
    if (result) {
      return result.reason;
    }
    if (aiThinking) {
      return 'Компьютер думает…';
    }
    if (game.isCheck()) {
      return game.turn() === 'w' ? 'Шах вашему королю' : 'Шах компьютеру';
    }
    return game.turn() === 'w' ? 'Ваш ход' : 'Ход компьютера';
  }, [aiThinking, fen, game, result]);

  function clearSelection() {
    setSelected(null);
    setLegalMoves([]);
  }

  function playMove(move: Move) {
    const played = game.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion,
    });
    setLastMove({ from: played.from, to: played.to });
    clearSelection();
    setPendingPromotion(null);
    setFen(game.fen());
  }

  function handleSquareClick(square: Square) {
    if (result || aiThinking || pendingPromotion || game.turn() !== 'w') {
      return;
    }

    const piece = game.get(square);

    if (selected) {
      const targetMoves = legalMoves.filter((move) => move.to === square);
      if (targetMoves.length > 0) {
        const promotionMoves = targetMoves.filter((move) => move.promotion);
        if (promotionMoves.length > 1) {
          setPendingPromotion({ from: selected, to: square, moves: promotionMoves });
          return;
        }
        const move = targetMoves[0];
        if (move) {
          playMove(move);
          return;
        }
      }
    }

    if (piece?.color === 'w') {
      setSelected(square);
      setLegalMoves(game.moves({ square, verbose: true }));
    } else {
      clearSelection();
    }
  }

  function choosePromotion(piece: PieceSymbol) {
    const move = pendingPromotion?.moves.find((candidate) => candidate.promotion === piece);
    if (move) {
      playMove(move);
    }
  }

  function resign() {
    if (finishSentRef.current || result) {
      return;
    }
    finishSentRef.current = true;
    onFinish({ outcome: 'loss', reason: 'Сдача' });
  }

  const resultTitle =
    result?.outcome === 'win'
      ? 'Победа!'
      : result?.outcome === 'loss'
        ? 'Поражение'
        : 'Ничья';

  return (
    <main className="game-screen">
      <header className="game-topbar">
        <button className="brand-button" type="button" onClick={onMenu}>
          <span aria-hidden="true">♟</span> Minecraftchess
        </button>
        <div className="game-difficulty">
          <span>Компьютер</span>
          <strong>{difficulty.label}</strong>
        </div>
      </header>

      <section className="game-layout">
        <div className="board-column">
          <div className="player-strip opponent-strip">
            <span className="avatar black-avatar" aria-hidden="true">♚</span>
            <div>
              <strong>Компьютер</strong>
              <small>{difficulty.label}</small>
            </div>
            <span className="turn-status">{game.turn() === 'b' && !result ? '●' : ''}</span>
          </div>

          <div className="board-wrap">
            <ChessBoard
              game={game}
              selected={selected}
              legalMoves={legalMoves}
              lastMove={lastMove}
              disabled={Boolean(result) || aiThinking}
              onSquareClick={handleSquareClick}
            />

            {pendingPromotion && !result && (
              <div className="promotion-backdrop" role="dialog" aria-modal="true" aria-label="Выбор превращения пешки">
                <div className="promotion-panel">
                  <strong>Во что превратить пешку?</strong>
                  <div className="promotion-options">
                    {PROMOTION_OPTIONS.map((piece) => (
                      <button key={piece} type="button" onClick={() => choosePromotion(piece)}>
                        <span aria-hidden="true">{PROMOTION_GLYPHS[piece]}</span>
                        <small>{PROMOTION_LABELS[piece]}</small>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="result-backdrop" role="dialog" aria-modal="true" aria-labelledby="result-title">
                <div className="result-panel">
                  <p className="eyebrow">Партия завершена</p>
                  <h2 id="result-title">{resultTitle}</h2>
                  <p className="result-reason">{result.reason}</p>
                  <div className="result-reward">
                    <span className="emerald-gem" aria-hidden="true">◆</span>
                    <strong>+{result.reward}</strong>
                    <span>изумрудов</span>
                  </div>
                  <button className="primary-action" type="button" onClick={onRematch}>
                    Сыграть ещё
                  </button>
                  <button className="secondary-action" type="button" onClick={onMenu}>
                    Главное меню
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="player-strip">
            <span className="avatar white-avatar" aria-hidden="true">♔</span>
            <div>
              <strong>Игрок</strong>
              <small>Белые</small>
            </div>
            <span className="turn-status">{game.turn() === 'w' && !result ? '●' : ''}</span>
          </div>
        </div>

        <aside className="game-sidebar">
          <div className="status-card">
            <span className="status-label">Статус</span>
            <strong>{statusText}</strong>
          </div>
          <div className="reward-card">
            <span>Награда за победу</span>
            <strong><span aria-hidden="true">◆</span> {difficulty.winReward}</strong>
            <small>За поражение или ничью: {Math.floor(difficulty.winReward / 5)}</small>
          </div>
          <button className="resign-button" type="button" onClick={resign} disabled={Boolean(result)}>
            Сдаться
          </button>
        </aside>
      </section>
    </main>
  );
}
