require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./config/database');
const runMigrations = require('./migrations/run');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

async function start() {
  try {
    await db.init();
    await runMigrations();
    app.listen(PORT, () => {
      console.log(`Conecta Colegio API corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
  }
}

start();