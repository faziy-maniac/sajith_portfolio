# Mohammed Sajith G — Matchday Portfolio Website

An energetic, modern personal portfolio website built for **Mohammed Sajith G**, a professional footballer who is also learning to code. The design is inspired by a **matchday programme crossed with a stadium scoreboard**, capturing the high-tempo discipline, teamwork, and analytical focus of an elite athlete transitioning seamlessly into technology.

---

## 🎨 Theme & Palette
- **Deep Pitch Green**: `#0B3D2E`
- **Turf Lime Accent**: `#B6F23C`
- **Floodlight White**: `#FFFFFF` / `#F8FAFC`
- **Pitch Night / Near-Black**: `#06130D` / `#040D09`
- **Typography**: 
  - Headings & Scoreboards: `Bebas Neue` (condensed stadium display)
  - Body & UI: `Inter` (clean, highly readable sans)

---

## 🚀 Sections (Strict Order)
1. **Hero**: Giant condensed name, tagline, profile photo in an angled stadium-style frame, translucent `#19` jersey watermark, rolling matchball animation, and two quick-action CTAs ("Contact me" and "My journey").
2. **Player Card**: EA FC / FIFA Ultimate Team-styled trading card featuring Mohammed Sajith G, with position badge, jersey `#19`, club badge, 3D interactive tilt, and 6 customizable attribute bars (`PAC`, `PAS`, `STA`, `TEA`, `VIS`, `DRI`).
3. **About**: Confident athlete-coder personal narrative, animated scoreboard counter stats (*Matches Played*, *Pass Accuracy*, *Training Hours*), and a 6-item Quick Facts roster.
4. **Career & Achievements**: Vertical matchday timeline styled like a fixture list, with matchday badges (`ACTIVE CAMPAIGN`, `FINALIST`, `MOM & AWARD`, `CHAMPIONS`) and customizable club/tournament records.
5. **Gallery**: Responsive 4-photo match action and portrait grid equipped with a full-screen, keyboard-accessible Lightbox with arrow key navigation, touch swipe support for mobile, and custom fallback avatars.
6. **Skills (Two Squads)**:
   - **Technical Squad**: HTML & CSS, JavaScript, Python (basics), Java, SQL, Web security (basics), Git & GitHub, AI tools, Game development.
   - **Team & Mindset Squad**: Teamwork, Communication skills, Public speaking, Open communication, Data analysis, Business analysis, Decision making, Adaptability, Problem solving, Leadership.
   - Displayed as athletic jersey badges without arbitrary percentage bars.
7. **Off the Pitch**: Narrative about his coding journey and parallel disciplines, accompanied by 3 project cards marked "Coming Soon".
8. **Contact**: Headline *"Ready for the next match."*, direct `mailto:mdsajith19@gmail.com` button with subject `"Hello Sajith!"`, 1-click email copy widget with toast confirmation, and LinkedIn connection button. *(Note: Strictly no Instagram).*
9. **Footer**: Copyright current year (`© 2026 Mohammed Sajith G. All rights reserved.`), tagline, and back-to-top jump button.

---

## 📸 Photo Inventory & Size Check
All images reside in `/assets/images/`:

| Filename | Status | File Size | Recommended Action |
| :--- | :--- | :--- | :--- |
| `profile.jpg` | **Optimal** | **126.6 KB** | Ready for production (under 500 KB limit). |
| `action-1.jpg` | ⚠️ **Flagged** | **872.2 KB** | **Over 500 KB** — compress using [TinyPNG](https://tinypng.com) or Squoosh to ~150–250 KB for faster mobile load. |
| `action-2.jpg` | ⚠️ **Flagged** | **943.4 KB** | **Over 500 KB** — compress using TinyPNG or Squoosh to ~150–250 KB. |
| `action-3.jpg` | ⚠️ **Flagged** | **851.6 KB** | **Over 500 KB** — compress using TinyPNG or Squoosh to ~150–250 KB. |

*Fallback:* If any image fails to load or is missing, a custom SVG placeholder displaying Mohammed Sajith G's initials **`MSG`** on a deep pitch green and turf lime backdrop will display automatically.

---

## 🛠️ Placeholders to Customize

Look for the commented placeholders in `index.html` to update with exact personal stats:
1. **Club / Team Name**:
   - `index.html` lines under `#player-card`, `#about`, and `#career` currently show `[Your Club Name / League Team]`.
2. **Preferred Foot**:
   - Currently set to `[Right-Footed]`. Change to `[Left-Footed]` if applicable.
3. **Player Card Attributes**:
   - In `#player-card`, update overall rating `88`, position `CM`, and the attribute bar numbers (`PAC 86`, `PAS 89`, `STA 92`, `TEA 94`, `VIS 88`, `DRI 85`) to match your real match ratings.
4. **Career Fixtures**:
   - In `#career`, replace `[Current Club / Team Campaign]`, `[Championship Cup]`, `[State Youth Championship]`, and `[District Youth League]` with your exact club and tournament history.
5. **Jersey Number**:
   - Currently featured as `#19` across the crest, watermark, and player card. You can change this number in `index.html` and `css/style.css`.

---

## 💻 Running Locally

This project uses vanilla HTML5, CSS3, and JavaScript—no framework, bundler, or build step required.

### Method 1: Python Built-in Server
Open PowerShell or Command Prompt in this project directory:
```bash
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`

### Method 2: Node.js `npx serve`
```bash
npx serve .
```

### Method 3: VS Code Live Server
1. Open the folder in VS Code.
2. Right click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deploying to Netlify

### Option A: Netlify Drop (Fastest — 30 seconds, No Git required)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Log in or create a free Netlify account.
3. Drag and drop the entire `sajith port` folder into the Netlify Drop area.
4. Your site will be instantly live on a Netlify URL (e.g. `https://sajith-portfolio.netlify.app`).
5. (Optional) In Site Settings > Domain Management, you can assign a custom domain or rename the subdomain.

### Option B: Deploy via GitHub & Netlify CI
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial matchday portfolio release for Mohammed Sajith G"
   git remote add origin https://github.com/YOUR_USERNAME/sajith-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** > **"Import an existing project"** > **GitHub**.
4. Select the repository.
5. Set:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.` *(current directory)*
6. Click **Deploy**. Netlify will automatically rebuild whenever you push updates.
