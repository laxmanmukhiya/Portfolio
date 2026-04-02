// ============================================================
// AchievementsHUD — bottom corner tracker
// ============================================================
import React, { useState } from "react";
import { achievements } from "../data/room";

export default function AchievementsHUD({ unlocked }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="achievements-hud">
      <button className="ach-toggle" onClick={() => setOpen((o) => !o)}>
        🏆 {unlocked.length}/{achievements.length}
      </button>
      {open && (
        <div className="ach-list">
          <div className="ach-list-title">ACHIEVEMENTS</div>
          {achievements.map((ach) => {
            const got = unlocked.find((u) => u.id === ach.id);
            return (
              <div key={ach.id} className={`ach-row ${got ? "got" : "locked"}`}>
                <span>{got ? ach.icon : "🔒"}</span>
                <div>
                  <div className="ach-row-label">{ach.label}</div>
                  <div className="ach-row-desc">{ach.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
