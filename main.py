from flask import Flask, jsonify, request 
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from datetime import datetime
import os
import json
import cv2

load_dotenv(find_dotenv())

# DB Connection
MONGO_URI = os.environ.get('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client.Deploy
collection = db.attendance

app = Flask(__name__) 

# Directory to store captured images
output_folder = 'dataset'

# Create the output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

def capture_images(person_name, phNo):
    # Open the webcam
    cap = cv2.VideoCapture(0)

    # Counter for captured images
    image_count = 0

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        # Display the frame
        cv2.imshow('Capture Photos', frame)

        # Wait for 'c' key to capture an image
        key = cv2.waitKey(1)
        if key == ord('c'):
            # Save the captured image
            image_path = os.path.join(output_folder, f'{person_name}{phNo}_{image_count}.jpg')
            cv2.imwrite(image_path, frame)
            print(f"Image captured and saved as {image_path}")
            image_count += 1

        # Break the loop when 'q' is pressed or when enough images are captured
        if key == ord('q') or image_count >= 100:
            break

    # Release the webcam and close all windows
    cap.release()
    cv2.destroyAllWindows()

@app.route('/', methods=['GET', 'POST']) 
def home(): 
    if request.method == 'GET':
        response = json.dumps(list(collection.find()), default=str)
        print(response)
        return jsonify({"response": response}) 

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    person_name = data.get('person_name')
    phNo = data.get('phone_number')
    if person_name and phNo:
        capture_images(person_name, phNo)
        return jsonify({'message': 'Images captured and saved successfully'}), 200
    else:
        return jsonify({'error': 'Missing person_name or phone_number in request'}), 400

if __name__ == '__main__':
    app.run(debug=True)
