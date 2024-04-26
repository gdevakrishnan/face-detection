import axios from 'axios';
const BASE_URL = "http://127.0.0.1:5000";

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