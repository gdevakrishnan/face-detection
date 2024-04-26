from flask import Flask, request, jsonify
import cv2
import os
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables
load_dotenv()

# MongoDB connection
mongo_uri = os.getenv("MONGODB_URI")
client = MongoClient(mongo_uri)
db = client['Deploy']
collection = db['attendance']

# Paths
cascade_path = "haarcascade_frontalface_default.xml"
dataset_path = 'datasets'

# Load the Haar cascade classifier for face detection
face_cascade = cv2.CascadeClassifier(cascade_path)

# Load the dataset
dataset = {}
for person_name in os.listdir(dataset_path):
    person_dir = os.path.join(dataset_path, person_name)
    if os.path.isdir(person_dir):
        dataset[person_name] = []
        for file_name in os.listdir(person_dir):
            file_path = os.path.join(person_dir, file_name)
            img = cv2.imread(file_path)
            if img is not None:
                dataset[person_name].append(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))

# Function to train the face recognition model
def train_model(name):
    datasets = 'datasets'
    sub = name

    path = os.path.join(datasets, sub)
    if not os.path.isdir(path):
        os.makedirs(path)

    (width, height) = (130, 100)

    webcamera = cv2.VideoCapture(0)
    count = 1

    while count < 51:
        print(count)
        (_, im) = webcamera.read()
        gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 4)

        for (x, y, w, h) in faces:
            cv2.rectangle(im, (x, y), (x + w, y + h), (255, 0, 0), 2)
            face = gray[y:y + h, x:x + w]
            face_resize = cv2.resize(face, (width, height))
            cv2.imwrite('%s/%s.png' % (path, count), face_resize)
            count += 1

        cv2.imshow('opencv', im)
        key = cv2.waitKey(10)
        if key == 27:
            break

    webcamera.release()
    cv2.destroyAllWindows()

# Function to recognize faces and return name, date, and time
def recognize():
    # Initialize webcam
    webcam = cv2.VideoCapture(0)

    recognized_persons = []

    while True:
        # Capture frame-by-frame
        ret, frame = webcam.read()

        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the frame
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

        # Iterate over each detected face
        for (x, y, w, h) in faces:
            face_roi = gray[y:y+h, x:x+w]

            # Recognize the face
            recognized_person = "Unknown"
            min_distance = float('inf')
            for person_name, images in dataset.items():
                for image in images:
                    resized_img = cv2.resize(image, (w, h))
                    distance = cv2.norm(face_roi, resized_img, cv2.NORM_L2)
                    if distance < min_distance:
                        min_distance = distance
                        recognized_person = person_name

            if recognized_person != "Unknown" and recognized_person not in recognized_persons:
                recognized_persons.append(recognized_person)
                time_now = datetime.now()
                date_str = time_now.strftime("%Y-%m-%d")
                time_str = time_now.strftime("%H:%M:%S")
                return jsonify({"name": recognized_person, "date": date_str, "time": time_str})

        # Display the resulting frame
        cv2.imshow('Face Recognition', frame)

        # Break the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the webcam
    webcam.release()

    # Close all OpenCV windows
    cv2.destroyAllWindows()

    return jsonify({"message": "No recognized person found."})

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    name = data.get('name')
    train_model(name)
    return jsonify({"message": "Training completed successfully!"})

@app.route('/recognize', methods=['GET'])
def recognize_face():
    return recognize()

@app.route('/attendance', methods=['POST'])
def attendance():
    # Get data from the request
    data = request.json

    # Extract name, date, and time from the request
    name = data.get('name')
    date = data.get('date')
    time = data.get('time')

    # If date and time are not provided, use current date and time
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")
    if not time:
        time = datetime.now().strftime("%H:%M:%S")

    # Insert data into MongoDB
    attendance_record = {
        "name": name,
        "date": date,
        "time": time
    }
    collection.insert_one(attendance_record)

    # Construct response JSON
    response_data = {
        "status": "success",
        "message": "Attendance recorded successfully"
    }

    # Return JSON response
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
