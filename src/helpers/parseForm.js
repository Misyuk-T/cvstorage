import { Storage } from "@google-cloud/storage";
import formidable from "formidable";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

export const parseForm = async (req, userId) => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 1,
    });

    const files = {};

    form.on("fileBegin", function (name, file) {
      const fileExtension = file.name.split(".").pop();
      const uniqueFileName = `${userId}-${Date.now()}.${fileExtension}`;
      const bucket = storage.bucket(process.env.BUCKET_NAME);
      const fileUpload = bucket.file(uniqueFileName);
      file.path = fileUpload.createWriteStream();
      files.media = fileUpload;
    });

    form.parse(req, async function (err, fields) {
      if (err) {
        reject(err);
      } else {
        console.log("fields", { ...fields, media: files.media?.name || "" });
        resolve({
          fields: { ...fields, media: files.media?.name || "" },
        });
      }
    });
  });
};

export const deleteUserMedia = async (userId) => {
  const bucket = storage.bucket(process.env.BUCKET_NAME);

  try {
    const [files] = await bucket.getFiles({
      prefix: `${userId}-`,
    });

    await Promise.all(files.map((file) => file.delete()));
  } catch (error) {
    console.error("Error deleting user media:", error.message);
    throw error;
  }
};
