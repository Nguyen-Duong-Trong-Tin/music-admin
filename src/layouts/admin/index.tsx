import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Footer from "../../partials/footer";
import Header from "../../partials/header";
import PartialMenu from "../../partials/partialMenu";

import loginExpireHelper from "../../helpers/loginExpire";

import "./admin.css";

function LayoutAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      await loginExpireHelper(navigate);
    }
    fetchApi();
  }, [navigate]);

  return (
    <div className="layout-admin">
      <div className="layout-left">
        <PartialMenu />
      </div>

      <div className="layout-right">
        <Header />

        <main className="main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LayoutAdmin;