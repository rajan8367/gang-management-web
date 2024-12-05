import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl } from "../../Constant";
import Loader from "../../Component/Loader";
import Swal from "sweetalert2"; // SweetAlert2
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; // MUI Toast

// Custom map marker icon
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function ComplaintInfo() {
  const { token } = useUserContext();
  const { complaintId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [gangData, setGangData] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  useEffect(() => {
    if (complaintId) {
      fetchComplaint();
    }
  }, [complaintId]);

  const fetchComplaint = async () => {
    setShowLoader(true);
    const data = { complaintID: complaintId };

    try {
      const response = await axios.post(`${apiUrl}get-complaint-info`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComplaintData(response?.data?.complaint);
      setId(response?.data?.complaint?._id);
      setGangData(response?.data?.gangInfo);
    } catch (err) {
      setError(
        err.message || "An error occurred while fetching complaint data."
      );
    } finally {
      setShowLoader(false);
    }
  };

  const updateConsumerLocation = async (lat, lon) => {
    try {
      const data = {
        complaintID: id,
        consumerLat: lat.toString(),
        consumerLon: lon.toString(),
      };
      await axios.post(`${apiUrl}update-consumer-location`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setToastSeverity("success");
      setToastMessage("Consumer location updated successfully!");
    } catch (error) {
      setToastSeverity("error");
      setToastMessage("Failed to update location. Please try again.");
    } finally {
      setToastOpen(true);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    Swal.fire({
      title: "Update Location?",
      text: "Do you want to update the consumer location?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#405189",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateConsumerLocation(lat, lng);
        setComplaintData((prev) => ({
          ...prev,
          consumerLat: lat,
          consumerLon: lng,
        }));
      }
    });
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  if (showLoader) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        {/* Left Panel */}
        <div
          className="col-md-4"
          style={{
            backgroundColor: "#405189",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minHeight: "95vh",
          }}
        >
          <h4 className="text-white">Consumer Info</h4>
          <hr style={{ borderTop: "1px solid #fff" }} />
          <p>
            <strong>Account No.:</strong>{" "}
            {complaintData?.consumerAccountNo || "N/A"}
          </p>
          <p>
            <strong>Name:</strong> {complaintData?.consumerName || "N/A"}
          </p>
          <p>
            <strong>Mobile No.:</strong>{" "}
            {complaintData?.consumerMobile || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {complaintData?.consumerAddress || "N/A"}
          </p>

          <h4 className="mt-4 text-white">Complaint Info</h4>
          <hr style={{ borderTop: "1px solid #fff" }} />
          <p>
            <strong>Complaint Status:</strong>{" "}
            {complaintData?.complaintStatus || "N/A"}
          </p>
          <p>
            <strong>Complaint ID:</strong> {complaintData?.complaintID || "N/A"}
          </p>
          <p>
            <strong>Complaint Type:</strong>{" "}
            {complaintData?.complaintType || "N/A"}
          </p>
          <p>
            <strong>1912 Complaint Remark:</strong>{" "}
            {complaintData?.remarks || "N/A"}
          </p>
          <p>
            <strong>Complaint Acknowledged:</strong>{" "}
            {complaintData?.isAcknowledged === "1" ? "Yes" : "No"}
          </p>

          <h4 className="mt-4 text-white">Gang Info</h4>
          <hr style={{ borderTop: "1px solid #fff" }} />
          <p>
            <strong>Gang Category:</strong> {gangData?.gangCategory || "N/A"}
          </p>
          <p>
            <strong>Gang Name:</strong> {gangData?.gangName || "N/A"}
          </p>
          <p>
            <strong>Contact:</strong> {gangData?.gangMobile || "N/A"}
          </p>
        </div>

        {/* Right Panel */}
        <div className="col-md-8">
          <div
            className="card shadow"
            style={{
              border: "none",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              className="card-header text-white"
              style={{
                backgroundColor: "#405189",
                borderRadius: "0px",
                textAlign: "center",
              }}
            >
              <h5 className="mb-0 text-white">Complaint Location Map</h5>
            </div>

            <div
              className="card-body"
              style={{
                padding: 0,
                height: "540px",
                backgroundColor: "#f4f4f4",
              }}
            >
              <MapContainer
                center={
                  complaintData?.consumerLat && complaintData?.consumerLon
                    ? [complaintData?.consumerLat, complaintData?.consumerLon]
                    : [26.4499, 80.3319] // Default to Kanpur
                }
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={
                    complaintData?.consumerLat && complaintData?.consumerLon
                      ? [complaintData?.consumerLat, complaintData?.consumerLon]
                      : [26.4499, 80.3319] // Default marker position at Kanpur
                  }
                  draggable
                  icon={customIcon}
                  eventHandlers={{
                    dragend: (event) => {
                      const { lat, lng } = event.target.getLatLng();
                      Swal.fire({
                        title: "Set Location?",
                        text: "Do you want to set this as the consumer's location?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#405189",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, set it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          updateConsumerLocation(lat, lng);
                          setComplaintData((prev) => ({
                            ...prev,
                            consumerLat: lat,
                            consumerLon: lng,
                          }));
                        }
                      });
                    },
                  }}
                >
                  <Popup>
                    Drag to set consumer location.
                    {!(
                      complaintData?.consumerLat && complaintData?.consumerLon
                    ) && " (Default location: Kanpur)"}
                  </Popup>
                </Marker>
                {gangData?.latitude && gangData?.longitude && (
                  <Marker
                    position={[gangData?.latitude, gangData?.longitude]}
                    icon={customIcon}
                  >
                    <Popup>Gang Location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* MUI Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ComplaintInfo;
