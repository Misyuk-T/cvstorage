const db = require("../database");

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
        education TEXT,
        projects TEXT,
        technologyStack TEXT,
        media TEXT,
        motivation TEXT,
        cvType TEXT,
        grade TEXT,
        workDirection TEXT,
        isEnabled INTEGER DEFAULT 1,
        lastUpdated DATE DEFAULT (datetime('now','localtime'))
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
    projects,
    technologyStack,
    media,
    motivation,
    cvType,
    grade,
    workDirection,
    isEnabled,
  ) => {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      const stmt = db.prepare(
        "INSERT INTO users (name, position, email, socials, description, experience, education, projects, technologyStack, media, motivation, cvType, grade, workDirection, isEnabled, lastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      );
      stmt.run(
        name,
        position,
        email,
        JSON.stringify(socials),
        description,
        JSON.stringify(experience),
        JSON.stringify(education),
        JSON.stringify(projects),
        JSON.stringify(technologyStack),
        media,
        motivation,
        cvType,
        grade,
        workDirection,
        isEnabled,
        now,
        (err) => {
          if (err) {
            reject(err);
          } else {
            const insertedId = stmt.lastID;
            resolve({
              id: insertedId,
              name,
              position,
              email,
              socials,
              description,
              experience,
              education,
              projects,
              technologyStack,
              media,
              motivation,
              cvType,
              grade,
              workDirection,
              isEnabled,
              lastUpdated: now,
            });
            stmt.finalize();
          }
        },
      );
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare("DELETE FROM users WHERE id = ?");
      stmt.run(id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
          stmt.finalize();
        }
      });
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
    projects,
    technologyStack,
    media,
    motivation,
    cvType,
    grade,
    workDirection,
    isEnabled,
  ) => {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      const stmt = db.prepare(`
        UPDATE users 
        SET name = ?, position = ?, email = ?, socials = ?, description = ?, experience = ?, education = ?, projects = ?, technologyStack = ?, media = ?, motivation = ?, cvType = ?, grade = ?, workDirection = ?, isEnabled = ?, lastUpdated = ?
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
        JSON.stringify(projects),
        JSON.stringify(technologyStack),
        media,
        motivation,
        cvType,
        grade,
        workDirection,
        isEnabled,
        now,
        id,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              id,
              name,
              position,
              email,
              socials,
              description,
              experience,
              education,
              projects,
              technologyStack,
              media,
              motivation,
              cvType,
              grade,
              workDirection,
              isEnabled,
              lastUpdated: now, // Include lastUpdated field in the response
            });
            stmt.finalize();
          }
        },
      );
    });
  },

  getNextUserID() {
    return new Promise((resolve, reject) => {
      db.get("SELECT MAX(id) AS maxId FROM users", (err, row) => {
        if (err) {
          reject(err);
        } else {
          const nextID = row.maxId ? row.maxId + 1 : 1;
          resolve(nextID);
        }
      });
    });
  },
};
