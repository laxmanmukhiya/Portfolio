// ============================================================
// EDIT THIS FILE to update your skills
// Organized by category — add/remove freely
// ============================================================

export const skillCategories = [
  {
    category: "Languages",
    icon: "💻",
    color: "#00ff88",
    skills: ["Python", "JavaScript", "SQL", "R", "C++"],
  },
  {
    category: "AI / ML",
    icon: "🧠",
    color: "#ff6b6b",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
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
    skills: ["FastAPI", "Docker", "Git", "AWS", "MongoDB"],
  },
  {
    category: "Soft Skills",
    icon: "🌟",
    color: "#ff9f43",
    skills: [
      "Research",
      "Problem Solving",
      "Technical Writing",
      "Team Collaboration",
    ],
  },
];

// Flat list for quick reference (auto-generated from above)
export const skills = skillCategories.flatMap((cat) => cat.skills);
