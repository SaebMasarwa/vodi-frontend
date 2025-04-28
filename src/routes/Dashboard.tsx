import { FunctionComponent, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { UserContext } from "../context/userContext";
import { reactToastifyError } from "../misc/reactToastify";
import { deleteUser, getAllUsers } from "../services/usersService";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [usersListChanged, setUsersListChanged] = useState(false);

  const fetchData = async () => {
    getAllUsers()
      .then((res) => {
        if (res) {
          console.log(res.data);
          setUsers(res.data);
        } else {
          reactToastifyError("Failed to fetch users");
        }
      })
      .catch(() => {
        reactToastifyError("Failed to fetch users");
      });
  };

  useEffect(() => {
    console.log(user);

    if (user?.isAdmin) {
      fetchData();
    } else {
      reactToastifyError("Unauthorized, reditrecting to home page");
      setTimeout(() => {
        window.location.replace("/");
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersListChanged]);
  return (
    <>
      <div className="display-3">Admin - {user?.name}</div>
      {user?.isAdmin ? (
        <table className="table table-striped table-hover table-bordered w-75 mx-auto my-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <>
                  {user?.isAdmin ? (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Yes" : "No"}</td>
                      <td>
                        {user.isAdmin ? (
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
                        ) : (
                          <button className="btn btn-danger" disabled>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <div></div>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-danger" role="alert">
          You are not authorized to view this page.
        </div>
      )}
    </>
  );
};

export default Dashboard;
