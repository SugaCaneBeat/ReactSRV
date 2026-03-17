/**
 * API call with exponential backoff retry.
 * Used for remote management & AI-assisted features.
 */
export async function callWithRetry(payload, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch('/api/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) return data;
    if (data.error?.type === 'api_error' && i < maxRetries - 1) {
      await new Promise(r => setTimeout(r, 1000 * 2 ** i));
      continue;
    }
    throw new Error(data.error?.message || `Request failed (${res.status})`);
  }
}

/**
 * Generic fetch wrapper for the dashboard internal API.
 */
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(endpoint, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}
