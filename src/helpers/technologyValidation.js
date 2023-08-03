import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Technology Name is required"),
  type: yup.string().required("Technology Type is required"),
});

export default schema;
