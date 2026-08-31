import { useState } from "react";
import api from "../utils/api";
import Swal from "sweetalert2";

export default function AddUser() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // add this
    const clearFields = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({...prev, [name]: ''}));
    }

    const  validate = () => {
        const newErrors = {};

        if (!formData.firstname.trim()) {
            newErrors.firstname = "First name is required";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "Last name is required";
        }

        if (!(formData.username.trim())) {
            newErrors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9_.]{3,20}$/.test(formData.username)) {
            newErrors.username = "username must be 3-20 characters long and may contain only letters, numbers, _ or .";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "phone number is required";
        } else if (!/^(?:0|\+234)(?:70|71|80|81|90|91)\d{8}$/.test(formData.phone)) {
          newErrors.phone = "Enter a valid phone number";
        }

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const addUser = await api.post('users/adduser', formData);
                Swal.fire({
                    title: `New user was added`,
                    icon: "success",
                    timer: 2000
                });
                clearFields();
  
            } catch (error) {
                Swal.fire({
                  title: `Failed to add user`,
                  icon: "error",
                  timer: 2000,
                });
            }
        } else console.log(validationErrors)
    }

    return (
      <div className="container py-4" style={{ maxWidth: "560px" }}>
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Add a new user</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* collect firstname */}
              <div className="mb-3">
                <label htmlFor="firstname">First name </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>

              {/* collect lastname */}
              <div className="mb-3">
                <label htmlFor="lastname">Last name </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>
              
              {/* collect username */}
              <div className="mb-3">
                <label htmlFor="username">Choose username for new user </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              {/* collect phonenumber */}
              <div className="mb-3">
                <label htmlFor="phone">Phone Number </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="d-flex justify-content-end gap-2 mt-2">
                <button type="submit" className="btn btn-outline-primary">
                  {" "}
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}