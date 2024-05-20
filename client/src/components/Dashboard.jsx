import React, { Fragment, useContext, useState } from 'react';
import appContext from '../context/appContext';

function Dashboard() {
  const { attendance } = useContext(appContext);
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [status, setStatus] = useState(false);

  const Template = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            attendance.map((aData) => {
              return (
                <tr key={aData._id}>
                  <td>{aData.name}</td>
                  <td>{aData.date}</td>
                  <td>{aData.time}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  const calculateWorkingHours = (data) => {
    let totalAdjustedSeconds = 0;

    if (data.length === 1) {
      return { hours: 0, minutes: 0, seconds: 15 };
    }

    const calculateTimeDifference = (startTime, endTime) => {
      const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
      const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);

      const startTotalSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
      const endTotalSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;

      let timeGapInSeconds = endTotalSeconds - startTotalSeconds;

      // Handle the case where the end time is on the next day
      if (timeGapInSeconds < 0) {
        timeGapInSeconds += 24 * 3600;
      }

      return timeGapInSeconds;
    };

    for (let i = 1; i < data.length; i++) {
      const prevTime = data[i - 1].time;
      const currentTime = data[i].time;
      const timeGapInSeconds = calculateTimeDifference(prevTime, currentTime);

      if (timeGapInSeconds > 15 && timeGapInSeconds <= 20) {
        totalAdjustedSeconds += timeGapInSeconds;
      }
    }

    const hours = Math.floor(totalAdjustedSeconds / 3600);
    const minutes = Math.floor((totalAdjustedSeconds % 3600) / 60);
    const seconds = totalAdjustedSeconds % 60;

    return { hours, minutes, seconds };
  };



  const FilterTemplate = () => {
    const { hours, minutes, seconds } = calculateWorkingHours(filteredAttendance);

    return (
      (filteredAttendance.length > 0) ? (
        <Fragment>
          <h2 style={{ fontWeight: 400, marginBottom: "20px" }}>{filterName} worked for {hours}hrs {minutes}min {seconds}sec</h2>
          <table className='filterTable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredAttendance.map((aData) => {
                  return (
                    <tr key={aData._id}>
                      <td>{aData.name}</td>
                      <td>{aData.date}</td>
                      <td>{aData.time}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </Fragment>
      ) : <h1 className='notFound'>No Data Found</h1>
    );
  }

  const handleFilter = (e) => {
    e.preventDefault();
    if (filterDate.trim() !== "" || filterName.trim() !== "") {
      let filter = attendance.filter((aData) => aData.date === filterDate && aData.name === filterName);
      setFilteredAttendance(filter);
      setStatus(true);
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    setStatus(false);
    setFilteredAttendance([]);
    setFilterDate(""); // Clear the input field
    setFilterName(""); // Clear the input field
  }

  return (
    <Fragment>
      <section className="page tablePage">
        <form onSubmit={(e) => handleFilter(e)}>
          <div className="form_group" style={{ display: "flex", gap: "20px" }}>
            <input type="date" name="filteredDate" id="setFilteredDate" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            <input type="text" name="filterName" id="filterName" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder='name' />
          </div>
          <div className="btn">
            <input type="submit" value="Filter" onClick={(e) => handleFilter(e)} />
            <button onClick={handleReset}>Reset</button>
          </div>
        </form>
        {status ? <FilterTemplate /> : null}
        {
          (attendance.length > 0) ? <Template /> : <h1 className='notFound'>No Data Found</h1>
        }
      </section>
    </Fragment>
  )
}

export default Dashboard;
