import { FunctionComponent, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { UserContext } from "../context/userContext";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import {
  deleteUser,
  getAllUsers,
  updateUserAdminRole,
} from "../services/usersService";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [usersListChanged, setUsersListChanged] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [adminRole, setAdminRole] = useState(false);

  const fetchData = async () => {
    getAllUsers()
      .then((res) => {
        if (res) {
          setUsers(res.data);
        } else {
          reactToastifyError("Failed to fetch users, unauthorized");
        }
      })
      .catch(() => {
        reactToastifyError("Failed to fetch users, error occurred");
      });
  };

  const handleAdminRole = async (userId: string) => {
    updateUserAdminRole(userId)
      .then((res) => {
        if (res) {
          reactToastifySuccess("User role updated successfully");
        } else {
          reactToastifyError("Failed to update user role");
        }
      })
      .catch(() => {
        reactToastifyError("Failed to update user role");
      });
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchData();
    } else {
      reactToastifyError("Unauthorized, reditrecting to home page");
      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersListChanged]);
  return (
    <>
      {user?.isAdmin ? (
        <>
          <div className="display-3">Admin - {user?.name}</div>
          <table className="table table-striped table-hover table-bordered w-75 mx-auto my-3">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userList: User) => {
                return (
                  <>
                    {
                      <tr key={userList._id}>
                        <td>{userList.name}</td>
                        <td>{userList.email}</td>
                        <td>
                          {user.isAdmin ? (
                            <div className="form-check flex justify-content-center align-items-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked
                                readOnly
                                onClick={() => {
                                  if (user._id) {
                                    handleAdminRole(user._id);
                                  }
                                  setAdminRole(false);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Admin
                              </label>
                            </div>
                          ) : (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                onClick={() => {
                                  if (user._id) {
                                    handleAdminRole(user._id);
                                  }
                                  setAdminRole(true);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Admin
                              </label>
                            </div>
                          )}
                        </td>
                        <td>
                          {
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                window.confirm(
                                  "Are you sure you want to delete this user?"
                                );
                                deleteUser(user._id as string);
                                setUsersListChanged(true);
                              }}
                            >
                              Delete
                            </button>
                          }
                        </td>
                      </tr>
                    }
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="alert alert-danger m-4" role="alert">
          You are not authorized to view this page.
        </div>
      )}
    </>
  );
};

export default Dashboard;
