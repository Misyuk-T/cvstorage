const db = require("../database");

// Define the User model methods
module.exports = {
  createTable: () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        position TEXT,
        email TEXT,
        socials TEXT,
        description TEXT,
        experience TEXT,
        education TEXT
      )
    `);
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
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
      const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
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

  create: (
    name,
    position,
    email,
    socials,
    description,
    experience,
    education,
  ) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO users (name, position, email, socials, description, experience, education) VALUES (?, ?, ?, ?, ?, ?, ?)",
      );
      stmt.run(
        name,
        position,
        email,
        JSON.stringify(socials),
        description,
        JSON.stringify(experience),
        JSON.stringify(education),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
      stmt.finalize();
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM users WHERE id = ?");
      stmt.run(id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  },

  update: (
    id,
    name,
    position,
    email,
    socials,
    description,
    experience,
    education,
  ) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        UPDATE users 
        SET name = ?, position = ?, email = ?, socials = ?, description = ?, experience = ?, education = ?
        WHERE id = ?
      `);
      stmt.run(
        name,
        position,
        email,
        JSON.stringify(socials),
        description,
        JSON.stringify(experience),
        JSON.stringify(education),
        id,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
      stmt.finalize();
    });
  },
};
