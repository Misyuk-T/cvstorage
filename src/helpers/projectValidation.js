import * as yup from "yup";

const schema = yup.object().shape({
  projectName: yup.string().required("Project Name is required"),
  technologyStack: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.number().required(),
        label: yup.string().required(),
      }),
    )
    .required("Technology Stack is required")
    .min(1, "At least one technology must be selected"),
  description: yup.string().required("Description is required"),
  link: yup.string().required("Link is required"),
  nda: yup.boolean().required("NDA field is required"),
  teamSize: yup
    .number()
    .typeError("Team Size must be a number")
    .required("Team Size is required")
    .positive("Team Size must be a positive number"),
});

export default schema;
