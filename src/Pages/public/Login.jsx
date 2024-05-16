import { Link } from "react-router-dom";
import logo1 from "./../../assets/images/logo-1.png";
function Login() {
  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay"></div>
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card overflow-hidden">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4 auth-one-bg h-100">
                      <div className="bg-overlay"></div>
                      <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                          <a
                            href="index-2.html"
                            className="d-block text-center"
                          >
                            <img src={logo1} alt="" height="100%" />
                          </a>
                        </div>
                        <div className="mt-auto">
                          <div className="mb-3">
                            <i className="ri-double-quotes-l display-4 text-success"></i>
                          </div>

                          <div
                            id="qoutescarouselIndicators"
                            className="carousel slide"
                            data-bs-ride="carousel"
                          >
                            <div className="carousel-indicators">
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#qoutescarouselIndicators"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                              ></button>
                            </div>
                            <div className="carousel-inner text-center text-white-50 pb-5">
                              <div className="carousel-item active">
                                <p className="fs-15 fst-italic">
                                  " For any query or information related to
                                  Electricity, Please Contact on 1912
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
                                  " We shall have a Long-term dynamic vision
                                  based on strong perspective planning. "
                                </p>
                              </div>
                              <div className="carousel-item">
                                <p className="fs-15 fst-italic">
                                  " Provide cost efficient good quality
                                  electricity to all categories of consumers. "
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to UPPCL.
                        </p>
                      </div>

                      <div className="mt-4">
                        <form action="dashboard.html">
                          <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                            />
                          </div>

                          <div className="mb-3">
                            <div className="float-end">
                              <a
                                href="auth-pass-reset-cover.html"
                                className="text-muted"
                              >
                                Forgot password?
                              </a>
                            </div>
                            <label className="form-label">Password</label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <input
                                type="password"
                                className="form-control pe-5"
                                placeholder="Enter password"
                                id="password-input"
                              />
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                id="password-addon"
                              >
                                <i className="ri-eye-fill align-middle"></i>
                              </button>
                            </div>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="auth-remember-check"
                            />
                            <label className="form-check-label">
                              Remember me
                            </label>
                          </div>
                          <div className="mt-4">
                            <Link to="dashboard">
                              <button className="btn btn-success w-100">
                                Sign In
                              </button>
                            </Link>
                          </div>
                        </form>
                      </div>

                      <div className="mt-5 text-center">
                        <p className="mb-0">
                          Having trouble while login ?{" "}
                          <a
                            href="#"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Click Here
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0">UPPCL. Crafted with by Velocis</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Login;
