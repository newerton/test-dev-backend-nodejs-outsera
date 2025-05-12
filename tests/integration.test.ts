import request from 'supertest';
import path from 'node:path';
import { app, Movie, parseCSV } from '../src/server';

describe('GET /producers/intervals', () => {
  beforeAll(async () => {
    await Movie.createTable();
    const movies = parseCSV(path.join(__dirname, '../src/utils/csv/movielist.csv'));
    await Movie.insertMany(movies);
  });

  it('should return the correct min and max producer intervals keys', async () => {
    const res = await request(app).get('/producers/intervals');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');
  });

  it('should return the correct min values', async () => {
    const res = await request(app).get('/producers/intervals');
    expect(res.body.min).toEqual([
      {
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991
      }
    ]);
  });
  it('should return the correct max values', async () => {
    const res = await request(app).get('/producers/intervals');
    expect(res.body.max).toEqual([
      {
        producer: "Matthew Vaughn",
        interval: 13,
        previousWin: 2002,
        followingWin: 2015
      }
    ]);
  });
});
