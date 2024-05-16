import { height, width } from "@mui/system";
import Layout from "../../Component/Layout";

function ShutdownList() {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Shutdown</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Shutdown</a>
                    </li>
                    <li className="breadcrumb-item active">Shutdown List</li>
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
                      Shutdown Requests
                    </h5>
                    <div className="flex-shrink-0">
                      <button
                        className="btn btn-danger add-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#showModal"
                      >
                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                        Approve Request
                      </button>
                      <button className="btn btn-soft-danger">
                        <i className="ri-delete-bin-2-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive table-card mb-4">
                    <table
                      className="table align-middle table-nowrap mb-0"
                      id="ticketTable"
                    >
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "40px" }}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkAll"
                              />
                            </div>
                          </th>
                          <th className="sort" data-sort="id">
                            Complaint No
                          </th>
                          <th className="sort" data-sort="create_date">
                            Date
                          </th>
                          <th className="sort" data-sort="tasks_name">
                            Site Location
                          </th>
                          <th className="sort" data-sort="client_name">
                            Consumer
                          </th>
                          <th className="sort" data-sort="assignedto">
                            Requested By
                          </th>
                          <th className="sort" data-sort="due_date">
                            Shutdown Date
                          </th>
                          <th className="sort" data-sort="due_date">
                            Time
                          </th>
                          <th className="sort" data-sort="status">
                            Status
                          </th>
                          <th className="sort" data-sort="action">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className="list form-check-all"
                        id="ticket-list-data"
                      >
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                              />
                            </div>
                          </th>
                          <td className="id">
                            <a
                              href="complaint-details.html"
                              className="fw-medium link-primary"
                            >
                              MV30042402378
                            </a>
                          </td>
                          <td className="create_date">30-Apr-24</td>
                          <td className="tasks_name">33/11 KV AZAD NAGAR</td>
                          <td className="client_name">Shanti devi</td>
                          <td className="assignedto">Ankit C Rajpoot</td>
                          <td className="create_date">08-May-24</td>
                          <td className="due_date badge bg-warning text-uppercase p-1 mt-3">
                            11:00AM - 11:30AM
                          </td>
                          <td className="status">
                            <span className="badge badge-soft-warning text-uppercase">
                              Pending
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Call"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Message"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-question-answer-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <a href="complaint-details.html">
                                  <i className="ri-eye-fill align-bottom text-muted"></i>
                                </a>
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
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                              />
                            </div>
                          </th>
                          <td className="id">
                            <a
                              href="complaint-details.html"
                              className="fw-medium link-primary"
                            >
                              MV30042405159
                            </a>
                          </td>
                          <td className="create_date">30-Apr-24</td>
                          <td className="tasks_name">
                            33/11 KV S/S OLD NADARGANJ
                          </td>
                          <td className="client_name">Sujeet yadav</td>
                          <td className="assignedto">DINKAR YADAV</td>
                          <td className="due_date">08-May-24</td>
                          <td className="due_date badge bg-warning text-uppercase p-1 mt-3">
                            02:00PM - 3:30PM
                          </td>
                          <td className="status">
                            <span className="badge badge-soft-warning text-uppercase">
                              Pending
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Call"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Message"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-question-answer-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <a href="complaint-details.html">
                                  <i className="ri-eye-fill align-bottom text-muted"></i>
                                </a>
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
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                              />
                            </div>
                          </th>
                          <td className="id">
                            <a
                              href="complaint-details.html"
                              className="fw-medium link-primary"
                            >
                              MV28042404577
                            </a>
                          </td>
                          <td className="create_date">30-Apr-24</td>
                          <td className="tasks_name">33/11 KV FAZULLAGANJ</td>
                          <td className="client_name">Rajiv Tripathi</td>
                          <td className="assignedto">Suresh Kumar</td>
                          <td className="due_date">08-May-24</td>
                          <td className="due_date badge bg-info text-uppercase p-1 mt-3">
                            09:00AM - 11:30AM
                          </td>
                          <td className="status">
                            <span className="badge badge-soft-info text-uppercase">
                              Approved
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Call"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Message"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-question-answer-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <a href="#">
                                  <i className="ri-eye-fill align-bottom text-muted"></i>
                                </a>
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
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                              />
                            </div>
                          </th>
                          <td className="id">
                            <a
                              href="complaint-details.html"
                              className="fw-medium link-primary"
                            >
                              MV30042402378
                            </a>
                          </td>
                          <td className="create_date">30-Apr-24</td>
                          <td className="tasks_name">33/11 KV AZAD NAGAR</td>
                          <td className="client_name">Shanti devi</td>
                          <td className="assignedto">Ankit C Rajpoot</td>
                          <td className="due_date">08-May-24</td>
                          <td className="due_date badge bg-info text-uppercase p-1 mt-3">
                            10:00AM - 11:30AM
                          </td>
                          <td className="status">
                            <span className="badge badge-soft-info text-uppercase">
                              Approved
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Call"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Message"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-question-answer-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <a href="#">
                                  <i className="ri-eye-fill align-bottom text-muted"></i>
                                </a>
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
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                              />
                            </div>
                          </th>
                          <td className="id">
                            <a
                              href="complaint-details.html"
                              className="fw-medium link-primary"
                            >
                              MV30042402378
                            </a>
                          </td>
                          <td className="create_date">30-Apr-24</td>
                          <td className="tasks_name">33/11 KV AZAD NAGAR</td>
                          <td className="client_name">Shanti devi</td>
                          <td className="assignedto">Ankit C Rajpoot</td>
                          <td className="due_date">08-May-24</td>
                          <td className="due_date badge bg-danger text-uppercase p-1 mt-3">
                            03:00AM - 04:30AM
                          </td>
                          <td className="status">
                            <span className="badge badge-soft-danger text-uppercase">
                              Cancled
                            </span>
                          </td>
                          <td>
                            <ul className="list-inline hstack gap-2 mb-0">
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Call"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Message"
                              >
                                <a
                                  href="#"
                                  className="text-muted d-inline-block"
                                >
                                  <i className="ri-question-answer-line fs-16"></i>
                                </a>
                              </li>
                              <li
                                className="list-inline-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="View"
                              >
                                <a href="#">
                                  <i className="ri-eye-fill align-bottom text-muted"></i>
                                </a>
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
                          We've searched more than 150+ Shutdown We did not find
                          any Shutdown for you search.
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
                      <ul className="pagination listjs-pagination mb-0">
                        {/* <li className="active">
                          <button>1</button>
                        </li> */}
                      </ul>
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
                      <div className="col-lg-12">
                        <div id="modal-id">
                          <label className="form-label">Complaint No</label>
                          <input
                            type="text"
                            id="orderId"
                            className="form-control"
                            placeholder="ID"
                            value="#VLZ462"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div>
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            id="tasksTitle-field"
                            className="form-control"
                            placeholder="Location"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label className="form-label">Client Name</label>
                          <input
                            type="text"
                            id="client_nameName-field"
                            className="form-control"
                            placeholder="Client Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label className="form-label">Requested By</label>
                          <input
                            type="text"
                            id="assignedtoName-field"
                            className="form-control"
                            placeholder="Assigned to"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label">Shutdown Date</label>
                        <input
                          type="text"
                          id="date-field"
                          className="form-control"
                          data-provider="flatpickr"
                          data-date-format="d M, Y"
                          placeholder="Create Date"
                          required
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label">Time</label>
                        <input
                          type="text"
                          id="duedate-field"
                          className="form-control"
                          value="11:00AM - 11:30AM"
                          data-provider="flatpickr"
                          data-date-format="d M, Y"
                          placeholder="Due Date"
                          required
                          readOnly
                        />
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label">Status</label>
                        <select
                          className="form-control"
                          data-plugin="choices"
                          name="ticket-status"
                          defaultValue={""}
                        >
                          <option value="">Status</option>
                          <option value="Shutdown Approved">Approved</option>
                          <option value="Inprogress">Reject</option>
                          <option value="Resolved">Cancled</option>
                          <option value="Hold">Hold</option>
                        </select>
                      </div>
                      <div className="col-lg-6">
                        <label className="form-label">Remark</label>
                        <input
                          type="text"
                          id=""
                          className="form-control"
                          placeholder="Add Remark if Any..."
                          required
                        />
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
                        Add Ticket
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        id="edit-btn"
                      >
                        Update
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
export default ShutdownList;
