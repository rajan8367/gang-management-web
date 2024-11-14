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
                >
                  <div data-simplebar style={{ maxHeight: "320px" }}>
                    <div className="dropdown-header">
                      <h6 className="text-overflow text-muted mb-0 text-uppercase">
                        Recent Searches
                      </h6>
                    </div>

                    <div className="dropdown-item bg-transparent text-wrap">
                      <a
                        href="index-2.html"
                        className="btn btn-soft-secondary btn-sm btn-rounded"
                      >
                        how to setup <i className="mdi mdi-magnify ms-1"></i>
                      </a>
                      <a
                        href="index-2.html"
                        className="btn btn-soft-secondary btn-sm btn-rounded"
                      >
                        buttons <i className="mdi mdi-magnify ms-1"></i>
                      </a>
                    </div>
                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-1 text-uppercase">
                        Pages
                      </h6>
                    </div>
                    <a href="#" className="dropdown-item notify-item">
                      <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                      <span>Analytics Dashboard</span>
                    </a>
                    <a href="#" className="dropdown-item notify-item">
                      <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                      <span>Help Center</span>
                    </a>
                    <a href="#" className="dropdown-item notify-item">
                      <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                      <span>My account settings</span>
                    </a>
                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-2 text-uppercase">
                        Members
                      </h6>
                    </div>

                    <div className="notification-list">
                      <a href="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="assets/images/users/avatar-2.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-1">
                            <h6 className="m-0">Angela Bernier</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Manager
                            </span>
                          </div>
                        </div>
                      </a>{" "}
                      /
                      <a href="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="assets/images/users/avatar-3.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-1">
                            <h6 className="m-0">David Grasso</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Web Designer
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="assets/images/users/avatar-5.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-1">
                            <h6 className="m-0">Mike Bunch</h6>
                            <span className="fs-11 mb-0 text-muted">
                              React Developer
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="text-center pt-3 pb-1">
                    <a
                      href="pages-search-results.html"
                      className="btn btn-primary btn-sm"
                    >
                      View All Results{" "}
                      <i className="ri-arrow-right-line ms-1"></i>
                    </a>
                  </div>
                </div>
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

              <div className="dropdown topbar-head-dropdown ms-1 header-item">
                {/* <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-category-alt fs-22"></i>
                </button> */}
                <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
                      </div>
                      <div className="col-auto">
                        <a href="#!" className="btn btn-sm btn-soft-info">
                          {" "}
                          View All Apps
                          <i className="ri-arrow-right-s-line align-middle"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/github.png"
                            alt="Github"
                          />
                          <span>GitHub</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/bitbucket.png"
                            alt="bitbucket"
                          />
                          <span>Bitbucket</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/dribbble.png"
                            alt="dribbble"
                          />
                          <span>Dribbble</span>
                        </a>
                      </div>
                    </div>

                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/dropbox.png"
                            alt="dropbox"
                          />
                          <span>Dropbox</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/mail_chimp.png"
                            alt="mail_chimp"
                          />
                          <span>Mail Chimp</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/images/brands/slack.png"
                            alt="slack"
                          />
                          <span>Slack</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ms-1 header-item d-none d-sm-flex">
                {/* <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen fs-22"></i>
                </button> */}
              </div>

              <div className="ms-1 header-item d-none d-sm-flex">
                {/* <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
                >
                  <i className="bx bx-moon fs-22"></i>
                </button> */}
              </div>

              <div className="dropdown topbar-head-dropdown ms-1 header-item">
                {/* <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22"></i>
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button> */}
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">
                            {" "}
                            Notifications{" "}
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge badge-soft-light fs-13">
                            {" "}
                            4 New
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 pt-2">
                      <ul
                        className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                        data-dropdown-tabs="true"
                        id="notificationItemsTab"
                        role="tablist"
                      >
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#all-noti-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            All (4)
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#messages-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Messages
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#alerts-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Alerts
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tab-content" id="notificationItemsTabContent">
                    <div
                      className="tab-pane fade show active py-2 ps-2"
                      id="all-noti-tab"
                      role="tabpanel"
                    >
                      <div
                        data-simplebar
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3">
                              <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                <i className="bx bx-badge-check"></i>
                              </span>
                            </div>
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 lh-base">
                                  Your <b>Elite</b> author Graphic Optimization{" "}
                                  <span className="text-secondary">reward</span>{" "}
                                  is ready!
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> Just
                                  30 sec ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check01"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative active">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 48
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check02"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3">
                              <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                <i className="bx bx-message-square-dots"></i>
                              </span>
                            </div>
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                  You have received{" "}
                                  <b className="text-success">20</b> new
                                  messages in the conversation
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check03"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 4
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check04"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Notifications{" "}
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade py-2 ps-2"
                      id="messages-tab"
                      role="tabpanel"
                      aria-labelledby="messages-tab"
                    >
                      <div
                        data-simplebar
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-3.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  James Lemire
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 30
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check01"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check02"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-6.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Kenneth Brown
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Mentionned you in his comment on 📃 invoice
                                  #12501.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 10
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check03"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 3
                                  days ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check04"
                                />
                                <label className="form-check-label"></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Messages{" "}
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade p-4"
                      id="alerts-tab"
                      role="tabpanel"
                      aria-labelledby="alerts-tab"
                    >
                      <div className="w-25 w-sm-50 pt-3 mx-auto">
                        <img
                          src="assets/images/svg/bell.svg"
                          className="img-fluid"
                          alt="user-pic"
                        />
                      </div>
                      <div className="text-center pb-5 mt-2">
                        <h6 className="fs-18 fw-semibold lh-base">
                          Hey! You have no any notifications{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
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
                  <h6 className="dropdown-header">Welcome Mr. {userType}!</h6>
                  {/* <a className="dropdown-item" href="pages-profile.html">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Profile</span>
                  </a>
                  <a className="dropdown-item" href="apps-chat.html">
                    <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Messages</span>
                  </a>
                  <a className="dropdown-item" href="apps-tasks-kanban.html">
                    <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Taskboard</span>
                  </a>
                  <a className="dropdown-item" href="pages-faqs.html">
                    <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Help</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="pages-profile-settings.html"
                  >
                    <span className="badge bg-soft-success text-success mt-1 float-end">
                      New
                    </span>
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
                    <span className="align-middle">Change Password</span>
                  </a> */}

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
