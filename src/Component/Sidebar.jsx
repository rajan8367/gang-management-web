import { Link, useLocation } from "react-router-dom";
import logo from "./../assets/images/logo-light.png";
function Sidebar() {
  const { pathname } = useLocation();
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
            <li className="nav-item">
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
              {/* <div className="collapse menu-dropdown" id="sidebarApps">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/complaint-list"
                      className={`${
                        pathname === "/complaint-list"
                          ? "nav-link menu-link active"
                          : "nav-link menu-link "
                      } `}
                      data-key="t-calendar"
                    >
                      Complaint List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="complaint-list.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      In Progress{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="complaint-list.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      Resolved{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="complaint-list.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      Hold{" "}
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      href="map-view.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      Map View{" "}
                    </a>
                  </li>
                </ul>
              </div> */}
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
              {/* <a
                className="nav-link menu-link"
                href="#sidebarSd"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarApps"
              >
                <i className="ri-apps-2-line"></i>{" "}
                <span data-key="t-apps">Shutdown</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarSd">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="shutdown-list.html"
                      className="nav-link"
                      data-key="t-calendar"
                    >
                      {" "}
                      All{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="shutdown-list.html"
                      className="nav-link"
                      data-key="t-calendar"
                    >
                      {" "}
                      Requested{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="shutdown-list.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      Apporved{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="shutdown-list.html"
                      className="nav-link"
                      data-key="t-chat"
                    >
                      {" "}
                      Cancled{" "}
                    </a>
                  </li>
                </ul>
              </div> */}
            </li>
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
            {/* <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarLayouts"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLayouts"
              >
                <i className="ri-account-circle-line"></i>{" "}
                <span data-key="t-layouts">Consumer </span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarLayouts">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a
                      href="layouts-horizontal.html"
                      target="_blank"
                      className="nav-link"
                      data-key="t-horizontal"
                    >
                      New Connection
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="layouts-detached.html"
                      target="_blank"
                      className="nav-link"
                      data-key="t-detached"
                    >
                      Unpaid List
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="layouts-two-column.html"
                      target="_blank"
                      className="nav-link"
                      data-key="t-two-column"
                    >
                      Service Request
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="menu-title">
              <i className="ri-more-fill"></i>{" "}
              <span data-key="t-pages">Master</span>
            </li>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarAuth"
              >
                <i className="ri-account-circle-line"></i>{" "}
                <span data-key="t-authentication">Zone</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarPages"
              >
                <i className="ri-pages-line"></i>{" "}
                <span data-key="t-pages">Circle</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="ri-rocket-line"></i>{" "}
                <span data-key="t-landing">Division</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="ri-rocket-line"></i>{" "}
                <span data-key="t-landing">Sub Division</span>
              </a>
            </li>

            <li className="menu-title">
              <i className="ri-more-fill"></i>{" "}
              <span data-key="t-components">Settings</span>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="ri-rocket-line"></i>{" "}
                <span data-key="t-landing">FAQ</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="ri-rocket-line"></i>{" "}
                <span data-key="t-landing">Help</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarLanding"
              >
                <i className="ri-rocket-line"></i>{" "}
                <span data-key="t-landing">Logout</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}
export default Sidebar;
