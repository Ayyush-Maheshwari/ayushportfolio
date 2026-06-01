# Infrastructure Control Plane · Portfolio

> A personal portfolio for **Ayush Maheshwari** disguised as a real cloud / virtualization management platform — inspired by VMware vSphere, Proxmox, Kubernetes Dashboard, Grafana and modern NOC dashboards.

Every section of the resume is mapped 1:1 to an infrastructure component in the UI:

| Resume section          | Infra component                |
| ----------------------- | ------------------------------ |
| Professional Summary    | **Overview** dashboard         |
| Skills                  | **Services** (running stacks)  |
| Experience              | **Deployments** (clusters)     |
| Projects                | **Containers** (running VMs)   |
| Education + Certifications | **System Configuration**    |
| Contact                 | **Top bar control panel**      |

The UI is GUI-focused with an integrated CLI panel (`ayush-ctl`) at the bottom for command-line navigation.

---

## Tech Stack

- **React 18 + TypeScript** — fast, typed UI
- **Vite 5** — instant dev server, tiny production build
- **Tailwind CSS 3** — utility-first dark enterprise styling
- **Recharts** — telemetry / metric mini-graphs
- **Lucide React** — clean icon set
- **GitHub Pages** — static hosting with a ready CI workflow

The site is fully **static** and deploys to GitHub Pages with zero backend.

---

## Project Structure

```
src/
├── App.tsx                     # Root layout (top bar / sidebar / view / terminal / status)
├── main.tsx                    # React entry
├── data/
│   └── portfolio.ts            # ALL resume content (single source of truth)
├── components/
│   ├── TopBar.tsx              # Contact + clock control bar
│   ├── Sidebar.tsx             # Datacenter-style navigation
│   ├── StatusBar.tsx           # Bottom status strip (CPU/MEM/NET)
│   ├── Terminal.tsx            # Integrated CLI: ls, cd, whoami, projects, …
│   ├── Panel.tsx               # Reusable infra panel container
│   └── MetricChart.tsx         # Live telemetry chart (recharts)
└── views/
    ├── OverviewView.tsx        # ↔ Professional Summary
    ├── ServicesView.tsx        # ↔ Skills
    ├── DeploymentsView.tsx     # ↔ Experience
    ├── ContainersView.tsx      # ↔ Projects
    └── SystemConfigView.tsx    # ↔ Education + Certifications
```

---

## Terminal Commands

Open the integrated terminal at the bottom of the dashboard and try:

```
help                # list all commands
whoami              # show contact info
summary             # professional summary
ls                  # list portfolio sections
skills              # list technical skills
skills --soft       # list soft skills
experience          # list deployments (experience)
projects            # list containers (projects)
education           # list education entries
certs               # list certifications
cd containers       # navigate to a section
open github         # open email / linkedin / github
clear               # clear the terminal
```

---

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# production build
npm run build

# preview production build
npm run preview
```

> Windows note: if `npm install` skips devDependencies, set `NODE_ENV=development` before installing:
> ```cmd
> set NODE_ENV=development
> npm install
> ```

---

## Deploy to GitHub Pages

A ready-to-use workflow is included at `.github/workflows/deploy.yml`.

1. Push this repo to GitHub (e.g. `https://github.com/<you>/<repo>`).
2. In the repo go to **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the workflow builds with Vite and publishes `dist/`.

The `vite.config.ts` uses `base: './'` so the site works both on a custom domain and on `https://<user>.github.io/<repo>/` without changes.

You can also publish manually:
```bash
npm run deploy   # builds and publishes to gh-pages branch via gh-pages package
```

---

## Customizing Content

Everything is driven by **`src/data/portfolio.ts`**. Update that one file and every panel reflects the changes — there is no duplicated content anywhere in the UI.

---

## License

MIT — feel free to fork this and use it as a base for your own infrastructure-themed portfolio.
