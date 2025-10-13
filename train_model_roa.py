


# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.model_selection import cross_val_score
# import joblib
# import random

# # -------------------------------------------------------------
# # 1️⃣ Load and preprocess dataset
# # -------------------------------------------------------------
# print("📥 Loading dataset...")
# data = pd.read_csv("Crop_recommendation.csv")
# print(data['label'].value_counts())

# # ✅ Use only numeric columns for model input
# feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
# X = data[feature_cols]
# y = data['label']

# # Optional: Keep season column for later (display only)
# season_mapping = dict(zip(data['label'], data['season']))

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42, stratify=y
# )

# # -------------------------------------------------------------
# # 2️⃣ Define model training and evaluation
# # -------------------------------------------------------------
# def evaluate_model(params):
#     """
#     Trains and evaluates a RandomForest model with given parameters.
#     Returns accuracy on test data.
#     """
#     n_estimators = int(params[0])
#     max_depth = int(params[1])
#     min_samples_split = int(params[2])
#     min_samples_leaf = int(params[3])

#     model = RandomForestClassifier(
#         n_estimators=n_estimators,
#         max_depth=max_depth,
#         min_samples_split=min_samples_split,
#         min_samples_leaf=min_samples_leaf,
#         random_state=42
#     )

#     model.fit(X_train, y_train)
#     preds = model.predict(X_test)
#     return accuracy_score(y_test, preds)


# # -------------------------------------------------------------
# # 3️⃣ Remora Optimization Algorithm (ROA) implementation
# # -------------------------------------------------------------
# def roa_optimization(pop_size=6, max_iter=8, bounds=None):
#     """
#     Simplified Remora Optimization Algorithm for parameter tuning.
#     """
#     print("🐟 Starting Remora Optimization...")
#     if bounds is None:
#         raise ValueError("Bounds for each parameter must be provided!")

#     # Initialize random population
#     population = []
#     for _ in range(pop_size):
#         individual = [random.uniform(low, high) for low, high in bounds]
#         population.append(individual)

#     best_individual = None
#     best_fitness = -1

#     # Main optimization loop
#     for iteration in range(max_iter):
#         fitness = np.array([evaluate_model(ind) for ind in population])

#         # Find best individual
#         max_idx = np.argmax(fitness)
#         if fitness[max_idx] > best_fitness:
#             best_fitness = fitness[max_idx]
#             best_individual = population[max_idx]

#         print(f"🐠 Iteration {iteration+1}/{max_iter} → Best Accuracy = {best_fitness*100:.2f}%")

#         # Update positions (simplified attraction + random drift)
#         for i in range(pop_size):
#             if i != max_idx:
#                 leader = np.array(best_individual)
#                 current = np.array(population[i])
#                 new_pos = current + np.random.uniform(-0.5, 0.5, len(current)) * (leader - current)
#                 # Clip to bounds
#                 new_pos = np.clip(new_pos, [b[0] for b in bounds], [b[1] for b in bounds])
#                 population[i] = new_pos.tolist()

#     return best_individual, best_fitness


# # -------------------------------------------------------------
# # 4️⃣ Run ROA optimization
# # -------------------------------------------------------------
# # Parameter bounds: [n_estimators, max_depth, min_samples_split, min_samples_leaf]
# bounds = [
#     (50, 300),   # n_estimators
#     (3, 30),     # max_depth
#     (2, 10),     # min_samples_split
#     (1, 5)       # min_samples_leaf
# ]

# best_params, best_acc = roa_optimization(pop_size=6, max_iter=8, bounds=bounds)
# best_params = [int(p) for p in best_params]

# print("\n✅ Best Parameters Found by ROA:")
# print(f"n_estimators={best_params[0]}, max_depth={best_params[1]}, "
#       f"min_samples_split={best_params[2]}, min_samples_leaf={best_params[3]}")
# print(f"🎯 Best Accuracy: {best_acc*100:.2f}%")

# # -------------------------------------------------------------
# # 5️⃣ Final Model Training and Evaluation
# # -------------------------------------------------------------
# final_model = RandomForestClassifier(
#     n_estimators=best_params[0],
#     max_depth=best_params[1],
#     min_samples_split=best_params[2],
#     min_samples_leaf=best_params[3],
#     random_state=42
# )
# final_model.fit(X_train, y_train)

