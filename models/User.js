import { sql } from "@vercel/postgres";

export const createTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT,
      "position" TEXT,
      "email" TEXT,
      "socials" JSONB,
      "description" TEXT,
      "experience" JSONB,
      "education" JSONB,
      "projects" JSONB,
      "technologyStack" JSONB,
      "media" TEXT,
      "motivation" TEXT,
      "cvType" TEXT,
      "grade" TEXT,
      "workDirection" TEXT,
      "isEnabled" INTEGER DEFAULT 1,
      "lastUpdated" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
};

export const findAll = async () => {
  const { rows } = await sql`SELECT * FROM users`;
  return rows;
};

export const findById = async (id) => {
  const { rows } = await sql`
    SELECT * FROM users
    WHERE id = ${id}
  `;
  return rows[0];
};

export const create = async (
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
  const { rows } = await sql`
    INSERT INTO users (
      name, position, email, socials, description, experience,
      education, projects, technologyStack, media, motivation,
      cvType, grade, workDirection, isEnabled
    )
    VALUES (
      ${name}, ${position}, ${email}, ${socials}, ${description}, ${experience},
      ${education}, ${projects}, ${technologyStack}, ${media}, ${motivation},
      ${cvType}, ${grade}, ${workDirection}, ${isEnabled}
    )
    RETURNING *
  `;
  return rows[0];
};

export const deleteById = async (id) => {
  await sql`
    DELETE FROM users
    WHERE id = ${id}
  `;
  return { id };
};

export const update = async (
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
  const { rows } = await sql`
    UPDATE users
    SET name = ${name}, position = ${position}, email = ${email},
        socials = ${socials}, description = ${description},
        experience = ${experience}, education = ${education},
        projects = ${projects}, technologyStack = ${technologyStack},
        media = ${media}, motivation = ${motivation},
        cvType = ${cvType}, grade = ${grade},
        workDirection = ${workDirection}, isEnabled = ${isEnabled}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
};

export const getNextUserID = async () => {
  const { rows } = await sql`SELECT MAX(id) AS maxId FROM users`;
  return rows[0].maxId ? rows[0].maxId + 1 : 1;
};
