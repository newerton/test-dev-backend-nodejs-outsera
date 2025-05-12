import sqlite3 from 'sqlite3';
export const db: sqlite3.Database = new sqlite3.Database(':memory:');


