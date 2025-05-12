import express from 'express';
import type { Request, Response } from 'express';
import { getProducerIntervals, ProducerIntervalsResult } from '../services/producer.service';

const router = express.Router();

router.get('/intervals', async (_: Request, res: Response) => {
  try {
    const result: ProducerIntervalsResult = await getProducerIntervals();
    res.json(result);
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default router;
