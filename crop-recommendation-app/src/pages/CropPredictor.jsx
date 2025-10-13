// import React, { useState, useEffect } from "react";

// function CropPredictor() {
//   const [form, setForm] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });
//   const [iotData, setIotData] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });
//   const [result, setResult] = useState(null);
//   const [iotResult, setIotResult] = useState(null);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit manual form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://127.0.0.1:5000/iot_predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await response.json();
//     setResult(data);
//   };

//   // Simulate IoT data every 15 sec
//   useEffect(() => {
//     const generateRandomData = () => ({
//       N: Math.floor(Math.random() * 100),
//       P: Math.floor(Math.random() * 100),
//       K: Math.floor(Math.random() * 100),
//       temperature: (20 + Math.random() * 10).toFixed(2),
//       humidity: (40 + Math.random() * 30).toFixed(2),
//       ph: (5 + Math.random() * 2).toFixed(2),
//       rainfall: (50 + Math.random() * 100).toFixed(2),
//     });

//     const interval = setInterval(() => {
//       const newData = generateRandomData();
//       setIotData(newData);
//     }, 15000);

//     return () => clearInterval(interval);
//   }, []);

//   // IoT prediction
//   const handleIotPredict = async () => {
//     const response = await fetch("http://127.0.0.1:5000/iot_predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(iotData),
//     });
//     const data = await response.json();
//     setIotResult(data);
//   };

//   return (
//     <div style={styles.container}>
//       <h2>🌱 Crop Recommendation System</h2>
//       <h4>Powered by <b>Remora Optimization Algorithm (ROA)</b></h4>

