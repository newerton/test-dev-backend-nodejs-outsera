const express = require('express');
const router = express.Router();
const { getProducerIntervals } = require('../services/producer.service');

router.get('/intervals', async (_, res) => {
  try {
    const result = await getProducerIntervals();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
