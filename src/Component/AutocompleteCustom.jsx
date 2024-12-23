import React, { useEffect, useState, useCallback } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export const AutocompleteCustom = ({ onPlaceSelect }) => {
  const map = useMap();
  const places = useMapsLibrary("places");

  const [sessionToken, setSessionToken] = useState(null);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  const [predictionResults, setPredictionResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      autocompleteService.getPlacePredictions(request, (response) => {
        if (response) {
          setPredictionResults(response.predictions);
        } else {
          setPredictionResults([]);
        }
      });
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event) => {
      const value = event.target.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      placesService?.getDetails(detailRequestOptions, (placeDetails) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address || "");
        setSessionToken(new places.AutocompleteSessionToken());
      });
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="autocomplete-container">
      <input
        value={inputValue}
        onInput={(event) => onInputChange(event)}
        placeholder="Search for a place"
      />

      {predictionResults.length > 0 && (
        <ul className="custom-list">
          {predictionResults.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="custom-list-item"
              onClick={() => handleSuggestionClick(place_id)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
