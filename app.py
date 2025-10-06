
# from flask import Flask, request, render_template
# import joblib
# import pandas as pd

# app = Flask(__name__)


# model = joblib.load("crop_model.pkl")

# crop_seasons = {
#     "Rice": "Summer; Rainy; Autumn; Late Autumn",
#     "Maize": "Summer; Rainy; Late Autumn; Spring",
#     "Jute": "Rainy; Autumn (harvest)",
#     "Cotton": "Summer; Rainy; Late Autumn; Winter",
#     "Coconut": "All seasons",
#     "Papaya": "All seasons",
#     "Orange": "Winter",
#     "Apple": "Winter (in cold regions only)",
#     "Muskmelon": "Summer",
#     "Watermelon": "Summer",
#     "Grapes": "Spring",
#     "Mango": "Summer (fruiting); Spring (flowering)",
#     "Banana": "All seasons",
#     "Pomegranate": "Winter; Spring",
#     "Lentil": "Autumn (sowing); Late Autumn; Winter",
#     "Blackgram": "Rainy; Autumn",
#     "Mungbean": "Summer; Autumn; Spring",
#     "Mothbeans": "Summer; Rainy",
#     "Pigeonpeas": "Rainy; Autumn; Late Autumn",
#     "Kidneybeans": "Spring",
#     "Chickpea": "Autumn (sowing); Late Autumn; Winter",
#     "Coffee": "Rainy (flowering); Late Autumn (harvest)"
# }

# @app.route('/')
# def index():
#     return render_template("index.html")


# @app.route("/predict", methods=['POST'])
# def predict():
  
#     N = float(request.form['N'])
#     P = float(request.form['P'])
#     K = float(request.form['K'])
#     temp = float(request.form['temperature'])
#     humidity = float(request.form['humidity'])
#     ph = float(request.form['ph'])
#     rainfall = float(request.form['rainfall'])

#     features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)
#     crop = prediction[0].capitalize() 

   
#     season = crop_seasons.get(crop, "Season information not available")

#     result = f"{crop} is the best crop to be cultivated right there"

#     return render_template('index.html', result=result, crop=crop, season=season)



# if __name__ == "__main__":
#     from waitress import serve
#     print("Starting server on http://127.0.0.1:5000 ...")
#     serve(app, host="0.0.0.0", port=5000)




# from flask import Flask, request, render_template, jsonify
# import joblib
# import pandas as pd

# app = Flask(__name__)

# # Load model
# model = joblib.load("crop_model.pkl")

# # Crop-season mapping
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

# # Manual form prediction → returns HTML
# @app.route("/predict", methods=["POST"])
# def predict_form():
#     N = float(request.form['N'])
#     P = float(request.form['P'])
#     K = float(request.form['K'])
#     temp = float(request.form['temperature'])
#     humidity = float(request.form['humidity'])
#     ph = float(request.form['ph'])
#     rainfall = float(request.form['rainfall'])

#     features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     season = crop_seasons.get(prediction, "Season info not available")
#     result = f"{prediction} is the best crop to cultivate here."
#     return render_template("index.html", result=result, crop=prediction, season=season)

# # IoT prediction → returns JSON
# @app.route("/iot_predict", methods=["POST"])
# def predict_iot():
#     data = request.get_json(force=True)

#     features = pd.DataFrame([[data["N"], data["P"], data["K"],
#                               data["temperature"], data["humidity"],
#                               data["ph"], data["rainfall"]]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     prediction_cap = prediction.capitalize()  # Rice, Maize, etc.
#     season = crop_seasons.get(prediction_cap, "Season info not available")
#     return jsonify({
#         "N": data["N"], "P": data["P"], "K": data["K"],
#         "temperature": data["temperature"], "humidity": data["humidity"],
#         "ph": data["ph"], "rainfall": data["rainfall"],
#         "crop": prediction,
#         "season": season,
#         "message": f"{prediction} is the best crop to cultivate right now"
#     })

# if __name__ == "__main__":
#     from waitress import serve
#     print("🌍 Starting server on http://127.0.0.1:5000 ...")
#     serve(app, host="0.0.0.0", port=5000)






# from flask import Flask, request, render_template, jsonify
# import joblib
# import pandas as pd

# app = Flask(__name__)

