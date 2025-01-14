import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import configs from "../configs";

import userService from "../services/user";

const loginExpireHelper = async (navigate: NavigateFunction) => {
  try {
    const response = await userService.getMe();

    if (response.status !== 200) {
      toast.error("Phiên đăng nhập hết hạn!");
      navigate(`/${configs.PATH_ADMIN}/auth/login`);
    }
  } catch {
    toast.error("Phiên đăng nhập hết hạn!");
    navigate(`/${configs.PATH_ADMIN}/auth/login`);
  }
}

export default loginExpireHelper;