from flask import Flask, request, jsonify, send_file
import cv2
import numpy as np
import matplotlib.pyplot as plt
from roboflow import Roboflow
from io import BytesIO

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return "No file uploaded", 400
    
    file = request.files['file']
    # Read the image file
    image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    
    # Setup Roboflow and load model
    rf = Roboflow(api_key="hjoQtwGdi2OD9sUoXK5c")
    project = rf.workspace().project("plant-disease-classification-zw18z")
    model = project.version(2).model

    
    # Save temporary image to predict
    cv2.imwrite("temp_image.jpg", image)
    result = model.predict("temp_image.jpg", confidence=5, overlap=10).json()

    # Extract detections
    detections = [item for item in result["predictions"]]

    # Draw circles on the detections
    for detection in detections:
        x_center = int(detection['x'] + detection['width'] / 2 - 10)
        y_center = int(detection['y'] + detection['height'] / 2 - 10)
        radius = max(int(detection['width'] / 2), int(detection['height'] / 2))
        cv2.circle(image, (x_center, y_center), radius, (0, 255, 0), 2)

    # Calculate diseased area
    disease_area = sum(3.1415 * (max(int(d['width'] / 2), int(d['height'] / 2))**2) for d in detections)

    # Convert to grayscale and segment leaf
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, leaf_mask = cv2.threshold(gray_image, 120, 255, cv2.THRESH_BINARY_INV)
    total_leaf_area = np.sum(leaf_mask == 255)

    # Calculate diseased area ratio
    diseased_area_ratio = (disease_area / total_leaf_area) * 100 if total_leaf_area else 0

    # Convert image for output
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    is_success, buffer = cv2.imencode(".png", image_rgb)
    io_buf = BytesIO(buffer)
    cv2.imwrite('processed_image.png', image)    
    # Prepare response
    response = {
        "diseased_area_ratio": diseased_area_ratio
    }
    response_data = jsonify(response)
    #response_data.headers['Image-File'] = send_file(io_buf, mimetype='image/png', as_attachment=True, download_name='processed_image.png')

    return response_data
@app.route('/get_image')
def get_image():
    return send_file('processed_image.png', mimetype='image/png')
if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
