import { forwardRef, useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl, formatDate } from "../../Constant";
import Loader from "../../Component/Loader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { Fab } from "@mui/material";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function InventoryList() {
  const { gangId } = useParams();
  console.log(gangId);
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [inventoryList, setInventoryList] = useState(null);
  const [itemList, setItemList] = useState(null);
  const [stockList, setStockList] = useState(null);
  const [listType, setListType] = useState("inventory");
  const [inventoryData, setInventoryData] = useState({
    id: "",
    name: "",
    quantity: "",
  });

  useEffect(() => {
    if (token !== "") {
      fetchInventory();
      fetchItems();
    }
  }, [token]);
  useEffect(() => {
    if (token !== "") {
      fetchStock();
    }
  }, [token, inventoryList]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInventoryData((prevEquipmentData) => ({
      ...prevEquipmentData,
      id: "",
      name: "",
      quantity: "",
    }));
  };

  const fetchInventory = () => {
    setShowLoader(true);
    const data = {
      gangID: gangId,
    };
    axios
      .post(`${apiUrl}list-gang-inventory`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setInventoryList(response.data?.inventories);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
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

  const fetchStock = () => {
    setShowLoader(true);
    const data = {
      gangID: gangId,
    };
    axios
      .post(`${apiUrl}list-gang-current-stock`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setStockList(response.data?.inventories);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    const data = {
      inventoryId: id,
    };

    axios
      .delete(`${apiUrl}delete-assign-inventory`, {
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
        fetchInventory();
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
    setInventoryData((prevEquipData) => ({
      ...prevEquipData,
      [name]: value,
    }));
  };

  const addInventory = (e) => {
    e.preventDefault();
    if (inventoryData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (inventoryData.quantity === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Quantity",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      inventoryID: inventoryData.name,
      quantity: inventoryData.quantity,
      gangId: gangId,
    };
    axios
      .post(`${apiUrl}assign-inventory`, data, {
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
        setInventoryData({
          id: "",
          name: "",
          quantity: "",
        });
        fetchInventory();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateInventory = (e) => {
    e.preventDefault();
    if (inventoryData.name === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Item Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (inventoryData.quantity === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Quantity",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      productID: inventoryData.name,
      quantity: inventoryData.quantity,
      gangId: gangId,
      inventoryId: inventoryData.id,
    };
    axios
      .put(`${apiUrl}update-assign-inventory`, data, {
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
        setInventoryData({
          id: "",
          name: "",
          quantity: "",
        });
        fetchInventory();
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
                <h4 className="mb-sm-0">Inventory List</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Inventory List</li>
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
                      <button
                        className="btn btn-success add-btn"
                        onClick={() => {
                          setListType(
                            listType === "inventory" ? "stock" : "inventory"
                          );
                        }}
                      >
                        <i className="ri-store-3-line align-bottom me-1"></i>
                        {listType === "inventory"
                          ? "Check Current Stock"
                          : "Check Inventory"}
                      </button>
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
                        Inventory
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h5 className="ps-3">
                    {listType === "stock" ? "Current Stock" : "Inventory Log"}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-card mb-4">
                    {listType === "inventory" ? (
                      <table className="table align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "40px" }}>
                              S.No.
                            </th>
                            <th>Name</th>
                            <th>Quantity (Unit)</th>
                            <th>Added</th>
                            <th style={{ width: 120 }} align="center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {inventoryList ? (
                            inventoryList.length > 0 ? (
                              inventoryList.map((item, index) => (
                                <tr key={item._id}>
                                  <td>{index + 1}</td>
                                  <td>{item.inventoryID?.productName}</td>
                                  <td>
                                    {item.quantity} (
                                    {item.inventoryID?.productUnit})
                                  </td>
                                  <td>{formatDate(item.createdAt)}</td>
                                  <td align="center">
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => {
                                        setMode("edit");
                                        setInventoryData({
                                          id: item._id,
                                          name: item.inventoryID?._id,
                                          quantity: item.quantity,
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
                                          title:
                                            "Do you really want to delete?",
                                          icon: "question",
                                          confirmButtonText: "Yes",
                                          showDenyButton: true,
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            deleteItem(item._id);
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
                    ) : (
                      <table className="table align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "40px" }}>
                              S.No.
                            </th>
                            <th>Name</th>
                            <th>Quantity(Unit)</th>
                            <th>Added</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {stockList ? (
                            stockList.length > 0 ? (
                              stockList.map((item, index) => (
                                <tr key={item._id}>
                                  <td>{index + 1}</td>
                                  <td>{item.inventoryID?.productName}</td>
                                  <td>
                                    {item.currentAvailableQuantity} (
                                    {item.inventoryID?.productUnit})
                                  </td>
                                  <td>{formatDate(item.createdAt)}</td>
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
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Inventory
            </DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addInventory : updateInventory}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div>
                        <label className="form-label">Name</label>
                        <select
                          className="form-control"
                          onChange={handleChange}
                          name="name"
                          value={inventoryData.name}
                          disabled={mode === "edit"}
                        >
                          <option value={""}>Select Item</option>
                          {itemList &&
                            itemList.map((item) => (
                              <option value={item._id} key={item._id}>
                                {item.productName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Item Quantity"
                          name="quantity"
                          value={inventoryData.quantity}
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
                      {mode === "add" ? "Add" : "Update"} Inventory
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
export default InventoryList;
