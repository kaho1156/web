const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));


app.post('/saveComment', (req, res) => {
  const { Name, Address, Comment, email } = req.body;
  const db = new sqlite3.Database('mydatabase.db');
  
  const stmt = db.prepare("INSERT INTO comments (Name, Address, Comment, email) VALUES (?, ?, ?, ?)");
  stmt.run(Name, Address, Comment, email);
  stmt.finalize();


  db.close();

  res.send('Data saved successfully.');
});

app.get('/getComments', (req, res) => {
  const db = new sqlite3.Database('mydatabase.db');
  
  db.all("SELECT * FROM comments", (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.json(rows);
  });

  db.close();
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
