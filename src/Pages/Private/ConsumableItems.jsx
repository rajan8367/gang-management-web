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

function ConsumableItem() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [itemList, setItemList] = useState(null);
  const [itemData, setItemData] = useState({
    id: "",
    name: "",
    description: "",
  });
  useEffect(() => {
    if (token !== "") {
      fetchItems();
    }
  }, [token]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItemData((prevItem) => ({
      ...prevItem,
      id: "",
      name: "",
      description: "",
    }));
  };

  const fetchItems = () => {
    setShowLoader(true);
    const data = {};
    axios
      .post(`${apiUrl}list-inventory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setItemList(response.data?.data);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const deleteItems = (id) => {
    const data = {
      id: id,
    };

    axios
      .delete(`${apiUrl}delete-inventory`, {
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
        fetchItems();
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
    setItemData((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (itemData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (itemData.description === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Description",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      productName: itemData.name,
      productDescription: itemData.description,
    };
    axios
      .post(`${apiUrl}add-inventory`, data, {
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
        setItemData({
          id: "",
          name: "",
          description: "",
        });
        setOpen(false);
        fetchItems();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateItem = (e) => {
    e.preventDefault();
    if (itemData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (itemData.description === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Description",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      id: itemData.id,
      productName: itemData.name,
      productDescription: itemData.description,
    };
    axios
      .put(`${apiUrl}edit-inventory`, data, {
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
        setItemData({
          id: "",
          name: "",
          description: "",
        });
        fetchItems();
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
                <h4 className="mb-sm-0">Consumable Items</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Consumable Items</li>
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
                      {/* Consumable Items */}
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
                        Item
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
                        {itemList ? (
                          itemList.length > 0 ? (
                            itemList.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.productDescription}</td>
                                <td align="center">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      setMode("edit");
                                      setItemData({
                                        id: item._id,
                                        name: item.productName,
                                        description: item.productDescription,
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
                                          deleteItems(item._id);
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
                              <td colSpan={4} align="center">
                                No record
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan={4} align="center">
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
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{mode === "add" ? "Add" : "Update"} Item</DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addItem : updateItem}>
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
                          value={itemData.name}
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
                          name="description"
                          value={itemData.description}
                          onChange={handleChange}
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
                      {mode === "add" ? "Add" : "Update"} Item
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
export default ConsumableItem;
