export const saveLocalStorage = (key: string, payload: string) => {
  localStorage.setItem(key, payload);
};

export const getLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
