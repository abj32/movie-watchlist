import { Router } from 'express';
import { combinedSearch } from '../services/omdb.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const results = await combinedSearch(req.query.q.toString());
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Search failed' });
  }
});

export default router;