# train_acc = final_model.score(X_train, y_train)
# test_acc = final_model.score(X_test, y_test)
# cv_scores = cross_val_score(final_model, X, y, cv=5)
# cv_acc = cv_scores.mean()

# print("\n📈 Training Accuracy:", round(train_acc * 100, 2))
# print("🎯 Test Accuracy:", round(test_acc * 100, 2))
# print("📊 CV Accuracy:", round(cv_acc * 100, 2))

# # -------------------------------------------------------------
# # 6️⃣ Save Model + Metrics + Season Mapping
# # -------------------------------------------------------------
# joblib.dump(final_model, "crop_model_roa.pkl")
# joblib.dump({
#     "train_acc": train_acc,
#     "test_acc": test_acc,
#     "cv_acc": cv_acc,
#     "best_params": best_params
# }, "metrics_roa.pkl")

# # Save season mapping for Flask app
# joblib.dump(season_mapping, "season_mapping.pkl")

# print("💾 Model, metrics, and season mapping saved successfully!")







# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.utils import resample
# import joblib

# # -------------------------------------------------------------
# # 1️⃣ Load dataset
# # -------------------------------------------------------------
# print("📥 Loading dataset...")
# data = pd.read_csv("Crop_recommendation.csv")

# # -------------------------------------------------------------
# # 2️⃣ Check class distribution
# # -------------------------------------------------------------
# print("Class distribution before balancing:")
# print(data['label'].value_counts())

# # -------------------------------------------------------------
# # 3️⃣ Balance the dataset using upsampling
# # -------------------------------------------------------------
# # Separate majority and minority classes
# majority_count = data['label'].value_counts().max()

# balanced_data = []

# for crop in data['label'].unique():
#     crop_data = data[data['label'] == crop]
#     if len(crop_data) < majority_count:
#         # Upsample minority class
#         crop_upsampled = resample(
#             crop_data,
#             replace=True,
#             n_samples=majority_count,
#             random_state=42
#         )
#         balanced_data.append(crop_upsampled)
#     else:
#         balanced_data.append(crop_data)

# # Combine all crops into one dataframe
# data_balanced = pd.concat(balanced_data)

# print("Class distribution after balancing:")
# print(data_balanced['label'].value_counts())

# # -------------------------------------------------------------
# # 4️⃣ Split dataset
# # -------------------------------------------------------------
# X = data_balanced[['N','P','K','temperature','humidity','ph','rainfall']]
# y = data_balanced['label']

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# # -------------------------------------------------------------
# # 5️⃣ Train Random Forest
# # -------------------------------------------------------------
# model = RandomForestClassifier(n_estimators=200, random_state=42)
# model.fit(X_train, y_train)

# # -------------------------------------------------------------
# # 6️⃣ Evaluate
# # -------------------------------------------------------------
# train_acc = accuracy_score(y_train, model.predict(X_train))
# test_acc = accuracy_score(y_test, model.predict(X_test))
# cv_acc = np.mean([])  # Placeholder if using cross-validation

# print(f"📈 Training Accuracy: {train_acc*100:.2f}%")
# print(f"🎯 Test Accuracy: {test_acc*100:.2f}%")

# # -------------------------------------------------------------
# # 7️⃣ Save the balanced model
# # -------------------------------------------------------------
# joblib.dump(model, "crop_model_roa_balanced_v2.pkl")
# metrics = {'train_acc': train_acc, 'test_acc': test_acc, 'cv_acc': cv_acc}
# joblib.dump(metrics, "metrics_roa_v2.pkl")
# print("💾 Balanced model saved successfully!")






import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.utils import resample
import joblib
import random

# -------------------------------------------------------------
# 1️⃣ Load dataset
# -------------------------------------------------------------
print("📥 Loading dataset...")
data = pd.read_csv("Crop_recommendation.csv")

print("Class distribution before balancing:")
print(data['label'].value_counts())

# -------------------------------------------------------------
# 2️⃣ Balance dataset using upsampling
# -------------------------------------------------------------
majority_count = data['label'].value_counts().max()
balanced_data = []

