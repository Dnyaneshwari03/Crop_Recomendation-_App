
# from flask import Flask, request, render_template, jsonify
# import joblib
# import pandas as pd

# app = Flask(__name__)

# # 🔹 Load model and accuracy metrics
# model = joblib.load("crop_model_roa.pkl")
# metrics = joblib.load("metrics_roa.pkl")

# # 🔹 Crop to season mapping
# crop_seasons = {
#     "Rice": "Summer; Rainy; Autumn; Late Autumn",
#     "Maize": "Summer; Rainy; Late Autumn; Spring",
#     "Jute": "Rainy; Autumn (harvest)",
#     "Cotton": "Summer; Rainy; Late Autumn; Winter",
#     "Coconut": "All seasons",
#     "Papaya": "All seasons",
#     "Orange": "Winter",
#     "Apple": "Winter (cold regions only)",
#     "Muskmelon": "Summer",
#     "Watermelon": "Summer",
#     "Grapes": "Spring",
#     "Mango": "Summer (fruiting); Spring (flowering)",
#     "Banana": "All seasons",
#     "Pomegranate": "Winter; Spring",
#     "Lentil": "Autumn; Late Autumn; Winter",
#     "Blackgram": "Rainy; Autumn",
#     "Mungbean": "Summer; Autumn; Spring",
#     "Mothbeans": "Summer; Rainy",
#     "Pigeonpeas": "Rainy; Autumn; Late Autumn",
#     "Kidneybeans": "Spring",
#     "Chickpea": "Autumn; Late Autumn; Winter",
#     "Coffee": "Rainy (flowering); Late Autumn (harvest)"
# }


# @app.route('/')
# def index():
#     return render_template("index.html")


# @app.route("/predict", methods=["POST"])
# def predict_form():
#     # Get input values
#     N = float(request.form['N'])
#     P = float(request.form['P'])
#     K = float(request.form['K'])
#     temp = float(request.form['temperature'])
#     humidity = float(request.form['humidity'])
#     ph = float(request.form['ph'])
#     rainfall = float(request.form['rainfall'])

#     # Create dataframe
#     features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     # Make prediction
#     prediction = model.predict(features)[0]

#     # Normalize crop name to match dictionary keys
#     normalized_crop = prediction.strip().title()
#     season = crop_seasons.get(normalized_crop, "Season info not available")
#     crop_image = f"/static/crops/{normalized_crop}.jpg"

#     # Accuracy info
#     train_acc = metrics['train_acc'] * 100
#     test_acc = metrics['test_acc'] * 100
#     cv_acc = metrics['cv_acc'] * 100

#     message = f"{normalized_crop} is the best crop to cultivate here."

#     return render_template("index.html",
#                            crop=normalized_crop,
#                            season=season,
#                            message=message,
#                            crop_image=crop_image,
#                            train_acc=train_acc,
#                            test_acc=test_acc,
#                            cv_acc=cv_acc)


# @app.route("/iot_predict", methods=["POST"])
# def predict_iot():
#     data = request.get_json(force=True)
#     features = pd.DataFrame([[data["N"], data["P"], data["K"],
#                               data["temperature"], data["humidity"],
#                               data["ph"], data["rainfall"]]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]

#     # Normalize crop name to match dictionary keys
#     normalized_crop = prediction.strip().title()
#     season = crop_seasons.get(normalized_crop, "Season info not available")
#     crop_image = f"/static/crops/{normalized_crop}.jpg"

#     return jsonify({
#         "crop": normalized_crop,
#         "season": season,
#         "crop_image": crop_image,
#         "metrics": {
#             "train_accuracy": metrics['train_acc'],
#             "test_accuracy": metrics['test_acc'],
#             "cv_accuracy": metrics['cv_acc']
#         },
#         "message": f"{normalized_crop} is the best crop to cultivate right now"
#     })


# if __name__ == "__main__":
#     from waitress import serve
#     print("🌱 Flask App (ROA Optimized Model) running on http://127.0.0.1:5000")
#     print("🔧 Powered by Remora Optimization Algorithm")
#     serve(app, host="0.0.0.0", port=5000)










from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # ✅ Allow React frontend (port 3000) to access Flask backend (port 5000)

