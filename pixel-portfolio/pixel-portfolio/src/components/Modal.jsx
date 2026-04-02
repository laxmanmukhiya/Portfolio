// ============================================================
// Modal — wraps panel components with retro window chrome
// ============================================================
import React from "react";

const PANEL_TITLES = {
  about: "📁 about_me.exe",
  projects: "💻 projects.dir",
  skills: "⚙️ skills.sys",
  contact: "📡 contact.net",
  education: "📚 education.log",
  music: "🎵 player.exe",
};

export default function Modal({ panelId, children, onClose }) {
  const title = PANEL_TITLES[panelId] || panelId;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro title bar */}
        <div className="modal-titlebar">
          <div className="titlebar-dots">
            <span className="dot red" onClick={onClose} title="Close" />
            <span className="dot yellow" title="Minimize" />
            <span className="dot green" title="Maximize" />
          </div>
          <span className="titlebar-title">{title}</span>
          <span className="titlebar-version">v1.0</span>
        </div>

        {/* Scanline overlay for pixel effect */}
        <div className="scanlines" aria-hidden="true" />

        {/* Panel content */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
