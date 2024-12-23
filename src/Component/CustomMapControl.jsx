import React from "react";
import { MapControl } from "@vis.gl/react-google-maps";
import { AutocompleteCustom } from "./AutocompleteCustom";

export const CustomMapControl = ({ controlPosition, onPlaceSelect }) => {
  return (
    <MapControl position={controlPosition}>
      <div className="search-box-container">
        <AutocompleteCustom onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};
