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
import { Fab } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FeedbackMaster() {
  const { token, user, setCustomMsg } = useUserContext();
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
    id: "",
    feedbackName: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFeedbackData({
      id: "",
      feedbackName: "",
    });
  };

  const fetchFeedback = () => {
    setShowLoader(true);
    axios
      .post(
        `${apiUrl}/list-feedbback-option`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFeedbackList(response.data?.data || []);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error fetching feedback:", error);
      });
  };

  const deleteFeedback = (id) => {
    const data = {
      id: id,
    };
    axios
      .delete(`${apiUrl}/delete-feedbback-option`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Feedback deleted successfully.",
          type: "success",
        }));
        fetchFeedback();
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addFeedback = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const data = {
      feedbackName: feedbackData.feedbackName,
    };
    axios
      .post(`${apiUrl}/add-feedbback-option`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Feedback added successfully.",
          type: "success",
        }));
        setFeedbackData({
          id: "",
          feedbackName: "",
        });
        setOpen(false);
        fetchFeedback();
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error adding feedback:", error);
      });
  };

  const updateFeedback = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const data = {
      feedbackName: feedbackData.feedbackName,
      id: feedbackData.id,
    };
    axios
      .put(`${apiUrl}/edit-feedbback-option`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowLoader(false);
        setCustomMsg((prevMsg) => ({
          ...prevMsg,
          isVisible: true,
          text: "Feedback updated successfully.",
          type: "success",
        }));

        setFeedbackData({
          id: "",
          feedbackName: "",
        });
        setOpen(false);
        fetchFeedback();
      })
      .catch((error) => {
        setShowLoader(false);
        console.error("Error updating feedback:", error);
      });
  };

  const editFeedback = (feedback) => {
    setMode("edit");
    setFeedbackData({ id: feedback._id, feedbackName: feedback.feedbackName });
    setOpen(true);
  };

  useEffect(() => {
    if (token !== "") {
      fetchFeedback();
    }
  }, [token]);

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Feedback Master</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Feedback Master</li>
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
                      Feedback Master
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
                        Feedback
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
                        {feedbackList.map((feedback, index) => (
                          <tr key={feedback._id}>
                            <td>{index + 1}</td>
                            <td>{feedback.feedbackName}</td>
                            <td align="center">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => editFeedback(feedback)}
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
                                      deleteFeedback(feedback._id); // Ensure you are using feedback.id
                                    } else if (result.isDenied) {
                                      Swal.fire("Delete cancelled", "", "info");
                                    }
                                  });
                                }}
                              >
                                <i className="ri-delete-bin-line"></i>
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
            PaperProps={{
              style: { width: "600px", maxHeight: "80vh" },
            }}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {mode === "add" ? "Add" : "Update"} Feedback
            </DialogTitle>
            <DialogContent>
              <form onSubmit={mode === "add" ? addFeedback : updateFeedback}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <div id="modal-id">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="feedbackName"
                          value={feedbackData.feedbackName}
                          onChange={handleChange}
                          required
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
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={showLoader}
                      className="btn btn-success"
                    >
                      {mode === "add" ? "Add" : "Update"} Feedback
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

export default FeedbackMaster;
