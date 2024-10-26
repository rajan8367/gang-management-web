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

function GangCategoryList() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (token !== "") {
      fetchGangCategory();
    }
  }, [token]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      id: "",
      name: "",
    }));
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

  const deleteCategory = (id) => {
    const data = {
      id: id,
    };

    axios
      .delete(`${apiUrl}delete-gangCategory`, {
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
        fetchGangCategory();
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
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: value,
    }));
  };
  const addCategory = (e) => {
    e.preventDefault();
    if (categoryData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter category name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      categoryName: categoryData.name,
    };
    axios
      .post(`${apiUrl}add-gangCategory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setShowLoader(false);
        setCategoryData({
          id: "",
          name: "",
        });
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        setOpen(false);
        fetchGangCategory();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    if (categoryData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter category name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      categoryName: categoryData.name,
      id: categoryData.id,
    };

    axios
      .put(`${apiUrl}update-gangCategory`, data, {
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
        setCategoryData({
          id: "",
          name: "",
        });
        setOpen(false);
        fetchGangCategory();
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
                <h4 className="mb-sm-0">Gang Category</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Gang Category</li>
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
                      {/* Gang Category */}
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
                        Category
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
                          <th style={{ width: 120 }} align="center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {categoryList ? (
                          categoryList.length > 0 ? (
                            categoryList.map((category, index) => (
                              <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td align="center">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      setMode("edit");
                                      setCategoryData({
                                        id: category._id,
                                        name: category.categoryName,
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
                                          deleteCategory(category._id);
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
                          )
                        ) : (
                          <tr>
                            <td colSpan={3} align="center">
                              Loading...
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
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Category
            </DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addCategory : updateCategory}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div id="modal-id">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={categoryData.name}
                          onChange={handleChange}
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
                      onClick={() => handleClose()}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={showLoader}
                      className="btn btn-success"
                    >
                      {mode === "add" ? "Add" : "Update"} Category
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
export default GangCategoryList;
