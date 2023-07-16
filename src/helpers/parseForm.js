import formidable from "formidable";

export const parseForm = async (req) => {
  return new Promise(async (resolve, reject) => {
    resolve({
      files: {},
      fields: {},
    });
  });
};
