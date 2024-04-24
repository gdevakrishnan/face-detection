import cv2
import os

# Directory to store captured images
output_folder = 'dataset'
person_name = input("Enter the person name: ")
phNo = input("Enter the phone number: ")

# Create the output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

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
    if key == ord('q') or image_count >= 50:
        break

# Release the webcam and close all windows
cap.release()
cv2.destroyAllWindows()
