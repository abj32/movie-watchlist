import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes.js';
import searchRoutes from './routes/search.routes.js';
import watchlistRoutes from './routes/watchlist.routes.js';

const app = express();
export const prisma = new PrismaClient();

// CORS: allow Vite dev origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
