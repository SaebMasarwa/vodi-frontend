import { Form, Formik } from "formik";
import { FunctionComponent, useContext } from "react";
import {
  initialValuesObj,
  onSubmitObj,
  validationSchemaObj,
} from "../misc/registerFunction";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import InputField from "../components/InputField";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <>
      <Formik
        initialValues={initialValuesObj}
        validationSchema={validationSchemaObj}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onSubmitObj(values, setUser, navigate);
        }}
      >
        {({ handleReset, isValid, dirty }) => (
          <div className="container w-50">
            <h5 className="display-5 my-2">Register</h5>
            <Form className="d-flex flex-row flex-wrap justify-content-center">
              <InputField label="Name" name="name" />
              <InputField label="Email Address" type="email" name="email" />
              <InputField label="Password" type="password" name="password" />
              <div className="d-flex flex-row justify-content-center w-100">
                <button
                  className="btn btn-primary mt-3 col-6 me-2"
                  type="submit"
                  disabled={!isValid || !dirty}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-warning mt-3 p-2 col-6"
                  disabled={!isValid || !dirty}
                  onClick={() => {
                    handleReset();
                  }}
                >
                  Reset
                </button>
              </div>
            </Form>
            <p className="mt-4">
              <Link to="/">Already have an account? Log in</Link>
            </p>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Register;
