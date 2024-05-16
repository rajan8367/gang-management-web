import map from "./../../assets/images/Map.png";
import hoverMap from "./../../assets/images/Map-onhover.png";
import Layout from "../../Component/Layout";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function ComplaintTracking() {
  const position = { lat: 53.54992, lng: 10.00678 };
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Complaint Tracking</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="#">Maps</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Complaint Tracking
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Map View</h4>
                </div>
                <div className="card-body">
                  <img
                    className="figure-img img-fluid rounded"
                    style={{ height: "600px" }}
                    src={map}
                    alt="Map"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Detail View </h4>
                </div>
                <div className="card-body">
                  <img
                    style={{ width: "100%", height: "600px" }}
                    src={hoverMap}
                    alt="Map"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Map Types</h4>
                </div>
                <div className="card-body">
                  {/* <APIProvider apiKey={"YOUR API KEY HERE"}>
                    <Map defaultCenter={position} defaultZoom={10}>
                      <Marker position={position} />
                    </Map>
                  </APIProvider> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ComplaintTracking;
