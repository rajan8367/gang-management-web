import Layout from "../../Component/Layout";
import { useUserContext } from "../../hooks/userContext";
import { forwardRef, useEffect, useState } from "react";
import { apiUrl } from "../../Constant";
import moment from "moment";
import Loader from "../../Component/Loader";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const complaintStatus = [
  "Open",
  "Assigned",
  "InProgress",
  "Closed",
  "OnHold",
  "Resolved",
];
function Dashboard() {
  const { user, token, setCustomMsg } = useUserContext();
  const [greet, setGreet] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [count, setCount] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [status, setStatus] = useState("");
  const [gangList, setGangList] = useState(null);
  const [open, setOpen] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  function formatDate(dateString) {
    // Parse the date string using Moment.js
    const date = moment(dateString);
    // Format the date
    return date.format("DD MMM YY");
  }

  useEffect(() => {
    setGreet(getGreeting());
    if (token !== "") {
      fetchComplaint();
    }
  }, [token, status]);
  useEffect(() => {
    if (token !== "") {
      fetchGang();
    }
  }, [token]);

  const fetchComplaint = () => {
    setShowLoader(true);
    const data = {
      showCount: "1",
      durarion: "all",
      inProgressComplaint: "",
      resolvedComplaint: "",
      complaintStatus: status,
      allComplaint: status === "" ? "1" : "0",
    };
    axios
      .post(`${apiUrl}web-dashboard`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setShowLoader(false);
        setCount(response.data.counts);
        if (status == "") {
          setComplaint(response?.data?.complaintReport);
        } else {
          setComplaint(response?.data?.complaintByStatusReport);
        }
      })
      .catch((error) => {
        setShowLoader(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchGang = () => {
    setShowLoader(true);
    const data = {
      search: "",
      gangID: "",
    };
    axios
      .post(`${apiUrl}list-gang`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setGangList(response?.data?.gangs);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const assignComplaint = (gangId) => {
    setShowLoader(true);
    const data = {
      complain_no: complaintId,
      gang_id: gangId,
    };
    axios
      .put(`${apiUrl}assign-complain`, data, {
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
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Dashboard</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Dashboards</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
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
                        <h4 className="fs-16 mb-1">
                          {greet}, {user?.name}!
                        </h4>
                        <p className="text-muted mb-0">
                          {user?.type} ({user?.sub_station_name})
                        </p>
                      </div>
                      <div className="mt-3 mt-lg-0">
                        <form action="#">
                          <div className="row g-3 mb-0 align-items-center">
                            <div className="col-sm-auto">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control border-0 dash-filter-picker shadow"
                                  data-provider="flatpickr"
                                  data-range-date="true"
                                  data-date-format="d M, Y"
                                  data-deafult-date="01 Jan 2022 to 31 Jan 2022"
                                />
                                <div className="input-group-text bg-primary border-primary text-white">
                                  <i className="ri-calendar-2-line"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              {" "}
                              Total Complaints
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-success fs-14 mb-0">
                              {/* <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                              +16.24 % */}
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span className="counter-value" data-target="559">
                                {count &&
                                  Object.values(count).reduce(
                                    (acc, value) => acc + value,
                                    0
                                  )}
                              </span>{" "}
                            </h4>
                            <a
                              href="complaint-list.html"
                              className="text-decoration-underline"
                            >
                              View All
                            </a>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-success rounded fs-3">
                              <i className="bx bx-dollar-circle text-success"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              Open
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-danger fs-14 mb-0">
                              {/* <i className="ri-arrow-right-down-line fs-13 align-middle"></i>{" "}
                              -3.57 % */}
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span className="counter-value" data-target="368">
                                {count?.Open}
                              </span>
                            </h4>
                            <a
                              href="complaint-list.html"
                              className="text-decoration-underline"
                            >
                              View all
                            </a>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded fs-3">
                              <i className="bx bx-shopping-bag text-info"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              In Progress
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <h5 className="text-success fs-14 mb-0">
                              {/* <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                              +29.08 % */}
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span className="counter-value" data-target="66">
                                {count?.InProgress}
                              </span>{" "}
                            </h4>
                            <a href="#" className="text-decoration-underline">
                              See details
                            </a>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-warning rounded fs-3">
                              <i className="bx bx-user-circle text-warning"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              {" "}
                              Closed
                            </p>
                          </div>
                          {/* <div className="flex-shrink-0">
                            <h5 className="text-muted fs-14 mb-0">+0.01 %</h5>
                          </div> */}
                        </div>
                        <div className="d-flex align-items-end justify-content-between mt-4">
                          <div>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                              <span className="counter-value" data-target="165">
                                {count?.Closed}
                              </span>
                            </h4>
                            <a
                              href="complaint-list.html"
                              className="text-decoration-underline"
                            >
                              See details
                            </a>
                          </div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-primary rounded fs-3">
                              <i className="bx bx-wallet text-primary"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints List
                        </h4>
                        <div className="flex-shrink-0">
                          <div className="dropdown card-header-dropdown">
                            <a
                              className="text-reset dropdown-btn"
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="fw-semibold text-uppercase fs-12">
                                Filter by: &nbsp;
                              </span>
                              <span className="text-muted">
                                {status !== "" ? status : "All Complaints"}
                                <i className="mdi mdi-chevron-down ms-1"></i>
                              </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <button
                                className="dropdown-item"
                                onClick={() => setStatus("")}
                              >
                                All Complaints
                              </button>
                              {complaintStatus.map((status) => (
                                <button
                                  key={status}
                                  className="dropdown-item"
                                  onClick={() => setStatus(status)}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive px-4 mt-4 table-card">
                        <table className="table table-nowrap table-centered align-middle">
                          <thead className="bg-light text-muted">
                            <tr>
                              <th>S.No.</th>
                              <th>Complaint No.</th>
                              <th>Consumer Name</th>
                              <th>Consumer Mobile</th>
                              <th>Consumer Address</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {complaint?.complaints?.length > 0 ? (
                              complaint?.complaints.map((complaint, index) => (
                                <tr key={complaint._id}>
                                  <td>{index + 1}</td>
                                  <td>{complaint.complaintNo}</td>
                                  <td>{complaint.consumerName}</td>
                                  <td>{complaint.consumerMobile}</td>
                                  <td>{complaint.consumerAddress}</td>
                                  <td>
                                    {formatDate(complaint.registrationDate)}
                                  </td>
                                  <td>{complaint.complaintStatus}</td>
                                  <td>
                                    {complaint.complaintStatus === "Open" && (
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setOpen(true);
                                          setComplaintId(complaint._id);
                                        }}
                                      >
                                        Assign to Gang
                                      </button>
                                    )}
                                  </td>
                                </tr>
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
        maxWidth="lg"
      >
        <DialogTitle>Gang List</DialogTitle>
        <DialogContent>
          <div className="table-responsive table-card mb-4">
            <table className="table align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40px" }}>
                    S.No.
                  </th>
                  <th>Gang Name</th>
                  <th>Gang Mobile</th>
                  <th>Gang Leader Name</th>
                  <th>Sub Station</th>
                  <th>Feeder</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="list form-check-all">
                {gangList &&
                  gangList.length > 0 &&
                  gangList.map((gang, index) => (
                    <tr key={gang._id}>
                      <td scope="row">{index + 1}</td>
                      <td>{gang.gangName}</td>
                      <td>{gang.gangMobile}</td>
                      <td>{gang.gangLeaderName}</td>
                      <td>{gang.substation}</td>
                      <td>{gang.feeder}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => assignComplaint(gang._id)}
                        >
                          Assign Complaint
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
export default Dashboard;
