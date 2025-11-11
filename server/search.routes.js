import { Router } from 'express';
import { detailedSearch } from './omdb.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const results = await detailedSearch(req.query.q.toString());
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Search failed' });
  }
});

export default router;