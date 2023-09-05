import Users from "models/User";

import { isValidClientSecret } from "@/helpers/isValidClientSecret";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req, res) => {
  const { method, query, headers, body } = req;
  const id = query.userId;

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

    case "GET":
      try {
        const user = await Users.findById(id);

        if (user) {
          res.status(200).json({
            ...user,
            socials: JSON.parse(user.socials),
            projects: JSON.parse(user.projects),
            softSkills: JSON.parse(user.softSkills),
            languages: JSON.parse(user.languages),
            hardSkills: JSON.parse(user.hardSkills),
            experienceSkills: JSON.parse(user.experienceSkills),
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
        if (!isValidClientSecret(headers.authorization)) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const {
          name,
          position,
          experience,
          socials,
          description,
          projects,
          softSkills,
          languages,
          hardSkills,
          experienceSkills,
          cvType,
          grade,
          workDirection,
          isEnabled,
        } = body;

        try {
          const updatedUser = await Users.update(
            id,
            name,
            position,
            experience,
            JSON.stringify(socials),
            description,
            JSON.stringify(projects),
            JSON.stringify(softSkills),
            JSON.stringify(languages),
            JSON.stringify(hardSkills),
            JSON.stringify(experienceSkills),
            cvType,
            grade,
            workDirection,
            isEnabled === "true" ? 1 : 0,
          );

          res.status(200).json({
            ...updatedUser,
            socials: JSON.parse(updatedUser.socials),
            projects: JSON.parse(updatedUser.projects),
            softSkills: JSON.parse(updatedUser.softSkills),
            languages: JSON.parse(updatedUser.languages),
            hardSkills: JSON.parse(updatedUser.hardSkills),
            experienceSkills: JSON.parse(updatedUser.experienceSkills),
          });
        } catch (error) {
          console.error("Error updating user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      try {
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
