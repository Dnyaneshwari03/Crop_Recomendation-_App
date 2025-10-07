const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'agriculture'
});

app.get('/api/seasons', (req, res) => {
  db.query('SELECT * FROM seasons', (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});



app.get('/api/crops', (req, res) => {
  const { season } = req.query;
  if (season) {
    db.query('SELECT * FROM crops WHERE season = ?', [season], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  } else {
    db.query('SELECT * FROM crops', (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  }
});

app.get('/api/crops/:id', (req, res) => {
  const cropId = req.params.id;
  db.query('SELECT * FROM crops WHERE id = ?', [cropId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ message: 'Crop not found' });
    res.send(result[0]);
  });
});





app.listen(5000, () => {
  console.log('Server running on port 5000');
});



