import React, { Fragment, useContext } from 'react'
import appContext from '../context/appContext';

function Dashboard() {
  const { attendance } = useContext(appContext);

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

  return (
    <Fragment>
      <section className="page tablePage">
        {
          (attendance.length > 0) ? <Template /> : <h1>No Data</h1>
        }
      </section>
    </Fragment>
  )
}

export default Dashboard