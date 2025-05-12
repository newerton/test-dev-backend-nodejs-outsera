const db = require('../db');

function getProducerIntervals() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT year, producers FROM movies WHERE winner = 'yes'`, (err, rows) => {
      if (err) return reject(err);
      const producerWins = getProducerWins(rows);
      const intervals = getIntervals(producerWins);
      
      if (!intervals.length) return resolve({ min: [], max: [] });
      const minInterval = Math.min(...intervals.map(i => i.interval));
      const maxInterval = Math.max(...intervals.map(i => i.interval));
      resolve({
        min: intervals.filter(i => i.interval === minInterval),
        max: intervals.filter(i => i.interval === maxInterval)
      });
    });
  });
}

function getProducerWins(rows) {
  const producerWins = {};
  rows.forEach(row => {
    row.producers.split(/,| and |, and /).map(p => p.trim()).forEach(producer => {
      if (!producer) return;
      if (!producerWins[producer]) producerWins[producer] = [];
      producerWins[producer].push(Number(row.year));
    });
  });

  return producerWins
}

function getIntervals(producerWins) {
  const intervals = [];
  for (const [producer, years] of Object.entries(producerWins)) {
    if (years.length < 2) continue;
    years.sort((a, b) => a - b);
    for (let i = 1; i < years.length; i++) {
      intervals.push({
        producer,
        interval: years[i] - years[i - 1],
        previousWin: years[i - 1],
        followingWin: years[i]
      });
    }
  }
  return intervals;
}

module.exports = { getProducerIntervals };