//       {/* Manual Input Form */}
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((key) => (
//           <input
//             key={key}
//             name={key}
//             placeholder={key}
//             value={form[key]}
//             onChange={handleChange}
//             type="number"
//             required
//             style={styles.input}
//           />
//         ))}
//         <br />
//         <button type="submit" style={styles.button}>Predict Crop</button>
//       </form>

//       {/* Prediction Result */}
//       {result && (
//         <div style={styles.card}>
//           <h4>🌾 Prediction Result</h4>
//           <div style={styles.recommendText}>Recommended Crop: {result.crop}</div>
//           <div style={styles.seasonText}>Season: {result.season}</div>
//           <p>{result.message}</p>
//           <img
//             src={`http://127.0.0.1:5000${result.crop_image}`}
//             alt={result.crop}
//             style={styles.image}
//           />
//         </div>
//       )}

//       {/* IoT Data Section */}
//       <div style={styles.card}>
//         <h4>🌐 IoT Sensor Data Simulation</h4>
//         {Object.keys(iotData).map((key) => (
//           <input
//             key={key}
//             name={key}
//             value={iotData[key]}
//             placeholder={key}
//             readOnly
//             style={styles.input}
//           />
//         ))}
//         <br />
//         <button type="button" onClick={handleIotPredict} style={styles.button}>
//           Predict Crop (IoT)
//         </button>

//         {iotResult && (
//           <div style={{ marginTop: "20px" }}>
//             <p style={styles.iotText}>
//               🌾 IoT Prediction: {iotResult.crop} | Season: {iotResult.season}
//             </p>
//             <img
//               src={`http://127.0.0.1:5000${iotResult.crop_image}`}
//               alt={iotResult.crop}
//               style={styles.image}
//             />
//           </div>
//         )}
//       </div>

//       <div style={styles.footer}>
//         Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
//       </div>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   container: { textAlign: "center", fontFamily: "Arial, sans-serif", background: "#f4f9f4", padding: "20px" },
//   form: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     display: "inline-block",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   input: {
//     padding: "10px",
//     margin: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//     width: "150px",
//   },
//   button: {
//     background: "#2e7d32",
//     color: "white",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   card: {
//     background: "#e8f5e9",
//     borderRadius: "10px",
//     padding: "20px",
//     marginTop: "30px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   recommendText: { fontSize: "22px", color: "#2e7d32", fontWeight: "bold" },
//   seasonText: { fontSize: "18px", color: "#555" },
//   image: {
//     width: "200px",
//     height: "200px",
//     marginTop: "10px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//     border: "2px solid #2e7d32",
//     objectFit: "cover",
//   },
//   footer: { marginTop: "25px", fontSize: "14px", color: "#777" },
//   iotText: { fontSize: "18px", color: "#1b5e20", fontWeight: "bold" },
// };

// export default CropPredictor;
















// import React, { useState, useEffect } from "react";
// import "./CropPrediction.css";

// function CropPrediction() {
//   const [form, setForm] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });
//   const [iotData, setIotData] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });
//   const [result, setResult] = useState(null);
//   const [iotResult, setIotResult] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://127.0.0.1:5000/iot_predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await response.json();
//     setResult(data);
//   };

//   useEffect(() => {
//     const generateRandomData = () => ({
//       N: Math.floor(Math.random() * 100),
//       P: Math.floor(Math.random() * 100),
//       K: Math.floor(Math.random() * 100),
//       temperature: (20 + Math.random() * 10).toFixed(2),
//       humidity: (40 + Math.random() * 30).toFixed(2),
//       ph: (5 + Math.random() * 2).toFixed(2),
//       rainfall: (50 + Math.random() * 100).toFixed(2),
//     });

//     const interval = setInterval(() => {
//       const newData = generateRandomData();
//       setIotData(newData);
//     }, 15000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleIotPredict = async () => {
//     const response = await fetch("http://127.0.0.1:5000/iot_predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(iotData),
//     });
//     const data = await response.json();
//     setIotResult(data);
//   };

//   const fieldLabels = {
//     N: "Nitrogen (N)",
//     P: "Phosphorus (P)",
//     K: "Potassium (K)",
//     temperature: "Temperature (°C)",
//     humidity: "Humidity (%)",
//     ph: "Soil pH",
//     rainfall: "Rainfall (mm)",
//   };

//   return (
//     <div className="prediction-container">
//       <h2 className="title">🌱 Crop Recommendation System</h2>
//       <p className="subtitle">
//         Powered by <b>Remora Optimization Algorithm (ROA)</b>
//       </p>

//       <div className="section-wrapper">
//         {/* Manual Form Card */}
//         <div className="form-card wide">
//           <h4>🧾 Manual Crop Prediction</h4>
//           <form onSubmit={handleSubmit} className="input-form">
//             <div className="input-grid three-cols">
//               {Object.keys(fieldLabels).map((key) => (
//                 <div key={key} className="input-group">
//                   <label className="input-label">{fieldLabels[key]}</label>
//                   <input
//                     name={key}
//                     placeholder={key.toUpperCase()}
//                     value={form[key]}
//                     onChange={handleChange}
//                     type="number"
//                     required
//                     className="input-field"
//                   />
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="predict-btn">Predict Crop</button>
//           </form>

//           {result && (
//             <div className="result-box">
//               <p className="iot-text">🌾 Predicted Crop: {result.crop}</p>
//               <p>Season: {result.season}</p>
//               <p>{result.message}</p>
//               <img
//                 src={`http://127.0.0.1:5000${result.crop_image}`}
//                 alt={result.crop}
//                 className="crop-image"
//               />
//             </div>
//           )}
//         </div>

//         {/* IoT Simulation Card */}
//         <div className="form-card wide">
//           <h4>🌐 IoT Sensor Data Simulation</h4>
//           <div className="iot-inputs three-cols">
//             {Object.keys(fieldLabels).map((key) => (
//               <div key={key} className="input-group">
//                 <label className="input-label">{fieldLabels[key]}</label>
//                 <input
//                   name={key}
//                   value={iotData[key]}
//                   readOnly
//                   className="input-field readonly"
//                 />
//               </div>
//             ))}
//           </div>
//           <button onClick={handleIotPredict} className="predict-btn">
//             Predict Crop (IoT)
//           </button>

//           {iotResult && (
//             <div className="result-box">
//               <p className="iot-text">🌾 IoT Predicted Crop: {iotResult.crop}</p>
//               <p>Season: {iotResult.season}</p>
//               <p>{iotResult.message}</p>
//               <img
//                 src={`http://127.0.0.1:5000${iotResult.crop_image}`}
//                 alt={iotResult.crop}
//                 className="crop-image"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <footer className="footer">
//         Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
//       </footer>
//     </div>
//   );
// }

// export default CropPrediction;






// import React, { useState, useEffect } from "react";

// function CropPredictor() {
//   const [form, setForm] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });

//   const [iotData, setIotData] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });

//   const [result, setResult] = useState(null);
//   const [iotResult, setIotResult] = useState(null);

//   // -----------------------------
//   // 🧮 Manual Prediction Handling
//   // -----------------------------
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       console.error("Manual prediction error:", err);
//     }
//   };

//   // -----------------------------
//   // 🌾 IoT Data Fetch Every 5 Sec
//   // -----------------------------
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/latest_iot");
//         if (!response.ok) return;
//         const data = await response.json();

//         setIotData({
//           N: data.N,
//           P: data.P,
//           K: data.K,
//           temperature: data.temperature,
//           humidity: data.humidity,
//           ph: data.ph,
//           rainfall: data.rainfall,
//         });

//         setIotResult({
//           crop: data.predicted_crop,
//           trueCrop: data.true_crop,
//           season: data.season,
//           crop_image: data.crop_image,
//         });
//       } catch (err) {
//         console.error("IoT fetch error:", err);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);


//   return (
//     <div style={styles.container}>
//       <h2>🌱 Crop Recommendation System</h2>
//       <h4>Powered by <b>Remora Optimization Algorithm (ROA)</b></h4>

//       {/* ----------------------------- */}
//       {/* Manual Crop Input Prediction */}
//       {/* ----------------------------- */}
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((key) => (
//           <input
//             key={key}
//             name={key}
//             placeholder={key}
//             value={form[key]}
//             onChange={handleChange}
//             type="number"
//             required
//             style={styles.input}
//           />
//         ))}
//         <br />
//         <button type="submit" style={styles.button}>Predict Crop</button>
//       </form>

//       {/* ----------------------------- */}
//       {/* Manual Prediction Result */}
//       {/* ----------------------------- */}
//       {result && (
//         <div style={styles.card}>
//           <h4>🌾 Manual Prediction Result</h4>
//           <div style={styles.recommendText}>Recommended Crop: {result.crop}</div>
//           <div style={styles.seasonText}>Season: {result.season}</div>
//           <p>{result.message}</p>
//           {result.crop_image && (
//             <img
//               src={`http://127.0.0.1:5000${result.crop_image}`}
//               alt={result.crop}
//               style={styles.image}
//             />
//           )}
//         </div>
//       )}

//       {/* ----------------------------- */}
//       {/* IoT Data Section */}
//       {/* ----------------------------- */}
//       <div style={styles.card}>
//         <h4>🌐 IoT Sensor Data (from Python Simulator)</h4>
//         {Object.keys(iotData).map((key) => (
//           <input
//             key={key}
//             name={key}
//             value={iotData[key] ?? ""}
//             placeholder={key}
//             readOnly
//             style={styles.input}
//           />
//         ))}

//         {/* IoT Prediction Result */}
//         {iotResult && (
//           <div style={{ marginTop: "20px" }}>
//             <p style={styles.iotText}>
//               🌾 Predicted Crop: <b>{iotResult.crop}</b>
//               {iotResult.trueCrop && (
//                 <>
//                   {" | "}
//                   ✅ True Crop (Simulator): <b>{iotResult.trueCrop}</b>
//                 </>
//               )}
//             </p>
//             <p>🌤 Season: {iotResult.season}</p>
//             {iotResult.crop_image && (
//               <img
//                 src={`http://127.0.0.1:5000${iotResult.crop_image}`}
//                 alt={iotResult.crop}
//                 style={styles.image}
//               />
//             )}
//           </div>
//         )}
//       </div>

//       <div style={styles.footer}>
//         Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
//       </div>
//     </div>
//   );
// }

// // -----------------------------
// // 🎨 Styles
// // -----------------------------
// const styles = {
//   container: {
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//     background: "#f4f9f4",
//     padding: "20px",
//   },
//   form: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     display: "inline-block",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   input: {
//     padding: "10px",
//     margin: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//     width: "150px",
//   },
//   button: {
//     background: "#2e7d32",
//     color: "white",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   card: {
//     background: "#e8f5e9",
//     borderRadius: "10px",
//     padding: "20px",
//     marginTop: "30px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   },
//   recommendText: {
//     fontSize: "22px",
//     color: "#2e7d32",
//     fontWeight: "bold",
//   },
//   seasonText: {
//     fontSize: "18px",
//     color: "#555",
//   },
//   image: {
//     width: "200px",
//     height: "200px",
//     marginTop: "10px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//     border: "2px solid #2e7d32",
//     objectFit: "cover",
//   },
//   footer: {
//     marginTop: "25px",
//     fontSize: "14px",
//     color: "#777",
//   },
//   iotText: {
//     fontSize: "18px",
//     color: "#1b5e20",
//     fontWeight: "bold",
//   },
// };

// export default CropPredictor;








import React, { useState, useEffect } from "react";
import "./CropPrediction.css"; // ✅ same styling file reused

function CropPredictor() {
  const [form, setForm] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [iotData, setIotData] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [result, setResult] = useState(null);
  const [iotResult, setIotResult] = useState(null);

  // -----------------------------
  // 🧮 Manual Prediction Handling
  // -----------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Manual prediction error:", err);
    }
  };

  // -----------------------------
  // 🌾 IoT Data Fetch Every 5 Sec
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/latest_iot");
        if (!response.ok) return;
        const data = await response.json();

        setIotData({
          N: data.N,
          P: data.P,
          K: data.K,
          temperature: data.temperature,
          humidity: data.humidity,
          ph: data.ph,
          rainfall: data.rainfall,
        });

        setIotResult({
          crop: data.predicted_crop,
          trueCrop: data.true_crop,
          season: data.season,
          crop_image: data.crop_image,
        });
      } catch (err) {
        console.error("IoT fetch error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fieldLabels = {
    N: "Nitrogen (N)",
    P: "Phosphorus (P)",
    K: "Potassium (K)",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    ph: "Soil pH",
    rainfall: "Rainfall (mm)",
  };

  // -----------------------------
  // 🌿 UI
  // -----------------------------
  return (
    <div className="prediction-container">
      <h2 className="title">🌱 Crop Recommendation System</h2>
      <p className="subtitle">
        Powered by <b>Remora Optimization Algorithm (ROA)</b>
      </p>

      <div className="section-wrapper">
        {/* Manual Prediction Card */}
        <div className="form-card wide">
          <h4>🧾 Manual Crop Prediction</h4>
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-grid three-cols">
              {Object.keys(fieldLabels).map((key) => (
                <div key={key} className="input-group">
                  <label className="input-label">{fieldLabels[key]}</label>
                  <input
                    name={key}
                    placeholder={key.toUpperCase()}
                    value={form[key]}
                    onChange={handleChange}
                    type="number"
                    required
                    className="input-field"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="predict-btn">Predict Crop</button>
          </form>

          {result && (
            <div className="result-box">
              <p className="iot-text">🌾 Predicted Crop: {result.crop}</p>
              <p>Season: {result.season}</p>
              <p>{result.message}</p>
              <img
                src={`http://127.0.0.1:5000${result.crop_image}`}
                alt={result.crop}
                className="crop-image"
              />
            </div>
          )}
        </div>

        {/* IoT Data Display Card */}
        <div className="form-card wide">
          <h4>🌐 IoT Sensor Data (Live from Python Simulator)</h4>
          <div className="iot-inputs three-cols">
            {Object.keys(fieldLabels).map((key) => (
              <div key={key} className="input-group">
                <label className="input-label">{fieldLabels[key]}</label>
                <input
                  name={key}
                  value={iotData[key] ?? ""}
                  readOnly
                  className="input-field readonly"
                />
              </div>
            ))}
          </div>

          {iotResult && (
            <div className="result-box">
              <p className="iot-text">
                🌾 IoT Predicted Crop: {iotResult.crop}
                {iotResult.trueCrop && (
                  <>
                    {" | "}
                    ✅ True Crop: {iotResult.trueCrop}
                  </>
                )}
              </p>
              <p>Season: {iotResult.season}</p>
              {iotResult.crop_image && (
                <img
                  src={`http://127.0.0.1:5000${iotResult.crop_image}`}
                  alt={iotResult.crop}
                  className="crop-image"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
      </footer>
    </div>
  );
}

export default CropPredictor;
