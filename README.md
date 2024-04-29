# Face Detection Attendance System

## Overview
This project is an Attendance System using Face Detection. It utilizes technologies like OpenCV for face detection, Flask as the backend micro web framework, ReactJS for the frontend, and MongoDB Atlas for cloud-based database storage.

## Tech Stack
- **OpenCV**: Used for face detection.
- **Flask**: A Python micro web framework for the backend.
- **ReactJS**: A JavaScript library for building user interfaces for the frontend.
- **MongoDB Atlas**: A cloud-based MongoDB database service.

## Installation
1. Clone this repository.
2. Install the dependencies listed in the `requirements.txt` file.
3. Install packages inside the `client` folder using npm or yarn.
4. Create a `.env` file in the root directory.
5. Add your MongoDB connection link as `MONGODB_URI` in the `.env` file.
6. Run the backend server:
    ```bash
    py main.py runserver
    ```
7. Navigate to the `client` directory:
    ```bash
    cd client
    ```
8. Run the frontend development server:
    ```bash
    npm run dev
    ```
9. Open the client URL in your web browser.

## Usage
- The system detects faces in real-time using the webcam.
- Users can train the system to recognize different faces.
- Recognized faces are logged with the date and time of attendance.
- Attendance records can be viewed and managed through the frontend interface.

## Contributors
- [Devakrishnan Gopal](https://www.github.com/gdevakrishnan/)

## License
This project is licensed under the [MIT License](LICENSE).
