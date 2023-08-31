import { sql } from "@vercel/postgres";

import { createTable, create } from "models/User";

import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const initializeApp = async () => {
  await createTable();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method, headers } = req;

  await initializeApp();

  switch (method) {
    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS, PATCH, DELETE, POST, PUT",
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Accept",
      );
      res.status(204).end();
      break;

    case "POST":
      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const {
        name,
        email,
        position,
        socials,
        description,
        experience,
        education,
        projects,
        technologyStack,
        motivation,
        cvType,
        grade,
        workDirection,
        isEnabled,
      } = req.body;

      try {
        const newUser = await create(
          name,
          position,
          email,
          JSON.parse(socials),
          description,
          JSON.parse(experience),
          JSON.parse(education),
          JSON.parse(projects),
          JSON.parse(technologyStack),
          motivation,
          cvType,
          grade,
          workDirection,
          isEnabled === "true" ? 1 : 0,
        );

        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      try {
        const { rows } = await sql`SELECT * FROM users`;
        const users = rows.map((user) => ({
          ...user,
          socials: JSON.parse(user.socials),
          experience: JSON.parse(user.experience),
          education: JSON.parse(user.education),
          projects: JSON.parse(user.projects),
          technologyStack: JSON.parse(user.technologyStack),
        }));
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
