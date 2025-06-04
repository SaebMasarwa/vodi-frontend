import * as yup from "yup";
import {
  getCurrentUserById,
  loginUser,
  registerUser,
} from "../services/usersService";
import { reactToastifySuccess, reactToastifyError } from "./reactToastify";
import { User } from "../interfaces/User";

export const initialValuesObj = {
  name: "",
  email: "",
  password: "",
  isAdmin: false,
};

export const validationSchemaObj = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){4,})(?=.*[*_\-&^%$#@!]).{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, 1 special character of theses charcters (*_-&^%$#@!) and must be at least 8 characters long"
    )
    .min(8),
});

export const onSubmitObj = (
  values: User,
  setUser: (user: User | null) => void,
  navigate: (arg0: string) => void
) => {
  console.log("Register" + JSON.stringify(values));
  registerUser(values)
    // .then((res) => {})
    .then(() => {
      loginUser(values.email, values.password)
        .then((res) => {
          if (res.data.length) {
            localStorage.setItem("token", res.data);
            getCurrentUserById().then((res) => {
              if (res) {
                setUser(res.data);
                reactToastifySuccess(
                  "Registration & Login successful, redirected to home page"
                );
                navigate("/");
              }
            });
          } else {
            reactToastifyError("No such user");
          }
        })
        .catch((err) => {
          reactToastifyError("Login failed");
          console.log(err);
        });
    })
    .catch((err) => {
      reactToastifyError("Registeration failed");
      console.log(err);
    });
};
