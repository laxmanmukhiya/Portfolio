// ============================================================
// ProjectsPanel — reads from /data/projects.js
// ============================================================
import React, { useState } from "react";
import { projects } from "../data/projects";
import { statusColors, truncate } from "../utils/helpers";

export default function ProjectsPanel() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const proj = projects[selected];
    return (
      <div className="panel-content">
        <button className="back-btn" onClick={() => setSelected(null)}>
          ← Back
        </button>
        <div className="project-detail">
          <div className="project-detail-header">
            <span className="project-emoji">{proj.emoji}</span>
            <div>
              <h2>{proj.title}</h2>
              <span
                className="status-badge"
                style={{ color: statusColors[proj.status] }}
              >
                ● {proj.status}
              </span>
            </div>
          </div>
          <p className="project-desc-full">{proj.description}</p>
          <div className="section-label">// TECH STACK</div>
          <div className="tech-tags">
            {proj.tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
          <div className="project-links">
            {proj.github && (
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn"
              >
                🐙 GitHub
              </a>
            )}
            {proj.live && (
              <a
                href={proj.live}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn pixel-btn-alt"
              >
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-content">
      <div className="section-label">// PROJECTS [{projects.length}]</div>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div
            key={proj.id}
            className={`project-card ${proj.highlight ? "highlighted" : ""}`}
            onClick={() => setSelected(i)}
          >
            {proj.highlight && (
              <span className="highlight-badge">⭐ FEATURED</span>
            )}
            <div className="project-card-top">
              <span className="project-emoji">{proj.emoji}</span>
              <span
                className="status-badge"
                style={{ color: statusColors[proj.status] }}
              >
                ● {proj.status}
              </span>
            </div>
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{truncate(proj.description, 90)}</p>
            <div className="tech-tags mini">
              {proj.tech.slice(0, 3).map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
              {proj.tech.length > 3 && (
                <span className="tech-tag">+{proj.tech.length - 3}</span>
              )}
            </div>
            <span className="card-cta">Click to expand →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
