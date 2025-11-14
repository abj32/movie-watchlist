import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/'
};

function sign(userId) {
  return jwt.sign({ sub: String(userId) }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 11);
    const user = await prisma.user.create({ data: { email, passwordHash: hash } });

    res.cookie('sid', sign(user.id), COOKIE_OPTS);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid password' });

    res.cookie('sid', sign(user.id), COOKIE_OPTS);
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('sid', COOKIE_OPTS);
  res.json({ ok: true });
});

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { email: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;