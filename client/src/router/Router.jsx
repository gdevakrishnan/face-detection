import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import Train from '../components/Train';
import Attendance from '../components/Attendance';
import Message from '../components/Message';
import Footer from '../components/Footer';

function Router() {
  return (
    <Fragment>
        <BrowserRouter>
            <Message />
            <Navbar />
            <Routes>
                <Route path='/' index element={<Dashboard />}/>
                <Route path='/train' element={<Train />}/>
                <Route path='/attendance' element={<Attendance />}/>
            </Routes>
            <Outlet />
            <Footer />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router