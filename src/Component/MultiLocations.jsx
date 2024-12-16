import React, { useState } from "react";

import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MultiLocation = ({ locations, open }) => {
  const validLocations = locations.filter(
    (loc) =>
      loc.latitude !== undefined &&
      loc.longitude !== undefined &&
      loc.latitude !== null &&
      loc.longitude !== null &&
      loc.latitude !== "" &&
      loc.longitude !== ""
  );

  const center =
    validLocations.length > 0
      ? {
          lat: Number(validLocations[0].latitude),
          lng: Number(validLocations[0].longitude),
        }
      : [0, 0];
  const Tooltip = ({ lat, lng, title }) => {
    console.log(title);
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Marker
          position={{
            lat: Number(lat),
            lng: Number(lng),
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <InfoWindow
            position={{
              lat: Number(lat),
              lng: Number(lng),
            }}
            onCloseClick={() => setIsOpen(!isOpen)}
          >
            <div>
              <h4>{title}</h4>
            </div>
          </InfoWindow>
        )}
      </>
    );
  };
  console.log(validLocations);
  return validLocations.length > 0 ? (
    <>
      <APIProvider apiKey={"AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI"}>
        <Map
          style={{ width: "100%", height: "400px" }}
          defaultCenter={center}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {validLocations.map((location, index) => (
            <Marker
              key={index + "-" + location.lat}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude),
              }}
            />
          ))}
          {validLocations.map((location, index) => (
            <Tooltip
              key={index + "-" + location.vname}
              lat={location.latitude}
              title={location.vname ? location.vname : location.gangName}
              lng={location.longitude}
            />
          ))}
        </Map>
      </APIProvider>
    </>
  ) : (
    <p>No valid locations available</p>
  );
};

export default MultiLocation;
