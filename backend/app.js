import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { callAgent } from './agent.js';
import serverless from 'serverless-http';
import dotenv from 'dotenv';

// Load environment variables from a .env file.  This enables configuring the
// allowed frontend URL for CORS and database credentials without hardcoding
// values in source control.  When deployed on Vercel the variables are
// provided via the dashboard.
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Configure CORS once with the allowed origin.  The allowed origin is read
// from the FRONTEND_URL environment variable.  If not set, all origins are
// allowed which is useful for local development.
const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
// Parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running. Use POST /api/finance for queries');
});

app.post('/api/finance', async (req, res) => {
  const { question } = req.body; // get user ques

  try {
    // pass the ques to agent.js
    const reply = await callAgent(question);

    res.json({ reply });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

export default app;
export const handler = serverless(app);


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
