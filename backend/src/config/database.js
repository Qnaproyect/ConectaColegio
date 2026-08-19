const { DatabaseSync } = require('node:sqlite');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbPath = path.resolve(__dirname, '../../', process.env.DB_PATH || './database.sqlite');

let db = null;

function getDb() {
  if (!db) {
    db = new DatabaseSync(dbPath);
    db.exec('PRAGMA foreign_keys = ON;');
  }
  return db;
}

function exec(sql) {
  return getDb().exec(sql);
}

function get(sql, ...params) {
  return getDb().prepare(sql).get(...params);
}

function all(sql, ...params) {
  return getDb().prepare(sql).all(...params);
}

function run(sql, ...params) {
  return getDb().prepare(sql).run(...params);
}

function init() {
  getDb();
  return Promise.resolve();
}

module.exports = { init, exec, get, all, run, getDb };