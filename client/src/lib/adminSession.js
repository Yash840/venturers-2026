const TOKEN_KEY = 'venturers_admin_token';

function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setAdminToken(token) {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAdminSession() {
  const token = getAdminToken();
  const payload = token ? decodeJwtPayload(token) : null;
  const permissions = Array.isArray(payload?.permissions) ? payload.permissions : [];

  return {
    token,
    payload,
    isAuthenticated: Boolean(token),
    role: payload?.role || null,
    permissions,
    email: payload?.email || null
  };
}

export function hasPermission(session, permission) {
  return Array.isArray(session?.permissions) && session.permissions.includes(permission);
}
