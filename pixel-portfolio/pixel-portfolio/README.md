# 🖥️ Portfolio OS — Interactive Pixel-Art Portfolio

A 2D pixel-art game-style portfolio built with React. Click on room objects to explore sections.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## 📁 Project Structure

```
pixel-portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← Entry point
    ├── App.jsx               ← Root component + panel registry
    ├── index.css             ← All styles (pixel-art theme)
    │
    ├── data/                 ← ✅ EDIT THESE FILES ONLY
    │   ├── profile.js        ← Your name, bio, education
    │   ├── projects.js       ← Your projects list
    │   ├── skills.js         ← Skills by category
    │   ├── contact.js        ← Email, social links
    │   └── room.js           ← Room objects config + achievements
    │
    ├── components/           ← UI panels & shared components
    │   ├── Modal.jsx         ← Retro window chrome wrapper
    │   ├── AboutPanel.jsx    ← About Me section
    │   ├── ProjectsPanel.jsx ← Projects list + detail view
    │   ├── SkillsPanel.jsx   ← Skills by category
    │   ├── ContactPanel.jsx  ← Contact & social links
    │   ├── EducationPanel.jsx← Education timeline
    │   ├── MusicPanel.jsx    ← Easter egg music player
    │   ├── LoadingScreen.jsx ← Boot sequence animation
    │   ├── AchievementToast.jsx ← Achievement popup
    │   └── AchievementsHUD.jsx  ← Achievement tracker HUD
    │
    ├── scenes/
    │   └── GameRoom.jsx      ← The interactive 2D room scene
    │
    ├── hooks/
    │   ├── usePanel.js       ← Panel open/close state
    │   └── useAchievements.js← Achievement tracking
    │
    └── utils/
        └── helpers.js        ← Utility functions
```

---

## ✏️ How to Customize Content

> **You only need to edit files inside `/src/data/`**

### Change your name/bio → `src/data/profile.js`
```js
export const profile = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  // ...
};
```

### Add a project → `src/data/projects.js`
```js
export const projects = [
  {
    id: 6,                          // Unique ID
    title: "My New Project",
    description: "What it does...",
    tech: ["Python", "React"],
    github: "https://github.com/...",
    live: "",
    status: "In Progress",          // Completed | Live | In Progress | Archived
    emoji: "🤖",
    highlight: false,               // true = Featured badge
  },
  // ...existing projects
];
```

### Add a skill → `src/data/skills.js`
```js
export const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "Your New Skill"],
    // ...
  },
];
```

### Update contact → `src/data/contact.js`
```js
export const contact = {
  email: "you@email.com",
  linkedin: "https://linkedin.com/in/you",
  github: "https://github.com/you",
  // ...
};
```

---

## ➕ Adding a New Panel/Section

1. Create `src/components/MyNewPanel.jsx`
2. Register it in `src/App.jsx`:
```js
const PANELS = {
  // ...existing panels
  mynewpanel: { component: MyNewPanel, title: "My Section" },
};
```
3. Add a room object in `src/data/room.js` or wire it to an existing one.

---

## 🔮 Future-Ready: Adding Features

### AI Chatbot (inside computer screen)
- Create `src/components/ChatbotPanel.jsx`
- Connect to OpenAI/Gemini/your own FastAPI backend
- Register as panel `chatbot` in `App.jsx`

### Backend (FastAPI or Node.js)
- Add API calls inside panel components
- Use `fetch()` or `axios` to call your endpoints
- Swap hardcoded data for API responses gradually

### Database (Firebase/MongoDB)
- Replace `/data/*.js` imports with async data fetchers
- Add a `src/services/` folder for API layer

### Analytics Dashboard
- Create `src/components/AnalyticsPanel.jsx`
- Add chart library (Recharts, Chart.js)
- Connect to backend analytics endpoint

---

## 🎮 Controls

| Action | Control |
|---|---|
| Interact with object | Click |
| Close panel | ESC key or × button |
| Achievements | Bottom-left 🏆 button |

---

## 🏆 Achievements

| Achievement | Condition |
|---|---|
| 🗺️ Explorer | Visit all 6 interactive objects |
| 🔬 Researcher | Open the Projects panel |
| 🤝 Connector | Open the Contact panel |
| 🎓 Scholar | Open the Education panel |

---

## 🛠️ Tech Stack

- **React 18** — Functional components + hooks
- **Vite** — Fast build tool
- **Pure CSS** — Custom pixel-art design system with CSS variables
- **Press Start 2P** — Pixel font (Google Fonts)
- **Share Tech Mono** — Monospace body font
- **VT323** — Retro terminal font

---

## 📦 Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, GitHub Pages
```

---

Built with ☕ and 🎮 energy.
