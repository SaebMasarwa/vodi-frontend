import * as yup from "yup";

export const profileInitialValuesObj = {
  name: "",
  email: "",
};

export const profileValidationSchemaObj = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
});
