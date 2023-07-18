import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Technology Name is required"),
});

export default schema;
