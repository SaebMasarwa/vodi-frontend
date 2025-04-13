import { FunctionComponent, useContext, useEffect } from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { getCurrentUserById, loginUser } from "../services/usersService";
import { UserContext } from "../context/userContext";
import { User } from "../interfaces/User";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate: NavigateFunction = useNavigate();

  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: ({ email, password }: FormikValues) => {
      loginUser(email, password)
        .then((res: { data: string | unknown[] }) => {
          if (res.data.length) {
            localStorage.setItem("token", res.data as string);
            getCurrentUserById().then((res) => {
              if (res && res.data) {
                setUser(res.data as User);
                reactToastifySuccess("Login successful");
                navigate("/");
              }
            });
          } else {
            reactToastifyError("No such user");
          }
        })
        .catch((err: unknown) => {
          reactToastifyError("Login failed");
          console.log(err);
        });
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-md w-50">
      <h5 className="display-5 my-2">Login</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
          {formik.touched.email &&
            formik.errors.email &&
            typeof formik.errors.email === "string" && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
          {formik.touched.password &&
            formik.errors.password &&
            typeof formik.errors.password === "string" && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
        </div>
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Login
        </button>
      </form>
      <p className="mt-3">
        <Link to="/register">New user? Register now</Link>
      </p>
    </div>
  );
};

export default Login;
