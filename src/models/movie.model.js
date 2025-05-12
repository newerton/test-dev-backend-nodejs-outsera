const db = require('../db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    title TEXT,
    studios TEXT,
    producers TEXT,
    winner TEXT
  )
`;

class Movie {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(createTableQuery, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static insertMany(movies) {
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
      stmt.finalize(err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = Movie;
