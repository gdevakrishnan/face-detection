import axios from 'axios';
const BASE_URL = "http://127.0.0.1:5000";

export const getAttendaceData = async (req, res) => {
    try {
        const task = await axios.get(`${BASE_URL}/`);
        const response = {"status": true, data: task.data};
        return response;
    }   catch (e) {
        const response = {"status": false, data: e.message};
        return response;
    }
}