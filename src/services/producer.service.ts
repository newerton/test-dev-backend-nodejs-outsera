import { Movie, MovieRow } from '../models/movie.model';

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerIntervalsResult {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export function getProducerIntervals(): Promise<ProducerIntervalsResult> {
  return new Promise(async (resolve, reject) => {
    const movies = await Movie.winningProducers();
    if (!movies) return reject(new Error('No movies found'));
    
    const producerWins = getProducerWins(movies);
    const intervals = getIntervals(producerWins);

    if (!intervals.length) return resolve({ min: [], max: [] });
    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));
    resolve({
      min: intervals.filter(i => i.interval === minInterval),
      max: intervals.filter(i => i.interval === maxInterval)
    });
  });
}

function getProducerWins(rows: MovieRow[]): Record<string, number[]> {
  const producerWins: Record<string, number[]> = {};
  rows.forEach(row => {
    row.producers.split(/,| and |, and /).map(p => p.trim()).forEach(producer => {
      if (!producer) return;
      if (!producerWins[producer]) producerWins[producer] = [];
      producerWins[producer].push(Number(row.year));
    });
  });
  return producerWins;
}

function getIntervals(producerWins: Record<string, number[]>): ProducerInterval[] {
  const intervals: ProducerInterval[] = [];
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
