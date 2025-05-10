import axios from "axios";
import { User, UserEditType } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../interfaces/User";

const api: string = `${import.meta.env.VITE_APP_API}/users`;

// User login
export async function loginUser(email: string, password: string) {
  return await axios.post(`${api}/login`, { email, password });
}

// Register user
export async function registerUser(user: User) {
  return await axios.post(api, user);
}

// Get current user
export async function getCurrentUserById() {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<UserToken>(token as string);
    const userId = decoded._id;
    const user = await axios.get(`${api}/${userId}`, {
      headers: {
        Authorization: token,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const token = localStorage.getItem("token");
    const users = await axios.get(api, {
      headers: {
        Authorization: token,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const token = localStorage.getItem("token");
    const user = await axios.delete(`${api}/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Update user
export async function updateUser(userId: string, user: UserEditType) {
  try {
    const token = localStorage.getItem("token");
    const updatedUser = await axios.put(`${api}/${userId}`, user, {
      headers: {
        Authorization: token,
      },
    });
    console.log(updatedUser);

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// Update user admin role
export async function updateUserAdminRole(userId: string) {
  try {
    const token = localStorage.getItem("token");
    const updatedUser = await axios.patch(
      `${api}/${userId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
