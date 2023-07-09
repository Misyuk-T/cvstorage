import Users from "models/User";

Users.createTable();

const handler = async (req, res) => {
  const name = req.body?.name,
    email = req.body?.email,
    id = req.body?.id;

  switch (req.method) {
    case "POST":
      if (name && email) {
        const { position, socials, description, experience, education } =
          req.body;

        try {
          await Users.create(
            name,
            position,
            email,
            socials,
            description,
            experience,
            education,
          );
          res.status(201).json({ message: "User created successfully" });
        } catch (error) {
          console.error("Error creating user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Name and email are required" });
      }
      break;

    case "GET":
      if (id) {
        try {
          const user = await Users.findById(id);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          console.error("Error fetching user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        try {
          const users = await Users.findAll();
          res.status(200).json(users);
        } catch (error) {
          console.error("Error fetching users:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      break;

    case "DELETE":
      if (id) {
        try {
          await Users.deleteById(id);
          res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Error deleting user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "User ID is required" });
      }
      break;

    case "PUT":
      if (id && name && email) {
        const { position, socials, description, experience, education } =
          req.body;

        try {
          await Users.update(
            id,
            name,
            position,
            email,
            socials,
            description,
            experience,
            education,
          );
          res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
          console.error("Error updating user:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "ID, name, and email are required" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
