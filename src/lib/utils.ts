export function formatTime(isoString: string): string {
  // Safe for SSR — does not call new Date() at module level
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export function formatTimeClient(isoString: string): string {
  // Call only from useEffect or event handlers (needs browser)
  const date = new Date(isoString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff < 0) return 'Started';
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 24) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' ' +
      date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
  if (hours > 0) return `Today ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
  if (mins > 0) return `In ${mins}m`;
  return 'Starting soon';
}

export function formatCurrency(amount: number, currency = '৳'): string {
  return `${currency}${amount.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function calcAccaOdds(odds: number[]): number {
  return odds.reduce((a, b) => a * b, 1);
}

export function getOddsChange(current: number, previous?: number): 'up' | 'down' | 'same' {
  if (!previous) return 'same';
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'same';
}
