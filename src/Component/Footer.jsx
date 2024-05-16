import { useEffect, useState } from "react";

function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => {
    let yr = new Date();
    setYear(yr.getFullYear());
  }, []);
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">{year} © UPPCL.</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Develop by Velocis
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
