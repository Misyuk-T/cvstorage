import Users from "models/User";
import { deleteUserMedia } from "@/helpers/parseForm";

const handler = async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        const id = query.userId;
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
        const id = query.userId;
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
          relativePath,
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

        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        const id = query.userId;
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
