import { forwardRef, useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl, formatDate } from "../../Constant";
import Loader from "../../Component/Loader";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import Pagination from "./../../Component/Pagination";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MapComponent from "../../Component/MapComponent";
import MultiLocation from "../../Component/MultiLocations";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function VanList() {
  const { token } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [vanList, setVanList] = useState(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [multiLocation, setMultiLocation] = useState(false);
  const [vanMap, setVanMap] = useState(false);
  const [alterList, setAlterList] = useState([]);
  const [location, setLocation] = useState({
    lat: "",
    long: "",
  });
  useEffect(() => {
    if (token !== "") {
      const searchVan = setTimeout(() => {
        fetchVan();
      }, 500);
      return () => clearTimeout(searchVan);
    }
  }, [token, currentPage, query]);

  const fetchVan = () => {
    setShowLoader(true);
    const data = {
      vname: query,
      page: currentPage,
    };
    axios
      .post(`${apiUrl}/list-vandata`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTotalPages(response?.data?.pagination.totalPages);
        const tempArr = response.data?.data;
        const updatedData = tempArr.map((item) => {
          const { lat, lngt, ...rest } = item;
          return {
            ...rest,
            latitude: lat,
            longitude: lngt,
          };
        });
        setAlterList(updatedData);
        setVanList(tempArr || []);
        setFiltered(tempArr || []);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error fetching Role:", error);
      });
  };
  const formatTime = (time) => {
    let clock = new Date(time);
    return clock.getHours() + ":" + clock.getMinutes();
  };
  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Van List</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Van List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <div className="flex-grow-1" style={{ maxWidth: "40%" }}>
                      <input
                        className="form-control"
                        placeholder="Search by name or mobile"
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <button
                        className="btn btn-success add-btn"
                        onClick={() => {
                          setMultiLocation(true);
                        }}
                      >
                        <i className="ri-user-location-fill"></i> Vans Location
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
                          <th>Van Name</th>
                          <th>Latitude, Longitude</th>
                          <th>Updated at</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {filtered ? (
                          filtered.map((role, index) => (
                            <tr key={role._id}>
                              <td>{(currentPage - 1) * 25 + index + 1}</td>
                              <td>{role.vname}</td>
                              <td>
                                {role.lat}, {role.lngt}
                                {role.lat !== "" && role.lngt !== "" && (
                                  <button
                                    className="btn btn-primary px-1 py-0"
                                    style={{ display: "block" }}
                                    onClick={() => {
                                      setLocation({
                                        lat: role.lat,
                                        long: role.lngt,
                                      });
                                      setVanMap(true);
                                    }}
                                  >
                                    <i className="ri-map-pin-line"></i>
                                  </button>
                                )}
                              </td>
                              <td>
                                {formatDate(role.updatedAt)} at{" "}
                                {formatTime(role.updatedAt)}
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
        </div>
      </div>
      <Dialog
        open={vanMap || multiLocation}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => (vanMap ? setVanMap(false) : setMultiLocation(false))}
        fullWidth
        maxWidth="md"
        sx={{ zIndex: 99999 }}
      >
        <DialogTitle>
          {vanMap ? "Van Location" : "All Vans Location"}
        </DialogTitle>
        <DialogContent>
          {vanMap ? (
            <MapComponent
              lat={location.lat}
              open={vanMap}
              lng={location.long}
            />
          ) : (
            <MultiLocation open={multiLocation} locations={alterList} />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default VanList;
