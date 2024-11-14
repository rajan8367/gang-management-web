import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const MultiLocation = ({ locations, open }) => {
  const defaultZoom = 12; // Adjust as needed

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
      if (open && locations.length > 0) {
        const validLocations = locations.filter(
          (loc) => loc.lat !== undefined && loc.lng !== undefined
        );

        if (validLocations.length > 0) {
          const bounds = L.latLngBounds(
            validLocations.map((loc) => [loc.lat, loc.lng])
          );
          map.fitBounds(bounds); // Fit map to markers
        }
      }
    }, [open, locations, map]);

    return null;
  };

  // Filter out invalid locations before rendering
  const validLocations = locations.filter(
    (loc) => loc.latitude !== undefined && loc.longitude !== undefined
  );
  for (let i = 0; i < locations.length; i++) {
    console.log(locations[i].latitude, locations[i].longitude);
  }

  return validLocations.length > 0 ? (
    <MapContainer
      center={[validLocations[0].latitude, validLocations[0].longitude]}
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
