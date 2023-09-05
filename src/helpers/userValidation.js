import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  position: yup.string().required("Position is required"),
  experience: yup.string().required(),
  socials: yup.array().of(
    yup.object().shape({
      platform: yup.string().required("Platform is required"),
      url: yup.string().required("URL is required"),
    }),
  ),
  hardSkills: yup.array().of(
    yup.object().shape({
      technologyId: yup.string().required("Technology value is required"),
      level: yup.string().required("Technology label is required"),
    }),
  ),
  softSkills: yup.array().of(
    yup.object().shape({
      technologyId: yup.string().required("Technology value is required"),
      level: yup.string().required("Technology label is required"),
    }),
  ),
  languages: yup.array().of(
    yup.object().shape({
      technologyId: yup.string().required("Technology value is required"),
      level: yup.string().required("Technology label is required"),
    }),
  ),
  experienceSkills: yup.array().of(
    yup.object().shape({
      technologyId: yup.string().required("Technology value is required"),
      level: yup.string().required("Technology label is required"),
    }),
  ),
  description: yup.string().required("Description is required"),
  isEnabled: yup.boolean().required("Enabled is required"),
  projects: yup.array().of(
    yup.object().shape({
      projectId: yup.string().required("Project ID is required"),
      role: yup.string().required("Project ID is required"),
      achievements: yup.string().required("Achievements is required"),
    }),
  ),
  cvType: yup.string().required("CV Type is required"),
  grade: yup.string().required("Grade is required"),
  workDirection: yup.string().required("Work direction is required"),
});

export default schema;
