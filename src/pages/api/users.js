import Users from "models/User";

Users.createTable();

export default async function handler(req, res) {
  console.log(req.method, req.method === "POST", "req.metho");

  if (req.method === "POST") {
    const { name, email } = req.body;
    if (name && email) {
      try {
        await Users.create(name, email);
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ error: "Name and email are required" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
