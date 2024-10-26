from flask import Flask, jsonify, request
import os
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Define the directory where your state folders are located
DATA_DIRECTORY = 'D:\OpenCorporates\data'  # Ensure this is the correct path to your folder

# A dictionary to map full state names to their abbreviations (if needed)
STATE_ABBREVIATIONS = {
    'texas': 'TX',
    'california': 'CA',
    'new york': 'NY',
    'hawaii':'HI',
    'pennsylvania': 'PA',
    'virginia':'VA'
    # Add more states here if needed
}

@app.route('/api/search-business/<string:business_type>/<string:state>', methods=['GET'])
def search_businesses(business_type, state):
    business_type = business_type.strip().lower()
    state = state.strip().lower()

    # Convert full state name to abbreviation if necessary
    state_abbr = STATE_ABBREVIATIONS.get(state, state.upper())
    businesses = []

    # Construct the state directory path
    state_path = os.path.join(DATA_DIRECTORY, state_abbr)
    print(f"Searching in directory: {state_path}")  # Log for debugging

    if not os.path.exists(state_path):
        return jsonify({"error": f"State '{state}' not found"}), 404

    # Loop through all CSV files in the state directory
    for filename in os.listdir(state_path):
        if filename.endswith('.csv'):
            # Check if the business type matches the CSV filename
            if business_type in filename.lower():
                # Read the matching CSV file
                csv_path = os.path.join(state_path, filename)
                df = pd.read_csv(csv_path)

                # Add matching business data to the response
                businesses.append({
                    "filename": filename,  # Optional: The name of the file (e.g., Restaurant.csv)
                    "data": df.to_dict(orient='records')  # Convert the DataFrame to list of dictionaries
                })

    # Return the filtered list of businesses or a message if no results found
    if not businesses:
        return jsonify({"message": f"No businesses found for type '{business_type}' in state '{state}'."}), 200

    return jsonify(businesses), 200  # Return the businesses data

if __name__ == '__main__':
    app.run(debug=True)
