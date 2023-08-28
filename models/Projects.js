import { sql } from "@vercel/postgres";

export const createTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      projectName TEXT,
      technologyStack TEXT,
      description TEXT,
      teamSize INTEGER,
      link TEXT,
      nda INTEGER DEFAULT 1
    )
  `;
};

export const findAll = async () => {
  const { rows } = await sql`SELECT * FROM projects`;
  return rows;
};

export const findById = async (id) => {
  const { rows } = await sql`
    SELECT * FROM projects
    WHERE id = ${id}
  `;
  return rows[0];
};

export const create = async (
  projectName,
  technologyStack,
  description,
  teamSize,
  link,
  nda,
) => {
  const { rows } = await sql`
    INSERT INTO projects (projectName, technologyStack, description, teamSize, link, nda)
    VALUES (${projectName}, ${technologyStack}, ${description}, ${teamSize}, ${link}, ${nda})
    RETURNING *
  `;
  return rows[0];
};

export const deleteById = async (id) => {
  await sql`
    DELETE FROM projects
    WHERE id = ${id}
  `;
  return { id };
};

export const update = async (
  id,
  projectName,
  technologyStack,
  description,
  teamSize,
  link,
  nda,
) => {
  const { rows } = await sql`
    UPDATE projects
    SET projectName = ${projectName}, technologyStack = ${technologyStack}, description = ${description}, teamSize = ${teamSize}, link = ${link}, nda = ${nda}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
};
