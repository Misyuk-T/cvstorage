import * as path from "path";
import Users from "models/User";
import { parseForm } from "@/helpers/parseForm";

const initializeApp = () => {
  Users.createTable();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method } = req;

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
        const mediaFile = files?.media;
        const absolutePath =
          (mediaFile && mediaFile[0]?.filepath) || "public/default_avatar.png";
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
      try {
        const users = await Users.findAll();
        const parsedUsers = users.map((user) => ({
          ...user,
          socials: JSON.parse(user.socials),
          experience: JSON.parse(user.experience),
          education: JSON.parse(user.education),
          projects: JSON.parse(user.projects),
          technologyStack: JSON.parse(user.technologyStack),
        }));
        res.status(200).json(parsedUsers);
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
