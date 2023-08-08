const db = require("../database");

module.exports = {
  createTable: () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS technologies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT
      )
    `);
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM technologies", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("SELECT * FROM technologies WHERE id = ?");
      stmt.get(id, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
      stmt.finalize();
    });
  },

  create: (name, type) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO technologies (name, type) VALUES (?, ?)",
      );
      stmt.run(name, type, (err) => {
        if (err) {
          reject(err);
        } else {
          const insertedId = stmt.lastID;
          stmt.finalize();
          resolve({ id: insertedId, name, type });
        }
      });
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM technologies WHERE id = ?");
      stmt.run(id, (err) => {
        if (err) {
          reject(err);
        } else {
          stmt.finalize();
          resolve({ id });
        }
      });
    });
  },

  update: (id, name, type) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "UPDATE technologies SET name = ?, type = ? WHERE id = ?",
      );
      stmt.run(name, type, id, (err) => {
        if (err) {
          reject(err);
        } else {
          stmt.finalize();
          resolve({ id, name, type });
        }
      });
    });
  },
};
