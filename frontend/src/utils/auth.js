const API_URL = import.meta.env.VITE_API_URL || "";

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  return fetch(url, options);
};

const AUTH_STORAGE_KEY = "auth";

export const saveAuth = (token, user) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user,
    })
  );
};

export const getAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  const auth = getAuth();
  return Boolean(auth?.token && auth?.user);
};
