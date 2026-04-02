// ============================================================
// LoadingScreen — retro boot screen shown on first load
// ============================================================
import React, { useEffect, useState } from "react";
import { profile } from "../data/profile";

const BOOT_LINES = [
  "BIOS v2.4 — Portfolio OS",
  `Loading profile: ${profile.name}...`,
  "Mounting /data/projects.js... OK",
  "Mounting /data/skills.js... OK",
  "Mounting /data/contact.js... OK",
  "Initializing pixel renderer... OK",
  "Spawning interactive room... OK",
  `Welcome, explorer. Portfolio v1.0 ready.`,
];

export default function LoadingScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        i++;
      } else {
        clearInterval(tick);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 500);
        }, 400);
      }
    }, 220);
    return () => clearInterval(tick);
  }, [onDone]);

  return (
    <div className={`loading-screen ${done ? "fade-out" : ""}`}>
      <div className="loading-inner">
        <div className="boot-logo">
          <span className="boot-emoji">🖥️</span>
          <h1 className="boot-title">PORTFOLIO OS</h1>
          <p className="boot-sub">Interactive Edition — {profile.name}</p>
        </div>

        <div className="boot-log">
          {lines.map((line, i) => (
            <div key={i} className="boot-line">
              <span className="boot-prompt">&gt;</span> {line}
            </div>
          ))}
          <span className="cursor-blink">█</span>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-label">{progress}%</div>
      </div>
    </div>
  );
}
