import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import cookieHelper from "../../../helpers/cookie";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    cookieHelper.del("accessToken");
    navigate("/admin/auth/login");
  }

  return (
    <>
      <Button type="primary" className="button-danger" onClick={handleLogout}>Đăng xuất</Button>
    </>
  );
}

export default Logout;