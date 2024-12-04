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

function RoleMaster() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [roleList, setRoleList] = useState(null);
  const [roleData, setRoleData] = useState({
    id: "",
    roleName: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRoleData({
      id: "",
      roleName: "",
    });
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
        console.error("Error fetching Role:", error);
      });
  };

  const deleteFeedback = (id) => {
    const data = {
      id: id,
    };
    axios
      .delete(`${apiUrl}/delete-roles`, {
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
          text: "Role deleted successfully.",
          type: "success",
        }));
        fetchRole();
      })
      .catch((error) => {
        console.error("Error deleting Role:", error);
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addRole = (e) => {
    e.preventDefault();
    if (roleData.roleName === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Role",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      roleName: roleData.roleName,
    };
    axios
      .post(`${apiUrl}/add-roles`, data, {
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
          text: "Role added successfully.",
          type: "success",
        }));
        setRoleData({
          id: "",
          roleName: "",
        });
        setOpen(false);
        fetchRole();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error adding Role:", error);
      });
  };

  const updateRole = (e) => {
    e.preventDefault();
    if (roleData.roleName === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Role",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      roleName: roleData.roleName,
      id: roleData.id,
    };
    axios
      .put(`${apiUrl}/edit-roles`, data, {
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
          text: "Role updated successfully.",
          type: "success",
        }));

        setRoleData({
          id: "",
          roleName: "",
        });
        setOpen(false);
        fetchRole();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error updating Role:", error);
      });
  };

  const editFeedback = (role) => {
    setMode("edit");
    setRoleData({ id: role._id, roleName: role.roleName });
    setOpen(true);
  };

  useEffect(() => {
    if (token !== "") {
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
                <h4 className="mb-sm-0">Role Master</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Role Master</li>
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
                      {/* Role Master */}
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
                        Role
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
                          <th>Title</th>
                          <th style={{ width: 120 }} align="center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {roleList ? (
                          roleList.map((role, index) => (
                            <tr key={role._id}>
                              <td>{index + 1}</td>
                              <td>{role.roleName}</td>
                              <td align="center">
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => editFeedback(role)}
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
                                        deleteFeedback(role._id);
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
            <DialogTitle>{mode === "add" ? "Add" : "Update"} Role</DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addRole : updateRole}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div id="modal-id">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="roleName"
                          value={roleData.roleName}
                          onChange={handleChange}
                          required
                        />
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
                      {mode === "add" ? "Add" : "Update"} Role
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

export default RoleMaster;
