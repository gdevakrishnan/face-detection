import React, { Fragment, useEffect, useState } from 'react'
import { getAttendaceData } from './services/serviceWorker';
import appContext from './context/appContext';
import Router from './router/Router';

function App() {
  const [msg, setMsg] = useState("");
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    getAttendaceData().then((response) => {
      if (response.status) {
        setAttendance(response.data);
      }
    });
  }, [attendance, setAttendance]);

  const context = {
    attendance,
    setAttendance,
    msg,
    setMsg
  }

  return (
    <appContext.Provider value={context}>
      <Fragment>
        <Router />
      </Fragment>
    </appContext.Provider>
  )
}

export default App