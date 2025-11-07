import express from 'express';
import Event from '../models/Event.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/', authRequired, async (req, res) => {
  try {
    const { title, date, description, clubName } = req.body;
    if (!title || !date || !description) return res.status(400).json({ error: 'Missing fields' });
    const evt = await Event.create({ title, date, description, clubName, userId: req.userId });
    res.status(201).json(evt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

export default router;
