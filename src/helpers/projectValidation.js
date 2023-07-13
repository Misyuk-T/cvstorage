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
});

export default schema;
