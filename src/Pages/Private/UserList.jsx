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
import Pagination from "../../Component/Pagination";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Users() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [dispatchers, setDispatchers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    role: "user",
    phone: "",
    escalateTime: 0,
    memberOf: [],
  });
  useEffect(() => {
    if (token !== "") {
      fetchUser();
    }
  }, [token, currentPage, query]);
  const handleClickOpen = () => {
    setOpen(true);
    fetchGangCategory();
  };
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
  const handleClose = () => {
    setOpen(false);
    setDispatcherData((prevItem) => ({
      ...prevItem,
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      role: "user",
      escalateTime: 0,
      memberOf: [],
    }));
  };

  const fetchUser = () => {
    setShowLoader(true);
    const data = {
      search: query,
      page: currentPage,
      pageSize: 10,
      roleBased: "user",
      isAssigned: "",
    };
    axios
      .post(`${apiUrl}user-list`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setDispatchers(response.data?.users);
        setTotalPages(response.data?.pages);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const deleteDispatcher = (id) => {
    const data = {
      id: id,
    };

    axios
      .delete(`${apiUrl}softdelete-user`, {
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
        fetchUser();
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

    if (name === "memberOf") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setDispatcherData((prevItem) => ({
        ...prevItem,
        [name]: selectedOptions,
      }));
    } else {
      setDispatcherData((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const addDispatcher = (e) => {
    e.preventDefault();
    if (dispatcherData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (dispatcherData.username === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Username",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (dispatcherData.phone === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Mobile Number",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      name: dispatcherData.name,
      username: dispatcherData.username,
      email: dispatcherData.email,
      phone: dispatcherData.phone,
      role: dispatcherData.role,
      esclateTime: dispatcherData.escalateTime,
      memberOf: dispatcherData.memberOf,
    };
    axios
      .post(`${apiUrl}register`, data, {
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
        setDispatcherData({
          id: "",
          name: "",
          username: "",
          email: "",
          role: "user",
          phone: "",
          escalateTime: 0,
          memberOf: [],
        });
        setOpen(false);
        fetchUser();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(error);
      });
  };

  const updateDispatcher = (e) => {
    e.preventDefault();
    if (dispatcherData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (dispatcherData.username === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Username",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (dispatcherData.phone === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Mobile Number",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      name: dispatcherData.name,
      username: dispatcherData.username,
      email: dispatcherData.email,
      phone: dispatcherData.phone,
      role: dispatcherData.role,
      id: dispatcherData.id,
      esclateTime: dispatcherData.escalateTime,
      memberOf: dispatcherData.memberOf,
    };
    axios
      .put(`${apiUrl}user-update`, data, {
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
        setDispatcherData({
          id: "",
          name: "",
          username: "",
          email: "",
          role: "user",
          phone: "",
          escalateTime: 0,
          memberOf: [],
        });
        setOpen(false);
        fetchUser();
      })
      .catch((error) => {
        setShowLoader(false);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
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
                <h4 className="mb-sm-0">Users</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Users</li>
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
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          placeholder="Search by name or mobile"
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
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
                        Users
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
                          <th>Username</th>
                          <th>Phone</th>
                          <th>Member Of</th>
                          <th>Escalation Time(in Hrs.)</th>

                          <th style={{ width: 120 }} align="center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {dispatchers ? (
                          dispatchers.length > 0 ? (
                            dispatchers.map((dispatcher, index) => (
                              <tr key={dispatcher._id}>
                                <td>{(currentPage - 1) * 10 + index + 1}</td>
                                <td>{dispatcher.name}</td>
                                <td>{dispatcher.username}</td>
                                <td>{dispatcher.phone}</td>
                                <td>
                                  {dispatcher?.memberOf?.length > 0 &&
                                    dispatcher?.memberOf.map((member) => (
                                      <p className="mb-0" key={member}>
                                        {member}
                                      </p>
                                    ))}
                                </td>
                                <td>{dispatcher.esclateTime}</td>

                                <td align="center">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      setMode("edit");
                                      setDispatcherData({
                                        id: dispatcher._id,
                                        name: dispatcher.name,
                                        username: dispatcher?.username,
                                        email: dispatcher?.email,
                                        role: dispatcher?.role,
                                        phone: dispatcher?.phone,
                                        escalateTime: dispatcher?.esclateTime,
                                        memberOf: dispatcher?.memberOf,
                                      });
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
                                          deleteDispatcher(dispatcher._id);
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
                              <td colSpan={8} align="center">
                                No record
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan={8} align="center">
                              Loading...
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
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>{mode === "add" ? "Add" : "Update"} User</DialogTitle>
            <DialogContent>
              <form
                onSubmit={mode === "add" ? addDispatcher : updateDispatcher}
              >
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div id="modal-id">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={dispatcherData?.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={dispatcherData?.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Member Of</label>
                      <select
                        onChange={handleChange}
                        value={dispatcherData.memberOf}
                        name="memberOf"
                        className="form-control"
                        multiple
                        style={{ height: "150px" }}
                      >
                        <option disabled value="">
                          -- Select Categories --
                        </option>
                        {categoryList &&
                          categoryList.map((cat) => (
                            <option key={cat._id} value={cat.categoryName}>
                              {cat.categoryName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Email Id</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Id"
                        name="email"
                        value={dispatcherData?.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Mobile</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                        name="phone"
                        value={dispatcherData?.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-lg-6">
                      <label className="form-label">
                        Complaint Escalation Time (in Hrs.)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Time in Hrs."
                        name="escalateTime"
                        value={dispatcherData?.escalateTime}
                        onChange={handleChange}
                      />
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
                      {mode === "add" ? "Add" : "Update"} User
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
export default Users;
