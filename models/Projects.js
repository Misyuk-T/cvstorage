const db = require("../database");

module.exports = {
  createTable: () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectName TEXT,
        technologyStack TEXT,
        description TEXT,
        teamSize INTEGER,
        link TEXT,
        nda INTEGER DEFAULT 1
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

  create: (projectName, technologyStack, description, teamSize, link, nda) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO projects (projectName, technologyStack, description, teamSize, link, nda) VALUES (?, ?, ?, ?, ?, ?)",
      );
      stmt.run(
        projectName,
        technologyStack,
        description,
        teamSize,
        link,
        nda,
        (err) => {
          if (err) {
            reject(err);
          } else {
            const insertedId = stmt.lastID;
            resolve({
              id: insertedId,
              projectName,
              technologyStack,
              description,
              teamSize,
              link,
              nda,
            });
            stmt.finalize();
          }
        },
      );
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
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

  update: (
    id,
    projectName,
    technologyStack,
    description,
    teamSize,
    link,
    nda,
  ) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        UPDATE projects 
        SET projectName = ?, technologyStack = ?, description = ?, teamSize = ?, link = ?, nda = ?
        WHERE id = ?
      `);
      stmt.run(
        projectName,
        technologyStack,
        description,
        teamSize,
        link,
        nda,
        id,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              id,
              projectName,
              technologyStack,
              description,
              teamSize,
              link,
              nda,
            });
            stmt.finalize();
          }
        },
      );
    });
  },
};
