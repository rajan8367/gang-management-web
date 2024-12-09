import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/userContext";
import avatar from "./../assets/images/users/avatar-7.jpg";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const { user, setUser, setToken, userType, setUserType } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (userData === null && token === null) {
      navigate("/", { replace: true });
    } else {
      setUser(JSON.parse(userData));
      setToken(token);
      setUserType(userType);
    }
  }, [pathname]);
  const logout = () => {
    localStorage.clear();
    setUser({});
    navigate("/", { replace: true });
  };

  //if (!loggedIn) return <Loader />;

  return (
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <form className="app-search d-none d-md-block">
                {/* <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                  />
                  <span className="mdi mdi-magnify search-widget-icon"></span>
                  <span
                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                    id="search-close-options"
                  ></span>
                </div> */}
                <div
                  className="dropdown-menu dropdown-menu-lg"
                  id="search-dropdown"
                ></div>
              </form>
            </div>

            <div className="d-flex align-items-center">
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src={avatar}
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span
                        className="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                        style={{ textTransform: "capitalize" }}
                      >
                        {user?.name}
                      </span>
                      <span
                        className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
                        style={{ textTransform: "capitalize" }}
                      >
                        {userType}
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome {userType}!</h6>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/change-password")}
                  >
                    <i className="mdi mdi-lock-reset text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle" data-key="t-logout">
                      Change Password
                    </span>
                  </button>
                  <button className="dropdown-item" onClick={logout}>
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Header;
