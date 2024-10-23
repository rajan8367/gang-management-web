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

function RegisterDispatcher() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const { setCustomMsg, setUser, setUserType } = useUserContext();
  const { setToken } = useUserContext();
  const [credential, setCredential] = useState({
    userName: "",
    password: "",
    userType: "",
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

  const registerDispatcher = (e) => {
    e.preventDefault();
    if (credential.userType === "") {
      setCustomMsg((prevMsg) => ({
        ...prevMsg,
        isVisible: true,
        text: "Select User Type",
        type: "error",
      }));
    } else if (credential.userName === "") {
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
        type: credential.userType,
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
            setUser(response?.data?.userData);
            localStorage.setItem("userType", response?.data?.role);
            setUserType(response?.data?.role);
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
      <div className="auth-page-content overflow-hidden">
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
                        <h5 className="text-primary">
                          Dispatcher Registration.
                        </h5>
                        {/* <p className="text-muted">
                          Register to continue to as a Dispatcher.
                        </p> */}
                      </div>
                      <form onSubmit={registerDispatcher}>
                        <div className="mt-4">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={credential.name}
                              onChange={(e) =>
                                setCredential((prevCredential) => ({
                                  ...prevCredential,
                                  userName: e.target.value,
                                }))
                              }
                              placeholder="Enter Name"
                            />
                          </div>
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
                            <label className="form-label">Email Id</label>
                            <input
                              type="text"
                              className="form-control"
                              value={credential.email}
                              onChange={(e) =>
                                setCredential((prevCredential) => ({
                                  ...prevCredential,
                                  userName: e.target.value,
                                }))
                              }
                              placeholder="Enter email"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Mobile</label>
                            <input
                              type="number"
                              className="form-control"
                              value={credential.mobile}
                              onChange={(e) =>
                                setCredential((prevCredential) => ({
                                  ...prevCredential,
                                  userName: e.target.value,
                                }))
                              }
                              placeholder="Enter mobile"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Discom Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={credential.discomName}
                              onChange={(e) =>
                                setCredential((prevCredential) => ({
                                  ...prevCredential,
                                  userName: e.target.value,
                                }))
                              }
                              placeholder="Enter Discom Name"
                            />
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
                              Register
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
                            <div className="float-end mt-2">
                              <Link to={"/"} className="text-muted">
                                Back to Login
                              </Link>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0">UPPCL. Crafted with by Velocis</p>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
export default RegisterDispatcher;
