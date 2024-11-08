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
import { useNavigate } from "react-router-dom";
import MapPicker from "../../Component/MapPicker";
import Swal from "sweetalert2";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GangList() {
  const { token, user, setCustomMsg } = useUserContext();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [gangList, setGangList] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [mode, setMode] = useState("add");
  const [userList, setUserList] = useState(null);
  const [selectedGang, setSelectedGang] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const [subStationList, setSubStationList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [openMap, setOpenMap] = useState(false);
  const [gangData, setGangData] = useState({
    category: "",
    gangID: "",
    gangLeaderName: "",
    gangLeaderID: "",
    gangName: "",
    gangMobile: "",
    tools_availabe: "",
    location: "",
    division: "",
    subStation: "",

    feeder: "",
    security_equipment: [
      {
        item: "security1",
        quantity: 2,
      },
    ],
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (user?.substation_id !== undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGangData((prevGangData) => ({
              ...prevGangData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [user]);
  useEffect(() => {
    if (token !== "") {
      fetchGang();
      getMembers();
      fetchDivision();
      fetchGangCategory();
    }
  }, [token]);
  useEffect(() => {
    if (gangData.division !== "") fetchSubstation();
  }, [gangData.division]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGangData((prevGangData) => ({
      ...prevGangData,
      category: "",
      gangID: "",
      gangLeaderName: "",
      gangLeaderID: "",
      gangName: "",
      gangMobile: "",
      tools_availabe: "",
      location: "",
    }));
  };
  const fetchGang = () => {
    setShowLoader(true);
    const data = {
      search: "",
      gangID: "",
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
        setGangList(response?.data?.gangs);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const fetchDivision = () => {
    setShowLoader(true);
    const data = {};
    axios
      .post(`${apiUrl}get-divisions`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setDivisionList(response?.data?.divisions);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const fetchSubstation = () => {
    setShowLoader(true);
    const data = { divisionID: gangData.division };
    axios
      .post(`${apiUrl}list-substation`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setSubStationList(response?.data?.substationList);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const deleteGang = (id) => {
    const data = {
      gangID: id,
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
    setGangData((prevGangData) => ({
      ...prevGangData,
      [name]: value,
    }));
  };
  const addGang = (e) => {
    e.preventDefault();
    if (gangData.gangName === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Gang Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (gangData.category === "") {
      Swal.fire({
        title: "Error!",
        text: "Select category",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.gangMobile === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter mobile number",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.division === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Division",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.subStation === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Sub station",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.feeder === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Feeder Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.location === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Location Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.latitude === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Lat. Long by clicking pick location",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.tools_availabe === "") {
      Swal.fire({
        title: "Error!",
        text: "Select tool available",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      gangCategoryID: gangData.category,
      gangLeaderName: gangData.gangLeaderName,
      gangLeaderID: gangData.gangLeaderID,
      gangName: gangData.gangName,
      gangMobile: gangData.gangMobile,
      tools_availabe: gangData.tools_availabe,
      location: gangData.location,
      feeder: gangData.feeder,
      security_equipment: gangData.security_equipment,
      latitude: gangData.latitude,
      longitude: gangData.longitude,
      substation_id: gangData.subStation,
    };
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
        setGangData({
          category: "",
          gangID: "",
          gangLeaderName: "",
          gangLeaderID: "",
          gangName: "",
          gangMobile: "",
          tools_availabe: "",
          location: "",
          subStation: "",

          feeder: "",
          security_equipment: [
            {
              item: "security1",
              quantity: 2,
            },
          ],
          latitude: "",
          longitude: "",
        });
        setOpen(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateGang = (e) => {
    e.preventDefault();
    if (gangData.gangName === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Gang Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (gangData.category === "") {
      Swal.fire({
        title: "Error!",
        text: "Select category",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.gangMobile === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter mobile number",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.subStation === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Sub station",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.feeder === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Feeder Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.location === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter Location Name",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.latitude === "") {
      Swal.fire({
        title: "Error!",
        text: "Select Lat. Long by clicking pick location",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (gangData.tools_availabe === "") {
      Swal.fire({
        title: "Error!",
        text: "Select tool available",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    setShowLoader(true);
    const data = {
      gangCategory: gangData.category,
      gangID: gangData.gangID,
      gangLeaderName: gangData.gangLeaderName,
      gangLeaderID: gangData.gangLeaderID,
      gangName: gangData.gangName,
      gangMobile: gangData.gangMobile,
      tools_availabe: gangData.tools_availabe,
      location: gangData.location,
      substation_id: gangData.subStation,
      feeder: gangData.feeder,
      security_equipment: [
        {
          item: "security1",
          quantity: 2,
        },
      ],
      latitude: gangData.latitude,
      longitude: gangData.longitude,
    };
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

        setGangData({
          category: "",
          gangID: "",
          gangLeaderName: "",
          gangLeaderID: "",
          gangName: "",
          gangMobile: "",
          tools_availabe: "",
          location: "",
          subStation: "",

          feeder: "",
          security_equipment: [
            {
              item: "security1",
              quantity: 2,
            },
          ],
          latitude: "",
          longitude: "",
        });
        setOpen(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const getGangData = (id) => {
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
          gangCategory,
          gangName,
          gangMobile,
          gangLeaderName,
          gangLeaderID,
          feeder,
          location,
          tools_availabe,
          division_id,
          substation_id,
          latitude,
          longitude,
        } = response.data.gangs[0];
        //alert(substation_id);
        setGangData((prevGangData) => ({
          ...prevGangData,
          latitude: latitude,
          longitude: longitude,
          category: gangCategory,
          gangName: gangName,
          gangMobile: gangMobile,
          gangLeaderID: gangLeaderID,
          gangLeaderName: gangLeaderName,
          feeder: feeder,
          location: location,
          tools_availabe: tools_availabe,
          subStation: substation_id,
          division: division_id,
        }));
        setOpen(true);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const getMembers = () => {
    setShowLoader(true);
    const data = {
      search: "",
      roleBased: "GANG",
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
        setUserList(response?.data?.users);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const removeMember = (id) => {
    setShowLoader(true);
    const data = {
      gangID: selectedGang,
      memberID: id,
    };
    axios
      .put(`${apiUrl}remove-members`, data, {
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
        setShowLoader(false);
        getMembers();
        fetchGang();
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const assignMember = (id) => {
    setShowLoader(true);
    const data = {
      gangID: selectedGang,
      memberID: id,
    };
    axios
      .put(`${apiUrl}add-members`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        getMembers();
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: response?.data?.message,
          type: "success",
        }));
        setShowLoader(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
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
  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Gang</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Gang</a>
                    </li>
                    <li className="breadcrumb-item active">Gang List</li>
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
                    <h5 className="card-title mb-0 flex-grow-1">Gangs List</h5>
                    <div className="flex-shrink-0">
                      <button
                        className="btn btn-primary add-btn"
                        onClick={() => {
                          setMode("add");
                          handleClickOpen();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Gang
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
                          <th>Gang Category</th>
                          <th>Gang Name</th>
                          <th>Gang Mobile</th>
                          <th>Sub Station</th>
                          <th>Lat. - Long.</th>
                          <th align="center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {gangList &&
                          gangList.length > 0 &&
                          gangList.map((gang, index) => (
                            <tr key={gang._id}>
                              <td scope="row">{index + 1}</td>
                              <td>{gang.gangCategoryID.categoryName}</td>
                              <td>{gang.gangName}</td>
                              <td>{gang.gangMobile}</td>
                              <td>{gang.substation}</td>

                              <td>
                                {gang.latitude}, {gang.longitude}
                              </td>
                              <td>
                                <button
                                  disabled={showLoader}
                                  className="btn btn-danger me-2"
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Do you really want to delete?",
                                      icon: "question",
                                      confirmButtonText: "Yes",
                                      showDenyButton: true,
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteGang(gang._id);
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
                                  Delete
                                </button>
                                <button
                                  disabled={showLoader}
                                  className="btn btn-primary me-2"
                                  onClick={() => {
                                    getGangData(gang._id);
                                    setGangData((prevGangData) => ({
                                      ...prevGangData,
                                      gangID: gang._id,
                                    }));
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  disabled={showLoader}
                                  className="btn btn-success"
                                  onClick={() =>
                                    navigate("/inventory-list/" + gang._id)
                                  }
                                >
                                  Inventory
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
            maxWidth="lg"
            fullScreen
            sx={{ zIndex: 99999 }}
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Location
            </DialogTitle>
            <DialogContent>
              <MapPicker
                setLatitude={(e) =>
                  setGangData((prevGangData) => ({
                    ...prevGangData,
                    latitude: e,
                  }))
                }
                setLongitude={(e) =>
                  setGangData((prevGangData) => ({
                    ...prevGangData,
                    longitude: e,
                  }))
                }
              />
              {gangData.latitude !== "" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setOpenMap(false)}
                >
                  Save
                </button>
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>{mode === "add" ? "Add" : "Update"} Gang</DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addGang : updateGang}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-4">
                      <div>
                        <label className="form-label">Gang Category</label>
                        <select
                          onChange={handleChange}
                          value={gangData.category}
                          name="category"
                          className="form-control"
                        >
                          <option>Select category</option>
                          {categoryList &&
                            categoryList.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div id="modal-id">
                        <label className="form-label">Gang Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Gang Name"
                          name="gangName"
                          value={gangData.gangName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div>
                        <label className="form-label">Mobile No.</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile No."
                          name="gangMobile"
                          value={gangData.gangMobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label className="form-label">Division</label>
                        <select
                          className="form-control"
                          name="division"
                          onChange={handleChange}
                          value={gangData.division}
                          defaultValue={""}
                        >
                          <option value={""}>Select</option>
                          {divisionList &&
                            divisionList.map((division) => (
                              <option key={division._id} value={division._id}>
                                {division.DIVISION_NAME}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label className="form-label">Sub Station</label>
                        <select
                          className="form-control"
                          name="subStation"
                          onChange={handleChange}
                          value={gangData.subStation}
                          defaultValue={""}
                        >
                          <option value={""}>Select</option>
                          {subStationList &&
                            subStationList.map((subStation) => (
                              <option
                                key={subStation._id}
                                value={subStation._id}
                              >
                                {subStation.sub_station_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-lg-4">
                      <div>
                        <label className="form-label">Gang Leader Name</label>
                        <select
                          className="form-control"
                          name="gangLeaderName"
                          onChange={handleChange}
                          value={gangData.gangLeaderName}
                        >
                          {userList &&
                            userList.map((member) => (
                              <option key={member._id} value={member._id}>
                                {member.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div> */}
                    <div className="col-lg-4">
                      <label className="form-label">Feeder</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Feeder"
                        name="feeder"
                        value={gangData.feeder}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="location"
                        value={gangData.location}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Latitude"
                        name="latitude"
                        value={gangData.latitude}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Longitude"
                        name="longitude"
                        value={gangData.longitude}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">&nbsp;</label>
                      <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={() => setOpenMap(true)}
                      >
                        Pick Loaction
                      </button>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Is tools available?</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tools_availabe"
                            value="yes"
                            checked={gangData.tools_availabe === "yes"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="toolsAvailableYes"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tools_availabe"
                            checked={gangData.tools_availabe === "no"}
                            value="no"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="toolsAvailableNo"
                          >
                            No
                          </label>
                        </div>
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
                      {mode === "add" ? "Add" : "Update"} Gang
                    </button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openMember}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenMember(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {" "}
              Members List{" "}
              <Fab
                className="float-end"
                sx={{ marginLeft: "auto" }}
                size="small"
                onClick={() => setOpenMember(false)}
              >
                <CloseIcon />
              </Fab>
            </DialogTitle>
            <DialogContent>
              <div className="table-responsive table-card mb-4">
                <table className="table align-middle table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "40px" }}>
                        S.No.
                      </th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {userList && userList.length > 0 ? (
                      userList.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.phone}</td>
                          <td>
                            {user.isAssigned === "0" ? (
                              <button
                                className="btn btn-success"
                                disabled={showLoader}
                                onClick={() => assignMember(user._id)}
                              >
                                Assign
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger"
                                disabled={showLoader}
                                onClick={() => removeMember(user._id)}
                              >
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} align="center">
                          No record Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
export default GangList;