# # Load model and metrics
# model = joblib.load("crop_model.pkl")
# metrics = joblib.load("metrics.pkl")

# # Crop-season mapping (same as your original)
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

# # Manual form prediction
# @app.route("/predict", methods=["POST"])
# def predict_form():
#     N = float(request.form['N'])
#     P = float(request.form['P'])
#     K = float(request.form['K'])
#     temp = float(request.form['temperature'])
#     humidity = float(request.form['humidity'])
#     ph = float(request.form['ph'])
#     rainfall = float(request.form['rainfall'])

#     features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     season = crop_seasons.get(prediction, "Season info not available")
#     result = f"{prediction} is the best crop to cultivate here."
#     crop_image = f"/static/crops/{prediction}.jpg"
#     # 🖨️ Print metrics in console every time
#     print(f"🔹 Prediction: {prediction}")
#     print(f"📈 Train Accuracy: {metrics['train_acc']*100:.2f}%")
#     print(f"🎯 Test Accuracy: {metrics['test_acc']*100:.2f}%")
#     print(f"⭐ Avg CV Accuracy: {metrics['cv_acc']*100:.2f}%")

#     # return render_template("index.html", result=result, crop=prediction, season=season)
#     crop_image = f"/static/crops/{prediction}.jpg"
#     return render_template("index.html", crop=prediction, season=season, message=message, crop_image=crop_image)


# # IoT JSON prediction
# @app.route("/iot_predict", methods=["POST"])
# def predict_iot():
#     data = request.get_json(force=True)
#     features = pd.DataFrame([[data["N"], data["P"], data["K"],
#                               data["temperature"], data["humidity"],
#                               data["ph"], data["rainfall"]]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     season = crop_seasons.get(prediction.capitalize(), "Season info not available")

#     # 🖨️ Print metrics in console every time
#     print(f"🔹 IoT Prediction: {prediction}")
#     print(f"📈 Train Accuracy: {metrics['train_acc']*100:.2f}%")
#     print(f"🎯 Test Accuracy: {metrics['test_acc']*100:.2f}%")
#     print(f"⭐ Avg CV Accuracy: {metrics['cv_acc']*100:.2f}%")

#     return jsonify({
#         "N": data["N"], "P": data["P"], "K": data["K"],
#         "temperature": data["temperature"], "humidity": data["humidity"],
#         "ph": data["ph"], "rainfall": data["rainfall"],
#         "crop": prediction,
#         "season": season,
#         "metrics": {
#             "train_accuracy": metrics['train_acc'],
#             "test_accuracy": metrics['test_acc'],
#             "cv_accuracy": metrics['cv_acc']
#         },
#         "message": f"{prediction} is the best crop to cultivate right now"
#     })

# if __name__ == "__main__":
#     from waitress import serve
#     print("🌍 Starting server on http://127.0.0.1:5000 ...")
#     serve(app, host="0.0.0.0", port=5000)





# from flask import Flask, request, render_template, jsonify
# import joblib
# import pandas as pd

# app = Flask(__name__)

# # Load model and metrics
# model = joblib.load("crop_model.pkl")
# metrics = joblib.load("metrics.pkl")

# # Crop-season mapping
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

# # Manual form prediction
# @app.route("/predict", methods=["POST"])
# def predict_form():
#     N = float(request.form['N'])
#     P = float(request.form['P'])
#     K = float(request.form['K'])
#     temp = float(request.form['temperature'])
#     humidity = float(request.form['humidity'])
#     ph = float(request.form['ph'])
#     rainfall = float(request.form['rainfall'])

#     features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     season = crop_seasons.get(prediction, "Season info not available")
#     crop_image = f"/static/crops/{prediction}.jpg"
#     message = f"{prediction} is the best crop to cultivate here."

#     # Print metrics in console
#     print(f"🔹 Prediction: {prediction}")
#     print(f"📈 Train Accuracy: {metrics['train_acc']*100:.2f}%")
#     print(f"🎯 Test Accuracy: {metrics['test_acc']*100:.2f}%")
#     print(f"⭐ Avg CV Accuracy: {metrics['cv_acc']*100:.2f}%")

#     return render_template("index.html",
#                            crop=prediction,
#                            season=season,
#                            message=message,
#                            crop_image=crop_image)

