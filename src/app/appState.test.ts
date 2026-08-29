import { describe, expect, it } from 'vitest';
import { APP_PHASES, initialAppState, isAppPhase } from './appState';

describe('app state foundation', () => {
  it('starts in the main menu phase', () => {
    expect(initialAppState.phase).toBe('MAIN_MENU');
  });

  it('declares the complete MVP application phase shell', () => {
    expect(APP_PHASES).toEqual(['MAIN_MENU', 'GAME', 'RESULT']);
  });

  it('validates known phases', () => {
    expect(isAppPhase('GAME')).toBe(true);
    expect(isAppPhase('UNKNOWN')).toBe(false);
  });
});
