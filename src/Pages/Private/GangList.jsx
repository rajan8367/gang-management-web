import Layout from "../../Component/Layout";

function GangList() {
  return (
    <Layout>
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
                        className="btn btn-danger add-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#showModal"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Gang
                      </button>
                      {/* <button className="btn btn-soft-danger">
                        <i className="ri-delete-bin-2-line"></i>
                      </button> */}
                    </div>
                  </div>
                </div>
                {/* <div className="card-body border border-dashed border-end-0 border-start-0">
                  <form>
                    <div className="row g-3">
                      <div className="col-xxl-5 col-sm-12">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control search bg-light border-light"
                            placeholder="Search for ticket details or something..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>

                      <div className="col-xxl-3 col-sm-4">
                        <input
                          type="text"
                          className="form-control bg-light border-light"
                          data-provider="flatpickr"
                          data-date-format="d M, Y"
                          data-range-date="true"
                          id="demo-datepicker"
                          placeholder="Select date range"
                        />
                      </div>
                      <div className="col-xxl-3 col-sm-4">
                        <div className="input-light">
                          <select
                            className="form-control"
                            data-choices
                            data-choices-search-false
                            name="choices-single-default"
                            id="idStatus"
                            defaultValue={"all"}
                          >
                            <option value="">Status</option>
                            <option value="all">All</option>
                            <option value="Open">Open</option>
                            <option value="Inprogress">Inprogress</option>
                            <option value="Closed">Closed</option>
                            <option value="New">New</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xxl-1 col-sm-4">
                        <button type="button" className="btn btn-primary w-100">
                          {" "}
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filters
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
                <div className="card-body">
                  <div className="table-responsive table-card mb-4">
                    <table
                      className="table align-middle table-nowrap mb-0"
                      id="ticketTable"
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "40px" }}>
                            S.No.
                          </th>
                          <th>Gang Name</th>
                          <th>Gang Mobile</th>
                          <th>Gang Leader Name</th>
                          <th>Sub Station</th>
                          <th>Feeder</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        <tr>
                          <th scope="row">1</th>
                          <td>Gang 1</td>
                          <td>9898989898</td>
                          <td>Shanti devi</td>
                          <td>Shuhag Nagar_20041</td>
                          <td>32426123123SNU</td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <i className="ri-eye-fill align-bottom text-muted"></i>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="U"
                              >
                                <a
                                  className="edit-item-btn"
                                  href="#showModal"
                                  data-bs-toggle="modal"
                                >
                                  <i className="ri-pencil-fill align-bottom text-muted"></i>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="noresult" style={{ display: "none" }}>
                      <div className="text-center">
                        <lord-icon
                          src="https://cdn.lordicon.com/msoeawqm.json"
                          trigger="loop"
                          colors="primary:#121331,secondary:#08a88a"
                          style={{ width: "75px", height: "75px" }}
                        ></lord-icon>
                        <h5 className="mt-2">Sorry! No Result Found</h5>
                        <p className="text-muted mb-0">
                          We've searched more than 150+ Complaints We did not
                          find any Complaints for you search.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <div className="pagination-wrap hstack gap-2">
                      <a
                        className="page-item pagination-prev disabled"
                        href="#"
                      >
                        Previous
                      </a>
                      <ul className="pagination listjs-pagination mb-0"></ul>
                      <a className="page-item pagination-next" href="#">
                        Next
                      </a>
                    </div>
                  </div>
                  <div
                    className="modal fade flip"
                    id="deleteOrder"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body p-5 text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#f06548"
                            style={{ height: "90px", width: "90px" }}
                          ></lord-icon>
                          <div className="mt-4 text-center">
                            <h4>You are about to delete a order ?</h4>
                            <p className="text-muted fs-14 mb-4">
                              Deleting your order will remove all of your
                              information from our database.
                            </p>
                            <div className="hstack gap-2 justify-content-center remove">
                              <button
                                className="btn btn-link link-success fw-medium text-decoration-none"
                                data-bs-dismiss="modal"
                              >
                                <i className="ri-close-line me-1 align-middle"></i>{" "}
                                Close
                              </button>
                              <button
                                className="btn btn-danger"
                                id="delete-record"
                              >
                                Yes, Delete It
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade zoomIn"
            id="showModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0">
                <div className="modal-header p-3 bg-soft-info">
                  <h5 className="modal-title" id="exampleModalLabel"></h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div id="modal-id">
                          <label className="form-label">Gang Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Gang Name"
                            value="Gang 2"
                            readOnly
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
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label className="form-label">Gang Leader Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Gang Leader Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label className="form-label">Sub Station</label>
                          <select className="form-control">
                            <option>Select Sub-Station</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label">Feeder</label>
                        <select className="form-control">
                          <option>Select Feeder</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="add-btn"
                      >
                        Add Gang
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default GangList;
