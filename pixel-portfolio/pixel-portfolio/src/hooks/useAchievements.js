// ============================================================
// useAchievements — tracks user interactions
// ============================================================
import { useState, useCallback } from "react";
import { achievements } from "../data/room";

export function useAchievements() {
  const [visited, setVisited] = useState(new Set());
  const [unlocked, setUnlocked] = useState([]);
  const [toast, setToast] = useState(null);

  const recordVisit = useCallback(
    (panelId) => {
      setVisited((prev) => {
        const next = new Set(prev).add(panelId);

        // Check explorer achievement
        const explorerAch = achievements.find((a) => a.id === "explorer");
        if (explorerAch && next.size >= explorerAch.threshold) {
          setUnlocked((u) => {
            if (!u.find((x) => x.id === "explorer")) {
              const ach = explorerAch;
              setToast(ach);
              setTimeout(() => setToast(null), 3500);
              return [...u, ach];
            }
            return u;
          });
        }

        // Check panel-specific achievements
        achievements
          .filter((a) => a.id !== "explorer")
          .forEach((ach) => {
            if (
              (ach.id === "researcher" && panelId === "projects") ||
              (ach.id === "connector" && panelId === "contact") ||
              (ach.id === "scholar" && panelId === "education")
            ) {
              setUnlocked((u) => {
                if (!u.find((x) => x.id === ach.id)) {
                  setToast(ach);
                  setTimeout(() => setToast(null), 3500);
                  return [...u, ach];
                }
                return u;
              });
            }
          });

        return next;
      });
    },
    []
  );

  return { visited, unlocked, toast, recordVisit };
}
