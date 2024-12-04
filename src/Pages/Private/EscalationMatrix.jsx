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
import { Fab } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EscaltionMaster() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [escalationList, setEscalationList] = useState(null);
  const [roleList, setRoleList] = useState(null);
  const [escalationData, setEscalationData] = useState({
    roleName: "",
    esclateTime: "",
    id: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEscalationData({
      roleName: "",
      esclateTime: "",
      id: "",
    });
  };

  const fetchEscalation = () => {
    setShowLoader(true);
    axios
      .post(
        `${apiUrl}/list-esclation`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEscalationList(response.data?.data || []);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error fetching Escalation:", error);
      });
  };

  const deleteEscalation = (id) => {
    const data = {
      id: id,
    };
    axios
      .delete(`${apiUrl}/delete-esclation`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Escalation deleted successfully.",
          type: "success",
        }));
        fetchEscalation();
      })
      .catch((error) => {
        console.error("Error deleting Escalation:", error);
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEscalationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEscalate = (e) => {
    e.preventDefault();
    if (escalationData.esclateTime === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Escalation Time",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (escalationData.roleName === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Role",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      roleName: escalationData.roleName,
      esclateTime: escalationData.esclateTime,
    };
    axios
      .post(`${apiUrl}/add-esclation`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Escalation added successfully.",
          type: "success",
        }));
        setEscalationData({
          roleName: "",
          esclateTime: "",
          id: "",
        });
        setOpen(false);
        fetchEscalation();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error adding Escalation:", error);
      });
  };

  const updateEscalate = (e) => {
    e.preventDefault();
    if (escalationData.esclateTime === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Escalation Time",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (escalationData.roleName === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Role",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      id: escalationData.id,
      roleName: escalationData.roleName,
      esclateTime: escalationData.esclateTime,
    };
    axios
      .put(`${apiUrl}/edit-esclation`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Escalation updated successfully.",
          type: "success",
        }));

        setEscalationData({
          roleName: "",
          esclateTime: "",
          id: "",
        });
        setOpen(false);
        fetchEscalation();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error updating Escalation:", error);
      });
  };

  const editEscalation = (esc) => {
    setMode("edit");
    setEscalationData({
      roleName: esc.roleName,
      esclateTime: esc.esclateTime,
      id: esc._id,
    });
    setOpen(true);
  };

  const fetchRole = () => {
    setShowLoader(true);
    axios
      .post(
        `${apiUrl}/list-roles`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRoleList(response.data?.data || []);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error fetching Escalation:", error);
      });
  };
  useEffect(() => {
    if (token !== "") {
      fetchEscalation();
      fetchRole();
    }
  }, [token]);

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Escalation Master</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Escalation Master
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      {/* Escalation Matrix */}
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
                        Escalation
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
                          <th>Role</th>
                          <th>Escalate Time(Hrs.)</th>
                          <th style={{ width: 120 }} align="center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {escalationList ? (
                          escalationList.map((role, index) => (
                            <tr key={role._id}>
                              <td>{index + 1}</td>
                              <td>{role.roleName}</td>
                              <td>{role.esclateTime}</td>
                              <td align="center">
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => editEscalation(role)}
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
                                        deleteEscalation(role._id);
                                      } else if (result.isDenied) {
                                        Swal.fire(
                                          "Delete cancelled",
                                          "",
                                          "info"
                                        );
                                      }
                                    });
                                  }}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} align="center">
                              No record
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

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              style: { width: "600px", maxHeight: "80vh" },
            }}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Escalation
            </DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addEscalate : updateEscalate}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div>
                        <label className="form-label">
                          Escalation Time (Hrs.)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Escalation Time (Hrs.)"
                          name="esclateTime"
                          value={escalationData.esclateTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label className="form-label">Role</label>
                        <select
                          className="form-control"
                          value={escalationData.roleName}
                          onChange={handleChange}
                          name="roleName"
                        >
                          <option>Select Role</option>
                          {roleList &&
                            roleList.map((role) => (
                              <option key={role._id} value={role.roleName}>
                                {role.roleName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={showLoader}
                      className="btn btn-success"
                    >
                      {mode === "add" ? "Add" : "Update"} Escalation
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

export default EscaltionMaster;
