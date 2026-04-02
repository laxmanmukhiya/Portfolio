// ============================================================
// utils/helpers.js — general purpose helpers
// ============================================================

/** Adds pixel-style flicker class for glow effects */
export function getGlowStyle(color, intensity = 1) {
  return {
    boxShadow: `0 0 ${8 * intensity}px ${color}, 0 0 ${16 * intensity}px ${color}40`,
  };
}

/** Truncate text to a given length */
export function truncate(str, len = 100) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}

/** Random element from array */
export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Status badge color mapping */
export const statusColors = {
  Completed: "#00ff88",
  Live: "#4ecdc4",
  "In Progress": "#ffd93d",
  Archived: "#888",
};

/** Delay helper */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
