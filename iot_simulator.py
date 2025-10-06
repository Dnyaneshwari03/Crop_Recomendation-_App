import time, random, requests

API_URL = "http://127.0.0.1:5000/iot_predict"

def simulate_sensor_data():
    return {
        "N": random.randint(10, 120),
        "P": random.randint(5, 100),
        "K": random.randint(5, 120),
        "temperature": round(random.uniform(15, 35), 2),
        "humidity": round(random.uniform(40, 90), 2),
        "ph": round(random.uniform(4.5, 8.5), 2),
        "rainfall": round(random.uniform(50, 300), 2)
    }

while True:
    data = simulate_sensor_data()
    print("📡 Sending sensor data:", data)

    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 200:
            print("✅ Response:", response.json())
        else:
            print("⚠️ Error:", response.text)
    except Exception as e:
        print("❌ Failed to send:", e)

    time.sleep(15)  # wait 5 sec before sending next reading
