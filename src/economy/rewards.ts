import type { DifficultyConfig } from '../config/difficulties';

export type GameOutcome = 'win' | 'loss' | 'draw';

export function calculateReward(
  difficulty: DifficultyConfig,
  outcome: GameOutcome,
): number {
  if (outcome === 'win') {
    return difficulty.winReward;
  }
  return Math.floor(difficulty.winReward / 5);
}