# # IoT JSON prediction
# @app.route("/iot_predict", methods=["POST"])
# def predict_iot():
#     data = request.get_json(force=True)
#     features = pd.DataFrame([[data["N"], data["P"], data["K"],
#                               data["temperature"], data["humidity"],
#                               data["ph"], data["rainfall"]]],
#                             columns=['N','P','K','temperature','humidity','ph','rainfall'])

#     prediction = model.predict(features)[0]
#     season = crop_seasons.get(prediction, "Season info not available")
#     crop_image = f"/static/crops/{prediction}.jpg"

#     # Print metrics in console
#     print(f"🔹 IoT Prediction: {prediction}")
#     print(f"📈 Train Accuracy: {metrics['train_acc']*100:.2f}%")
#     print(f"🎯 Test Accuracy: {metrics['test_acc']*100:.2f}%")
#     print(f"⭐ Avg CV Accuracy: {metrics['cv_acc']*100:.2f}%")

#     return jsonify({
#         "N": data["N"], "P": data["P"], "K": data["K"],
#         "temperature": data["temperature"], "humidity": data["humidity"],
#         "ph": data["ph"], "rainfall": data["rainfall"],
#         "crop": prediction,
#         "season": season,
#         "crop_image": crop_image,
#         "metrics": {
#             "train_accuracy": metrics['train_acc'],
#             "test_accuracy": metrics['test_acc'],
#             "cv_accuracy": metrics['cv_acc']
#         },
#         "message": f"{prediction} is the best crop to cultivate right now"
#     })

# if __name__ == "__main__":
#     from waitress import serve
#     print("🌍 Starting server on http://127.0.0.1:5000 ...")
#     serve(app, host="0.0.0.0", port=5000)




from flask import Flask, request, render_template, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# 🔹 Load model and accuracy metrics
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


@app.route('/')
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict_form():
    # Get input values
    N = float(request.form['N'])
    P = float(request.form['P'])
    K = float(request.form['K'])
    temp = float(request.form['temperature'])
    humidity = float(request.form['humidity'])
    ph = float(request.form['ph'])
    rainfall = float(request.form['rainfall'])

    # Create dataframe
    features = pd.DataFrame([[N, P, K, temp, humidity, ph, rainfall]],
                            columns=['N','P','K','temperature','humidity','ph','rainfall'])

    # Make prediction
    prediction = model.predict(features)[0]

    # Normalize crop name to match dictionary keys
    normalized_crop = prediction.strip().title()
    season = crop_seasons.get(normalized_crop, "Season info not available")
    crop_image = f"/static/crops/{normalized_crop}.jpg"

    # Accuracy info
    train_acc = metrics['train_acc'] * 100
    test_acc = metrics['test_acc'] * 100
    cv_acc = metrics['cv_acc'] * 100

    message = f"{normalized_crop} is the best crop to cultivate here."

    return render_template("index.html",
                           crop=normalized_crop,
                           season=season,
                           message=message,
                           crop_image=crop_image,
                           train_acc=train_acc,
                           test_acc=test_acc,
                           cv_acc=cv_acc)


@app.route("/iot_predict", methods=["POST"])
def predict_iot():
    data = request.get_json(force=True)
    features = pd.DataFrame([[data["N"], data["P"], data["K"],
                              data["temperature"], data["humidity"],
                              data["ph"], data["rainfall"]]],
                            columns=['N','P','K','temperature','humidity','ph','rainfall'])

    prediction = model.predict(features)[0]

    # Normalize crop name to match dictionary keys
    normalized_crop = prediction.strip().title()
    season = crop_seasons.get(normalized_crop, "Season info not available")
    crop_image = f"/static/crops/{normalized_crop}.jpg"

    return jsonify({
        "crop": normalized_crop,
        "season": season,
        "crop_image": crop_image,
        "metrics": {
            "train_accuracy": metrics['train_acc'],
            "test_accuracy": metrics['test_acc'],
            "cv_accuracy": metrics['cv_acc']
        },
        "message": f"{normalized_crop} is the best crop to cultivate right now"
    })


if __name__ == "__main__":
    from waitress import serve
    print("🌱 Flask App (ROA Optimized Model) running on http://127.0.0.1:5000")
    print("🔧 Powered by Remora Optimization Algorithm")
    serve(app, host="0.0.0.0", port=5000)
