import Users from "models/User";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req, res) => {
  Users.createTable();

  const { method, headers, body } = req;

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

        console.log(body, "body");

        try {
          const newUser = await Users.create(
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

          res.status(201).json({
            ...newUser,
            socials: JSON.parse(newUser.socials),
            projects: JSON.parse(newUser.projects),
            softSkills: JSON.parse(newUser.softSkills),
            languages: JSON.parse(newUser.languages),
            hardSkills: JSON.parse(newUser.hardSkills),
            experienceSkills: JSON.parse(newUser.experienceSkills),
          });
        } catch (error) {
          console.error("Error creating user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
      try {
        const users = await Users.findAll();
        const parsedUsers = users.map((user) => ({
          ...user,
          socials: JSON.parse(user.socials),
          projects: JSON.parse(user.projects),
          softSkills: JSON.parse(user.softSkills),
          languages: JSON.parse(user.languages),
          hardSkills: JSON.parse(user.hardSkills),
          experienceSkills: JSON.parse(user.experienceSkills),
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
