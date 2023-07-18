import Technologies from "models/Technologies";

const handler = async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const name = body.name;

      if (name) {
        try {
          await Technologies.create(name);
          res.status(201).json({ message: "Technology created successfully" });
        } catch (error) {
          console.error("Error creating technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Name is required" });
      }
      break;

    case "GET":
      try {
        const technologies = await Technologies.findAll();
        res.status(200).json(technologies);
      } catch (error) {
        console.error("Error fetching technologies:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
