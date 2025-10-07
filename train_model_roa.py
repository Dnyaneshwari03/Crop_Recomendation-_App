


import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_score
import joblib
import random

# -------------------------------------------------------------
# 1️⃣ Load and preprocess dataset
# -------------------------------------------------------------
print("📥 Loading dataset...")
data = pd.read_csv("Crop_recommendation.csv")

# ✅ Use only numeric columns for model input
feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
X = data[feature_cols]
y = data['label']

# Optional: Keep season column for later (display only)
season_mapping = dict(zip(data['label'], data['season']))

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# -------------------------------------------------------------
# 2️⃣ Define model training and evaluation
# -------------------------------------------------------------
def evaluate_model(params):
    """
    Trains and evaluates a RandomForest model with given parameters.
    Returns accuracy on test data.
    """
    n_estimators = int(params[0])
    max_depth = int(params[1])
    min_samples_split = int(params[2])
    min_samples_leaf = int(params[3])

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_split=min_samples_split,
        min_samples_leaf=min_samples_leaf,
        random_state=42
    )

    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    return accuracy_score(y_test, preds)


# -------------------------------------------------------------
# 3️⃣ Remora Optimization Algorithm (ROA) implementation
# -------------------------------------------------------------
def roa_optimization(pop_size=6, max_iter=8, bounds=None):
    """
    Simplified Remora Optimization Algorithm for parameter tuning.
    """
    print("🐟 Starting Remora Optimization...")
    if bounds is None:
        raise ValueError("Bounds for each parameter must be provided!")

    # Initialize random population
    population = []
    for _ in range(pop_size):
        individual = [random.uniform(low, high) for low, high in bounds]
        population.append(individual)

    best_individual = None
    best_fitness = -1

    # Main optimization loop
    for iteration in range(max_iter):
        fitness = np.array([evaluate_model(ind) for ind in population])

        # Find best individual
        max_idx = np.argmax(fitness)
        if fitness[max_idx] > best_fitness:
            best_fitness = fitness[max_idx]
            best_individual = population[max_idx]

        print(f"🐠 Iteration {iteration+1}/{max_iter} → Best Accuracy = {best_fitness*100:.2f}%")

        # Update positions (simplified attraction + random drift)
        for i in range(pop_size):
            if i != max_idx:
                leader = np.array(best_individual)
                current = np.array(population[i])
                new_pos = current + np.random.uniform(-0.5, 0.5, len(current)) * (leader - current)
                # Clip to bounds
                new_pos = np.clip(new_pos, [b[0] for b in bounds], [b[1] for b in bounds])
                population[i] = new_pos.tolist()

    return best_individual, best_fitness


# -------------------------------------------------------------
# 4️⃣ Run ROA optimization
# -------------------------------------------------------------
# Parameter bounds: [n_estimators, max_depth, min_samples_split, min_samples_leaf]
bounds = [
    (50, 300),   # n_estimators
    (3, 30),     # max_depth
    (2, 10),     # min_samples_split
    (1, 5)       # min_samples_leaf
]

best_params, best_acc = roa_optimization(pop_size=6, max_iter=8, bounds=bounds)
best_params = [int(p) for p in best_params]

print("\n✅ Best Parameters Found by ROA:")
print(f"n_estimators={best_params[0]}, max_depth={best_params[1]}, "
      f"min_samples_split={best_params[2]}, min_samples_leaf={best_params[3]}")
print(f"🎯 Best Accuracy: {best_acc*100:.2f}%")

# -------------------------------------------------------------
# 5️⃣ Final Model Training and Evaluation
# -------------------------------------------------------------
final_model = RandomForestClassifier(
    n_estimators=best_params[0],
    max_depth=best_params[1],
    min_samples_split=best_params[2],
    min_samples_leaf=best_params[3],
    random_state=42
)
final_model.fit(X_train, y_train)

train_acc = final_model.score(X_train, y_train)
test_acc = final_model.score(X_test, y_test)
cv_scores = cross_val_score(final_model, X, y, cv=5)
cv_acc = cv_scores.mean()

print("\n📈 Training Accuracy:", round(train_acc * 100, 2))
print("🎯 Test Accuracy:", round(test_acc * 100, 2))
print("📊 CV Accuracy:", round(cv_acc * 100, 2))

# -------------------------------------------------------------
# 6️⃣ Save Model + Metrics + Season Mapping
# -------------------------------------------------------------
joblib.dump(final_model, "crop_model_roa.pkl")
joblib.dump({
    "train_acc": train_acc,
    "test_acc": test_acc,
    "cv_acc": cv_acc,
    "best_params": best_params
}, "metrics_roa.pkl")

# Save season mapping for Flask app
joblib.dump(season_mapping, "season_mapping.pkl")

print("💾 Model, metrics, and season mapping saved successfully!")
