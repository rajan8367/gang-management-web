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
        console.log("Complaint marker dragged to:", newLat, newLng);
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
        onCloseClick={() => setIsInfoWindowOpen(!isInfoWindowOpen)}
      >
        <div>
          {complaintData?.complaintStatus === "Open" ? (
            <h4>Drag to set consumer location.</h4>
          ) : (
            <h4>Consumer location.</h4>
          )}
          {!(complaintData?.consumerLat && complaintData?.consumerLon) && (
            <h4>(Default location: Kanpur)</h4>
          )}
        </div>
      </InfoWindow>
    )}

    {gangData?.latitude && gangData?.longitude && (
      <Marker
        position={{
          lat: Number(gangData?.latitude),
          lng: Number(gangData?.longitude),
        }}
        onClick={() => setGangInfoWindowOpen(!isGangInfoWindowOpen)}
      />
    )}
    {isGangInfoWindowOpen && (
      <InfoWindow
        position={{
          lat: Number(gangData?.latitude),
          lng: Number(gangData?.longitude),
        }}
        onCloseClick={() => setIsInfoWindowOpen(!isGangInfoWindowOpen)}
      >
        <div>
          <h4>Gang Location</h4>
        </div>
      </InfoWindow>
    )}
  </Map>
</APIProvider>;
