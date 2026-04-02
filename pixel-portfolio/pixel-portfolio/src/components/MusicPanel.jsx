// ============================================================
// MusicPanel — a fun easter egg / vibe check
// ============================================================
import React, { useState } from "react";

const TRACKS = [
  { title: "Lo-Fi Study Beats", artist: "ChilledCow", emoji: "☕", mood: "Focus Mode" },
  { title: "Synthwave Coding", artist: "Outrun", emoji: "🌆", mood: "Night Owl" },
  { title: "Jazz in the Rain", artist: "Unknown", emoji: "🌧️", mood: "Deep Think" },
  { title: "Epic Orchestral", artist: "Hans Zimmer", emoji: "🎻", mood: "ML Training" },
];

export default function MusicPanel() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  return (
    <div className="panel-content">
      <div className="section-label">// MUSIC PLAYER v1.0</div>

      <div className="music-player">
        <div className="music-visualizer">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`bar ${playing ? "active" : ""}`}
              style={{ animationDelay: `${i * 0.07}s`, height: `${20 + Math.random() * 30}px` }}
            />
          ))}
        </div>

        <div className="now-playing">
          <span className="track-emoji">{TRACKS[track].emoji}</span>
          <div>
            <div className="track-title">{TRACKS[track].title}</div>
            <div className="track-artist">{TRACKS[track].artist}</div>
            <div className="track-mood">// {TRACKS[track].mood}</div>
          </div>
        </div>

        <div className="music-controls">
          <button
            className="music-btn"
            onClick={() => setTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length)}
          >
            ◀◀
          </button>
          <button
            className={`music-btn play-btn ${playing ? "pause" : ""}`}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            className="music-btn"
            onClick={() => setTrack((t) => (t + 1) % TRACKS.length)}
          >
            ▶▶
          </button>
        </div>

        <div className="track-list">
          {TRACKS.map((t, i) => (
            <div
              key={i}
              className={`track-item ${track === i ? "active" : ""}`}
              onClick={() => { setTrack(i); setPlaying(true); }}
            >
              <span>{t.emoji}</span>
              <span>{t.title}</span>
              {track === i && playing && <span className="blink-dot ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
