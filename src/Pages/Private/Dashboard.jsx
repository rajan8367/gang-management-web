import { PieChart } from "@mui/x-charts";
import map from "./../../assets/images/Map.png";
import { BarChart } from "@mui/x-charts/BarChart";
import Layout from "../../Component/Layout";
import { useUserContext } from "../../hooks/userContext";
import { useEffect, useState } from "react";
import { apiUrl } from "../../Constant";
import moment from "moment";
import Loader from "../../Component/Loader";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [greet, setGreet] = useState("");
  const [token, setToken] = useState();
  const [complaint, setComplaint] = useState(null);
  function formatDate(dateString) {
    // Parse the date string using Moment.js
    const date = moment(dateString);
    // Format the date
    return date.format("DD MMM YY");
  }
  useEffect(() => {
    setGreet(getGreeting());
    const authToken = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      const userId = JSON.parse(userData)._id;
      setToken(authToken);
      fetchComplaint(userId);
    }
  }, []);

  const fetchComplaint = (userId) => {
    function json(response) {
      return response.json();
    }
    fetch(apiUrl + "get-complains", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "userID=" + userId,
    })
      .then(json)
      .then(function (response) {
        console.log(response);
        return;
        if (response.status == "200") {
          setComplaint(response);
        } else {
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.error(error);
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

  if (complaint === null) return <Loader />;
  return (
    <Layout>
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
                          {user?.type} (
                          {user?.addresses && user.addresses.length > 0
                            ? user.addresses[0].city
                            : ""}
                          )
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
                                {complaint.totalComplain}
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
                              Total Resolved
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
                                {complaint.totalApproved}
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
                              Pending Request
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
                                {complaint?.totalPending}
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
                              Complaint Rejected
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
                                {complaint?.totalRejected}
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
                      <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints Status
                        </h4>
                        <div>
                          {/* <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                          >
                            ALL
                          </button> */}
                          {/* <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                          >
                            1M
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-secondary btn-sm"
                          >
                            6M
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-sm"
                          >
                            1Y
                          </button> */}
                        </div>
                      </div>
                      {/* <div className="card-header p-0 border-0 bg-soft-light">
                        <div className="row g-0 text-center">
                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1">
                                <span
                                  className="counter-value"
                                  data-target="7585"
                                >
                                  0
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Recieved</p>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1 text-success">
                                <span
                                  className="counter-value"
                                  data-target="7029"
                                >
                                  0
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Resolved</p>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0">
                              <h5 className="mb-1 text-warning">
                                <span
                                  className="counter-value"
                                  data-target="367"
                                >
                                  0
                                </span>
                              </h5>
                              <p className="text-muted mb-0">In-progress</p>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3">
                            <div className="p-3 border border-dashed border-start-0 border-end-0">
                              <h5 className="mb-1 text-danger">
                                <span
                                  className="counter-value"
                                  data-target="189"
                                >
                                  0
                                </span>
                              </h5>
                              <p className="text-muted mb-0">Hold</p>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="card-body p-0 pb-2">
                        <div className="w-100">
                          {/* <div
                              id="customer_impression_charts"
                              data-colors='["--vz-primary", "--vz-success", "--vz-danger"]'
                              className="apex-charts"
                              dir="ltr"
                            ></div> */}
                          {/* <BarChart
                            xAxis={[
                              {
                                id: "barCategories",
                                data: months,
                                scaleType: "band",
                              },
                            ]}
                            series={[
                              {
                                data: complaintCounts,
                              },
                            ]}
                            width={1050}
                            height={350}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-4">
                    <div className="card ">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints - Map View
                        </h4>
                        <div className="flex-shrink-0">
                          <a
                            type="button"
                            href="map-view.html"
                            className="btn btn-soft-primary btn-sm"
                          >
                            View On map
                          </a>
                        </div>
                      </div>
                      <div className="card-body" style={{ overflow: "hidden" }}>
                        <img
                          className=""
                          style={{ height: "400px" }}
                          src={map}
                          alt="Header Avatar"
                          height="400px"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints In Progress
                        </h4>
                        {/* <div className="flex-shrink-0">
                          <div className="dropdown card-header-dropdown">
                            <a
                              className="text-reset dropdown-btn"
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <span className="fw-semibold text-uppercase fs-12">
                                Sort by:
                              </span>
                              <span className="text-muted">
                                Today
                                <i className="mdi mdi-chevron-down ms-1"></i>
                              </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Today
                              </a>
                              <a className="dropdown-item" href="#">
                                Yesterday
                              </a>
                              <a className="dropdown-item" href="#">
                                Last 7 Days
                              </a>
                              <a className="dropdown-item" href="#">
                                Last 30 Days
                              </a>
                              <a className="dropdown-item" href="#">
                                This Month
                              </a>
                              <a className="dropdown-item" href="#">
                                Last Month
                              </a>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-nowrap table-centered align-middle">
                            <thead className="bg-light text-muted">
                              <tr>
                                <th scope="col">Complaints No</th>
                                <th scope="col">Consumer Name - Mobile</th>
                                <th scope="col">Registered On</th>
                                <th scope="col">Assigned to</th>
                                <th scope="col">Status</th>
                                <th scope="col" style={{ width: "10%" }}>
                                  Due Date
                                </th>
                              </tr>
                            </thead>

                            {/* <tbody>
                              {complaint.length > 0 ? (
                                complaint.map((comp) => (
                                  <tr key={comp._id}>
                                    <td>{comp.complain_no}</td>
                                    <td>
                                      {comp.consumer_name}{" "}
                                      {comp.consumer_mobile}
                                    </td>
                                    <td>
                                      {formatDate(comp.registration_date)}
                                    </td>
                                    <td>{comp.registration_date}</td>
                                    <td>
                                      <span
                                        className={`${
                                          comp.status?.name === "In Progress"
                                            ? "badge badge-soft-warning"
                                            : comp.status?.name === "Pending"
                                            ? "badge badge-soft-info"
                                            : comp.status?.name === ""
                                            ? ""
                                            : "badge badge-soft-danger"
                                        }`}
                                      >
                                        {comp.status?.name}
                                      </span>
                                    </td>

                                    <td>{formatDate(comp.status?.date)}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" align="center">
                                    No Complaint.
                                  </td>
                                </tr>
                              )}
                            </tbody> */}
                          </table>
                        </div>

                        {/* <div className="align-items-center mt-4 pt-2 justify-content-between d-flex">
                          <div className="flex-shrink-0">
                            <div className="text-muted">
                              Showing <span className="fw-semibold">5</span> of{" "}
                              <span className="fw-semibold">25</span> Results
                            </div>
                          </div>
                          <ul className="pagination pagination-separated pagination-sm mb-0">
                            <li className="page-item disabled">
                              <a href="#" className="page-link">
                                ←
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                1
                              </a>
                            </li>
                            <li className="page-item active">
                              <a href="#" className="page-link">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                →
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xl-4">
                    <div className="card card-height-100">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Complaints Resolved
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
                              <span className="text-muted">
                                Report
                                <i className="mdi mdi-chevron-down ms-1"></i>
                              </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Download Report
                              </a>
                              <a className="dropdown-item" href="#">
                                Export
                              </a>
                              <a className="dropdown-item" href="#">
                                Import
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-nowrap table-centered align-middle">
                            <thead className="bg-light text-muted">
                              <tr>
                                <th scope="col">Complaints Details</th>
                                <th scope="col">Resolution </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="fw-medium">
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      MV30042405914
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      Date - 30-Apr-24
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      By - RUPESH SINGH
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      At - 30-Apr-24 : 16:32
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-medium">
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      MV30042406149
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      Date - 30-Apr-24
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      By - Sudheer Kumar
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      At - 30-Apr-24 : 16:32
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-medium">
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      MV30042405813
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      Date - 30-Apr-24
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      By - Ankush Mishra
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      At - 30-Apr-24 : 16:32
                                    </p>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-medium">
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      MV30042405910
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      Date - 30-Apr-24
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5 className="fs-13 mb-0">
                                      By - Amit kumar Upadhyay
                                    </h5>
                                    <p className="fs-12 mb-0 text-muted">
                                      At - 30-Apr-24 : 16:32
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="align-items-center mt-4 pt-2 justify-content-between d-flex">
                          <div className="flex-shrink-0">
                            <div className="text-muted">
                              Showing <span className="fw-semibold">5</span> of{" "}
                              <span className="fw-semibold">25</span> Results
                            </div>
                          </div>
                          <ul className="pagination pagination-separated pagination-sm mb-0">
                            <li className="page-item disabled">
                              <a href="#" className="page-link">
                                ←
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                1
                              </a>
                            </li>
                            <li className="page-item active">
                              <a href="#" className="page-link">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a href="#" className="page-link">
                                →
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Recent Consumer
                        </h4>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="btn btn-soft-info btn-sm"
                          >
                            <i className="ri-file-list-3-line align-middle"></i>{" "}
                            Generate Report
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive table-card">
                          <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                              <tr>
                                <th scope="col">Account ID</th>
                                <th scope="col">Consumer Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Status</th>
                                <th scope="col">JE Name</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            {/* <tbody>
                              {complaint.length > 0 ? (
                                complaint.map((comp) => (
                                  <tr key={comp._id}>
                                    <td>{comp.complain_no}</td>
                                    <td>{comp.consumer_name}</td>
                                    <td>{comp.consumer_type}</td>
                                    <td>{comp.consumer_mobile}</td>
                                    <td>
                                      <span
                                        className={`${
                                          comp.status?.name === "In Progress"
                                            ? "badge badge-soft-warning"
                                            : comp.status?.name === "Pending"
                                            ? "badge badge-soft-info"
                                            : comp.status?.name === ""
                                            ? ""
                                            : "badge badge-soft-danger"
                                        }`}
                                      >
                                        {comp.status?.name}
                                      </span>
                                    </td>
                                    <td>{comp.je_name}</td>
                                    <td>View</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="7" align="center">
                                    No Complaint.
                                  </td>
                                </tr>
                              )}
                            </tbody> */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto layout-rightside-col">
              <div className="overlay"></div>
              <div className="layout-rightside">
                <div className="card h-100 rounded-0">
                  <div className="card-body p-0">
                    <div className="p-3">
                      <h6 className="text-muted mb-0 text-uppercase fw-semibold">
                        Recent Activity
                      </h6>
                    </div>
                    <div
                      data-simplebar
                      style={{ maxHeight: "410px" }}
                      className="p-3 pt-0"
                    >
                      <div className="acitivity-timeline acitivity-main">
                        <div className="acitivity-item d-flex">
                          <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                            <div className="avatar-title bg-soft-success text-success rounded-circle">
                              <i className="ri-shopping-cart-2-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Purchase by James Price
                            </h6>
                            <p className="text-muted mb-1">
                              Product noise evolve smartwatch{" "}
                            </p>
                            <small className="mb-0 text-muted">
                              02:14 PM Today
                            </small>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                            <div className="avatar-title bg-soft-danger text-danger rounded-circle">
                              <i className="ri-stack-fill"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Added new{" "}
                              <span className="fw-semibold">
                                style collection
                              </span>
                            </h6>
                            <p className="text-muted mb-1">
                              By Nesta Technologies
                            </p>
                            <div className="d-inline-flex gap-2 border border-dashed p-2 mb-2">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="bg-light rounded p-1"
                              >
                                <img
                                  src="assets/images/products/img-8.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </a>
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="bg-light rounded p-1"
                              >
                                <img
                                  src="assets/images/products/img-2.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </a>
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="bg-light rounded p-1"
                              >
                                <img
                                  src="assets/images/products/img-10.png"
                                  alt=""
                                  className="img-fluid d-block"
                                />
                              </a>
                            </div>
                            <p className="mb-0 text-muted">
                              <small>9:47 PM Yesterday</small>
                            </p>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              alt=""
                              className="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Natasha Carey have liked the products
                            </h6>
                            <p className="text-muted mb-1">
                              Allow users to like products in your WooCommerce
                              store.
                            </p>
                            <small className="mb-0 text-muted">
                              25 Dec, 2021
                            </small>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0">
                            <div className="avatar-xs acitivity-avatar">
                              <div className="avatar-title rounded-circle bg-secondary">
                                <i className="mdi mdi-sale fs-14"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Today offers by{" "}
                              <a
                                href="apps-ecommerce-seller-details.html"
                                className="link-secondary"
                              >
                                Digitech Galaxy
                              </a>
                            </h6>
                            <p className="text-muted mb-2">
                              Offer is valid on orders of Rs.500 Or above for
                              selected products only.
                            </p>
                            <small className="mb-0 text-muted">
                              12 Dec, 2021
                            </small>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0">
                            <div className="avatar-xs acitivity-avatar">
                              <div className="avatar-title rounded-circle bg-soft-danger text-danger">
                                <i className="ri-bookmark-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">Favoried Product</h6>
                            <p className="text-muted mb-2">
                              Esther James have favorited product.
                            </p>
                            <small className="mb-0 text-muted">
                              25 Nov, 2021
                            </small>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0">
                            <div className="avatar-xs acitivity-avatar">
                              <div className="avatar-title rounded-circle bg-secondary">
                                <i className="mdi mdi-sale fs-14"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Flash sale starting{" "}
                              <span className="text-primary">Tomorrow.</span>
                            </h6>
                            <p className="text-muted mb-0">
                              Flash sale by{" "}
                              <a href="#" className="link-secondary fw-medium">
                                Zoetic Fashion
                              </a>
                            </p>
                            <small className="mb-0 text-muted">
                              22 Oct, 2021
                            </small>
                          </div>
                        </div>
                        <div className="acitivity-item py-3 d-flex">
                          <div className="flex-shrink-0">
                            <div className="avatar-xs acitivity-avatar">
                              <div className="avatar-title rounded-circle bg-soft-info text-info">
                                <i className="ri-line-chart-line"></i>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Monthly sales report
                            </h6>
                            <p className="text-muted mb-2">
                              <span className="text-danger">2 days left</span>{" "}
                              notification to submit the monthly sales report.{" "}
                              <a
                                href="#"
                                className="link-warning text-decoration-underline"
                              >
                                Reports Builder
                              </a>
                            </p>
                            <small className="mb-0 text-muted">15 Oct</small>
                          </div>
                        </div>
                        <div className="acitivity-item d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-3.jpg"
                              alt=""
                              className="avatar-xs rounded-circle acitivity-avatar"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 lh-base">
                              Frank Hook Commented
                            </h6>
                            <p className="text-muted mb-2 fst-italic">
                              " A product that has reviews is more likable to be
                              sold than a product. "
                            </p>
                            <small className="mb-0 text-muted">
                              26 Aug, 2021
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 mt-2">
                      <h6 className="text-muted mb-3 text-uppercase fw-semibold">
                        Top 10 Categories
                      </h6>

                      <ol className="ps-3 text-muted">
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Mobile & Accessories{" "}
                            <span className="float-end">(10,294)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Desktop <span className="float-end">(6,256)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Electronics{" "}
                            <span className="float-end">(3,479)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Home & Furniture{" "}
                            <span className="float-end">(2,275)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Grocery <span className="float-end">(1,950)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Fashion <span className="float-end">(1,582)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Appliances{" "}
                            <span className="float-end">(1,037)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Beauty, Toys & More{" "}
                            <span className="float-end">(924)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Food & Drinks{" "}
                            <span className="float-end">(701)</span>
                          </a>
                        </li>
                        <li className="py-1">
                          <a href="#" className="text-muted">
                            Toys & Games{" "}
                            <span className="float-end">(239)</span>
                          </a>
                        </li>
                      </ol>
                      <div className="mt-3 text-center">
                        <a
                          href="#"
                          className="text-muted text-decoration-underline"
                        >
                          View all Categories
                        </a>
                      </div>
                    </div>
                    <div className="p-3">
                      <h6 className="text-muted mb-3 text-uppercase fw-semibold">
                        Products Reviews
                      </h6>
                      <div
                        className="swiper vertical-swiper"
                        style={{ height: "250px" }}
                      >
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="card border border-dashed shadow-none">
                              <div className="card-body">
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-sm">
                                    <div className="avatar-title bg-light rounded">
                                      <img
                                        src="assets/images/companies/img-1.png"
                                        alt=""
                                        height="30"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <div>
                                      <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                                        {" "}
                                        " Great product and looks great, lots of
                                        features. "
                                      </p>
                                      <div className="fs-11 align-middle text-warning">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                      </div>
                                    </div>
                                    <div className="text-end mb-0 text-muted">
                                      - by{" "}
                                      <cite title="Source Title">
                                        Force Medicines
                                      </cite>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="card border border-dashed shadow-none">
                              <div className="card-body">
                                <div className="d-flex">
                                  <div className="flex-shrink-0">
                                    <img
                                      src="assets/images/users/avatar-3.jpg"
                                      alt=""
                                      className="avatar-sm rounded"
                                    />
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <div>
                                      <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                                        {" "}
                                        " Amazing template, very easy to
                                        understand and manipulate. "
                                      </p>
                                      <div className="fs-11 align-middle text-warning">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-half-fill"></i>
                                      </div>
                                    </div>
                                    <div className="text-end mb-0 text-muted">
                                      - by{" "}
                                      <cite title="Source Title">
                                        Henry Baird
                                      </cite>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="card border border-dashed shadow-none">
                              <div className="card-body">
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-sm">
                                    <div className="avatar-title bg-light rounded">
                                      <img
                                        src="assets/images/companies/img-8.png"
                                        alt=""
                                        height="30"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <div>
                                      <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                                        {" "}
                                        "Very beautiful product and Very helpful
                                        customer service."
                                      </p>
                                      <div className="fs-11 align-middle text-warning">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-line"></i>
                                        <i className="ri-star-line"></i>
                                      </div>
                                    </div>
                                    <div className="text-end mb-0 text-muted">
                                      - by{" "}
                                      <cite title="Source Title">
                                        Zoetic Fashion
                                      </cite>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="card border border-dashed shadow-none">
                              <div className="card-body">
                                <div className="d-flex">
                                  <div className="flex-shrink-0">
                                    <img
                                      src="assets/images/users/avatar-2.jpg"
                                      alt=""
                                      className="avatar-sm rounded"
                                    />
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <div>
                                      <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                                        " The product is very beautiful. I like
                                        it. "
                                      </p>
                                      <div className="fs-11 align-middle text-warning">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-half-fill"></i>
                                        <i className="ri-star-line"></i>
                                      </div>
                                    </div>
                                    <div className="text-end mb-0 text-muted">
                                      - by{" "}
                                      <cite title="Source Title">
                                        Nancy Martino
                                      </cite>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <h6 className="text-muted mb-3 text-uppercase fw-semibold">
                        Customer Reviews
                      </h6>
                      <div className="bg-light px-3 py-2 rounded-2 mb-2">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <div className="fs-16 align-middle text-warning">
                              <i className="ri-star-fill"></i>
                              <i className="ri-star-fill"></i>
                              <i className="ri-star-fill"></i>
                              <i className="ri-star-fill"></i>
                              <i className="ri-star-half-fill"></i>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <h6 className="mb-0">4.5 out of 5</h6>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-muted">
                          Total <span className="fw-medium">5.50k</span> reviews
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="row align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">5 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <div className="progress animated-progress progress-sm">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "50.16%" }}
                                  aria-valuenow="50.16"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">2758</h6>
                            </div>
                          </div>
                        </div>

                        <div className="row align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">4 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <div className="progress animated-progress progress-sm">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "29.32%" }}
                                  aria-valuenow="29.32"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">1063</h6>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">3 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <div className="progress animated-progress progress-sm">
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  style={{ width: "18.12%" }}
                                  aria-valuenow="18.12"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">997</h6>
                            </div>
                          </div>
                        </div>

                        <div className="row align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">2 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <div className="progress animated-progress progress-sm">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "4.98%" }}
                                  aria-valuenow="4.98"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">227</h6>
                            </div>
                          </div>
                        </div>

                        <div className="row align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">1 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <div className="progress animated-progress progress-sm">
                                <div
                                  className="progress-bar bg-danger"
                                  role="progressbar"
                                  style={{ width: "7.42%" }}
                                  aria-valuenow="7.42"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">408</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card sidebar-alert bg-light border-0 text-center mx-4 mb-0 mt-3">
                      <div className="card-body">
                        <img src="assets/images/giftbox.png" alt="" />
                        <div className="mt-4">
                          <h5>Invite New Seller</h5>
                          <p className="text-muted lh-base">
                            Refer a new seller to us and earn $100 per refer.
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary btn-label rounded-pill"
                          >
                            <i className="ri-mail-fill label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                            Invite Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
