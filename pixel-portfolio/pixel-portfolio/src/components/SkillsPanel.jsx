// ============================================================
// SkillsPanel — reads from /data/skills.js
// ============================================================
import React, { useState } from "react";
import { skillCategories } from "../data/skills";

export default function SkillsPanel() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="panel-content">
      <div className="section-label">// SKILLS & TECH STACK</div>

      <div className="skills-categories">
        {skillCategories.map((cat) => (
          <div
            key={cat.category}
            className={`skill-category ${activeCategory === cat.category ? "active" : ""}`}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.category ? null : cat.category
              )
            }
            style={
              activeCategory === cat.category
                ? { borderColor: cat.color, boxShadow: `0 0 12px ${cat.color}60` }
                : {}
            }
          >
            <div className="skill-cat-header">
              <span className="skill-cat-icon">{cat.icon}</span>
              <span className="skill-cat-name" style={{ color: cat.color }}>
                {cat.category}
              </span>
              <span className="skill-cat-count">[{cat.skills.length}]</span>
            </div>

            <div
              className={`skill-list ${activeCategory === cat.category ? "expanded" : ""}`}
            >
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill"
                  style={{ borderColor: cat.color + "80", color: cat.color }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-hint">
        <span className="blink-dot" />
        Click a category to expand skills
      </div>
    </div>
  );
}
