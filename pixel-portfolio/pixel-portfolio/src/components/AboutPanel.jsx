// ============================================================
// AboutPanel — displays profile info from /data/profile.js
// ============================================================
import React from "react";
import { profile } from "../data/profile";

export default function AboutPanel() {
  return (
    <div className="panel-content">
      <div className="about-header">
        <div className="avatar-box">
          <span className="avatar-emoji">{profile.avatar}</span>
          <div className="status-dot" title={profile.status} />
        </div>
        <div className="about-intro">
          <h2 className="pixel-name">{profile.name}</h2>
          <p className="pixel-role">{profile.role}</p>
          <p className="pixel-location">📍 {profile.location}</p>
        </div>
      </div>

      <div className="about-tagline">
        <span className="quote-mark">"</span>
        {profile.tagline}
        <span className="quote-mark">"</span>
      </div>

      <div className="about-bio">
        <div className="section-label">// BIO</div>
        <p>{profile.bio}</p>
      </div>

      <div className="about-meta">
        <div className="meta-item">
          <span className="meta-icon">🏫</span>
          <span>{profile.university}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📖</span>
          <span>{profile.degree}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{profile.year}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⭐</span>
          <span>GPA: {profile.gpa}</span>
        </div>
      </div>

      <div className="fun-fact-box">
        <span className="fun-fact-label">🎲 FUN FACT</span>
        <p>{profile.funFact}</p>
      </div>

      <div className="status-banner">
        <span className="blink-dot" />
        {profile.status}
      </div>
    </div>
  );
}
