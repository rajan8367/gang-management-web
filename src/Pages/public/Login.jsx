import { Link, useNavigate } from "react-router-dom";
import logo1 from "./../../assets/images/logo-1.png";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { apiUrl } from "../../Constant";
import { useUserContext } from "../../hooks/userContext";
import { Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import Loader from "./../../Component/Loader";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const { setCustomMsg, setUser } = useUserContext();
  const { setToken } = useUserContext();
  const [credential, setCredential] = useState({
    userName: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      navigate("/dashboard", { replace: true });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (credential.userName === "") {
      setCustomMsg((prevMsg) => ({
        ...prevMsg,
        isVisible: true,
        text: "Enter email",
        type: "error",
      }));
    } else if (credential.password === "") {
      setCustomMsg((prevMsg) => ({
        ...prevMsg,
        isVisible: true,
        text: "Enter password",
        type: "error",
      }));
    } else {
      setShowLoader(true);
      const data = {
        username: credential.userName,
        password: credential.password,
      };
      axios
        .post(`${apiUrl}web-login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response);
          setShowLoader(false);
          if (response.status) {
            localStorage.setItem("token", response?.data?.token);
            setToken(response?.data?.token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response?.data?.userData)
            );
            setUser(response.user);
            navigate("/dashboard", { replace: true });
          } else {
            setCustomMsg((prevMsg) => ({
              ...prevMsg,
              isVisible: true,
              text: response?.msg,
              type: "error",
            }));
          }
        })
        .catch((error) => {
          setShowLoader(false);
          setCustomMsg((prevMsg) => ({
            ...prevMsg,
            isVisible: true,
            text: error?.response?.data?.message,
            type: "error",
          }));
        });
    }
  };
  if (isLoggedIn) return <Loader />;
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
                          <Link to={"/"} className="d-block text-center">
                            <img src={logo1} alt="" height="100%" />
                          </Link>
                        </div>
                        <div className="mt-auto">
                          <div className="mb-3">
                            <i className="ri-double-quotes-l display-4 text-success"></i>
                          </div>
                          <Carousel>
                            <Carousel.Item interval={2000}>
                              <p className="fs-15 fst-italic white-text">
                                " For any query or information related to
                                Electricity, Please Contact on 1912
                              </p>
                            </Carousel.Item>
                            <Carousel.Item interval={2000}>
                              <p className="fs-15 fst-italic white-text">
                                " We shall have a Long-term dynamic vision based
                                on strong perspective planning. "
                              </p>
                            </Carousel.Item>
                            <Carousel.Item interval={2000}>
                              <p className="fs-15 fst-italic white-text">
                                " Provide cost efficient good quality
                                electricity to all categories of consumers. "
                              </p>
                            </Carousel.Item>
                          </Carousel>
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
                      <form onSubmit={login}>
                        <div className="mt-4">
                          <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              value={credential.userName}
                              onChange={(e) =>
                                setCredential((prevCredential) => ({
                                  ...prevCredential,
                                  userName: e.target.value,
                                }))
                              }
                              placeholder="Enter username"
                            />
                          </div>

                          <div className="mb-3">
                            <div className="float-end">
                              <Link to={"/"} className="text-muted">
                                Forgot password?
                              </Link>
                            </div>
                            <label className="form-label">Password</label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <input
                                type={viewPassword ? "text" : "password"}
                                className="form-control pe-5"
                                placeholder="Enter password"
                                value={credential.password}
                                onChange={(e) =>
                                  setCredential((prevCredential) => ({
                                    ...prevCredential,
                                    password: e.target.value,
                                  }))
                                }
                              />
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                onClick={() => setViewPassword(!viewPassword)}
                              >
                                {viewPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
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
                            <Button
                              type="submit"
                              variant="contained"
                              className={`btn w-100 ${
                                showLoader ? " btn-info" : " btn-success"
                              }`}
                              disabled={showLoader}
                            >
                              Sign In
                            </Button>

                            {showLoader && (
                              <CircularProgress
                                size={24}
                                sx={{
                                  color: green[500],
                                  position: "absolute",
                                  left: "48%",
                                  marginTop: "6px",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </form>

                      {/* <div className="mt-5 text-center">
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
                  </div> */}
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
