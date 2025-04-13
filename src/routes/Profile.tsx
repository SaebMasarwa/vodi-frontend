import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Form, Formik } from "formik";
import { updateUser } from "../services/usersService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import {
  profileInitialValuesObj,
  profileValidationSchemaObj,
} from "../misc/profileFunctions";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const [userDisplayChange, setUserDisplayChange] = useState(false);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userDisplayChange]);
  return (
    <div>
      <h5 className="display-5 my-2">Profile - {user?.name}</h5>
      {user && (
        <div>
          <div className="card m-3">
            <div className="card-body d-flex flex-row justify-content-center align-items-center">
              <div>
                <h5 className="card-title">Name: {user?.name}</h5>
                <p className="card-text">
                  <i className="bi bi-envelope-at  me-2"></i>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <h5 className="display-5 my-2">Edit Profile </h5>
          <Formik
            initialValues={user ? user : profileInitialValuesObj}
            validationSchema={profileValidationSchemaObj}
            enableReinitialize={true}
            onSubmit={(userEdit, actions) => {
              if (user._id) {
                updateUser(user._id, {
                  name: userEdit.name,
                  email: userEdit.email,
                })
                  .then((res) => {
                    if (res) {
                      setUser(res.data);
                      navigate("/profile");
                      reactToastifySuccess("User updated successfully");
                    } else {
                      reactToastifyError("User update failed");
                    }
                  })
                  .catch((error) => {
                    reactToastifySuccess("User update failed");
                    console.log(error);
                  });
              }
              actions.setSubmitting(false);
            }}
          >
            {({ values, dirty }) => (
              <Form className="d-flex flex-row flex-wrap justify-content-center">
                <InputField label="Name" name="name" value={values.name} />
                <div className="d-flex flex-row justify-content-center w-100">
                  <button
                    className="btn btn-primary mt-3 col-5 me-2"
                    type="submit"
                    disabled={!dirty}
                    onClick={() => {
                      setUserDisplayChange(true);
                    }}
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
export default Profile;
