
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 6 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol";
    }

    if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Show loader overlay

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        address: form.address,
      });

      // Keep loader visible for a bit longer for nice effect
      setTimeout(() => {
        setLoading(false); // Hide loader
        toast.success("Registration successful! Please login.");
        setForm({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }, 20000); // Loader visible for 2 seconds
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <Toaster position="top-center" reverseOrder={false} />

      {loading && (
        <div className="center-loader">
          <div className="leaf-loader">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="leaf"
                style={{ transform: `rotate(${i * 72}deg) translateX(6px)` }} // smaller radius
              >
                🍃
              </div>
            ))}
          </div>
          <p className="loader-text">🌱 Registering...</p>
        </div>
      )}






      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p className="error-message">{errors.fullname}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
