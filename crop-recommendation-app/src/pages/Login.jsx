
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// function Login({ onLogin }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email.trim()) return setMessage("Email is required");
//     if (!/\S+@\S+\.\S+/.test(form.email)) return setMessage("Enter a valid email");
//     if (!form.password.trim()) return setMessage("Password is required");

//     try {
//       const res = await axios.post("http://localhost:5000/api/login", form);

//       if (onLogin && typeof onLogin === "function") onLogin(res.data.user);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setMessage(res.data.message);
//       navigate("/");
//     } catch (err) {
//       console.error("Login Error:", err);
//       setMessage(err.response?.data?.message || "Invalid email or password");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
//         <button type="submit">Login</button>
//       </form>

//       <p className="register-link">
//         New user? <Link to="/register">Register</Link>
//       </p>
//       <p className="message">{message}</p>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Auth.css";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) return setMessage("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setMessage("Enter a valid email");
    if (!form.password.trim()) return setMessage("Password is required");

    setLoading(true); // Show loader

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      // Keep loader visible for a short time for smooth UX
      setTimeout(() => {
        setLoading(false);
        toast.success("Login successful!");
        if (onLogin && typeof onLogin === "function") onLogin(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }, 20000); // 2 seconds loader
    } catch (err) {
      setLoading(false);
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Invalid email or password");
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
                style={{ transform: `rotate(${i * 72}deg) translateX(6px)` }}
              >
                🍃
              </div>
            ))}
          </div>
          <p className="loader-text">🌱 Logging in...</p>
        </div>
      )}

      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>

      <p className="register-link">
        New user? <Link to="/register">Register</Link>
      </p>
      <p className="message">{message}</p>
    </div>
  );
}

export default Login;
