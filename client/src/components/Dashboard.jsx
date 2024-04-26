import React, { Fragment, useContext } from 'react'
import appContext from '../context/appContext';

function Dashboard() {
  const { attendance } = useContext(appContext);

  const Template = () => {
    return (
      <table>
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
      <Template />
    </Fragment>
  )
}

export default Dashboard