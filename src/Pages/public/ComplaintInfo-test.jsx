import React, { useState } from "react";
import axios from "axios";

const MapTest = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const API_KEY = "AIzaSyDY8Trnj0J15trOsOS-rN6LaswdopjPWVI";

  const handleSearch = async (e) => {
    e.preventDefault();

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const params = {
      query,
      key: API_KEY,
    };

    try {
      const response = await axios.get(url, { params });
      if (response.data.status === "OK") {
        setPlaces(response.data.results);
      } else {
        console.error(
          "Error:",
          response.data.status,
          response.data.error_message
        );
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for places (e.g., restaurants in New York)"
          style={{ width: "300px", padding: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
          Search
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {places.length > 0 && (
          <ul>
            {places.map((place) => (
              <li key={place.place_id}>
                <strong>{place.name}</strong>
                <br />
                {place.formatted_address}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MapTest;
