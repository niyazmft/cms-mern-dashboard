# CMS MERN Dashboard - Agent Guidelines

## Essential Commands
- **Validate everything**: `npm run check` (runs lint/test/build for both client and server)
- **Backend dev**: `cd server && npm run dev` (MongoDB API on :5002)
- **Backend prod**: `cd server && npm start`
- **Frontend dev**: `cd client && npm start` (defaults to :3002)
- **Frontend check**: `cd client && npm test -- --watchAll=false && npm run build`

## Setup & Installation
1. **Clone repo** and navigate to project root
2. **Backend setup**: 
   - `cd server && npm install`
   - Create `.env` with: `MONGO_URL`, `MONGO_PORT` (5002), `ALLOWED_ORIGINS`
3. **Frontend setup**:
   - `cd client && npm install`
   - Create `.env` with: `REACT_APP_MONGODB_BASE_URL`
4. **Verify setup**: Run `npm run check` from root

## Local Deployment vs Render.com
- **On Render.com**: Uses `MONGO_URL` and `PORT` environment variables (PORT is set by Render)
- **Locally**: Requires backend `.env` with `MONGO_URL`, `MONGO_PORT`, `ALLOWED_ORIGINS`; frontend `.env` with `REACT_APP_MONGODB_BASE_URL`
- **Backend port**: `PORT` (Render) > `MONGO_PORT` (local) > 5002 (fallback)
- **Frontend configuration**: Points to `http://localhost:5002` by default

## Critical Architecture Notes
- **Single Express app**: server/index.js runs one Express instance (`PORT` || `MONGO_PORT` || 5002)
- **API slice**: client/src/state/api/mongoDBApi.js (RTK Query)
- **Folder structure**:
  - `server/models/`: Mongoose schemas
  - `server/controllers/`: Route logic
  - `client/src/scenes/`: Main views (Dashboard, Products, etc.)
  - `client/src/components/`: Reusable UI components
- **Environment**: Both client and server require `.env` files

## Required Workflow
1. **Never commit directly to main** - GitHub Rulesets require PRs
2. **Always run `npm run check`** before PR submission (status check requirement)
3. **Use Squash/Rebase merge** - linear history required, no merge commits
4. **Secrets in .env only** - never commit connection strings/keys
5. **Clean workspace**: Avoid committing `.DS_Store`, `node_modules`, `/build`, `/coverage`

## Testing Reality
- Server has no actual tests yet (`npm test` echoes placeholder)
- Client check runs tests + build: `npm test -- --watchAll=false && npm run build`
- Focus validation on build success and client test passage