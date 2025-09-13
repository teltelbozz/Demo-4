import { embeddedSeed } from './seed.js';
export const STORAGE_KEY = "demo4_state_v02";

export async function loadSeed() {
  try {
    const res = await fetch('/seed.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('no seed.json');
    return await res.json();
  } catch {
    return embeddedSeed;
  }
}

export function loadState(initial) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initial;
  } catch { return initial; }
}
export function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}
