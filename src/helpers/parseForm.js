import path, { join } from "path";
import { mkdir, stat } from "fs/promises";
import formidable from "formidable";
import mime from "mime";
import fs from "fs";

export const parseForm = async (req, userId) => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.cwd(), `/uploads/${userId}`);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        return `${part.name || "unknown"}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
      },
      filter: (part) => {
        return (
          part.name === "media" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    await form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export const deleteUserMedia = async (id) => {
  const folderPath = path.join(process.cwd(), "uploads", id);
  await fs.rmdir(folderPath, { recursive: true });
};
