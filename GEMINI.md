# GEMINI.md - CMS MERN Dashboard

## Project Overview
This project is a comprehensive CMS (Content Management System) Dashboard built using the MERN stack (MongoDB, Express, React, Node.js). It is currently in a transition phase where MongoDB is being supplemented or replaced by **PostgreSQL** for certain data entities (e.g., Products).

The dashboard features:
- **Data Visualization:** Uses the Nivo library for charts (bar, line, pie, etc.).
- **State Management:** Redux Toolkit for global UI state and RTK Query for efficient server-side data fetching.
- **Polished UI:** Material UI (MUI) for a modern, responsive design with dark/light mode support.
- **Dual Database Support:** The backend concurrently manages MongoDB (via Mongoose) and PostgreSQL (via `pg`).

---

## Building and Running

### Prerequisites
- **Node.js:** version >= 18.0.0
- **MongoDB:** A running instance or Atlas connection string.
- **PostgreSQL:** A running instance with a valid connection URI.

### Backend (Server)
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Configure environment variables (create a `.env` file):
   - `MONGO_URL`: MongoDB connection string.
   - `MONGO_PORT`: Port for the MongoDB-backed Express app (default: 9000).
   - `PG_URI`: PostgreSQL connection URI.
   - `PG_PORT`: Port for the PostgreSQL-backed Express app (default: 9001).
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins.
4. Run the server:
   - Development: `npm run dev` (uses nodemon)
   - Production: `npm start`

### Frontend (Client)
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Configure environment variables (create a `.env` file):
   - `REACT_APP_MONGODB_BASE_URL`: Base URL for the MongoDB-backed API (e.g., `http://localhost:9000`).
   - `REACT_APP_POSTGRESQL_BASE_URL`: Base URL for the PostgreSQL-backed API (e.g., `http://localhost:9001`).
4. Run the application: `npm start`

---

## Development Conventions

### Architecture
- **Monorepo Structure:** The project is split into `client/` and `server/` directories.
- **Multi-App Backend:** The `server/index.js` file initializes two separate Express application instances to handle MongoDB and PostgreSQL requests on different ports concurrently.

### Technologies & Styles
- **React (v18):** Functional components with hooks.
- **Redux Toolkit:** Used for global state (`client/src/state/index.js`).
- **RTK Query:** Used for API interactions. Note that there are two separate API slices: `mongoDBApi.js` and `postgreSQLApi.js`.
- **Material UI (MUI):** The primary UI framework. The theme configuration is located in `client/src/theme.js`.
- **Mongoose:** ODM for MongoDB.
- **pg:** Driver for PostgreSQL.

### Folder Structure Highlights
- `server/models/`: Mongoose schemas for MongoDB.
- `server/controllers/`: Logic for MongoDB and PostgreSQL (under `postgresController/`) routes.
- `client/src/scenes/`: Main dashboard views (Dashboard, Products, Customers, etc.).
- `client/src/components/`: Reusable UI components.

---

## Rules and Standards

### Branch Protection & CI
This repository is protected by GitHub Rulesets. All contributions must adhere to the following:
- **Pull Requests Required:** Direct pushes to `main` are restricted. All changes must be proposed via a Pull Request.
- **Mandatory Status Checks:** All PRs must pass the `ci` status check (`npm run check`) before merging. This includes building the client and running all tests.
- **Linear History:** Use **Squash and Merge** or **Rebase and Merge** to maintain a clean, linear git history. No merge commits are allowed on `main`.
- **Review Thread Resolution:** All conversations in a PR must be resolved before it can be merged.

### Operational Guidelines
- **No Secrets:** Never commit API keys, connection strings, or sensitive credentials. Use environment variables (via `.env` files) as specified in the "Building and Running" section.
- **Validation:** Before submitting a PR, ensure you run `npm run check` from the project root to verify the integrity of both the client and server.
- **Clean Workspace:** Ensure the repository remains clean. Avoid committing build artifacts or temporary files (e.g., `.DS_Store`, `node_modules`).
