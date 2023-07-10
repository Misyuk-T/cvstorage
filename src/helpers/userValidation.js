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
      platform: yup.string().required("Social platform is required"),
      url: yup.string().url("Invalid URL").required("URL is required"),
    }),
  ),
  description: yup.string(),
  experience: yup.array().of(
    yup.object().shape({
      companyName: yup.string().required("Company name is required"),
      timePeriod: yup.string().required("Time period is required"),
      description: yup.string(),
    }),
  ),
  education: yup.array().of(
    yup.object().shape({
      rank: yup.string().required("Rank is required"),
      description: yup.string(),
    }),
  ),
  projects: yup.array().of(
    yup.object().shape({
      projectId: yup.string().required("Project ID is required"),
      projectName: yup.string().required("Project name is required"),
      stackTechnologies: yup.string(),
      description: yup.string(),
      achievements: yup.string(),
    }),
  ),
});

export default schema;
