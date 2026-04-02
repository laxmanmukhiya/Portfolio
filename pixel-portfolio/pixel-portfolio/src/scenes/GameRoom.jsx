// ============================================================
// GameRoom — the main 2D pixel-art interactive room scene
// All objects are data-driven from /data/room.js
// ============================================================
import React, { useState } from "react";
import { roomObjects } from "../data/room";
import { profile } from "../data/profile";

export default function GameRoom({ onObjectClick, visitedPanels }) {
  const [hoveredObj, setHoveredObj] = useState(null);

  const handleClick = (obj) => {
    if (obj.panel) onObjectClick(obj.panel);
  };

  return (
    <div className="game-room">
      {/* ── Ceiling / top trim ── */}
      <div className="room-ceiling">
        <div className="ceiling-lights">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="ceiling-light">
              <div className="light-bulb" />
              <div className="light-beam" />
            </div>
          ))}
        </div>
        <div className="room-header-text">
          <span className="room-name-tag">// {profile.name}'s Room</span>
          <span className="room-hint">Click objects to explore ✦</span>
        </div>
      </div>

      {/* ── Back wall ── */}
      <div className="room-walls">
        {/* Left wall with poster */}
        <div className="wall-left">
          <div
            className={`wall-object poster-obj ${visitedPanels.has("skills") ? "visited" : ""}`}
            onClick={() => handleClick({ panel: "skills" })}
            onMouseEnter={() => setHoveredObj("poster")}
            onMouseLeave={() => setHoveredObj(null)}
          >
            <div className="poster-frame">
              <div className="poster-inner">
                <div className="poster-title">TECH SKILLS</div>
                <div className="poster-grid">
                  {["🐍", "🧠", "⚙️", "📊", "☁️"].map((e, i) => (
                    <span key={i} className="poster-icon">{e}</span>
                  ))}
                </div>
                <div className="poster-subtitle">v1.0</div>
              </div>
            </div>
            {hoveredObj === "poster" && <Tooltip text="Click to view Skills" />}
          </div>

          {/* Shelf on left wall */}
          <div className="wall-shelf">
            <div className="shelf-item trophy">🏆</div>
            <div className="shelf-item mug">☕</div>
            <div className="shelf-item globe">🌍</div>
          </div>
        </div>

        {/* Back wall center */}
        <div className="wall-back">
          {/* Window with animated sky */}
          <div className="window-frame">
            <div className="window-inner">
              <div className="sky-bg">
                <div className="cloud cloud-1">☁️</div>
                <div className="cloud cloud-2">☁️</div>
                <div className="cloud cloud-3">⛅</div>
                <div className="stars-row">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="star-dot" style={{ animationDelay: `${i * 0.3}s` }}>✦</span>
                  ))}
                </div>
                <div className="window-city">🏙️</div>
              </div>
            </div>
            <div className="window-sill" />
          </div>

          {/* Bookshelf */}
          <div
            className={`wall-object bookshelf-obj ${visitedPanels.has("education") ? "visited" : ""}`}
            onClick={() => handleClick({ panel: "education" })}
            onMouseEnter={() => setHoveredObj("bookshelf")}
            onMouseLeave={() => setHoveredObj(null)}
          >
            <div className="bookshelf">
              <div className="shelf-row top-shelf">
                {["📘", "📗", "📙", "📕", "📒"].map((b, i) => (
                  <span key={i} className="book" style={{ animationDelay: `${i * 0.1}s` }}>{b}</span>
                ))}
              </div>
              <div className="shelf-plank" />
              <div className="shelf-row bot-shelf">
                {["📓", "📔", "📃", "🗂️"].map((b, i) => (
                  <span key={i} className="book" style={{ animationDelay: `${i * 0.15}s` }}>{b}</span>
                ))}
                <span className="bookend">🧱</span>
              </div>
              <div className="shelf-plank" />
            </div>
            {hoveredObj === "bookshelf" && <Tooltip text="Click to view Education" />}
          </div>
        </div>

        {/* Right wall */}
        <div className="wall-right">
          {/* Music player */}
          <div
            className={`wall-object music-obj ${visitedPanels.has("music") ? "visited" : ""}`}
            onClick={() => handleClick({ panel: "music" })}
            onMouseEnter={() => setHoveredObj("music")}
            onMouseLeave={() => setHoveredObj(null)}
          >
            <div className="music-box">
              <div className="music-box-screen">♫</div>
              <div className="music-box-controls">
                <span>◀</span><span>▶</span><span>▶▶</span>
              </div>
            </div>
            {hoveredObj === "music" && <Tooltip text="Music Player 🎵" />}
          </div>

          {/* Plant */}
          <div
            className="wall-object plant-obj"
            onMouseEnter={() => setHoveredObj("plant")}
            onMouseLeave={() => setHoveredObj(null)}
          >
            <div className="plant">
              <div className="plant-leaves">🌿</div>
              <div className="plant-pot">🪴</div>
            </div>
            {hoveredObj === "plant" && <Tooltip text="Just a happy plant 🌿" />}
          </div>
        </div>
      </div>

      {/* ── Floor area / desk zone ── */}
      <div className="room-floor">
        {/* Floor rug */}
        <div className="floor-rug" />

        {/* Desk */}
        <div className="desk-area">
          <div className="desk-surface">
            {/* Main Computer Monitor */}
            <div
              className={`desk-object computer-obj ${visitedPanels.has("about") ? "visited" : ""}`}
              onClick={() => handleClick({ panel: "about" })}
              onMouseEnter={() => setHoveredObj("computer")}
              onMouseLeave={() => setHoveredObj(null)}
            >
              <div className="monitor">
                <div className="monitor-screen">
                  <div className="screen-content">
                    <div className="screen-header">
                      <span className="screen-dot r" /><span className="screen-dot y" /><span className="screen-dot g" />
                    </div>
                    <div className="screen-text">
                      <div className="typed-line">&gt; {profile.name}_</div>
                      <div className="typed-line dim">&gt; {profile.role}</div>
                      <div className="typed-line accent">&gt; CLICK ME</div>
                    </div>
                  </div>
                </div>
                <div className="monitor-neck" />
                <div className="monitor-base" />
              </div>
              {hoveredObj === "computer" && <Tooltip text="Click to view About Me" />}
            </div>

            {/* Keyboard */}
            <div className="keyboard">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="key" />
              ))}
            </div>

            {/* Laptop */}
            <div
              className={`desk-object laptop-obj ${visitedPanels.has("projects") ? "visited" : ""}`}
              onClick={() => handleClick({ panel: "projects" })}
              onMouseEnter={() => setHoveredObj("laptop")}
              onMouseLeave={() => setHoveredObj(null)}
            >
              <div className="laptop">
                <div className="laptop-screen">
                  <div className="laptop-screen-content">
                    <span>💻</span>
                    <span className="laptop-label">Projects</span>
                  </div>
                </div>
                <div className="laptop-body" />
              </div>
              {hoveredObj === "laptop" && <Tooltip text="Click to view Projects" />}
            </div>

            {/* Phone */}
            <div
              className={`desk-object phone-obj ${visitedPanels.has("contact") ? "visited" : ""}`}
              onClick={() => handleClick({ panel: "contact" })}
              onMouseEnter={() => setHoveredObj("phone")}
              onMouseLeave={() => setHoveredObj(null)}
            >
              <div className="phone">
                <div className="phone-screen">📱</div>
              </div>
              {hoveredObj === "phone" && <Tooltip text="Click to Contact Me" />}
            </div>

            {/* Coffee mug */}
            <div className="desk-decoration coffee">
              <span>☕</span>
              <div className="steam">〰</div>
            </div>
          </div>
          <div className="desk-body" />
        </div>

        {/* Chair */}
        <div className="chair-area">
          <div className="chair">
            <div className="chair-back" />
            <div className="chair-seat" />
            <div className="chair-legs">
              <span /><span /><span /><span />
            </div>
          </div>
        </div>
      </div>

      {/* ── Pixel floor line ── */}
      <div className="floor-line" />

      {/* ── Navigation hint bar ── */}
      <div className="room-hint-bar">
        <span>🖱️ Click objects to interact</span>
        <span className="hint-divider">|</span>
        <span>⌨️ ESC to close panels</span>
      </div>
    </div>
  );
}

// Small reusable tooltip
function Tooltip({ text }) {
  return (
    <div className="obj-tooltip">
      <span>💬 {text}</span>
    </div>
  );
}
