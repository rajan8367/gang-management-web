import Layout from "../../Component/Layout";
import googlemapicon from "./../../assets/images/google-map-icon.png";
import avatar from "./../../assets/images/users/avatar-8.jpg";
import avatar7 from "./../../assets/images/users/avatar-7.jpg";
import { forwardRef, useEffect, useState } from "react";
import "./../../assets/css/swiper-bundle.min.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import axios from "axios";
import { apiUrl, formatDate } from "../../Constant";
import "leaflet/dist/leaflet.css";
import { DialogContent, DialogTitle, Slide } from "@mui/material";
import MapComponent from "../../Component/MapComponent";
import Swal from "sweetalert2";
import { Dialog, DialogActions, IconButton } from "@mui/material";

import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useUserContext();
  const [tab, setTab] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [openMap, setOpenMap] = useState(false);
  const [location, setLocation] = useState({
    lat: "",
    long: "",
  });
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (token !== "") {
      fetchComplaint();
    }
  }, [token]);
  useEffect(() => {
    if (complaintData) {
      //getAddressFromLatLng();
    }
  }, [complaintData]);
  const handleOpenDialog = (index) => {
    setSelectedImage(complaintData?.siteDocuments[index]?.documentName);
    setCurrentImageIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < complaintData?.siteDocuments.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedImage(
        complaintData?.siteDocuments[currentImageIndex + 1]?.documentName
      );
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedImage(
        complaintData?.siteDocuments[currentImageIndex - 1]?.documentName
      );
    }
  };
  const fetchComplaint = () => {
    setShowLoader(true);
    const data = {
      registrationDate: "",
      fromDate: "",
      toDate: "",
      complaintStatus: "",
      complaintID: id,
      page: 1,
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
        console.log("Response:", response);
        setComplaintData(response?.data?.complaints[0]);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const getAddressFromLatLng = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${complaintData?.siteDocuments[0]?.latData},${complaintData?.siteDocuments[0]?.longData}&key=AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI`
      );

      if (response.data.status === "OK") {
        const formattedAddress = response.data.results[0].formatted_address;
        console.log("add", formattedAddress);
        setAddress(formattedAddress);
      } else {
        console.log("Unable to get the address. Please check the coordinates.");
      }
    } catch (error) {
      console.error("Error fetching the address:", error);
      //setError("An error occurred while fetching the address.");
    }
  };
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are 0-indexed
    const year = date.getUTCFullYear();

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // Converts 0 to 12 for AM/PM format

    return `${day}-${month}-${year}, At ${adjustedHours}:${minutes} ${ampm}`;
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
                              <td
                                colSpan="3"
                                style={{ whiteSpace: "break-spaces" }}
                              >
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
                        className="rounded cursor-pointer"
                        onClick={() => {
                          if (
                            complaintData?.consumerLat &&
                            complaintData?.consumerLon
                          ) {
                            setLocation({
                              lat: complaintData?.consumerLat,
                              long: complaintData?.consumerLon,
                            });
                            setOpenMap(true);
                          } else {
                            Swal.fire({
                              title: "Site Location not added yet",
                              text: "Do you want to set this as the consumer's location?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonColor: "#405189",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, set it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate(
                                  "/complaint-info/" +
                                    complaintData?.complaintID
                                );
                              }
                            });
                          }
                        }}
                      />
                    </h6>
                  </div>
                  <div className="card-body card-body p-0 mt-3">
                    <div className="live-preview">
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap mb-0">
                          <tbody>
                            {/* <tr>
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
                            </tr> */}
                            <tr>
                              <td className="fw-medium">ZONE</td>
                              <td>{complaintData?.zone}</td>
                              <td className="fw-medium">CIRCLE</td>
                              <td>{complaintData?.circle}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">DIVISION</td>
                              <td>{complaintData?.division}</td>
                              <td className="fw-medium">SUBDIVISION</td>
                              <td>{complaintData?.subdivision}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">SUBSTATION</td>
                              <td>{complaintData?.substation}</td>
                              <td className="fw-medium">DISTRICT</td>
                              <td>{complaintData?.district}</td>
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
                    <div className="row g-2 mb-2">
                      {complaintData?.siteDocuments.length > 0 &&
                        complaintData?.siteDocuments.map((doc, index) => (
                          <div className="col-md-3 card me-2" key={doc._id}>
                            <img
                              onClick={() => handleOpenDialog(index)}
                              src={doc.documentName}
                              className="img-fluid cursor-pointer"
                              alt="Site Photo"
                            />
                            {index === 0 ? (
                              <h4>Selfie</h4>
                            ) : index === 1 ? (
                              <h4>Site</h4>
                            ) : (
                              <h4>Site After Work</h4>
                            )}
                            <p className="figure-caption mb-0">
                              Uploaded By: {doc.uploadBy} <br />
                            </p>
                            <p className="text-end">
                              {doc?.uploadDate &&
                                convertTimestamp(doc.uploadDate)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Safety Checks</h4>
                </div>

                <div className="card-body">
                  <div className="live-preview">
                    <div className="row g-2  mb-2">
                      <table className="table align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>Checks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complaintData?.safetyChecks.length > 0 &&
                            complaintData?.safetyChecks.map((safety) => (
                              <tr key={safety._id}>
                                <td>{safety?.checkName}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Consumable Items
                  </h4>
                </div>

                <div className="card-body">
                  <div className="live-preview">
                    <div className="row g-2  mb-2">
                      <table className="table align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>product Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complaintData?.consumedItems.length > 0 &&
                            complaintData?.consumedItems.map((consume) => (
                              <tr key={consume._id}>
                                <td>{consume?.itemName}</td>
                                <td>{consume?.quantity}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
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
                          {/* Officers */} Remarks (
                          {complaintData?.staffRemarks.length})
                        </button>
                      </li>
                      {/* <li className="nav-item">
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
                      </li> */}
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
      <Dialog
        open={openMap}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenMap(false)}
        fullWidth
        maxWidth="md"
        sx={{ zIndex: 99999 }}
      >
        <DialogTitle>Site Location</DialogTitle>
        <DialogContent>
          {location.lat !== "" && (
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
      {/* Dialog for Image Carousel */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentImageIndex === 0
            ? "Selfie"
            : currentImageIndex === 1
            ? "Site"
            : "Afer work Site"}{" "}
          Image
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            overflow: "hidden",
            height: "500px", // Adjust the dialog height as needed
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain", // Ensures the image fits within the dialog
            }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleNextImage}
            disabled={
              currentImageIndex === complaintData?.siteDocuments.length - 1
            }
          >
            <ArrowForward />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
export default ComplaintDetail;
