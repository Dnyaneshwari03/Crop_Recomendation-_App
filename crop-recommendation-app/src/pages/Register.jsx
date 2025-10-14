
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Auth.css"; // same CSS as login

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
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address";

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/register", {
  //       fullname: form.fullname,
  //       email: form.email,
  //       password: form.password,
  //       address: form.address,
  //     });

  //     toast.success("Registration successful! Please login.");

  //     setTimeout(() => {
  //       setLoading(false);
  //       setForm({
  //         fullname: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //         address: "",
  //       });

  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //     }, 2000);
  //   } catch (err) {
  //     setLoading(false);
  //     toast.error(err.response?.data?.message || "Server error");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/api/register", {
      fullname: form.fullname,
      email: form.email,
      password: form.password,
      address: form.address,
    });

    // Keep loader for 2 seconds before hiding
    setTimeout(() => {
      setLoading(false); // Hide loader
      toast.success("Registration successful! Please login."); // Show toast

      // Reset form
      setForm({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 3000); // 2 seconds delay
  } catch (err) {
    setLoading(false);
    toast.error(err.response?.data?.message || "Server error");
  }
};

  
  return (
    <div className="page">
      <div className="auth-container register-container">
        <Toaster position="top-center" reverseOrder={false} />

        {loading && (
          <div className="center-loader">
            <div className="leaf-loader">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="leaf"
                  style={{ transform: `rotate(${i * 72}deg) translateX(6px)` }}
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your full name"
                value={form.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p className="message">{errors.fullname}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="message">{errors.email}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="message">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="message">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <p className="message">{errors.address}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;










