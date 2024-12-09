import { useState } from "react";
import Layout from "../../Component/Layout";
import axios from "axios";
import { useUserContext } from "../../hooks/userContext";
import Loader from "../../Component/Loader";
import Swal from "sweetalert2";
import { apiUrl } from "../../Constant";

function ChangePassword() {
  const { token } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New passwords do not match.",
      });
      return;
    }

    setShowLoader(true);

    try {
      await axios.post(
        `${apiUrl}/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password changed successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error changing password.",
      });
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Change Password</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card">
                <div className="card-header border-0">
                  <h5 className="card-title mb-0">Update Your Password</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="form-control"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-end">
                    <button
                      className="btn btn-primary"
                      onClick={handleChangePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;
