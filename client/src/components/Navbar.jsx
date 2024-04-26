import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Fragment>
        <nav>
            <h1 className="logo">Attend-ie</h1>
            <ul>
              <Link to={'/'}>Home</Link>
              <Link to={'/train'}>Train</Link>
              <Link to={'/attendance'}>Attendance</Link>
            </ul>
        </nav>
    </Fragment>
  )
}

export default Navbar