import fs from 'node:fs';
import { MovieType } from '../models/movie.model';

type MovieObject = {
  [key: string]: string | null;
};

export function parseCSV(filePath: string): MovieType[] {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n').filter(Boolean);
  const headers = lines[0].split(';');
  const movies = lines.slice(1).map((line: string) => {
    const values = line.split(';');
    return headers.reduce((obj: MovieObject, header: string, idx: number) => {
      obj[header.trim()] = values[idx] ? values[idx].trim() : null;
      return obj;
    }, {});
  });

  return movies.map((movie: MovieObject) => ({
    year: Number(movie.year),
    title: movie.title || '',
    studios: movie.studios || '',
    producers: movie.producers || '',
    winner: movie.winner || ''
  }));
}