const { app, Movie, parseCSV } = require('./server');
const path = require('path');

const PORT = process.env.PORT || 3000;

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
