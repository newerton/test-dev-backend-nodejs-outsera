import express from 'express';
import type { Application } from 'express';
import { Movie } from './models/movie.model';
import { parseCSV } from './utils/parse-csv';
import producersRoutes from './routes/producers.route';

const app: Application = express();

app.use('/producers', producersRoutes);

export { app, Movie, parseCSV };
