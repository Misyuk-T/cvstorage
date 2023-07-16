import { mkdir, stat } from "fs/promises";
import { join } from "path";
import formidable from "formidable";
import mime from "mime";
import * as dateFn from "date-fns";

import Users from "models/User";
import * as path from "path";

Users.createTable();

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (req) => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.cwd(),
      `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`,
    );

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        return `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
      },
      filter: (part) => {
        return (
          part.name === "media" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    await form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const formik = await parseForm(req);
        const { fields, files } = formik;

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
          isEnabled: [isEnabled],
        } = fields;
        const mediaFile = files.media;
        const absolutePath = mediaFile[0].filepath;
        const workingDirectory = process.cwd();
        const relativePath = path.relative(workingDirectory, absolutePath);

        try {
          await Users.create(
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
            isEnabled,
          );

          res.status(201).json({ message: "User created successfully" });
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
      const id = body?.id;

      try {
        if (id) {
          const user = await Users.findById(id);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } else {
          const users = await Users.findAll();
          res.status(200).json(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "PUT":
      try {
        const {
          id,
          name,
          email,
          position,
          socials,
          description,
          experience,
          education,
          projects,
          technologyStack,
          isEnabled,
        } = body;

        await Users.update(
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
          isEnabled,
        );

        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        const id = body.id;
        await Users.deleteById(id);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
