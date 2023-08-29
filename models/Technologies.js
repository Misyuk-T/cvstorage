import { sql } from "@vercel/postgres";

export const createTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS technologies (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT,
      "type" TEXT
    )
  `;
};

export const findAll = async () => {
  const { rows } = await sql`SELECT * FROM technologies`;
  return rows;
};

export const findById = async (id) => {
  const { rows } = await sql`
    SELECT * FROM technologies
    WHERE id = ${id}
  `;
  return rows[0];
};

export const create = async (name, type) => {
  const { rows } = await sql`
    INSERT INTO technologies ("name", "type")
    VALUES (${name}, ${type})
    RETURNING *
  `;
  return rows[0];
};

export const deleteById = async (id) => {
  await sql`
    DELETE FROM technologies
    WHERE id = ${id}
  `;
  return { id };
};

export const update = async (id, name, type) => {
  const { rows } = await sql`
    UPDATE technologies
    SET "name" = ${name}, "type" = ${type}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
};
