# CMS MERN Dashboard - Agent Guidelines

## Essential Commands
- **Validate everything**: `npm run check` (runs lint/test/build for both client and server)
- **Start development** (PM2): `npm run dev` (starts both backend + frontend)
- **Stop development**: `npm run dev:stop`
- **View logs**: `npm run dev:logs`
- **Monitor dashboard**: `npm run dev:monitor`
- **Backend dev** (manual): `cd server && npm run dev` (MongoDB API on :5002)
- **Backend prod**: `cd server && npm start`
- **Frontend dev** (manual): `cd client && npm start` (defaults to :3002)
- **Frontend check**: `cd client && npm test -- --watchAll=false && npm run build`

## PM2 Development Workflow (Recommended)

### Prerequisites
```bash
npm install -g pm2
```

### Start Development
```bash
npm run dev
```
This launches:
- **cms-backend**: Node server with watch mode (auto-restart on changes)
- **cms-frontend**: React dev server on port 3002

### PM2 Commands Available
| Command | Description |
|---------|-------------|
| `npm run dev` | Start both services with PM2 |
| `npm run dev:stop` | Stop all PM2 processes |
| `npm run dev:restart` | Restart all services |
| `npm run dev:logs` | Stream logs from all services |
| `npm run dev:logs:backend` | Stream backend logs only |
| `npm run dev:logs:frontend` | Stream frontend logs only |
| `npm run dev:monitor` | Open interactive PM2 monitor |
| `npm run dev:status` | Check running services status |

### Log Files
- **Backend**: `server/logs/backend-*.log`
- **Frontend**: `client/logs/frontend-*.log`

Logs include:
- Combined logs (stdout + stderr)
- Separate out.log (stdout)
- Separate error.log (stderr)
- Timestamps for all entries

**Note**: Logs are gitignored and should not be committed.

## Setup & Installation
1. **Clone repo** and navigate to project root
2. **Install PM2 globally**: `npm install -g pm2`
3. **Install dependencies**:
   - `cd server && npm install`
   - `cd client && npm install`
4. **Backend setup**:
   - Create `.env` with: `MONGO_URL`, `MONGO_PORT` (5002), `ALLOWED_ORIGINS`, `API_KEY`
5. **Frontend setup**:
   - Create `.env` with: `REACT_APP_MONGODB_BASE_URL`, `REACT_APP_API_KEY`
6. **Start development**: `npm run dev` from root
7. **Verify setup**: Run `npm run check` from root

## Performance Optimizations (External Drive)
The project includes optimizations for running on external drives:

- **Source maps disabled** (`GENERATE_SOURCEMAP=false`)
- **Fast Refresh disabled** (`FAST_REFRESH=false`)
- **TypeScript compilation on error** (`TSC_COMPILE_ON_ERROR=true`)
- **Inline runtime chunk disabled** (`INLINE_RUNTIME_CHUNK=false`)
- **PM2 configured** with longer timeouts to prevent premature restarts

Note: Initial startup on external USB drives may take 2-5 minutes due to webpack file operations. Subsequent hot reloads will be faster.

## Local Deployment vs Render.com
- **On Render.com**: Uses `MONGO_URL` and `PORT` environment variables (PORT is set by Render)
- **Locally**: Requires backend `.env` with `MONGO_URL`, `MONGO_PORT`, `ALLOWED_ORIGINS`, `API_KEY`; frontend `.env` with `REACT_APP_MONGODB_BASE_URL`, `REACT_APP_API_KEY`
- **Backend port**: `PORT` (Render) > `MONGO_PORT` (local) > 5002 (fallback)
- **Frontend configuration**: Points to `http://localhost:5002` by default

## Critical Architecture Notes
- **Single Express app**: server/index.js runs one Express instance (`PORT` || `MONGO_PORT` || 5002)
- **API slice**: client/src/state/api/mongoDBApi.js (RTK Query)
- **API Key Authentication**: Backend validates `x-api-key` header against `API_KEY` env variable
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
5. **Clean workspace**: Avoid committing `.DS_Store`, `node_modules`, `/build`, `/coverage`, `/logs`

## Testing Reality
- Server has no actual tests yet (`npm test` echoes placeholder)
- Client check runs tests + build: `npm test -- --watchAll=false && npm run build`
- Focus validation on build success and client test passage
