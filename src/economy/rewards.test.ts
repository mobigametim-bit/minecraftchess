import { describe, expect, it } from 'vitest';
import { DIFFICULTIES } from '../config/difficulties';
import { calculateReward } from './rewards';

describe('emerald rewards', () => {
  it('uses full reward for wins', () => {
    expect(DIFFICULTIES.map((d) => calculateReward(d, 'win'))).toEqual([
      5, 10, 20, 40, 80,
    ]);
  });

  it('uses one fifth for every non-win outcome', () => {
    expect(DIFFICULTIES.map((d) => calculateReward(d, 'loss'))).toEqual([
      1, 2, 4, 8, 16,
    ]);
    expect(DIFFICULTIES.map((d) => calculateReward(d, 'draw'))).toEqual([
      1, 2, 4, 8, 16,
    ]);
  });
});
