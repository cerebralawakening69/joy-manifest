export const getParam = (k: string, def = "") =>
  new URLSearchParams(window.location.search).get(k) || def;
