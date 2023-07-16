import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string(),
  position: yup.string(),
  email: yup.string().email("Invalid email address"),
  socials: yup.array().of(
    yup.object().shape({
      platform: yup.string(),
      url: yup.string().url("Invalid URL"),
    }),
  ),
  technologyStack: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.number(),
        label: yup.string(),
      }),
    )
    .min(1, "At least one technology must be selected"),
  description: yup.string(),
  isEnabled: yup.boolean(),
  experience: yup.array().of(
    yup.object().shape({
      companyName: yup.string(),
      timePeriod: yup.string(),
      description: yup.string(),
    }),
  ),
  education: yup.array().of(
    yup.object().shape({
      rank: yup.string(),
      description: yup.string(),
    }),
  ),
  projects: yup.array().of(
    yup.object().shape({
      projectId: yup.string(),
      achievements: yup.string(),
    }),
  ),
  motivation: yup.string(),
  cvType: yup.string(),
  grade: yup.string(),
  workDirection: yup.string(),
});

export default schema;
