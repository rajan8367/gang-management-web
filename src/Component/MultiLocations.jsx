import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const MultiLocation = ({ locations, open }) => {
  const defaultZoom = 12; // Default zoom level

  // Custom icon
  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Component to reset zoom and fit bounds
  const ResetZoom = () => {
    const map = useMap();

    useEffect(() => {
      if (open && validLocations.length > 0) {
        const bounds = L.latLngBounds(
          validLocations.map((loc) => [loc.latitude, loc.longitude])
        );
        map.fitBounds(bounds); // Adjust the view to fit all markers
      }
    }, [open, validLocations, map]);

    return null;
  };

  // Filter valid locations (latitude and longitude must not be blank)
  const validLocations = locations.filter(
    (loc) =>
      loc.latitude !== undefined &&
      loc.longitude !== undefined &&
      loc.latitude !== null &&
      loc.longitude !== null &&
      loc.latitude !== "" &&
      loc.longitude !== ""
  );

  // Determine the center
  const center =
    validLocations.length > 0
      ? [validLocations[0].latitude, validLocations[0].longitude]
      : [0, 0]; // Fallback to [0, 0] if no valid locations exist

  return validLocations.length > 0 ? (
    <MapContainer
      center={center}
      zoom={defaultZoom}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {validLocations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>
            {location.gangName},<br />
            {location?.gangCategoryID?.categoryName}
          </Popup>
        </Marker>
      ))}

      <ResetZoom />
    </MapContainer>
  ) : (
    <p>No valid locations available</p>
  );
};

export default MultiLocation;
