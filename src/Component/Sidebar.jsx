import { Link, useLocation } from "react-router-dom";
import logo from "./../assets/images/logo-light.png";
import { useUserContext } from "../hooks/userContext";
function Sidebar() {
  const { pathname } = useLocation();
  const { userType } = useUserContext();
  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <Link to={"/dashboard"} className="logo logo-dark">
          <span className="logo-sm">
            <img src={logo} alt="" height="80" />
          </span>
          <span className="logo-lg">
            <img src={logo} alt="" height="75" />
          </span>
        </Link>

        <Link to={"/dashboard"} className="logo logo-light">
          <span className="logo-sm">
            <img src={logo} alt="" height="80" />
          </span>
          <span className="logo-lg">
            <img src={logo} alt="" height="75" />
          </span>
        </Link>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Menu</span>
            </li>
            <li className="nav-item">
              <Link
                className={`${
                  pathname === "/dashboard"
                    ? "nav-link menu-link active"
                    : "nav-link menu-link "
                } `}
                to={"/dashboard"}
              >
                <i className="ri-dashboard-2-line"></i>{" "}
                <span data-key="t-dashboards">Dashboards</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/complaint-list"
                className={`${
                  pathname === "/complaint-list"
                    ? "nav-link menu-link active"
                    : "nav-link menu-link "
                } `}
              >
                <i className="ri-apps-2-line"></i>{" "}
                <span data-key="t-apps">Complaints</span>
              </Link>
              
            </li>
            <li className="nav-item">
              <Link
                to="/shutdown-list"
                className={`${
                  pathname === "/shutdown-list"
                    ? "nav-link menu-link active"
                    : "nav-link menu-link "
                } `}
              >
                <i className="ri-apps-2-line"></i>{" "}
                <span data-key="t-apps">Shutdown</span>
              </Link>
              
            </li> */}
            {userType !== "admin" && (
              <li className="nav-item">
                <Link
                  to="/gang-list"
                  className={`${
                    pathname === "/gang-list"
                      ? "nav-link menu-link active"
                      : "nav-link menu-link "
                  } `}
                >
                  <i className="ri-apps-2-line"></i>{" "}
                  <span data-key="t-apps">Gang Management</span>
                </Link>
              </li>
            )}
            {userType === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/category-list"
                    className={`${
                      pathname === "/category-list"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-tools-fill"></i>{" "}
                    <span data-key="t-apps">Gang Category</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/equipment-list"
                    className={`${
                      pathname === "/equipment-list"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-shield-line"></i>
                    <span data-key="t-apps">Safety Equipment</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/item-list"
                    className={`${
                      pathname === "/item-list"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-file-text-line"></i>
                    <span data-key="t-apps">Consumable Items</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dispatcher-list"
                    className={`${
                      pathname === "/dispatcher-list"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-truck-line"></i>
                    <span data-key="t-apps">Dispatcher</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/feedback-master"
                    className={`${
                      pathname === "/feedback-master"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-feedback-line"></i>
                    <span data-key="t-apps">Feedback Master</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/role-master"
                    className={`${
                      pathname === "/role-master"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-profile-line"></i>
                    <span data-key="t-apps">Role Master</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/escalation-matrix"
                    className={`${
                      pathname === "/escalation-matrix"
                        ? "nav-link menu-link active"
                        : "nav-link menu-link "
                    } `}
                  >
                    <i className="ri-timer-line"></i>
                    <span data-key="t-apps">Escalation Matrix</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}
export default Sidebar;
