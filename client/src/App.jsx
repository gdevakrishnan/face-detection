import React, { Fragment, useEffect, useState } from 'react'
import { getAttendaceData } from './services/serviceWorker';
import Router from './router/Router';

function App() {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    getAttendaceData().then((response) => {
      if (response.status) {
        setAttendance(response.data);
      }
    });
  }, [attendance, setAttendance]);

  const Template = () => {
    return (
      attendance.map((aData) => {
        return (
          <tr key={aData._id}>
            <td>{aData.name}</td>
            <td>{aData.date}</td>
            <td>{aData.time}</td>
          </tr>
        );
      })
    );
  }

  return (
    <Fragment>
      <Router />
    </Fragment>
  )
}

export default App