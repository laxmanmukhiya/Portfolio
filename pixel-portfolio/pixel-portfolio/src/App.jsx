// ============================================================
// App.jsx — Root component, orchestrates the whole portfolio
// To customize content: edit files in /src/data/ only
// ============================================================
import React, { useState, useEffect, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import GameRoom from "./scenes/GameRoom";
import Modal from "./components/Modal";
import AboutPanel from "./components/AboutPanel";
import ProjectsPanel from "./components/ProjectsPanel";
import SkillsPanel from "./components/SkillsPanel";
import ContactPanel from "./components/ContactPanel";
import EducationPanel from "./components/EducationPanel";
import MusicPanel from "./components/MusicPanel";
import AchievementToast from "./components/AchievementToast";
import AchievementsHUD from "./components/AchievementsHUD";
import { usePanel } from "./hooks/usePanel";
import { useAchievements } from "./hooks/useAchievements";

// Panel registry — add new panels here as you create them
// This is the ONLY place you need to register a new panel
const PANELS = {
  about: { component: AboutPanel, title: "About Me" },
  projects: { component: ProjectsPanel, title: "Projects" },
  skills: { component: SkillsPanel, title: "Skills" },
  contact: { component: ContactPanel, title: "Contact" },
  education: { component: EducationPanel, title: "Education" },
  music: { component: MusicPanel, title: "Music Player" },
  // Future panels — just add here + create the component:
  // chatbot: { component: ChatbotPanel, title: "AI Assistant" },
  // analytics: { component: AnalyticsPanel, title: "Analytics" },
};

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { activePanel, openPanel, closePanel } = usePanel();
  const { visited, unlocked, toast, recordVisit } = useAchievements();

  // Handle opening a panel and recording the visit
  const handleOpenPanel = useCallback(
    (panelId) => {
      openPanel(panelId);
      recordVisit(panelId);
    },
    [openPanel, recordVisit]
  );

  // ESC key to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePanel]);

  // Determine which panel component to render
  const ActivePanelConfig = activePanel ? PANELS[activePanel] : null;
  const ActivePanelComponent = ActivePanelConfig?.component || null;

  return (
    <div className="app-root">
      {/* Loading screen — shown once on boot */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Main game world */}
      {loaded && (
        <>
          <GameRoom onObjectClick={handleOpenPanel} visitedPanels={visited} />

          {/* Modal panel overlay */}
          {activePanel && ActivePanelComponent && (
            <Modal panelId={activePanel} onClose={closePanel}>
              <ActivePanelComponent />
            </Modal>
          )}

          {/* Achievement unlock toast */}
          <AchievementToast achievement={toast} />

          {/* Achievements HUD — bottom left */}
          <AchievementsHUD unlocked={unlocked} />
        </>
      )}
    </div>
  );
}
