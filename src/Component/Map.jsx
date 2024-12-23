import React, { useState } from "react";
import { APIProvider, Map, ControlPosition } from "@vis.gl/react-google-maps";
import { CustomMapControl } from "./CustomMapControl";
import { AutocompleteCustom } from "./AutocompleteCustom";

const API_KEY = "AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI";

const GoogleMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <APIProvider apiKey={API_KEY}>
      {/* Google Map */}
      <Map
        defaultZoom={5}
        defaultCenter={{ lat: 28.7041, lng: 77.1025 }} // Default center: Delhi, India
        gestureHandling="greedy"
        disableDefaultUI={true}
      >
        {/* Search Box */}
        <CustomMapControl
          controlPosition={ControlPosition.TOP_LEFT} // Place search box on the map
          selectedAutocompleteMode={{ id: "custom", label: "Custom Search" }}
          onPlaceSelect={setSelectedPlace}
        />
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
