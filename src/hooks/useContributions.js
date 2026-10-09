import { useEffect, useState } from 'react';
import { parseContributions } from '../data/contributions.js';

const CACHE_KEY = 'github-contributions-mscode07-v1';
const HOUR = 60 * 60 * 1000;
const ENDPOINT = 'https://github-contributions-api.jogruber.de/v4/mscode07?y=last';

export function useContributions() {
  const [state, setState] = useState({ days: [], fetchedAt: null, status: 'loading' });
  useEffect(() => {
    let active = true;
    let controller;
    let saved;
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cached && Number.isFinite(cached.fetchedAt)) {
        saved = { days: parseContributions({ contributions: cached.days }), fetchedAt: cached.fetchedAt };
        setState({ ...saved, status: 'cached' });
      }
    } catch { /* Storage is optional; an invalid cache is discarded. */ }
    async function refresh() {
      if (saved && Date.now() - saved.fetchedAt < HOUR) return;
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(ENDPOINT, { signal: controller.signal });
        if (!response.ok) throw new Error('Feed unavailable');
        saved = { days: parseContributions(await response.json()), fetchedAt: Date.now() };
        if (!active || controller.signal.aborted) return;
        setState({ ...saved, status: 'ready' });
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(saved)); } catch { /* Private browsing can disable storage. */ }
      } catch {
        if (!active) return;
        setState(previous => ({ ...previous, status: previous.days.length ? 'stale' : 'error' }));
      } finally { clearTimeout(timeout); }
    }
    refresh();
    const timer = setInterval(refresh, HOUR);
    return () => { active = false; controller?.abort(); clearInterval(timer); };
  }, []);
  return state;
}
