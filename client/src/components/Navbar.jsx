import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Fragment>
      <nav className='nav'>
        <input type="checkbox" name="check" id="check" />
        <h1 className="logo">Attend-ie</h1>
        <label htmlFor="check"><i className="fa fa-bars"></i></label>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/attendance'}>Attendance</Link>
          </li>
          <li>
            <Link to={'/train'}>Train</Link>
          </li>
          <li>
            <Link to={'/profiles'}>Profiles</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navbar