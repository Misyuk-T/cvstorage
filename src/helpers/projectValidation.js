import * as yup from "yup";

export default yup.object().shape({
  projectName: yup.string().required("Project Name is required"),
  technologyStack: yup.string().required("Technology Stack is required"),
  description: yup.string().required("Description is required"),
});
