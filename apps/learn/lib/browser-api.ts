'use client';

import { createApiClient } from '@chalista/api-client';

const TOKEN_KEY = 'chalista_token';
const USER_KEY = 'chalista_user';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): { id: string; name: string; email: string; role: string } | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeSession(token: string, user: unknown) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function browserApi() {
  return createApiClient({
    baseUrl:
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
      'http://127.0.0.1:8787',
    getToken,
  });
}

export function zoomClientUrl() {
  return (
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZOOM_CLIENT_URL) ||
    'http://localhost:5173'
  );
}
