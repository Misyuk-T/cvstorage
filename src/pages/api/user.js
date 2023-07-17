import * as path from "path";
import Users from "models/User";
import { deleteUserMedia, parseForm } from "@/helpers/parseForm";

const initializeApp = () => {
  Users.createTable();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method, body } = req;

  await initializeApp();

  switch (method) {
    case "POST":
      try {
        const nextUserID = await Users.getNextUserID();
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
            motivation,
            cvType,
            grade,
            workDirection,
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
          motivation,
          cvType,
          grade,
          workDirection,
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
          motivation,
          cvType,
          grade,
          workDirection,
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
        await deleteUserMedia(id);
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
