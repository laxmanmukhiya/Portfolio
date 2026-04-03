// ============================================================
// EDIT THIS FILE to update your skills
// Organized by category — add/remove freely
// ============================================================

export const skillCategories = [
  {
    category: "Languages",
    icon: "💻",
    color: "#00ff88",
    skills: ["Python", "HTML", "SQL", "C"],
  },
  {
    category: "AI / ML",
    icon: "🧠",
    color: "#ff6b6b",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Reinforcement Learning",
    ],
  },
  {
    category: "Frameworks",
    icon: "⚙️",
    color: "#ffd93d",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "React"],
  },
  {
    category: "Data Tools",
    icon: "📊",
    color: "#6c63ff",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"],
  },
  {
    category: "Dev & Cloud",
    icon: "☁️",
    color: "#4ecdc4",
    skills: ["FastAPI", "Docker", "Git"],
  },
  {
    category: "Soft Skills",
    icon: "🌟",
    color: "#ff9f43",
    skills: [
      "Research",
      "Problem Solving",
      "Technical Writing",
    ],
  },
];

// Flat list for quick reference (auto-generated from above)
export const skills = skillCategories.flatMap((cat) => cat.skills);