# 🔹 Load model and metrics
model = joblib.load("crop_model_roa.pkl")
metrics = joblib.load("metrics_roa.pkl")

# 🔹 Crop to season mapping
crop_seasons = {
    "Rice": "Summer; Rainy; Autumn; Late Autumn",
    "Maize": "Summer; Rainy; Late Autumn; Spring",
    "Jute": "Rainy; Autumn (harvest)",
    "Cotton": "Summer; Rainy; Late Autumn; Winter",
    "Coconut": "All seasons",
    "Papaya": "All seasons",
    "Orange": "Winter",
    "Apple": "Winter (cold regions only)",
    "Muskmelon": "Summer",
    "Watermelon": "Summer",
    "Grapes": "Spring",
    "Mango": "Summer (fruiting); Spring (flowering)",
    "Banana": "All seasons",
    "Pomegranate": "Winter; Spring",
    "Lentil": "Autumn; Late Autumn; Winter",
    "Blackgram": "Rainy; Autumn",
    "Mungbean": "Summer; Autumn; Spring",
    "Mothbeans": "Summer; Rainy",
    "Pigeonpeas": "Rainy; Autumn; Late Autumn",
    "Kidneybeans": "Spring",
    "Chickpea": "Autumn; Late Autumn; Winter",
    "Coffee": "Rainy (flowering); Late Autumn (harvest)"
}

# 🔹 Directory for crop images
IMAGE_DIR = os.path.join(os.getcwd(), "static", "crops")


@app.route('/')
def home():
    return jsonify({
        "message": "🌱 Crop Recommendation API (ROA Optimized Model) is running",
        "endpoints": ["/predict", "/iot_predict", "/image/<crop_name>"]
    })


# 🔹 Manual input crop prediction (for React form)
@app.route("/predict", methods=["POST"])
def predict_crop():
    try:
        data = request.get_json()
        features = pd.DataFrame([[
            data["N"], data["P"], data["K"],
            data["temperature"], data["humidity"],
            data["ph"], data["rainfall"]
        ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        prediction = model.predict(features)[0]
        normalized_crop = prediction.strip().title()
        season = crop_seasons.get(normalized_crop, "Season info not available")
        crop_image = f"/image/{normalized_crop.lower()}"

        return jsonify({
            "crop": normalized_crop,
            "season": season,
            "crop_image": crop_image,
            "metrics": {
                "train_accuracy": round(metrics['train_acc'] * 100, 2),
                "test_accuracy": round(metrics['test_acc'] * 100, 2),
                "cv_accuracy": round(metrics['cv_acc'] * 100, 2)
            },
            "message": f"{normalized_crop} is the best crop to cultivate here."
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# 🔹 IoT-based automatic prediction (JSON input)
@app.route("/iot_predict", methods=["POST"])
def predict_iot():
    try:
        data = request.get_json(force=True)
        features = pd.DataFrame([[
            data["N"], data["P"], data["K"],
            data["temperature"], data["humidity"],
            data["ph"], data["rainfall"]
        ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        prediction = model.predict(features)[0]
        normalized_crop = prediction.strip().title()
        season = crop_seasons.get(normalized_crop, "Season info not available")
        crop_image = f"/image/{normalized_crop.lower()}"

        return jsonify({
            "crop": normalized_crop,
            "season": season,
            "crop_image": crop_image,
            "metrics": {
                "train_accuracy": round(metrics['train_acc'] * 100, 2),
                "test_accuracy": round(metrics['test_acc'] * 100, 2),
                "cv_accuracy": round(metrics['cv_acc'] * 100, 2)
            },
            "message": f"{normalized_crop} is the best crop to cultivate right now."
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# 🔹 Serve crop images to React frontend
@app.route("/image/<crop_name>")
def get_crop_image(crop_name):
    filename = f"{crop_name.lower()}.jpg"
    file_path = os.path.join(IMAGE_DIR, filename)
    if os.path.exists(file_path):
        return send_from_directory(IMAGE_DIR, filename)
    else:
        return jsonify({"error": f"No image found for {crop_name}"}), 404


if __name__ == "__main__":
    from waitress import serve
    print("🌱 Flask API (ROA Optimized) running on http://127.0.0.1:5000")
    print("🔗 Ready to connect with React frontend...")
    serve(app, host="0.0.0.0", port=5000)
