import React, { Fragment, useContext, useState } from 'react';
import appContext from '../context/appContext';

function Dashboard() {
  const { attendance, setMsg, Msg } = useContext(appContext);
  const [filterDate, setFilterDate] = useState("");
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

  const FilterTemplate = () => {
    return (
      (filteredAttendance.length > 0) ? (
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
      ) : <h1 className='notFound'>No Data Found</h1>
    );
  }

  const handleFilter = (e) => {
    e.preventDefault();
    if (filterDate.trim() !== "") {
      let filter = attendance.filter((aData) => aData.date === filterDate);
      setFilteredAttendance(filter);
      setStatus(true);
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    setStatus(false);
    setFilteredAttendance([]);
    setFilterDate(""); // Clear the input field
  }

  return (
    <Fragment>
      <section className="page tablePage">
        <form onSubmit={(e) => handleFilter(e)}>
          <input type="date" name="filteredDate" id="setFilteredDate" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
          <div className="btn">
            <input type="submit" value="Filter" onClick={(e) => handleFilter(e)} />
            <button onClick={handleReset}>Reset</button>
          </div>
        </form>
        {status ? <FilterTemplate /> : null}
        {
          (attendance.length > 0) ? <Template /> : <h1 className='notFound'>No Data</h1>
        }
      </section>
    </Fragment>
  )
}

export default Dashboard;
