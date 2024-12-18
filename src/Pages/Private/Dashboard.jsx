import Layout from "../../Component/Layout";
import { useUserContext } from "../../hooks/userContext";
import React, { forwardRef, useEffect, useState } from "react";
import { apiUrl } from "../../Constant";
import moment from "moment";
import Loader from "../../Component/Loader";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import totalCount from "./../../assets/images/report.png";
import openCount from "./../../assets/images/maintenance.png";
import timerCount from "./../../assets/images/timer.png";
import inProgressCount from "./../../assets/images/rpa.png";
import resolved from "./../../assets/images/resolved.png";
import assignment from "./../../assets/images/assignment.png";
import hold from "./../../assets/images/hold.png";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MapPicker from "../../Component/MapPicker";
import MapComponent from "../../Component/MapComponent";
import Pagination from "../../Component/Pagination";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const complaintStatus = [
  "Open",
  "Assigned",
  "InProgress",
  "OnHold",
  "Resolved",
];
function Dashboard() {
  const { user, token, setCustomMsg, userType } = useUserContext();
  const navigate = useNavigate();
  const [greet, setGreet] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [count, setCount] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [status, setStatus] = useState("");
  const [gangList, setGangList] = useState(null);
  const [open, setOpen] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [assignType, setAssignType] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [openMap, setOpenMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, endDate] = dateRange;
  const [categoryList, setCategoryList] = useState(null);
  const [filterOption, seFilterOption] = useState(false);
  const [filterData, setFilterData] = useState({
    registrationDate: "",
    fromDate: "",
    toDate: "",
    complaintStatus: "",
    complaintNo: "",
    complaintCategory: "",
  });
  const [location, setLocation] = useState({
    lat: "",
    long: "",
  });
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = (map) => {
    console.log("Map initialized:", map);
    map.addListener("tilesloaded", () => {
      console.log("Map fully loaded");
      setIsMapLoaded(true);
    });
  };

  function formatDate(dateString) {
    // Parse the date string using Moment.js
    const date = moment(dateString);
    // Format the date
    return date.format("DD MMM YY");
  }
  const fetchGangCategory = () => {
    setShowLoader(true);
    const data = {};
    axios
      .post(`${apiUrl}list-gangCategory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setCategoryList(response.data?.data);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  useEffect(() => {
    setGreet(getGreeting());
    if (token !== "") {
      fetchComplaint();
      fetchGangCategory();
    }
  }, [token, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
    if (token !== "") {
      fetchComplaint();
    }
  }, [filterData.complaintStatus]);

  const fetchComplaint = () => {
    setShowLoader(true);
    const data = {
      registrationDate: filterData.registrationDate,
      fromDate: filterData.fromDate,
      toDate: filterData.toDate,
      complaintStatus: filterData.complaintStatus,
      complaintCategory: filterData.complaintCategory,
      complaintID: "",
      complaintNo: filterData.complaintNo,
      page: currentPage,
      limit: 50,
    };
    axios
      .post(`${apiUrl}get-filter-complaints`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log("Response:", response?.data?.complaints);
        setShowLoader(false);
        setComplaint(response?.data?.complaints);
        setCount(response.data.statusCounts);
        setTotalPages(response.data?.pagination?.totalPages);
      })
      .catch((error) => {
        setShowLoader(false);
        if (error?.response?.data?.message === "error in token") {
          setCustomMsg((prevMsg) => ({
            ...prevMsg,
            isVisible: true,
            text: "Token has been expired.",
            type: "error",
          }));
          localStorage.clear();
          navigate("/", { replace: true });
        }
        console.log(error);
      });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* const fetchGang = (id) => {
    setShowLoader(true);
    const data = {
      complaintID: id,
      byZone: 0,
      byCircle: 0,
      byDivision: 0,
      bySubDivision: 0,
      bySubstation: 1,
    };
    axios
      .post(`${apiUrl}gang-list-complaintWise`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setGangList(response?.data?.data);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  }; */

  const fetchGang = (id) => {
    setShowLoader(true);
    const data = {
      search: "",
      gangID: "",
    };
    axios
      .post(`${apiUrl}list-gangCategory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setGangList(response?.data?.data);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const assignComplaint = async (categoryName) => {
    setShowLoader(true);

    const data = {
      complaintId,
      gangCategory: categoryName,
    };

    try {
      const response = await axios.post(
        `${apiUrl}assign-complaint-from-dispatcher`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);

      // Set success message
      setCustomMsg((prevMsg) => ({
        ...prevMsg,
        isVisible: true,
        text: response?.data?.message || "Complaint assigned successfully!",
        type: "success",
      }));

      // Close the dialog
      setOpen(false);

      // Refresh the complaint data
      fetchComplaint();
    } catch (error) {
      console.error("Error:", error);

      // Set error message
      setCustomMsg((prevMsg) => ({
        ...prevMsg,
        isVisible: true,
        text: error?.response?.data?.message || "Failed to assign complaint",
        type: "error",
      }));
    } finally {
      // Hide the loader
      setShowLoader(false);
    }
  };

  const reAssignComplaint = (gangId) => {
    setShowLoader(true);
    const data = {
      complain_no: complaintId,
      gang_id: gangId,
    };
    axios
      .put(`${apiUrl}re-assign-complain`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setOpen(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        fetchComplaint();
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const viewDetail = (complaintId) => {
    navigate("/complaint-detail/" + complaintId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const convertDate = (date) =>
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  useEffect(() => {
    if (startDate && endDate) {
      setFilterData((prevData) => ({
        ...prevData,
        fromDate: convertDate(startDate),
        toDate: convertDate(endDate),
      }));
    } else {
      setFilterData((prevData) => ({
        ...prevData,
        fromDate: "",
        toDate: "",
      }));
    }
  }, [dateRange]);

  const assignToDispatcher = (id) => {
    setShowLoader(true);
    const data = {
      complain_no: id,
    };

    axios
      .post(`${apiUrl}assign-to-dispatcher`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const message = response?.data?.message;
        console.log("Response:", response);
        setOpen(false);
        setCustomMsg({
          isVisible: true,
          text: message,
          type: "success",
        });
        fetchComplaint();
      })
      .catch((error) => {
        console.log(error);
        setCustomMsg({
          isVisible: true,
          text: "Failed to assign to dispatcher. Please try again.",
          type: "error",
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Dashboard </h4>
                <i
                  className="d-sm-none ri-equalizer-line"
                  onClick={() => seFilterOption(true)}
                ></i>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="h-100">
                <div className="row mb-3 pb-1">
                  <div className="col-12">
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                      <div className="flex-grow-1">
                        {/* <h4
                          className="fs-16 mb-1"
                          style={{ textTransform: "capitalize" }}
                        >
                          {greet}, {user?.DIVISION_NAME}!
                        </h4> */}
                      </div>
                      <div
                        className={
                          filterOption
                            ? `mt-3 mt-lg-0 filterBox openFilter`
                            : `mt-3 mt-lg-0 filterBox`
                        }
                      >
                        <form action="#">
                          <div className="row g-3 mb-0 align-items-center">
                            <div className="col-sm-auto">
                              <select
                                className="form-select shadow"
                                onChange={handleChange}
                                name="complaintCategory"
                                value={filterData.complaintCategory}
                              >
                                <option value="">All Complaint Type</option>
                                {categoryList?.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category.categoryName}
                                  >
                                    {category.categoryName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-sm-auto">
                              <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(date) => {
                                  setDateRange(date);
                                }}
                                isClearable={true}
                                placeholderText="Select from to date"
                                className="form-control shadow"
                                dateFormat="dd-MM-yyyy"
                              />
                            </div>
                            {userType !== "dispatcher" && (
                              <div className="col-sm-auto">
                                <select
                                  className="form-select shadow"
                                  onChange={handleChange}
                                  name="complaintStatus"
                                  value={filterData.complaintStatus}
                                >
                                  <option value="">All Complaints</option>
                                  {complaintStatus.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            <div className="col-sm-auto">
                              <input
                                type="text"
                                className="form-control shadow"
                                placeholder="Complaint Number"
                                value={filterData.complaintNo}
                                name="complaintNo"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-sm-auto">
                              <button
                                type="button"
                                className="btn btn-primary shadow"
                                onClick={() => {
                                  seFilterOption(false);
                                  fetchComplaint();
                                }}
                              >
                                Apply
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger shadow ms-3 d-sm-none"
                                onClick={() => seFilterOption(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row flex-nowrap overflow-auto">
                  {userType !== "dispatcher" ? (
                    <>
                      <div
                        className="col-xl-2 col-8 col-md-6 cursor-pointer"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {" "}
                                  Total Complaints
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="559"
                                  >
                                    {count &&
                                      Object.values(count).reduce(
                                        (acc, value) => acc + value,
                                        0
                                      )}
                                  </span>{" "}
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-success rounded fs-3">
                                  <img src={totalCount} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-xl-2  col-8 col-md-6"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "Open",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "Open" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  Open
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <h5 className="text-danger fs-14 mb-0"></h5>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="368"
                                  >
                                    {count?.open}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-info rounded fs-3">
                                  <img src={openCount} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`col-xl-2  col-8 col-md-6 cursor-pointer`}
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "Assigned",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "Assigned" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {" "}
                                  Assigned
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="165"
                                  >
                                    {count?.assigned}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-primary rounded fs-3">
                                  <img src={assignment} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-xl-2 col-8 col-md-6 cursor-pointer"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "InProgress",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "InProgress" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  In Progress
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <h5 className="text-success fs-14 mb-0"></h5>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="66"
                                  >
                                    {count?.inProgress}
                                  </span>{" "}
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-warning rounded fs-3">
                                  <img
                                    src={inProgressCount}
                                    className="img-fluid"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`col-xl-2 col-8 col-md-6 cursor-pointer`}
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "OnHold",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "OnHold" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {" "}
                                  On Hold
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="165"
                                  >
                                    {count?.onHold}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-primary rounded fs-3">
                                  <img src={hold} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`col-xl-2 col-8 col-md-6 cursor-pointer`}
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "Resolved",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "Resolved" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {" "}
                                  Resolved
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="165"
                                  >
                                    {count?.resolved}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-primary rounded fs-3">
                                  <img src={resolved} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="col-xl-3 col-8 col-md-6 cursor-pointer"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {" "}
                                  Total Complaints
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="559"
                                  >
                                    {count &&
                                      Object.values(count).reduce(
                                        (acc, value) => acc + value,
                                        0
                                      )}
                                  </span>{" "}
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-success rounded fs-3">
                                  <img src={totalCount} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-xl-3 col-8 col-md-6"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "Open",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "Open" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  Open
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <h5 className="text-danger fs-14 mb-0"></h5>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="368"
                                  >
                                    {count?.open}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-info rounded fs-3">
                                  <img src={openCount} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-xl-3 col-8 col-md-6"
                        onClick={() =>
                          setFilterData((prevData) => ({
                            ...prevData,
                            complaintStatus: "Esclate",
                          }))
                        }
                      >
                        <div
                          className={`card card-animate ${
                            filterData.complaintStatus === "Esclate" &&
                            "border border-success"
                          }`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  Escalate
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <h5 className="text-danger fs-14 mb-0"></h5>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary">
                                  <span
                                    className="counter-value"
                                    data-target="368"
                                  >
                                    {count?.esclate}
                                  </span>
                                </h4>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-primary rounded fs-3">
                                  <img src={timerCount} className="img-fluid" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints List
                        </h4>
                      </div>
                      <div className="table-responsive px-4 mt-4 table-card overflow-auto">
                        <table className="table table-centered table-complaint table-bordered align-middle table-striped">
                          <thead className="bg-light text-muted">
                            <tr>
                              <th>Complaint Details</th>
                              <th>Consumer Details</th>
                              <th>Date</th>
                              <th>Status</th>
                              {userType === "dispatcher" && <th>Remark</th>}
                              {userType !== "dispatcher" ? (
                                <>
                                  <th>Gang</th>
                                  {userType !== "user" && (
                                    <>
                                      <th>Forward To Dispatcher</th>
                                      <th>Re Assign</th>
                                    </>
                                  )}
                                </>
                              ) : (
                                <th>Assign</th>
                              )}
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {complaint && complaint.length > 0 ? (
                              complaint.map((complaint, index) => (
                                <React.Fragment key={complaint._id}>
                                  <tr>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                      <strong>No: </strong>
                                      {complaint.complaintNo}
                                      <br />
                                      <strong>Type: </strong>
                                      {complaint.complaintType}
                                    </td>
                                    <td>
                                      <strong>Ac.No.: </strong>
                                      {complaint.consumerAccountNo}
                                      <br />
                                      <strong>Name: </strong>
                                      {complaint.consumerName}
                                      <br />
                                      <strong>Mobile: </strong>
                                      {complaint.consumerMobile}
                                      <br />
                                      <strong>Address: </strong>
                                      {complaint.consumerAddress}{" "}
                                      <button
                                        className="btn btn-primary px-1 py-0 mt-1 d-block"
                                        onClick={() => {
                                          if (
                                            complaint.complaintStatus !== "Open"
                                          ) {
                                            setLocation({
                                              lat: complaint?.consumerLat,
                                              long: complaint?.consumerLon,
                                            });
                                            setOpenMap(true);
                                          } else {
                                            navigate(
                                              "/complaint-info/" +
                                                complaint?.complaintID
                                            );
                                          }
                                        }}
                                      >
                                        <i className="ri-map-pin-line"></i>
                                        {complaint?.consumerLat &&
                                        complaint?.consumerLon
                                          ? " View Location"
                                          : " Set Location"}
                                      </button>
                                    </td>
                                    <td className="text-nowrap">
                                      {formatDate(complaint.registrationDate)}
                                    </td>
                                    <td>{complaint.complaintStatus}</td>

                                    {userType === "dispatcher" && (
                                      <td>
                                        {complaint?.staffRemarks.length > 0 &&
                                          complaint?.staffRemarks[
                                            complaint?.staffRemarks.length - 1
                                          ].remark}
                                        {complaint.complaintStatus === "Open" &&
                                          complaint?.remarks}
                                      </td>
                                    )}
                                    <td>
                                      {(complaint?.consumerLat &&
                                        complaint?.consumerLon &&
                                        complaint.complaintStatus === "Open") ||
                                      complaint.complaintStatus ===
                                        "Esclate" ? (
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            setOpen(true);
                                            setComplaintId(complaint._id);
                                            setAssignType("assign");
                                            fetchGang(complaint._id);
                                          }}
                                          disabled={showLoader}
                                        >
                                          Assign
                                        </button>
                                      ) : (
                                        <>
                                          {complaint?.gangDetail?.gangName}
                                          <br />
                                          {complaint?.gangDetail?.gangMobileNo}
                                          <br />
                                          {complaint.complaintStatus ===
                                            "Assigned" &&
                                            complaint?.gangDetail
                                              ?.distanceInKm !== "" &&
                                            !isNaN(
                                              parseFloat(
                                                complaint?.gangDetail
                                                  ?.distanceInKm
                                              )
                                            ) &&
                                            `${parseFloat(
                                              complaint?.gangDetail
                                                ?.distanceInKm
                                            ).toFixed(2)} KM Away`}
                                        </>
                                      )}
                                    </td>

                                    {userType !== "dispatcher" &&
                                      userType !== "user" && (
                                        <td align="center">
                                          {complaint.fwdToDispatcher == 0 &&
                                            complaint.complaintStatus !==
                                              "InProgress" &&
                                            complaint.complaintStatus !==
                                              "Resolved" && (
                                              <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                  assignToDispatcher(
                                                    complaint._id
                                                  );
                                                }}
                                                disabled={showLoader}
                                              >
                                                Forward
                                              </button>
                                            )}
                                        </td>
                                      )}
                                    {userType !== "dispatcher" &&
                                      userType !== "user" && (
                                        <td className="text-nowrap">
                                          {complaint.complaintStatus ===
                                            "Assigned" && (
                                            <button
                                              className="btn btn-success"
                                              onClick={() => {
                                                setOpen(true);
                                                setComplaintId(complaint._id);
                                                setAssignType("reAssign");
                                                fetchGang(complaint._id);
                                              }}
                                              disabled={showLoader}
                                            >
                                              Re Assign
                                            </button>
                                          )}
                                        </td>
                                      )}
                                    <td>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          viewDetail(complaint._id)
                                        }
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={
                                        userType === "dispatcher" ? 7 : 8
                                      }
                                    >
                                      <strong>1912 complaint remark: </strong>
                                      {complaint.remarks}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} align="center">
                                  {" "}
                                  No record found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {totalPages > 1 && (
                          <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Gang Category</DialogTitle>
        <DialogContent>
          <div className="table-responsive table-card mb-4">
            <table className="table align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40px" }}>
                    S.No.
                  </th>
                  <th>Gang Category</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="list form-check-all">
                {gangList &&
                  gangList.length > 0 &&
                  gangList.map((gang, index) => (
                    <tr key={gang._id}>
                      <td scope="row">{index + 1}</td>
                      <td>{gang.categoryName}</td>
                      <td>
                        {assignType === "assign" ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => assignComplaint(gang.categoryName)}
                            disabled={showLoader}
                          >
                            Assign Complaint
                          </button>
                        ) : assignType === "reAssign" ? (
                          <button
                            className="btn btn-success"
                            onClick={() => assignComplaint(gang.categoryName)}
                            disabled={showLoader}
                          >
                            Re Assign Complaint
                          </button>
                        ) : (
                          "NA"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openMap}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenMap(false)}
        fullWidth
        maxWidth="md"
        sx={{ zIndex: 99999 }}
      >
        <DialogTitle>Consumer Location</DialogTitle>

        <DialogContent>
          {location.lat === "" ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "#f0f0f0",
                zIndex: 1,
              }}
            >
              <h4>Loading map...</h4>
            </div>
          ) : (
            <APIProvider apiKey={"AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI"}>
              <Map
                style={{ width: "100%", height: "400px" }}
                defaultCenter={{
                  lat: Number(location.lat),
                  lng: Number(location.long),
                }}
                defaultZoom={13}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                <Marker
                  position={{
                    lat: Number(location.lat),
                    lng: Number(location.long),
                  }}
                />
              </Map>
            </APIProvider>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
export default Dashboard;
