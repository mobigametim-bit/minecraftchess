export type DifficultyId = 'novice' | 'easy' | 'medium' | 'hard' | 'expert';

export interface DifficultyConfig {
  id: DifficultyId;
  label: string;
  subtitle: string;
  winReward: number;
  ai: {
    depth: number;
    randomness: number;
    thinkMinMs: number;
    thinkMaxMs: number;
  };
}

export const DIFFICULTIES: readonly DifficultyConfig[] = [
  {
    id: 'novice',
    label: 'Новичок',
    subtitle: 'Спокойная партия и много случайных решений',
    winReward: 5,
    ai: { depth: 0, randomness: 1, thinkMinMs: 350, thinkMaxMs: 650 },
  },
  {
    id: 'easy',
    label: 'Легко',
    subtitle: 'Компьютер замечает простые взятия',
    winReward: 10,
    ai: { depth: 1, randomness: 0.55, thinkMinMs: 400, thinkMaxMs: 750 },
  },
  {
    id: 'medium',
    label: 'Средне',
    subtitle: 'Сбалансированный соперник',
    winReward: 20,
    ai: { depth: 2, randomness: 0.25, thinkMinMs: 450, thinkMaxMs: 850 },
  },
  {
    id: 'hard',
    label: 'Сложно',
    subtitle: 'Сильнее считает варианты и реже ошибается',
    winReward: 40,
    ai: { depth: 2, randomness: 0.08, thinkMinMs: 500, thinkMaxMs: 900 },
  },
  {
    id: 'expert',
    label: 'Эксперт',
    subtitle: 'Максимальная сила текущего локального AI',
    winReward: 80,
    ai: { depth: 3, randomness: 0, thinkMinMs: 550, thinkMaxMs: 950 },
  },
] as const;

export function getDifficulty(id: DifficultyId): DifficultyConfig {
  const difficulty = DIFFICULTIES.find((item) => item.id === id);
  if (!difficulty) {
    throw new Error(`Unknown difficulty: ${id}`);
  }
  return difficulty;
}
