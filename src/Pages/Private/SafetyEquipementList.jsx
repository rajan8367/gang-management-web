import { forwardRef, useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl } from "../../Constant";
import Loader from "../../Component/Loader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { Fab } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SafetyEquipmentList() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [equipmentData, setEquipmentData] = useState({
    equipmentID: "",
    equipmentName: "",
    equipmentType: "",
    equipmentDescription: "",
    equipmentManufacturer: "",
    equipmentValidTill: "",
    equipmentSize: "",
    equipmentQuantity: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEquipmentData((prevEquipmentData) => ({
      ...prevEquipmentData,
      equipmentID: "",
      equipmentName: "",
      equipmentType: "",
      equipmentDescription: "",
      equipmentManufacturer: "",
      equipmentValidTill: "",
      equipmentSize: "",
      equipmentQuantity: "",
    }));
  };
  const fetchGang = () => {
    setShowLoader(true);
    const data = {
      search: "",
      gangID: "",
    };
    axios
      .post(`${apiUrl}list-equipment`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const deleteEquipment = (id) => {
    const data = {
      equipmentID: id,
    };

    axios
      .delete(`${apiUrl}delete-gang`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        fetchGang();
      })
      .catch((error) => {
        alert(error.message);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData((prevEquipData) => ({
      ...prevEquipData,
      [name]: value,
    }));
  };
  const addEquipment = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const data = {};
    axios
      .post(`${apiUrl}add-gang`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        setOpen(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateEquipment = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const data = {};
    console.log("-- ", data);
    //return;
    axios
      .put(`${apiUrl}edit-gang`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        setOpen(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const getEquipmentData = (id) => {
    setShowLoader(true);
    const data = {
      search: "",
      gangID: id,
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
        setMode("edit");
        const {
          gangName,
          gangMobile,
          gangLeaderName,
          gangLeaderID,
          feeder,
          location,
          tools_availabe,
          substation_id,
        } = response.data.gangs[0];
        setGangData((prevGangData) => ({
          ...prevGangData,
          gangName: gangName,
          gangMobile: gangMobile,
          gangLeaderID: gangLeaderID,
          gangLeaderName: gangLeaderName,
          feeder: feeder,
          location: location,
          tools_availabe: tools_availabe,
          subStation: substation_id,
        }));
        setOpen(true);
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
                <h4 className="mb-sm-0">Safety Checklist</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Safety Checklist</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="ticketsList">
                <div className="card-header border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Safety Checklist
                    </h5>
                    <div className="flex-shrink-0">
                      <button
                        className="btn btn-primary add-btn"
                        onClick={() => {
                          setMode("add");
                          handleClickOpen();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Checklist
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive table-card mb-4">
                    <table className="table align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "40px" }}>
                            S.No.
                          </th>
                          <th>Name</th>
                          <th>Description</th>
                          <th style={{ width: 120 }} align="center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        <tr>
                          <td>1</td>
                          <td>Insulated Gloves</td>
                          <td>Rubber gloves for electrical protection</td>
                          <td align="center">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setMode("edit");
                                handleClickOpen();
                              }}
                            >
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-sm ms-1"
                              onClick={() => {
                                Swal.fire({
                                  title: "Do you really want to delete?",
                                  icon: "question",
                                  confirmButtonText: "Yes",
                                  showDenyButton: true,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteEquipment(2);
                                  } else if (result.isDenied) {
                                    Swal.fire("Delete cancelled", "", "info");
                                  }
                                });
                              }}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Safety Helmet</td>

                          <td>Shock-resistant helmet for head protection</td>

                          <td align="center">
                            <button className="btn btn-primary btn-sm">
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ms-1">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Insulated Screwdriver Set</td>

                          <td>
                            Screwdrivers with insulated handles for safe
                            electrical work
                          </td>

                          <td align="center">
                            <button className="btn btn-primary btn-sm">
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ms-1">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Dielectric Boots</td>

                          <td>Electric shock-resistant rubber boots</td>

                          <td align="center">
                            <button className="btn btn-primary btn-sm">
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ms-1">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Safety Goggles</td>

                          <td>Protective eyewear against debris and sparks</td>

                          <td align="center">
                            <button className="btn btn-primary btn-sm">
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ms-1">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Checklist
            </DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addEquipment : updateEquipment}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div id="modal-id">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="equipmentName"
                          value={equipmentData.equipmentName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div>
                        <label className="form-label">Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          name="equipmentDescription"
                          value={equipmentData.equipmentDescription}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleClose()}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={showLoader}
                      className="btn btn-success"
                    >
                      {mode === "add" ? "Add" : "Update"} Checklist
                    </button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
export default SafetyEquipmentList;
