# FinanceAI – Integrated Frontend & Backend

This repository contains an integrated version of the personal finance assistant.  It combines a React front‑end built with Vite and a Node/Express back‑end that communicates with the Groq API and a MySQL database.  The project is designed to run both locally and on Vercel with minimal configuration.

## Project Structure

```
integrated_project/
├── frontend/          # Vite + React application
├── backend/           # Express API server and agent logic
├── vercel.json        # Deployment configuration for Vercel
├── package.json       # Root scripts for managing both parts
├── README.md          # This file
└── .env.example       # Sample environment variables
```

### Frontend

The front‑end lives in the `frontend/` directory.  It uses React 19, Tailwind CSS for styling, GSAP for animations and axios for HTTP requests.  Routing is provided by `react-router-dom`.  Axios is configured centrally in `src/main.jsx` to use the `VITE_BACKEND_URL` environment variable, so all API calls to `/api/*` automatically target the correct back‑end.

During development, Vite’s dev server proxies `/api` requests to the back‑end server.  This is configured in `vite.config.js` using the same `VITE_BACKEND_URL` variable.

### Backend

The back‑end in `backend/` is an Express application that exposes a single HTTP endpoint (`POST /api/finance`) to process chat requests.  It uses the `groq-sdk` to generate responses and `mysql2/promise` to interact with a MySQL database.  Helper functions defined in `agent.js` handle tool calls such as getting total expenses, adding expenses/incomes and calculating balances.

The server reads configuration from environment variables loaded via `.env` (see `.env.example`).  CORS is enabled using the `FRONTEND_URL` environment variable, allowing only requests from the configured front‑end origin.

## Local Development

1. **Install dependencies**

   From the root of the project run:

   ```bash
   npm run postinstall
   ```

   This installs dependencies for both the `frontend` and `backend` subprojects.

2. **Set up environment variables**

   Copy `.env.example` to `.env` and adjust the values for your local setup:

   ```bash
   cp .env.example .env
   # edit .env to set GROQ_API_KEY, DB credentials, etc.
   ```

3. **Start the development servers**

   Use the `dev` script to run both servers concurrently:

   ```bash
   npm run dev
   ```

   - The back‑end will start on port `3000`.
   - The front‑end will start on port `5173` and proxy API requests to `http://localhost:3000`.

4. **Use the application**

   Navigate to `http://localhost:5173` in your browser.  Click “Start Chatting” to open the chat interface and interact with the assistant.

## Deployment on Vercel

The included `vercel.json` configures two builds: a Node serverless function for the back‑end (`backend/app.js`) and a static build for the front‑end (`frontend`).  API requests to `/api/*` are routed to the back‑end while other requests serve the compiled React app.

### Steps

1. **Create a new Vercel project** and select the `integrated_project` folder.
2. **Set environment variables** in the Vercel dashboard:

   - `FRONTEND_URL` – your deployed Vercel URL (e.g. `https://financeai.vercel.app`)
   - `VITE_BACKEND_URL` – same value as `FRONTEND_URL`
   - `GROQ_API_KEY`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

3. **Deploy** using the Vercel CLI or dashboard.  Vercel will build the front‑end, deploy the back‑end as a serverless function, and route requests according to `vercel.json`.

## Environment Configuration

See `.env.example` for a list of all required environment variables.  In general:

| Variable            | Purpose                                    |
|---------------------|--------------------------------------------|
| `FRONTEND_URL`      | URL of the front‑end (used for CORS)       |
| `VITE_BACKEND_URL`  | Base URL for API requests from the front‑end |
| `GROQ_API_KEY`      | API key for Groq GPT models               |
| `DB_HOST`           | MySQL host                                |
| `DB_PORT`           | MySQL port (e.g. 3306)                    |
| `DB_USER`           | MySQL user                                |
| `DB_PASSWORD`       | MySQL password                            |
| `DB_NAME`           | Database name (e.g. `finance_ai`)         |

If you run into issues, ensure that your database has the required `Expenses` and `Incomes` tables and that the environment variables are set correctly.