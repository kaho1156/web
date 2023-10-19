const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const databasePath = 'mydatabase.db';

const directory = path.dirname(databasePath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const db = new sqlite3.Database(databasePath);

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        Name TEXT,
        Address TEXT,
        Comment TEXT,
        email TEXT
      )
    `);
  });

db.close();
