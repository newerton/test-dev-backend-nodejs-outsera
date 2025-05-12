import path from 'node:path';
import { app, Movie, parseCSV } from './server';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function init() {
  await Movie.createTable();
  const movies = parseCSV(path.join(__dirname, 'utils', 'csv', 'movielist.csv'));
  await Movie.insertMany(movies);
}

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