for crop in data['label'].unique():
    crop_data = data[data['label'] == crop]
    if len(crop_data) < majority_count:
        crop_upsampled = resample(
            crop_data,
            replace=True,
            n_samples=majority_count,
            random_state=42
        )
        balanced_data.append(crop_upsampled)
    else:
        balanced_data.append(crop_data)

data_balanced = pd.concat(balanced_data)
print("Class distribution after balancing:")
print(data_balanced['label'].value_counts())

# -------------------------------------------------------------
# 3️⃣ Split dataset
# -------------------------------------------------------------
X = data_balanced[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = data_balanced['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# -------------------------------------------------------------
# 4️⃣ Define Objective Function for ROA
# -------------------------------------------------------------
def fitness_function(params):
    """Objective: maximize test accuracy"""
    n_estimators = int(params[0])
    max_depth = int(params[1])

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        random_state=42
    )
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    return acc  # higher is better

# -------------------------------------------------------------
# 5️⃣ Remora Optimization Algorithm (Simplified Version)
# -------------------------------------------------------------
def remora_optimization(
    fitness_func,
    population_size=10,
    iterations=20,
    param_bounds=[(50, 300), (3, 30)]
):
    """
    Remora Optimization Algorithm (Simplified)
    param_bounds = [(min_n_estimators, max_n_estimators), (min_depth, max_depth)]
    """
    # Initialize population randomly
    population = [
        [random.uniform(bounds[0], bounds[1]) for bounds in param_bounds]
        for _ in range(population_size)
    ]

    best_solution = None
    best_score = -float("inf")

    for iteration in range(iterations):
        scores = [fitness_func(ind) for ind in population]
        max_score = max(scores)
        leader = population[scores.index(max_score)]

        if max_score > best_score:
            best_score = max_score
            best_solution = leader

        # Update positions (simplified imitation of remora behavior)
        new_population = []
        for individual in population:
            new_individual = []
            for i, (low, high) in enumerate(param_bounds):
                # Movement around the leader with random exploration
                new_value = individual[i] + random.uniform(-1, 1) * (leader[i] - individual[i])
                # Bound checking
                new_value = max(min(new_value, high), low)
                new_individual.append(new_value)
            new_population.append(new_individual)
        population = new_population

        print(f"Iteration {iteration+1}/{iterations} | Best Accuracy: {best_score:.4f}")

    return best_solution, best_score

# -------------------------------------------------------------
# 6️⃣ Run ROA to Find Best Hyperparameters
# -------------------------------------------------------------
print("🐟 Running Remora Optimization Algorithm to find best Random Forest parameters...")
best_params, best_score = remora_optimization(
    fitness_function,
    population_size=12,
    iterations=25,
    param_bounds=[(50, 300), (3, 30)]
)

best_n_estimators = int(best_params[0])
best_max_depth = int(best_params[1])
print(f"🏆 Best Parameters found: n_estimators={best_n_estimators}, max_depth={best_max_depth}")
print(f"📊 Best Validation Accuracy: {best_score*100:.2f}%")

# -------------------------------------------------------------
# 7️⃣ Train Final Model with Optimized Parameters
# -------------------------------------------------------------
model = RandomForestClassifier(
    n_estimators=best_n_estimators,
    max_depth=best_max_depth,
    random_state=42
)
model.fit(X_train, y_train)

train_acc = accuracy_score(y_train, model.predict(X_train))
test_acc = accuracy_score(y_test, model.predict(X_test))

print(f"✅ Final Training Accuracy: {train_acc*100:.2f}%")
print(f"✅ Final Test Accuracy: {test_acc*100:.2f}%")

# -------------------------------------------------------------
# 8️⃣ Save the Optimized Model
# -------------------------------------------------------------
joblib.dump(model, "crop_model_roa_balanced_v2.pkl")
metrics = {
    'train_acc': train_acc,
    'test_acc': test_acc,
    'optimized_n_estimators': best_n_estimators,
    'optimized_max_depth': best_max_depth,
    'best_roa_score': best_score
}
joblib.dump(metrics, "metrics_roa_v2.pkl")
print("💾 Optimized model saved successfully using ROA!")
