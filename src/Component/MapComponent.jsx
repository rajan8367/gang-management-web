import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const MapComponent = ({ lat, lng, open }) => {
  const position = [lat, lng];
  const defaultZoom = 15;

  // Custom icon
  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Component to reset zoom
  const ResetZoom = () => {
    const map = useMap();
    useEffect(() => {
      if (open) {
        map.setView([lat, lng], defaultZoom);
      }
    }, [open, map, lat, lng]);
    return null;
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={defaultZoom}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Latitude: {lat}, Longitude: {lng}
        </Popup>
      </Marker>
      <ResetZoom />
    </MapContainer>
  );
};

export default MapComponent;
