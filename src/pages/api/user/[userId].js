import path from "path";

import Users from "models/User";
import { deleteUserMedia, parseForm } from "@/helpers/parseForm";
import { formatPath } from "@/helpers/formatPath";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method, query } = req;
  const id = query.userId;

  switch (method) {
    case "GET":
      try {
        const user = await Users.findById(id);

        if (user) {
          res.status(200).json({
            ...user,
            socials: JSON.parse(user.socials),
            experience: JSON.parse(user.experience),
            education: JSON.parse(user.education),
            projects: JSON.parse(user.projects),
            technologyStack: JSON.parse(user.technologyStack),
          });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "PUT":
      try {
        const parsedForm = await parseForm(req, id);

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

        const updatedUser = await Users.update(
          id,
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

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        await deleteUserMedia(id);
        const deletedUser = await Users.deleteById(id);

        res.status(200).json(deletedUser);
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
