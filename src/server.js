const express = require('express');
const Movie = require('./models/movie.model');
const parseCSV = require('./utils/parse-csv');
const producersRoutes = require('./routes/producers.route');

const app = express();

app.use('/producers', producersRoutes);

module.exports = { app, Movie, parseCSV };
