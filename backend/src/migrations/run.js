const bcrypt = require('bcryptjs');
const db = require('../config/database');

const USUARIOS_DEMO = [
  {
    nombre: 'María Rodríguez',
    email: 'maria@conectacolegio.com',
    password: 'demo123',
    rol: 'representante',
  },
  {
    nombre: 'Laura Martínez',
    email: 'laura@conectacolegio.com',
    password: 'demo123',
    rol: 'docente',
  },
  {
    nombre: 'Dirección del Colegio',
    email: 'direccion@conectacolegio.com',
    password: 'demo123',
    rol: 'direccion',
  },
];

async function runMigrations() {
  console.log('Ejecutando migraciones de AulaRed...');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'representante' CHECK(rol IN ('representante','docente','direccion')),
      activo INTEGER NOT NULL DEFAULT 1,
      creado_en TEXT DEFAULT (datetime('now')),
      actualizado_en TEXT DEFAULT (datetime('now'))
    );
  `);

  for (const u of USUARIOS_DEMO) {
    const existente = db.get('SELECT id FROM usuarios WHERE email = ?', u.email);
    if (existente) {
      console.log(`Usuario ya existe: ${u.email}`);
      continue;
    }
    const hash = bcrypt.hashSync(u.password, 10);
    db.run(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      u.nombre,
      u.email,
      hash,
      u.rol,
    );
    console.log(`Usuario demo creado: ${u.email} (${u.rol})`);
  }

  console.log('Migraciones ejecutadas correctamente.');
}

module.exports = runMigrations;

if (require.main === module) {
  (async () => {
    try {
      await db.init();
      await runMigrations();
      process.exit(0);
    } catch (err) {
      console.error('Error en migraciones:', err);
      process.exit(1);
    }
  })();
}