// ============================================================
// EDIT THIS FILE to configure interactive room objects
// Each object links to a panel/modal
// ============================================================

export const roomObjects = [
  {
    id: "computer",
    label: "Computer",
    emoji: "🖥️",
    tooltip: "Click to view About Me",
    panel: "about",
    position: { gridCol: "2 / 4", gridRow: "3 / 5" },
    glowColor: "#00ff88",
    description: "Personal computer with portfolio info",
    pixelSize: "large",
  },
  {
    id: "bookshelf",
    label: "Bookshelf",
    emoji: "📚",
    tooltip: "Click to view Education",
    panel: "education",
    position: { gridCol: "6 / 8", gridRow: "1 / 4" },
    glowColor: "#ffd93d",
    description: "Bookshelf with academic records",
    pixelSize: "large",
  },
  {
    id: "laptop",
    label: "Laptop",
    emoji: "💻",
    tooltip: "Click to view Projects",
    panel: "projects",
    position: { gridCol: "4 / 6", gridRow: "3 / 5" },
    glowColor: "#6c63ff",
    description: "Laptop displaying project demos",
    pixelSize: "medium",
  },
  {
    id: "poster",
    label: "Skills Poster",
    emoji: "📋",
    tooltip: "Click to view Skills",
    panel: "skills",
    position: { gridCol: "1 / 3", gridRow: "1 / 3" },
    glowColor: "#ff6b6b",
    description: "Wall poster with tech stack",
    pixelSize: "medium",
  },
  {
    id: "phone",
    label: "Phone",
    emoji: "📱",
    tooltip: "Click to Contact Me",
    panel: "contact",
    position: { gridCol: "6 / 8", gridRow: "4 / 6" },
    glowColor: "#4ecdc4",
    description: "Phone for getting in touch",
    pixelSize: "small",
  },
  {
    id: "plant",
    label: "Plant",
    emoji: "🌿",
    tooltip: "Just a plant. A happy one.",
    panel: null,
    position: { gridCol: "8 / 9", gridRow: "4 / 6" },
    glowColor: "#00ff88",
    description: "Decorative plant",
    pixelSize: "small",
  },
  {
    id: "music",
    label: "Music Player",
    emoji: "🎵",
    tooltip: "Click for a vibe check",
    panel: "music",
    position: { gridCol: "8 / 9", gridRow: "1 / 3" },
    glowColor: "#ff9f43",
    description: "Retro music player",
    pixelSize: "small",
  },
];

// Achievements — optional gamification layer
export const achievements = [
  { id: "explorer", label: "Explorer", desc: "Visited every room object", icon: "🗺️", threshold: 6 },
  { id: "researcher", label: "Researcher", desc: "Checked out all projects", icon: "🔬", threshold: 1 },
  { id: "connector", label: "Connector", desc: "Visited the contact panel", icon: "🤝", threshold: 1 },
  { id: "scholar", label: "Scholar", desc: "Read education history", icon: "🎓", threshold: 1 },
];
