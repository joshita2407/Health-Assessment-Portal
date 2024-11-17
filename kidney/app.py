from flask import Flask, request, jsonify, render_template
import pickle  # Importing pickle to load the model
import os

app = Flask(__name__)

# Global variable to hold the model
model = None

# Dictionary for encoding categorical inputs
dictonary = {
    "rbc": {
        "abnormal": 1,
        "normal": 0,
    },
    "pc": {
        "abnormal": 1,
        "normal": 0,
    },
    "pcc": {
        "present": 1,
        "notpresent": 0,
    },
    "ba": {
        "notpresent": 0,
        "present": 1,
    },
    "htn": {
        "yes": 1,
        "no": 0,
    },
    "dm": {
        "yes": 1,
        "no": 0,
    },
    "cad": {
        "yes": 1,
        "no": 0,
    },
    "appet": {
        "good": 1,
        "poor": 0,
    },
    "pe": {
        "yes": 1,
        "no": 0,
    },
    "ane": {
        "yes": 1,
        "no": 0,
    }
}

# Load the model when the application starts
def load_model():
    global model
    try:
        # Update the model path for kidney disease prediction
        model_path = os.path.join(os.getcwd(), 'kidney/kidney_disease_prediction.pkl')  # Ensure the correct path
        print("Model path:", model_path)  # Debug: Print model path

        # Check if the model file exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        
        # Load the model using pickle
        with open(model_path, 'rb') as model_file:
            model = pickle.load(model_file)
            print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model with pickle: {str(e)}")
        model = None  # Set model to None if loading fails

# Call this function to load the model when the app starts
load_model()

# Function to make a prediction based on the input data
def predict_kidney_disease(age, bp, al, su, rbc, pc, pcc, ba, bgr, bu, sc, wc, htn, dm, cad, pe, ane):
    try:
        if model is None:
            return "Error in prediction: Model not loaded!"
        
        # Use dictionary to map categorical values to binary values
        rbc_encoded = dictonary["rbc"].get(rbc, -1)
        pc_encoded = dictonary["pc"].get(pc, -1)
        pcc_encoded = dictonary["pcc"].get(pcc, -1)
        ba_encoded = dictonary["ba"].get(ba, -1)
        htn_encoded = dictonary["htn"].get(htn, -1)
        dm_encoded = dictonary["dm"].get(dm, -1)
        cad_encoded = dictonary["cad"].get(cad, -1)
        pe_encoded = dictonary["pe"].get(pe, -1)
        ane_encoded = dictonary["ane"].get(ane, -1)
        
        # Check for invalid inputs (mapped as -1 by dictionary)
        if -1 in [rbc_encoded, pc_encoded, pcc_encoded, ba_encoded, htn_encoded, dm_encoded, cad_encoded, pe_encoded, ane_encoded]:
            return "Error in prediction: Invalid categorical input!"
        
        # Prepare the input data in the same format as the training data
        input_data = [
            [age, bp, al, su, bgr, bu, sc, wc] + [rbc_encoded, pc_encoded, pcc_encoded, ba_encoded, htn_encoded, dm_encoded, cad_encoded, pe_encoded, ane_encoded]
        ]

        # Predict using the trained model
        prediction = model.predict(input_data)

        # Return a meaningful prediction result
        return "Kidney Disease Present" if prediction[0] == 1 else "Kidney Disease Absent"
    
    except Exception as e:
        return f"Error in prediction: {str(e)}"

# Home route to serve the HTML page
@app.route('/')
def home():
    return render_template('kidney_p1.html')  # Change this to the correct template for kidney disease

# API route to handle prediction (POST request)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the form data sent from the frontend (ensure JSON payload)
        data = request.get_json()  # Using get_json() for incoming JSON data
        if not data:
            return jsonify({"error": "No input data provided"}), 400
        
        # Extract and validate the data from JSON
        required_fields = ['age', 'bp', 'al', 'su', 'rbc', 'pc', 'pcc', 'ba', 'bgr', 'bu', 'sc', 'wc', 'htn', 'dm', 'cad', 'pe', 'ane']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        # Extract values from the input JSON data
        age = float(data['age'])
        bp = float(data['bp'])
        al = float(data['al'])
        su = float(data['su'])
        rbc = data['rbc']
        pc = data['pc']
        pcc = data['pcc']
        ba = data['ba']
        bgr = float(data['bgr'])
        bu = float(data['bu'])
        sc = float(data['sc'])
        wc = float(data['wc'])
        htn = data['htn']
        dm = data['dm']
        cad = data['cad']
        pe = data['pe']
        ane = data['ane']

        # Call the prediction function and get the result
        prediction = predict_kidney_disease(
            age, bp, al, su, rbc, pc, pcc, ba, bgr, bu, sc, wc, htn, dm, cad, pe, ane
        )

        # Return the prediction as a JSON response to the frontend
        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})

# Route to display the result (GET request)
@app.route('/result')
def result():
    prediction = request.args.get('prediction')  # Get the prediction result from the query parameter
    return render_template('kidney_p2.html', prediction=prediction)  # Change this to the correct template for displaying result

# Route to display the doctors(GET request)
@app.route('/doctors')
def doctors():
    return render_template('doctor_details.html')

if __name__ == '__main__':
    app.run(port=5003, threaded=True)
