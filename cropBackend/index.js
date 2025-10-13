const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// MySQL connection pool
// =======================
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'agriculture',
  waitForConnections: true,
  connectionLimit: 10,
});

// =======================
// Crop endpoints
// =======================
app.get('/api/seasons', async (req, res) => {
  try {
    const [seasons] = await db.query('SELECT * FROM seasons');
    res.json(seasons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/crops', async (req, res) => {
  try {
    const { season } = req.query;
    let crops;
    if (season) {
      [crops] = await db.query('SELECT * FROM crops WHERE season = ?', [season]);
    } else {
      [crops] = await db.query('SELECT * FROM crops');
    }
    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/crops/:id', async (req, res) => {
  try {
    const cropId = req.params.id;
    const [rows] = await db.query('SELECT * FROM crops WHERE id = ?', [cropId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Crop not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// Registration Endpoint
// =======================
app.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, password, address } = req.body;

    if (!fullname || !email || !password || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
      });
    }

    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (fullname, email, password, address) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [fullname, email, hashedPassword, address]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// =======================
// Login Endpoint
// =======================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both fields are required' });
    }

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, fullname: user.fullname, email: user.email, address: user.address },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// =======================
// Start server
// =======================
app.listen(5000, () => console.log('✅ Server running on port 5000'));
