import { useState, useContext } from "react";
import api from "../utils/api";
import Swal from "sweetalert2";

import { AuthenticationContext } from "../contexts/AuthenticationContext";

const INITIAL_FORM = {
  oldPassword: "",
  newPassword: "",
  newPasswordR: "",
};

export default function ChangePassword() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const { user } = useContext(AuthenticationContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearFields = () => {
    setFormData(INITIAL_FORM);
  };

  const validate = () => {
    const newErrors = {};

    if (formData.oldPassword.trim().length < 6) {
      newErrors.oldPassword = "Password length must be at least six characters";
    }

    if (formData.newPassword.trim().length < 6) {
      newErrors.newPassword = "Password length must be at least six characters";
    }

    if (formData.newPassword !== formData.newPasswordR) {
      newErrors.newPasswordR = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Swal.fire({
        title: "There were validation errors",
        icon: "error",
        timer: 2000,
      });
      return;
    }

    try {
      const modifyPwd = await api.post("users/modify-pwd", {
        username: user.username,
        ...formData,
      });
      
      Swal.fire({
        title: "Password was changed",
        icon: "success",
        timer: 2000,
      });
      clearFields();

    } catch (error) {
      Swal.fire({
        title: "Failed to change password",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "560px" }}>
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Change password</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* old password */}
            <div className="mb-3">
              <label htmlFor="oldPassword">Old Password </label>
              <input
                type="password"
                className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
                name="oldPassword"
                id="oldPassword"
                placeholder="Old Password"
                value={formData.oldPassword}
                onChange={handleChange}
              />
              {errors.oldPassword && (
                <div className="invalid-feedback">{errors.oldPassword}</div>
              )}
            </div>

            {/* new password */}
            <div className="mb-3">
              <label htmlFor="newPassword">New Password </label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                name="newPassword"
                id="newPassword"
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>

            {/* repeat new password */}
            <div className="mb-3">
              <label htmlFor="newPasswordR">Repeat New Password </label>
              <input
                type="password"
                className={`form-control ${errors.newPasswordR ? "is-invalid" : ""}`}
                name="newPasswordR"
                id="newPasswordR"
                placeholder="Repeat new password"
                value={formData.newPasswordR}
                onChange={handleChange}
              />
              {errors.newPasswordR && (
                <div className="invalid-feedback">{errors.newPasswordR}</div>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-2">
              <button type="submit" className="btn btn-outline-primary">
                {" "}
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
