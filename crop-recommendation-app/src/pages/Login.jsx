
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import "./Auth.css";

// function Login({ onLogin }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

  
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (message) setMessage(""); 
//   };


//   const handleSubmit = async (e) => {
//   e.preventDefault();

  
//   setMessage("");

//   if (!form.email.trim()) return setMessage("Email is required");
//   if (!/\S+@\S+\.\S+/.test(form.email)) return setMessage("Enter a valid email");
//   if (!form.password.trim()) return setMessage("Password is required");

//   setLoading(true); 

//   try {
//     const res = await axios.post("http://localhost:5000/api/login", form);

//     setTimeout(() => {
//       setLoading(false); 
//       toast.success("Login successful!"); 

//       if (onLogin && typeof onLogin === "function") onLogin(res.data.user);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

     
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     }, 2000); 
//   } catch (err) {
//     setLoading(false);
//     console.error("Login Error:", err);
//     toast.error(err.response?.data?.message || "Invalid email or password");
//   }
// };


//   return (
//     <div className="page">
//       <div className="auth-container">
//         <Toaster position="top-center" reverseOrder={false} />

//         {loading && (
//           <div className="center-loader">
//             <div className="leaf-loader">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="leaf"
//                   style={{ transform: `rotate(${i * 72}deg) translateX(6px)` }}
//                 >
//                   🍃
//                 </div>
//               ))}
//             </div>
//             <p className="loader-text">🌱 Logging in...</p>
//           </div>
//         )}

//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} className="auth-form">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             disabled={loading}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             disabled={loading}
//           />
//           <button type="submit" disabled={loading}>
//             Login
//           </button>
//         </form>

//         <p className="register-link">
//           New user? <Link to="/register">Register</Link>
//         </p>
//         <p className="message">{message}</p>
//       </div>
//     </div>
//   );
// }

// export default Login;







import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Auth.css";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email.trim()) return setMessage("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setMessage("Enter a valid email");
    if (!form.password.trim()) return setMessage("Password is required");

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      setTimeout(() => {
        setLoading(false);
        toast.success("Login successful!");
        if (onLogin && typeof onLogin === "function") onLogin(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTimeout(() => navigate("/"), 2000);
      }, 1500);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="page">
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
          <div className="form-group input-icon-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="form-group input-icon-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <p className="register-link">
          New user? <Link to="/register">Register</Link>
        </p>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Login;
