const db = require("../database");

module.exports = {
  createTable: () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId TEXT,
        projectName TEXT,
        technologyStack TEXT,
        description TEXT
      )
    `);
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM projects", (err, rows) => {
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
      const stmt = db.prepare("SELECT * FROM projects WHERE id = ?");
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

  create: (projectName, technologyStack, description) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO projects ( projectName, technologyStack, description) VALUES (?, ?, ?, ?)",
      );
      stmt.run(projectName, technologyStack, description, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
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

  update: (id, projectName, technologyStack, description) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        UPDATE projects 
        SET projectName = ?, technologyStack = ?, description = ?
        WHERE id = ?
      `);
      stmt.run(projectName, technologyStack, description, id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  },
};
