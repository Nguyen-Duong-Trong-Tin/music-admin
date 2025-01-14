import ILogin from "../interfaces/login";
import IResponse from "../interfaces/response";
import IUser from "../interfaces/user";

import request from "../utils/request";

const get = async ({ role }: {
  role?: string
}) => {
  let path = "/users/get?";
  if (role) {
    path += "role=" + role;
  }

  const users = await request.get<IResponse<IUser[]>>(path);
  return users;
}

const getMe = async () => {
  const user = await request.get<IResponse<ILogin>>("/users/get/me");
  return user;
}

const login = async (email: string, password: string) => {
  const user = await request.post<IResponse<ILogin>>("/users/login", { email, password });
  return user;
}

const userService = {
  get,
  getMe,
  login
};
export default userService;