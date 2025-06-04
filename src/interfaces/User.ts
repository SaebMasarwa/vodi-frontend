import { JwtPayload } from "jwt-decode";

// User type for user data in registeration and login
export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};
export type UserEditType = {
  _id?: string;
  name: string;
  email: string;
};
// User type for user data in JWT token
export interface UserToken extends JwtPayload {
  _id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
