// ============================================================
// usePanel — manages which panel is open
// ============================================================
import { useState, useCallback } from "react";

export function usePanel() {
  const [activePanel, setActivePanel] = useState(null);
  const [panelHistory, setPanelHistory] = useState([]);

  const openPanel = useCallback((panelId) => {
    if (!panelId) return;
    setPanelHistory((prev) => [...prev, panelId]);
    setActivePanel(panelId);
  }, []);

  const closePanel = useCallback(() => {
    setActivePanel(null);
  }, []);

  const goBack = useCallback(() => {
    const newHistory = panelHistory.slice(0, -1);
    setPanelHistory(newHistory);
    setActivePanel(newHistory[newHistory.length - 1] || null);
  }, [panelHistory]);

  return { activePanel, openPanel, closePanel, goBack, panelHistory };
}
