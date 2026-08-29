const EMERALD_BALANCE_KEY = 'minecraftchess.emeralds.v1';

export function loadEmeraldBalance(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const raw = window.localStorage.getItem(EMERALD_BALANCE_KEY);
  if (!raw) {
    return 0;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function saveEmeraldBalance(balance: number): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(EMERALD_BALANCE_KEY, String(Math.max(0, balance)));
}
