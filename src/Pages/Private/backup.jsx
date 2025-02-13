import Layout from "../../Component/Layout";
import googlemapicon from "./../../assets/images/google-map-icon.png";
import avatar from "./../../assets/images/users/avatar-8.jpg";
import avatar7 from "./../../assets/images/users/avatar-7.jpg";
import avatar6 from "./../../assets/images/users/avatar-6.jpg";
import { useEffect, useState } from "react";
import "./../../assets/css/swiper-bundle.min.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import axios from "axios";
import { apiUrl, formatDate } from "../../Constant";

//register();

function ComplaintDetail() {
  const { id } = useParams();
  const { token } = useUserContext();
  const [tab, setTab] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  console.log("id: ", id);
  useEffect(() => {
    if (token !== "") {
      fetchComplaint();
    }
  }, [token]);

  const fetchComplaint = () => {
    setShowLoader(true);
    const data = {
      complaintno: id,
    };
    axios
      .post(`${apiUrl}list-complaints`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setComplaintData(response?.data?.complaints[0]);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Complaint Details</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Complaint</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Complaint Details
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-9">
              <div className="card">
                <div className="card-body">
                  <div className="text-muted">
                    <h6 className="mb-3 fw-semibold text-uppercase">
                      Complaint summary |{" "}
                      <span className="badge badge-soft-secondary align-right">
                        {complaintData?.complaintStatus}
                      </span>{" "}
                      {/* |{" "}
                      <span className="badge badge-soft-secondary align-right">
                        Due : 08-May-2024
                      </span> */}
                    </h6>
                  </div>
                  <div className="card-body card-body p-0 mt-3">
                    <div className="live-preview">
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-medium">Complaint No</td>
                              <td>{complaintData?.complaintNo}</td>
                              <td className="fw-medium">Registration Date</td>
                              <td>{formatDate(complaintData?.createdAt)}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Consumer Name</td>
                              <td>{complaintData?.consumerName}</td>
                              <td className="fw-medium">Account No</td>
                              <td>{complaintData?.consumerAccountNo}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Consumer Mob.</td>
                              <td>{complaintData?.consumerMobile}</td>
                              <td className="fw-medium">Consumer Type</td>
                              <td>{complaintData?.consumerType}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Complaint Type</td>
                              <td>{complaintData?.complaintType}</td>
                              <td className="fw-medium">Complaint Subtype</td>
                              <td>{complaintData?.complaintSubType}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Consumer Address</td>
                              <td colSpan="3">
                                {complaintData?.consumerAddress}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Complainant Remark</td>
                              <td colSpan="3">{complaintData?.remarks}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="text-muted">
                    <h6 className="mb-3 fw-semibold text-uppercase">
                      Site Location |{" "}
                      <img
                        src={googlemapicon}
                        alt="Clieck to View on Map"
                        height="20"
                        className="rounded"
                      />
                    </h6>
                  </div>
                  <div className="card-body card-body p-0 mt-3">
                    <div className="live-preview">
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-medium">Site Location</td>
                              <td colSpan="3">
                                BSD Academy Baraura Hussain Bari, Lucknow, Uttar
                                Pradesh 226003
                                <a href="#" className="pl-4">
                                  <img
                                    id="header-lang-img"
                                    src={googlemapicon}
                                    alt="Clieck to View on Map"
                                    height="15"
                                    className="rounded"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">ZONE</td>
                              <td>LESA CIS GOMTI-2</td>
                              <td className="fw-medium">CIRCLE</td>
                              <td>EUDC-8</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">DIVISION</td>
                              <td>EDD-THAKURGANJ</td>
                              <td className="fw-medium">SUBDIVISION</td>
                              <td>BALAGANJ</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">SUBSTATION</td>
                              <td>33/11 KV AZAD NAGAR</td>
                              <td className="fw-medium">DISTRICT</td>
                              <td>LUCKNOW</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Site Images</h4>
                </div>

                <div className="card-body">
                  <div className="live-preview">
                    <div className="row g-2  mb-2">
                      <div className="col-sm-6">
                        <figure className="figure mb-0">
                          <a
                            className="image-popup"
                            href="#"
                            title="Site Photo"
                          >
                            <img
                              src={transferDamage}
                              className="figure-img img-fluid rounded"
                              alt="Site Photo"
                            />
                          </a>
                          <figcaption className="figure-caption">
                            Site Photograph
                          </figcaption>
                        </figure>
                      </div>
                      <div className="col-sm-6">
                        <figure className="figure mb-0">
                          <a
                            className="image-popup"
                            href="#"
                            title="Engineer Photo with Equipments"
                          >
                            <img
                              src={repair}
                              className="figure-img img-fluid rounded"
                              alt="Engineer Photo"
                            />
                          </a>
                          <figcaption className="figure-caption">
                            Engineer Photograph
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <figure className="figure mb-0">
                          <a
                            className="image-popup"
                            href="#"
                            title="Site Photo"
                          >
                            <img
                              src={repair2}
                              className="figure-img img-fluid rounded"
                              alt="Site Photo"
                            />
                          </a>
                          <figcaption className="figure-caption">
                            Site Photograph
                          </figcaption>
                        </figure>
                      </div>
                      <div className="col-sm-6">
                        <figure className="figure mb-0">
                          <a
                            className="image-popup"
                            href="#"
                            title="Engineer Photo with Equipments"
                          >
                            <img
                              src={transformer}
                              className="figure-img img-fluid rounded"
                              alt="..."
                            />
                          </a>
                          <figcaption className="figure-caption">
                            Engineer Photograph
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div>
                    <ul
                      className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <button
                          onClick={() => setTab(1)}
                          className={`nav-link ${tab === 1 ? "active" : ""}`}
                        >
                          Officers Remarks (5)
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={() => setTab(2)}
                          className={`nav-link ${tab === 2 ? "active" : ""}`}
                        >
                          Attachments File (4)
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={() => setTab(3)}
                          className={`nav-link ${tab === 3 ? "active" : ""}`}
                        >
                          Time Entries (9 hrs 13 min)
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className={`tab-pane ${tab === 1 ? "active" : ""}`}>
                      <h5 className="card-title mb-4">Remarks</h5>
                      <SimpleBar style={{ maxHeight: 408 }} forceVisible="y">
                        <div className="px-3 mb-2">
                          {complaintData?.staffRemarks.length > 0 &&
                            complaintData?.staffRemarks.map((remark) => (
                              <div className="d-flex mb-4" key={remark._id}>
                                <div className="flex-shrink-0">
                                  <img
                                    src={avatar7}
                                    alt=""
                                    className="avatar-xs rounded-circle"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h5 className="fs-13">
                                    <a href="pages-profile.html">
                                      {remark.remarkBy}
                                    </a>{" "}
                                    <small className="text-muted">
                                      {formatDate(remark.date)}
                                    </small>
                                  </h5>
                                  <p className="text-muted">{remark.remark}</p>
                                  <a
                                    href="#"
                                    className="badge text-muted bg-light"
                                  >
                                    <i className="mdi mdi-reply"></i> Reply
                                  </a>
                                </div>
                              </div>
                            ))}

                          {/* <div className="d-flex mb-4">
                            <div className="flex-shrink-0">
                              <img
                                src={avatar}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="fs-13">
                                <a href="pages-profile.html">
                                  Purushottam kumar (SDO)
                                </a>{" "}
                                <small className="text-muted">
                                  24 Dec 2021 - 05:20PM
                                </small>
                              </h5>
                              <p className="text-muted">
                                If you have further questions, please contact
                                Customer Support from the “Action Menu” on your{" "}
                                <a
                                  href="#"
                                  className="text-decoration-underline"
                                >
                                  Online Order Support
                                </a>
                                .
                              </p>
                              <a href="#" className="badge text-muted bg-light">
                                <i className="mdi mdi-reply"></i> Reply
                              </a>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <img
                                src={avatar}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="fs-13">
                                <a href="pages-profile.html">
                                  Sanjeev Kumar Mishra (XEN)
                                </a>{" "}
                                <small className="text-muted">26 min ago</small>
                              </h5>
                              <p className="text-muted">
                                Your{" "}
                                <a
                                  href="#"
                                  className="text-decoration-underline"
                                >
                                  Online Order Support
                                </a>{" "}
                                provides you with the most current status of
                                your order. To help manage your order refer to
                                the “Action Menu” to initiate return, contact
                                Customer Support and more.
                              </p>
                              <div className="row g-2 mb-3">
                                <div className="col-lg-1 col-sm-2 col-6">
                                  <img
                                    src="assets/images/small/img-4.jpg"
                                    alt=""
                                    className="img-fluid rounded"
                                  />
                                </div>
                                <div className="col-lg-1 col-sm-2 col-6">
                                  <img
                                    src="assets/images/small/img-5.jpg"
                                    alt=""
                                    className="img-fluid rounded"
                                  />
                                </div>
                              </div>
                              <a href="#" className="badge text-muted bg-light">
                                <i className="mdi mdi-reply"></i> Reply
                              </a>
                              <div className="d-flex mt-4">
                                <div className="flex-shrink-0">
                                  <img
                                    src={avatar6}
                                    alt=""
                                    className="avatar-xs rounded-circle"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h5 className="fs-13">
                                    <a href="pages-profile.html">Excutive</a>{" "}
                                    <small className="text-muted">
                                      8 sec ago
                                    </small>
                                  </h5>
                                  <p className="text-muted">
                                    Other shipping methods are available at
                                    checkout if you want your purchase delivered
                                    faster.
                                  </p>
                                  <a
                                    href="#"
                                    className="badge text-muted bg-light"
                                  >
                                    <i className="mdi mdi-reply"></i> Reply
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </SimpleBar>
                    </div>
                    <div className={`tab-pane ${tab === 2 ? "active" : ""}`}>
                      <div className="table-responsive table-card">
                        <table className="table table-borderless align-middle mb-0">
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col">File Name</th>
                              <th scope="col">Type</th>
                              <th scope="col">Size</th>
                              <th scope="col">Upload Date</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm">
                                    <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                      <i className="ri-file-zip-fill"></i>
                                    </div>
                                  </div>
                                  <div className="ms-3 flex-grow-1">
                                    <h6 className="fs-15 mb-0">
                                      <a href="#">App pages.zip</a>
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>Zip File</td>
                              <td>2.22 MB</td>
                              <td>21 Dec, 2021</td>
                              <td>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="btn btn-light btn-icon"
                                    id="dropdownMenuLink1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                  >
                                    <i className="ri-equalizer-fill"></i>
                                  </a>
                                  <ul
                                    className="dropdown-menu dropdown-menu-end customDropdown"
                                    aria-labelledby="dropdownMenuLink1"
                                    data-popper-placement="bottom-end"
                                  >
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                        Download
                                      </a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm">
                                    <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                      <i className="ri-file-pdf-fill"></i>
                                    </div>
                                  </div>
                                  <div className="ms-3 flex-grow-1">
                                    <h6 className="fs-15 mb-0">
                                      <a href="#">Velzon admin.ppt</a>
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>PPT File</td>
                              <td>2.24 MB</td>
                              <td>25 Dec, 2021</td>
                              <td>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="btn btn-light btn-icon"
                                    id="dropdownMenuLink2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                  >
                                    <i className="ri-equalizer-fill"></i>
                                  </a>
                                  <ul
                                    className="dropdown-menu dropdown-menu-end customDropdown"
                                    aria-labelledby="dropdownMenuLink2"
                                    data-popper-placement="bottom-end"
                                  >
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                        Download
                                      </a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm">
                                    <div className="avatar-title bg-soft-info text-info rounded fs-20">
                                      <i className="ri-folder-line"></i>
                                    </div>
                                  </div>
                                  <div className="ms-3 flex-grow-1">
                                    <h6 className="fs-15 mb-0">
                                      <a href="#">Images.zip</a>
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>ZIP File</td>
                              <td>1.02 MB</td>
                              <td>28 Dec, 2021</td>
                              <td>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="btn btn-light btn-icon"
                                    id="dropdownMenuLink3"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                  >
                                    <i className="ri-equalizer-fill"></i>
                                  </a>
                                  <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuLink3"
                                    data-popper-placement="bottom-end"
                                  >
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-eye-fill me-2 align-middle"></i>
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-download-2-fill me-2 align-middle"></i>
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm">
                                    <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                      <i className="ri-image-2-fill"></i>
                                    </div>
                                  </div>
                                  <div className="ms-3 flex-grow-1">
                                    <h6 className="fs-15 mb-0">
                                      <a href="#">Bg-pattern.png</a>
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>PNG File</td>
                              <td>879 KB</td>
                              <td>02 Nov 2021</td>
                              <td>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="btn btn-light btn-icon"
                                    id="dropdownMenuLink4"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                  >
                                    <i className="ri-equalizer-fill"></i>
                                  </a>
                                  <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuLink4"
                                    data-popper-placement="bottom-end"
                                  >
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-eye-fill me-2 align-middle"></i>
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-download-2-fill me-2 align-middle"></i>
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={`tab-pane ${tab === 3 ? "active" : ""}`}>
                      <h6 className="card-title mb-4 pb-2">Time Entries</h6>
                      <div className="table-responsive table-card">
                        <table className="table align-middle mb-0">
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col">Member</th>
                              <th scope="col">Date</th>
                              <th scope="col">Duration</th>
                              <th scope="col">Timer Idle</th>
                              <th scope="col">Complaint Title</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={avatar}
                                    alt=""
                                    className="rounded-circle avatar-xxs"
                                  />
                                  <div className="flex-grow-1 ms-2">
                                    <a
                                      href="pages-profile.html"
                                      className="fw-medium"
                                    >
                                      Ankit C Rajpoot
                                    </a>
                                  </div>
                                </div>
                              </th>
                              <td>02 Jan, 2022</td>
                              <td>3 hrs 12 min</td>
                              <td>05 min</td>
                              <td>Apps Pages</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={avatar}
                                    alt=""
                                    className="rounded-circle avatar-xxs"
                                  />
                                  <div className="flex-grow-1 ms-2">
                                    <a
                                      href="pages-profile.html"
                                      className="fw-medium"
                                    >
                                      Purushottam kumar
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td>28 Dec, 2021</td>
                              <td>1 hrs 35 min</td>
                              <td>-</td>
                              <td>Profile Page Design</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={avatar}
                                    alt=""
                                    className="rounded-circle avatar-xxs"
                                  />
                                  <div className="flex-grow-1 ms-2">
                                    <a
                                      href="pages-profile.html"
                                      className="fw-medium"
                                    >
                                      Purushottam kumar
                                    </a>
                                  </div>
                                </div>
                              </th>
                              <td>27 Dec, 2021</td>
                              <td>4 hrs 26 min</td>
                              <td>03 min</td>
                              <td>Ecommerce Dashboard</td>
                            </tr>
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
    </Layout>
  );
}
export default ComplaintDetail;
