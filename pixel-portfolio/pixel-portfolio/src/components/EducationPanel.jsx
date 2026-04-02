// ============================================================
// EducationPanel — reads education from /data/profile.js
// ============================================================
import React from "react";
import { education } from "../data/profile";

export default function EducationPanel() {
  return (
    <div className="panel-content">
      <div className="section-label">// EDUCATION</div>
      <div className="education-timeline">
        {education.map((item, i) => (
          <div key={i} className="edu-item">
            <div className="edu-icon-col">
              <span className="edu-icon">{item.icon}</span>
              {i < education.length - 1 && <div className="edu-line" />}
            </div>
            <div className="edu-content">
              <h3 className="edu-degree">{item.degree}</h3>
              <p className="edu-inst">{item.institution}</p>
              <div className="edu-meta">
                <span className="edu-year">📅 {item.year}</span>
                <span className="edu-grade">⭐ {item.grade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
