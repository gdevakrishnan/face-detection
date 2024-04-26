import axios from 'axios';
const BASE_URL = "http://127.0.0.1:5000";

// To get all the attenance data
export const getAttendaceData = async () => {
    try {
        const task = await axios.get(`${BASE_URL}/`);
        const response = {"status": true, data: task.data};
        return response;
    }   catch (e) {
        const response = {"status": false, data: e.message};
        return response;
    }
}

// To recognize the face
export const getRecognize = async () => {
    try {
        const task = await axios.get(`${BASE_URL}/recognize`);
        const response = {"status": true, data: task.data};
        return response;
    }   catch (e) {
        const response = {"status": false, data: e.message};
        return response;
    }
}

// To insert an attendance to the db
export const putAttendance = async (recognizedData) => {
    try {
        const task = await axios.post(`${BASE_URL}/attendance`, recognizedData);
        const response = {"status": true, data: task.data};
        return response;
    }   catch (e) {
        const response = {"status": false, data: e.message};
        return response;
    }
}

// To train a new person
export const giveTraining = async (newPerson) => {
    try {
        const task = await axios.post(`${BASE_URL}/train`, newPerson);
        const response = {"status": true, data: task.data};
        return response;
    }   catch (e) {
        const response = {"status": false, data: e.message};
        return response;
    }
}