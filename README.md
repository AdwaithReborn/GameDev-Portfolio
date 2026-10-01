# Adwaith Asokan — Game Development Portfolio

An atmospheric, AAA-grade game development portfolio website designed for **Adwaith Asokan**, featuring interactive showcases for Unity titles, Unreal Engine prototyping, Blender 3D art, and conference delegate highlights.

---

## 🚀 Key Highlights & Features

- **🎮 Unity Game Showcases**:
  - **Hunger Boy**: Fast-paced 2D precision platformer with a dynamic metabolic starvation loop, custom kinematic physics controller, coyote time/buffering, tilemap hazards, and patrol AI.
  - **Meat Train**: 3D first-person survival horror tactical shooter set aboard a speeding train, featuring procedural weapon sway, NavMesh perception AI, resource scavenging, and custom Blender weapon models.
- **⚡ Dedicated Unreal Engine 5 Prototyping Space**:
  - Featured blueprint & C++ project card (*Project: Horizon Vanguard*) highlighting GAS (Gameplay Ability System), Nanite geometry, and Lumen lighting.
  - Modular reserved slot for adding your next upcoming Unreal Engine titles effortlessly.
- **🎨 Interactive Blender 3D Viewport**:
  - Live real-time WebGL 3D inspector powered by Three.js.
  - Allows 360° mouse/touch rotation, zoom, wireframe topology toggle, dynamic lighting modes (Neon / Studio), and asset model switcher (*Combat Turret*, *Energy Power Core*, *Modular Supply Crate*).
  - Dedicated gallery showcasing hard-surface weapon modeling, modular carriage kitbashing, and character sculpting/rigging.
- **🏆 Industry Experience & Events**:
  - Dedicated feature card for **IGDC 2022** (India Game Developer Conference 2022, HICC Hyderabad) with conference badge styling, key engineering insights, and networking takeaways.
- **🔊 Tactical Web Audio SFX**:
  - Procedural 8-bit & sci-fi UI sound effects synthesized in pure Web Audio API (zero external audio files needed; works completely offline with a mute toggle).
- **📱 Fully Responsive & Zero-Dependency**:
  - Pure HTML5 + CSS3 + vanilla JavaScript. No `npm install`, zero build steps, and instant load times.

---

## 📂 Project Architecture

```text
GameDev Portfolio/
├── index.html                  # Main portfolio semantic HTML5 page
├── preview.bat                 # One-click Windows preview server launcher
├── css/
│   └── style.css               # Dark theme, glassmorphic HUD styling & animations
├── js/
│   ├── audio-sfx.js            # Web Audio API sound synthesizer
│   ├── main.js                 # Project filter tabs, deep-dive modal, contact form
│   ├── particles.js            # Dynamic interactive canvas starfield/grid
│   ├── projects-data.js        # Modular data repository for game projects
│   └── three-viewer.js         # Interactive Three.js 3D WebGL viewport
└── assets/
    └── images/
        ├── avatar.svg                  # Stylized developer avatar
        ├── hunger-boy-banner.svg       # Hunger Boy dynamic 2D platformer banner
        ├── meat-train-banner.svg       # Meat Train 3D FPS horror banner
        ├── unreal-engine-banner.svg    # Unreal Engine 5 blueprint showcase banner
        ├── igdc-banner.svg             # IGDC 2022 conference delegate badge banner
        ├── blender-art-1.svg           # Hard-surface weapon wireframe-to-render
        ├── blender-art-2.svg           # Modular environment sci-fi generator
        └── blender-art-3.svg           # Cyber-creature bust sculpt and rig
```

---

## 💻 How to Run Locally

You can preview the site in multiple ways:

### Option 1: Double-Click `preview.bat` (Recommended)
Simply double-click `preview.bat` in the root folder. It will launch a local server at `http://localhost:8000` and automatically open your default browser.

### Option 2: Python Command Line
Open PowerShell or Command Prompt in the folder:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in any web browser.

### Option 3: Direct File Open
Double click `index.html` to open it directly in Edge, Chrome, or Firefox.

---

## 🛠️ How to Customize & Add New Projects

### 1. Adding a New Unreal Engine Project
1. Open `js/projects-data.js` and add an entry for your new project:
   ```javascript
   'my-unreal-game': {
     id: 'my-unreal-game',
     title: 'Game Title',
     genre: 'Genre / Tags',
     engine: 'Unreal Engine 5.4',
     language: 'C++ & Blueprints',
     category: 'unreal',
     banner: 'assets/images/your-banner.png',
     summary: 'Brief overview...',
     overview: 'Detailed gameplay and tech breakdown...',
     features: ['Feature 1', 'Feature 2'],
     techStack: [{ name: 'UE5 Lumen', desc: 'Real-time illumination' }],
     challenges: ['Solved challenge 1']
   }
   ```
2. Open `index.html` and add a matching `<article class="project-card" data-category="unreal">` block under the `#projects` grid.

### 2. Replacing Placeholder Images with Real Gameplay Screenshots
- Place your screenshots or gameplay GIFs inside `assets/images/` (e.g. `hunger-boy-gameplay.png` or `meat-train.gif`).
- In `index.html` and `js/projects-data.js`, update the image `src` or `banner:` property with the filename.

### 3. Adding More Industry Conferences & Events
In `index.html` under `#events`, duplicate the `.event-feature-card` block to add subsequent events such as **IGDC 2023**, **IGDC 2024**, or game jams.

---

## 🌐 Free One-Click Deployment Options

1. **GitHub Pages**:
   - Create a repository named `portfolio` on GitHub.
   - Push these files to the `main` branch.
   - Go to **Settings > Pages > Branch: main** and click **Save**. Your site will be live at `https://<your-username>.github.io/portfolio/`.
2. **Netlify Drop**:
   - Drag and drop the `GameDev Portfolio` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop) for instant hosting in 5 seconds.
3. **Vercel**:
   - Run `vercel` or link your GitHub repository.
