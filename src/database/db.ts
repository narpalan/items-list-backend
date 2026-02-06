import DatabaseConstructor, { type Database } from 'better-sqlite3';
import path from 'path';

const db: Database = new DatabaseConstructor(path.join(process.cwd(), 'database.sqlite'));

export function initDatabase(): Database {
    db.exec(`
    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_timestamp 
    AFTER UPDATE ON itens
    BEGIN
      UPDATE itens SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `);

  console.log('📦 Banco de dados SQLite inicializado');
  return db;
}

export default db;