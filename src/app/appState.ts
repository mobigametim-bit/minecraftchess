export const APP_PHASES = ['MAIN_MENU', 'GAME', 'RESULT'] as const;

export type AppPhase = (typeof APP_PHASES)[number];

export interface AppState {
  phase: AppPhase;
}

export const initialAppState: AppState = {
  phase: 'MAIN_MENU',
};

export function isAppPhase(value: string): value is AppPhase {
  return APP_PHASES.includes(value as AppPhase);
}
