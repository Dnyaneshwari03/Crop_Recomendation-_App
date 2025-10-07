import React, { useState, useEffect } from "react";

function CropPredictor() {
  const [form, setForm] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });
  const [iotData, setIotData] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });
  const [result, setResult] = useState(null);
  const [iotResult, setIotResult] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit manual form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/iot_predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(data);
  };

  // Simulate IoT data every 15 sec
  useEffect(() => {
    const generateRandomData = () => ({
      N: Math.floor(Math.random() * 100),
      P: Math.floor(Math.random() * 100),
      K: Math.floor(Math.random() * 100),
      temperature: (20 + Math.random() * 10).toFixed(2),
      humidity: (40 + Math.random() * 30).toFixed(2),
      ph: (5 + Math.random() * 2).toFixed(2),
      rainfall: (50 + Math.random() * 100).toFixed(2),
    });

    const interval = setInterval(() => {
      const newData = generateRandomData();
      setIotData(newData);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // IoT prediction
  const handleIotPredict = async () => {
    const response = await fetch("http://127.0.0.1:5000/iot_predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(iotData),
    });
    const data = await response.json();
    setIotResult(data);
  };

  return (
    <div style={styles.container}>
      <h2>🌱 Crop Recommendation System</h2>
      <h4>Powered by <b>Remora Optimization Algorithm (ROA)</b></h4>

      {/* Manual Input Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            type="number"
            required
            style={styles.input}
          />
        ))}
        <br />
        <button type="submit" style={styles.button}>Predict Crop</button>
      </form>

      {/* Prediction Result */}
      {result && (
        <div style={styles.card}>
          <h4>🌾 Prediction Result</h4>
          <div style={styles.recommendText}>Recommended Crop: {result.crop}</div>
          <div style={styles.seasonText}>Season: {result.season}</div>
          <p>{result.message}</p>
          <img
            src={`http://127.0.0.1:5000${result.crop_image}`}
            alt={result.crop}
            style={styles.image}
          />
        </div>
      )}

      {/* IoT Data Section */}
      <div style={styles.card}>
        <h4>🌐 IoT Sensor Data Simulation</h4>
        {Object.keys(iotData).map((key) => (
          <input
            key={key}
            name={key}
            value={iotData[key]}
            placeholder={key}
            readOnly
            style={styles.input}
          />
        ))}
        <br />
        <button type="button" onClick={handleIotPredict} style={styles.button}>
          Predict Crop (IoT)
        </button>

        {iotResult && (
          <div style={{ marginTop: "20px" }}>
            <p style={styles.iotText}>
              🌾 IoT Prediction: {iotResult.crop} | Season: {iotResult.season}
            </p>
            <img
              src={`http://127.0.0.1:5000${iotResult.crop_image}`}
              alt={iotResult.crop}
              style={styles.image}
            />
          </div>
        )}
      </div>

      <div style={styles.footer}>
        Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: { textAlign: "center", fontFamily: "Arial, sans-serif", background: "#f4f9f4", padding: "20px" },
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    display: "inline-block",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "150px",
  },
  button: {
    background: "#2e7d32",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  card: {
    background: "#e8f5e9",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "30px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  recommendText: { fontSize: "22px", color: "#2e7d32", fontWeight: "bold" },
  seasonText: { fontSize: "18px", color: "#555" },
  image: {
    width: "200px",
    height: "200px",
    marginTop: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    border: "2px solid #2e7d32",
    objectFit: "cover",
  },
  footer: { marginTop: "25px", fontSize: "14px", color: "#777" },
  iotText: { fontSize: "18px", color: "#1b5e20", fontWeight: "bold" },
};

export default CropPredictor;
