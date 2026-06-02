# CMS MERN Dashboard

A comprehensive, high-performance Content Management System (CMS) Dashboard built with the MERN stack (MongoDB, Express, React, Node.js), now migrating core data entities to **PostgreSQL** for enhanced relational integrity.

[**Live Demo**](https://cms-mern-frontend.onrender.com/dashboard)

## 🚀 Overview
This dashboard is designed to serve as a central hub for marketplace and ERP integrations. It provides real-time data visualization, advanced filtering, and a modern, responsive UI.

## ✨ Key Features
- **Dual Database Support:** Concurrent management of MongoDB (via Mongoose) and PostgreSQL (via `pg`).
- **Data Visualization:** Rich, interactive charts (Bar, Line, Pie, Geography) powered by **Nivo**.
- **State Management:** Global UI state handled by **Redux Toolkit** and server-side data fetching via **RTK Query**.
- **Modern UI/UX:** Polished, responsive design using **Material UI (MUI)** with full Dark/Light mode support.
- **Robust Security & CI:** Enforced by GitHub Rulesets and automated CI workflows to ensure code quality and safety.

## 🛠️ Tech Stack
- **Frontend:** React (v18), Redux Toolkit, RTK Query, Material UI, Nivo Charts.
- **Backend:** Node.js, Express, Mongoose, PostgreSQL.
- **Validation:** Automated CI via GitHub Actions.

## 📖 Getting Started
For detailed instructions on building, running, and contributing to this project—including engineering standards and mandatory validation rules—please refer to the [**GEMINI.md**](./GEMINI.md) file.

## 🖥️ Local Development (PM2)

This project uses PM2 to run both backend and frontend simultaneously with hot-reload and centralized logging.

### Prerequisites
Ensure you have Node.js (>=18.0.0) installed, then install PM2 globally:

```bash
npm install -g pm2
```

### Quick Start

**1. Install dependencies for both services:**
```bash
cd server && npm install
cd ../client && npm install
cd ..
```

**2. Set up environment variables:**

Create `.env` files in both `server/` and `client/` directories with the required variables (see [GEMINI.md](./GEMINI.md) for details).

**3. Start development servers:**
```bash
npm run dev
```

This starts:
- **Backend** on http://localhost:5002 (with watch mode - auto-restarts on file changes)
- **Frontend** on http://localhost:3002

### PM2 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend and frontend |
| `npm run dev:stop` | Stop all services |
| `npm run dev:restart` | Restart all services |
| `npm run dev:logs` | View logs for all services |
| `npm run dev:logs:backend` | View backend logs only |
| `npm run dev:logs:frontend` | View frontend logs only |
| `npm run dev:monitor` | Open PM2 monitor dashboard |
| `npm run dev:status` | Check service status |

### Log Files
Logs are saved to:
- `server/logs/` - Backend logs (combined, output, error)
- `client/logs/` - Frontend logs (combined, output, error)

**Note:** Log files are automatically excluded from git via `.gitignore`.

### Manual Development (Alternative)

If you prefer to run services separately:

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

## ⚖️ License
This project is licensed under the ISC License.
