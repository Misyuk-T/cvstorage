import * as path from "path";
import { sql } from "@vercel/postgres";

import { createTable, getNextUserID, create } from "models/User";

import { parseForm } from "@/helpers/parseForm";
import { formatPath } from "@/helpers/formatPath";
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

  if (!isValidClientSecret(headers.authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  switch (method) {
    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Accept",
      );
      res.status(204).end();
      break;

    case "POST":
      try {
        const nextUserID = await getNextUserID();
        const parsedForm = await parseForm(req, nextUserID);
        const { fields, files } = parsedForm;

        const {
          name: [name],
          email: [email],
          position: [position],
          socials: [socials],
          description: [description],
          experience: [experience],
          education: [education],
          projects: [projects],
          technologyStack: [technologyStack],
          motivation: [motivation],
          cvType: [cvType],
          grade: [grade],
          workDirection: [workDirection],
          isEnabled: [isEnabled],
        } = fields;
        const mediaFile = files?.media;
        const absolutePath =
          (mediaFile && mediaFile[0]?.filepath) || "public/default_avatar.png";
        const workingDirectory = process.cwd();
        const relativePath = formatPath(
          path.relative(workingDirectory, absolutePath),
        );

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
            relativePath,
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
      } catch (error) {
        console.error("Error processing file upload:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
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
