import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  position: yup.string().required("Position is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  socials: yup.array().of(
    yup.object().shape({
      platform: yup.string().required("Platform is required"),
      url: yup.string().url("Invalid URL").required("URL is required"),
    }),
  ),
  technologyStack: yup.array().of(
    yup.object().shape({
      technologyId: yup.string().required("Technology value is required"),
      level: yup.string().required("Technology label is required"),
    }),
  ),
  description: yup.string().required("Description is required"),
  isEnabled: yup.boolean().required("Enabled is required"),
  experience: yup.array().of(
    yup.object().shape({
      companyName: yup.string().required("Company name is required"),
      timePeriod: yup.string().required("Time period is required"),
      description: yup.string().required("Description is required"),
    }),
  ),
  education: yup.array().of(
    yup.object().shape({
      rank: yup.string().required("Rank is required"),
      description: yup.string().required("Education description is required"),
    }),
  ),
  projects: yup.array().of(
    yup.object().shape({
      projectId: yup.string().required("Project ID is required"),
      achievements: yup.string().required("Achievements is required"),
    }),
  ),
  motivation: yup.string(),
  cvType: yup.string().required("CV Type is required"),
  grade: yup.string().required("Grade is required"),
  workDirection: yup.string().required("Work direction is required"),
  media: yup
    .mixed()
    .test("is-valid-media", "Max size limit 4mb", function (value) {
      const type = typeof value;

      if (type !== "string" && type !== "object") {
        // If the value is empty, it's not a valid media.
        return false;
      }
      console.log(value);

      if (type === "object") {
        // Get the file size in bytes from the 'size' property of the file object.
        const fileSizeInBytes = value[0].size;

        // Define the maximum size in bytes (4MB).
        const maxFileSizeInBytes = 4 * 1024 * 1024;

        return fileSizeInBytes <= maxFileSizeInBytes;
      }

      // If it's a string (image URL), we don't need to validate its size.
      return true;
    }),
});

export default schema;
