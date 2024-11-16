from flask import Flask, render_template, request
import pickle
import os

app = Flask(__name__)

# Load the model (ensure the path is correct)
model_path = os.path.join(os.getcwd(), 'heart_disease_model.pkl')

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

model = pickle.load(open(model_path, 'rb'))

@app.route('/')
def heart_form():
    return render_template('heart_page1.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Extract all 13 features
        age = int(request.form['age'])
        sex = 1 if request.form['sex'] == 'male' else 0
        chest_pain = int(request.form['chestPain'])  # Ensure chest pain is passed as integer
        bp = int(request.form['trestbps'])  # Resting Blood Pressure
        cholesterol = int(request.form['cholesterol'])  # Serum Cholesterol
        fbs_over_120 = 1 if request.form['fbsOver120'] == 'yes' else 0
        ekg_result = int(request.form['ekg'])  # EKG Result
        max_hr = int(request.form['maxHr'])  # Maximum Heart Rate Achieved
        exercise_angina = 1 if request.form['exerciseAngina'] == 'yes' else 0
        st_depression = float(request.form['stDepression'])  # ST Depression
        slope_of_st = int(request.form['slope'])  # Slope of ST
        num_vessels_fluro = int(request.form['ca'])  # Number of Major Vessels
        thallium = int(request.form['thal'])  # Thallium Stress Test Results

        # Create input data array
        input_data = [[
            age, sex, chest_pain, bp, cholesterol,
            fbs_over_120, ekg_result, max_hr, exercise_angina,
            st_depression, slope_of_st, num_vessels_fluro, thallium
        ]]

        # Predict the result
        prediction = model.predict(input_data)
        result = "Positive for Heart Disease" if prediction[0] == 1 else "Negative for Heart Disease"

        return render_template('heart_page2.html', result=result)


if __name__ == '__main__':
    app.run(debug=True)
