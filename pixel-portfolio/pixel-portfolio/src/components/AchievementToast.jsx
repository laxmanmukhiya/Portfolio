// ============================================================
// AchievementToast — shows popup when achievement is unlocked
// ============================================================
import React from "react";

export default function AchievementToast({ achievement }) {
  if (!achievement) return null;
  return (
    <div className="achievement-toast">
      <span className="ach-icon">{achievement.icon}</span>
      <div className="ach-info">
        <div className="ach-unlocked">ACHIEVEMENT UNLOCKED</div>
        <div className="ach-label">{achievement.label}</div>
        <div className="ach-desc">{achievement.desc}</div>
      </div>
    </div>
  );
}
