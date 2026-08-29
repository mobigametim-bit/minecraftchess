import { useCallback, useRef, useState } from 'react';
import { getDifficulty, type DifficultyId } from '../config/difficulties';
import { calculateReward } from '../economy/rewards';
import { loadEmeraldBalance, saveEmeraldBalance } from '../storage/walletStorage';
import { MainMenu } from '../screens/MainMenu/MainMenu';
import {
  GameScreen,
  type GameFinish,
  type GameResult,
} from '../screens/Game/GameScreen';
import { initialAppState, type AppPhase } from './appState';

export function App() {
  const [phase, setPhase] = useState<AppPhase>(initialAppState.phase);
  const [difficultyId, setDifficultyId] = useState<DifficultyId>('novice');
  const [emeralds, setEmeralds] = useState(loadEmeraldBalance);
  const [result, setResult] = useState<GameResult | null>(null);
  const [gameNonce, setGameNonce] = useState(0);
  const finishLockedRef = useRef(false);

  const difficulty = getDifficulty(difficultyId);

  const startGame = useCallback((nextDifficulty: DifficultyId) => {
    setDifficultyId(nextDifficulty);
    setResult(null);
    finishLockedRef.current = false;
    setGameNonce((value) => value + 1);
    setPhase('GAME');
  }, []);

  const finishGame = useCallback(
    (finish: GameFinish) => {
      if (finishLockedRef.current) {
        return;
      }
      finishLockedRef.current = true;
      const activeDifficulty = getDifficulty(difficultyId);
      const reward = calculateReward(activeDifficulty, finish.outcome);
      const gameResult: GameResult = { ...finish, reward };

      setEmeralds((current) => {
        const next = current + reward;
        saveEmeraldBalance(next);
        return next;
      });
      setResult(gameResult);
      setPhase('RESULT');
    },
    [difficultyId],
  );

  const rematch = useCallback(() => {
    setResult(null);
    finishLockedRef.current = false;
    setGameNonce((value) => value + 1);
    setPhase('GAME');
  }, []);

  const returnToMenu = useCallback(() => {
    setResult(null);
    finishLockedRef.current = false;
    setPhase('MAIN_MENU');
  }, []);

  if (phase === 'MAIN_MENU') {
    return <MainMenu emeralds={emeralds} onStart={startGame} />;
  }

  return (
    <GameScreen
      key={`${difficultyId}-${gameNonce}`}
      difficulty={difficulty}
      result={phase === 'RESULT' ? result : null}
      onFinish={finishGame}
      onRematch={rematch}
      onMenu={returnToMenu}
    />
  );
}
