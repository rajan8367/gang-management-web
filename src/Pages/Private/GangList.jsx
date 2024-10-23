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
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GangList() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [gangList, setGangList] = useState(null);
  const [open, setOpen] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [mode, setMode] = useState("add");
  const [userList, setUserList] = useState(null);
  const [selectedGang, setSelectedGang] = useState("");
  const [subStationList, setSubStationList] = useState([]);
  const [gangData, setGangData] = useState({
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

  useEffect(() => {
    if (user?.substation_id !== undefined) {
      /*  setGangData((prevGangData) => ({
        ...prevGangData,
        substation_id: user.substation_id,
        substation: user.sub_station_name,
      })); */

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
      fetchSubstation();
    }
  }, [token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGangData((prevGangData) => ({
      ...prevGangData,
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
  const fetchSubstation = () => {
    setShowLoader(true);
    const data = {};
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
    setShowLoader(true);
    const data = {
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
        setOpen(false);
        fetchGang();
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const updateGang = (e) => {
    console.log(gangData.subStation);
    //alert("gangData.subStation:", gangData.subStation);
    e.preventDefault();
    setShowLoader(true);
    const data = {
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
                          <th>Gang Name</th>
                          <th>Gang Mobile</th>
                          {/* <th>Gang Leader Name</th> */}
                          <th>Sub Station</th>
                          <th>Feeder</th>
                          {/* <th>Members</th> */}
                          <th align="center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {gangList &&
                          gangList.length > 0 &&
                          gangList.map((gang, index) => (
                            <tr key={gang._id}>
                              <td scope="row">{index + 1}</td>
                              <td>{gang.gangName}</td>
                              <td>{gang.gangMobile}</td>
                              {/* <td>{gang.gangLeaderName}</td> */}
                              <td>{gang.substation}</td>

                              <td>{gang.feeder}</td>
                              {/* <td>
                                {gang?.members?.length > 0 &&
                                  gang.members.map((member, index) => (
                                    <p className="mb-0" key={member.memberIDIs}>
                                      {index + 1}: {member.name}
                                    </p>
                                  ))}
                              </td> */}
                              <td>
                                {/* <button
                                  className="btn btn-success me-2"
                                  onClick={() => {
                                    setSelectedGang(gang._id);
                                    setOpenMember(true);
                                  }}
                                >
                                  Assign Member
                                </button> */}
                                <button
                                  disabled={showLoader}
                                  className="btn btn-danger me-2"
                                  onClick={() => deleteGang(gang._id)}
                                >
                                  Delete
                                </button>
                                <button
                                  disabled={showLoader}
                                  className="btn btn-primary"
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
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{mode === "add" ? "Add" : "Update"} Gang</DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addGang : updateGang}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
                      <div>
                        <label className="form-label">Mobile No.</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile No."
                          name="gangMobile"
                          value={gangData.gangMobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
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
                    {/* <div className="col-lg-6">
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

                    <div className="col-lg-6">
                      <label className="form-label">Feeder</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Feeder"
                        name="feeder"
                        value={gangData.feeder}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="location"
                        value={gangData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6">
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
                            required
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
                            required
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
