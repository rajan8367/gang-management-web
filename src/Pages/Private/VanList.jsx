import { forwardRef, useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl, formatDate } from "../../Constant";
import Loader from "../../Component/Loader";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import Pagination from "./../../Component/Pagination";

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
        setVanList(response.data?.data || []);
        setFiltered(response.data?.data || []);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error fetching Role:", error);
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
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search..."
                    />
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
                              </td>
                              <td>{formatDate(role.updatedAt)}</td>
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
    </Layout>
  );
}

export default VanList;
