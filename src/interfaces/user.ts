import IBase from "./base";

import { EUserRole, EUserStatus } from "../enums/user";

interface IUser extends IBase {
  fullName: string;
  email: string;
  password: string;
  slug: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
}

export default IUser;