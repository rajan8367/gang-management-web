import CircularProgress from "@mui/material/CircularProgress";
function Loader() {
  return (
    <div className="popupLoader">
      <CircularProgress color="primary" />
    </div>
  );
}
export default Loader;
