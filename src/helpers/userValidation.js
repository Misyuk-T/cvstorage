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
  technologyStack: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.number().required("Technology value is required"),
        label: yup.string().required("Technology label is required"),
      }),
    )
    .min(1, "At least one technology must be selected"),
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
});

export default schema;
