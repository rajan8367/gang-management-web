import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import { apiUrl } from "../../Constant";
import Loader from "../../Component/Loader";
import Swal from "sweetalert2"; // SweetAlert2
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import GoogleMap from "../../Component/Map";

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
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [isGangInfoWindowOpen, setGangInfoWindowOpen] = useState(false);
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|iPod/i.test(userAgent);
  };
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
      const complaintData = response?.data?.complaint;
      setComplaintData(complaintData);
      setId(complaintData?._id);

      if (!(complaintData?.consumerLat && complaintData?.consumerLon)) {
        Swal.fire({
          title: "Consumer's Location not exist!",
          text: "Please drag the marker on map to set consumer's location",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#405189",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, set it!",
        }).then((result) => {
          if (result.isConfirmed && isMobileDevice()) {
            fetchDeviceLocation(complaintData?._id); // Fetch device location only if on mobile
          } else {
            // Set default location to Kanpur for desktop
            setComplaintData((prev) => ({
              ...prev,
              consumerLat: 26.4499,
              consumerLon: 80.3319,
            }));
          }
        });
      }
      setGangData(response?.data?.gangInfo);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred while fetching complaint data.",
        icon: "warning",
        confirmButtonColor: "#405189",
        confirmButtonText: "Ok",
      });
    } finally {
      setShowLoader(false);
    }
  };

  const fetchDeviceLocation = (id) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateConsumerLocation(latitude, longitude, id);
          setComplaintData((prev) => ({
            ...prev,
            consumerLat: latitude,
            consumerLon: longitude,
          }));
        },
        (error) => {
          setToastSeverity("error");
          setToastMessage(
            "Unable to fetch device location. Please enable location services."
          );
          setToastOpen(true);
        }
      );
    } else {
      setToastSeverity("error");
      setToastMessage("Geolocation is not supported by your browser.");
      setToastOpen(true);
    }
  };

  const updateConsumerLocation = async (lat, lon, complaint_id) => {
    let complaintID = "";
    if (!complaint_id) {
      complaintID = id;
    } else {
      complaintID = complaint_id;
    }
    try {
      const data = {
        complaintID: complaintID,
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

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  if (showLoader) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  const handleDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    console.log("Marker released at:", newLat, newLng);
    setComplaintData((prev) => ({
      ...prev,
      consumerLat: newLat,
      consumerLon: newLng,
    }));
  };
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        {/* Right Panel */}
        <div
          className="col-md-8 order-1 order-md-2"
          style={{
            marginBottom: "20px",
          }}
        >
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
              {console.log("_____", complaintData?.complaintStatus === "Open")}
              <h5 className="mb-0 text-white">
                {complaintData?.consumerLat === "" &&
                complaintData?.consumerLon === ""
                  ? "Drag the marker to set consumer location"
                  : "Complaint Location Map"}
              </h5>
            </div>

            <div
              className="card-body"
              style={{
                padding: 0,
                height: "450px",
                backgroundColor: "#f4f4f4",
              }}
            >
              <APIProvider apiKey={"AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI"}>
                <Map
                  style={{ width: "100%", height: "400px" }}
                  defaultCenter={
                    complaintData?.consumerLat && complaintData?.consumerLon
                      ? {
                          lat: Number(complaintData.consumerLat) || 26.4499,
                          lng: Number(complaintData.consumerLon) || 80.3319,
                        }
                      : { lat: 26.4499, lng: 80.3319 }
                  }
                  defaultZoom={13}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                >
                  <Marker
                    position={
                      complaintData?.consumerLat && complaintData?.consumerLon
                        ? {
                            lat: Number(complaintData.consumerLat) || 26.4499,
                            lng: Number(complaintData.consumerLon) || 80.3319,
                          }
                        : { lat: 26.4499, lng: 80.3319 }
                    }
                    draggable={complaintData?.complaintStatus === "Open"}
                    onDragEnd={(event) => {
                      const newLat = event.latLng.lat();
                      const newLng = event.latLng.lng();
                      console.log(
                        "Complaint marker dragged to:",
                        newLat,
                        newLng
                      );
                      setComplaintData((prev) => ({
                        ...prev,
                        consumerLat: newLat,
                        consumerLon: newLng,
                      }));
                    }}
                    onClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}
                  />
                  {isInfoWindowOpen && (
                    <InfoWindow
                      position={
                        complaintData?.consumerLat && complaintData?.consumerLon
                          ? {
                              lat: Number(complaintData.consumerLat),
                              lng: Number(complaintData.consumerLon),
                            }
                          : { lat: 26.4499, lng: 80.3319 }
                      }
                      onCloseClick={() =>
                        setIsInfoWindowOpen(!isInfoWindowOpen)
                      }
                    >
                      <div>
                        {complaintData?.complaintStatus === "Open" ? (
                          <h4>Drag to set consumer location.</h4>
                        ) : (
                          <h4>Consumer location.</h4>
                        )}
                        {!(
                          complaintData?.consumerLat &&
                          complaintData?.consumerLon
                        ) && <h4>(Default location: Kanpur)</h4>}
                      </div>
                    </InfoWindow>
                  )}

                  {gangData?.latitude && gangData?.longitude && (
                    <Marker
                      position={{
                        lat: Number(gangData?.latitude),
                        lng: Number(gangData?.longitude),
                      }}
                      onClick={() =>
                        setGangInfoWindowOpen(!isGangInfoWindowOpen)
                      }
                    />
                  )}
                  {isGangInfoWindowOpen && (
                    <InfoWindow
                      position={{
                        lat: Number(gangData?.latitude),
                        lng: Number(gangData?.longitude),
                      }}
                      onCloseClick={() =>
                        setIsInfoWindowOpen(!isGangInfoWindowOpen)
                      }
                    >
                      <div>
                        <h4>Gang Location</h4>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            </div>
          </div>
          {complaintData?.complaintStatus === "Open" && (
            <>
              <h5>
                "Please move the map marker to your exact location and click the
                'Save Location' button to update your location. This will help
                the maintenance team reach you quickly to resolve the issue."
              </h5>
              <button
                className="btn btn-primary"
                onClick={() => {
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
                      updateConsumerLocation(
                        complaintData.consumerLat,
                        complaintData?.consumerLon
                      );
                    }
                  });
                }}
              >
                Save Location
              </button>
            </>
          )}
        </div>

        {/* Left Panel */}
        <div
          className="col-md-4 order-2 order-md-1"
          style={{
            backgroundColor: "#405189",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            minHeight: "95vh",
          }}
        >
          <h4 className="text-white">
            <strong>Complaint Status: </strong>
            {complaintData?.complaintStatus === "Open"
              ? "Your complaint is received and under review."
              : complaintData?.complaintStatus === "Assigned"
              ? "Your complaint is assigned to the maintenance team."
              : complaintData?.complaintStatus === "InProgress"
              ? "The maintenance team is working on your complaint."
              : complaintData?.complaintStatus === "OnHold"
              ? "Your complaint is temporarily delayed due to dependencies."
              : "Your complaint is resolved. Raise a new one if needed."}
          </h4>
          <hr style={{ borderTop: "1px solid #fff" }} />

          <p>
            <strong>Complaint Reference Number:</strong>{" "}
            {complaintData?.complaintID || "N/A"}
          </p>
          <p>
            <strong>Type of Issue:</strong>{" "}
            {complaintData?.complaintType || "N/A"}
          </p>
          <p>
            <strong>Reported Problem:</strong> {complaintData?.remarks || "N/A"}
          </p>
          <p>
            <strong>Acknowledged by 1912 Helpline:</strong>{" "}
            {complaintData?.isAcknowledged === "1"
              ? "Yes - Your complaint has been acknowledged by the helpline."
              : "No - Your complaint has not yet been acknowledged by the helpline."}
          </p>
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
      </div>
      ;{/* MUI Toast */}
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
