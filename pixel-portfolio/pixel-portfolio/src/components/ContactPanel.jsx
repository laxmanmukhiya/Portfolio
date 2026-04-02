// ============================================================
// ContactPanel — reads from /data/contact.js
// ============================================================
import React, { useState } from "react";
import { contact, socialLinks } from "../data/contact";

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel-content">
      <div className="section-label">// CONTACT ME</div>

      <div className="contact-intro">
        <p>
          I'm currently open to new opportunities, collaborations, and
          interesting conversations. Reach out — I respond fast!
        </p>
      </div>

      <div className="social-links">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="social-card"
            style={{ "--accent": link.color }}
          >
            <span className="social-icon">{link.icon}</span>
            <div className="social-info">
              <span className="social-label">{link.label}</span>
              <span className="social-handle">{link.handle}</span>
            </div>
            <span className="social-arrow">→</span>
          </a>
        ))}
      </div>

      <div className="email-copy-box" onClick={copyEmail}>
        <span className="email-text">{contact.email}</span>
        <span className="copy-btn">{copied ? "✅ Copied!" : "📋 Copy"}</span>
      </div>

      {contact.resume && (
        <a
          href={contact.resume}
          target="_blank"
          rel="noreferrer"
          className="pixel-btn resume-btn"
        >
          📄 Download Resume
        </a>
      )}

      <div className="available-for">
        <div className="section-label">// OPEN FOR</div>
        <div className="avail-tags">
          {contact.availableFor.map((item) => (
            <span key={item} className="avail-tag">
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
