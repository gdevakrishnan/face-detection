import cv2
import os

# Directory containing the dataset
dataset_folder = 'dataset'
flag = True

# Load the pre-trained face detection model
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Load the dataset
dataset = []

for filename in os.listdir(dataset_folder):
    if filename.endswith('.jpg'):
        image_path = os.path.join(dataset_folder, filename)
        dataset.append((cv2.imread(image_path), os.path.splitext(filename)[0].split("_")[0]))

# Open the webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Draw rectangles around the detected faces and display names
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        
        # Compare each face in the dataset
        for (dataset_image, name) in dataset:
            # Convert dataset image to grayscale
            gray_dataset_image = cv2.cvtColor(dataset_image, cv2.COLOR_BGR2GRAY)
            
            # Detect faces in the dataset image
            dataset_faces = face_cascade.detectMultiScale(gray_dataset_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
            
            # Compare faces
            for (dx, dy, dw, dh) in dataset_faces:
                # If the detected face in the frame matches with the dataset face
                if abs(x-dx) < 50 and abs(y-dy) < 50 and flag:
                    print("Name:", name)
                    flag = False
                    break  # Print the name and exit the loop

                if cv2.waitKey(1) & 0xFF == ord('r'):
                    flag = True
                    break
    # Display the frame
    cv2.imshow('Face Detection from Dataset', frame)

    # Break the loop when a face is detected
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all windows
cap.release()
cv2.destroyAllWindows()
