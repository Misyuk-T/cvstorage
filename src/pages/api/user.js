import formidable from "formidable";
import fs from "fs";
import path from "path";

import Users from "models/User";

Users.createTable();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const form = formidable({ multiples: false });

        await form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Error parsing form data:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
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
              isEnabled,
            } = fields;

            // Access the uploaded file using files.avatar
            const avatarFile = files.avatar;

            console.log(files, "files.avatar");

            try {
              const user = await Users.create(
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
                avatarFile.path, // Assuming you want to store the file path in the database
              );

              // Read the file contents
              const fileContents = fs.readFileSync(avatarFile.path);

              // Specify the destination path to save the file
              const destinationPath = path.join(
                __dirname,
                "path_to_save_avatar",
                avatarFile.name,
              );

              // Save the file to the destination path
              fs.writeFileSync(destinationPath, fileContents);

              res.status(201).json({ message: "User created successfully" });
            } catch (error) {
              console.error("Error creating user:", error.message);
              res.status(500).json({ error: "Internal Server Error" });
            }
          }
        });
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
