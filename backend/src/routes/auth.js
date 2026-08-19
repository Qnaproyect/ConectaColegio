const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const db = require('../config/database');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'conecta-colegio-secret-dev';

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const usuario = db.get('SELECT * FROM usuarios WHERE email = ? AND activo = 1', String(email).toLowerCase().trim());
  if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: '24h' },
  );

  res.json({
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
  });
}));

router.get('/me', asyncHandler(async (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    const payload = jwt.verify(header.split(' ')[1], JWT_SECRET);
    const usuario = db.get('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', payload.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}));

module.exports = router;