import React, { Fragment, useState } from 'react'
import { getRecognize, putAttendance } from '../services/serviceWorker';

function Attendance() {
  const initialState = {
    "name": "-",
    "date": "-",
    "time": "-"
  }
  const [recognizedData, setRecognizedData] = useState(initialState);
  const [status, setStatus] = useState(false);

  const handleNew = (e) => {
    e.preventDefault();
    getRecognize()
      .then((response) => {
        setRecognizedData(response.data);
        if (response.status) {
          setStatus(response.status);
        }
      })
      .catch((e) => console.log(e.message));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putAttendance(recognizedData)
      .then((response) => console.log(response))
      .catch((e) => console.log(e.message));

    setRecognizedData(initialState);
    setStatus(false);
  }

  return (
    <Fragment>
      <button onClick={(e) => handleNew(e)}>New</button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{recognizedData.name}</td>
          </tr>

          <tr>
            <th>Date</th>
            <td>{recognizedData.date}</td>
          </tr>

          <tr>
            <th>Time</th>
            <td>{recognizedData.time}</td>
          </tr>
        </tbody>
      </table>
      {
        (status) ? <button onClick={(e) => handleSubmit(e)}>Present</button> : null
      }
    </Fragment>
  )
}

export default Attendance