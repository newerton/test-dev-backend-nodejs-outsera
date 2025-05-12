import { db } from "../db";


const createTableQuery: string = `
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    title TEXT,
    studios TEXT,
    producers TEXT,
    winner TEXT
  )
`;

export interface MovieType {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

export interface MovieRow {
  year: number;
  producers: string;
}

export class Movie {
  static createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(createTableQuery, (err: Error) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static insertMany(movies: MovieType[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)');
      for (const movie of movies) {
        stmt.run([
          movie.year,
          movie.title,
          movie.studios,
          movie.producers,
          movie.winner
        ]);
      }
      stmt.finalize((err: Error) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static winningProducers(): Promise<MovieRow[]> {
    return new Promise((resolve, reject) => {
      db.all(`SELECT year, producers FROM movies WHERE winner = 'yes'`, (err: Error, rows: MovieRow[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}
