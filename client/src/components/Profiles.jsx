import React, { Fragment, useContext, useState } from 'react'
import appContext from '../context/appContext';
import { findWorker } from '../services/serviceWorker';

function Profiles() {
    const { setMsg } = useContext(appContext);
    const initialState = {
        "name": ""
    }
    const [worker, setWorker] = useState(initialState);
    const [profile, setProfile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (worker.name.trim() === "") {
            setMsg("Enter all the fields");

            setTimeout(() => {
                setMsg("");
            }, 2000);
            return;
        }

        findWorker(worker)
            .then((response) => {
                if (response.data.status == 200) {
                    setProfile(response.data.data);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    return (
        <Fragment>
            <section className="page profilesPage">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="name" id="name" onChange={(e) => setWorker({ ...worker, [e.target.id]: e.target.value })} placeholder='employee name' />

                    <input type="submit" value="Find" onClick={(e) => handleSubmit(e)} />
                </form>
                <div className="profile">
                    {
                        (profile) ? (
                            <Fragment>
                                <div className="image">
                                    <img src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" className="img" />
                                </div>
                                <div className="details">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>{ profile.name }</td>
                                            </tr>
                                            <tr>
                                                <th>Age</th>
                                                <td>{ profile.age }</td>
                                            </tr>
                                            <tr>
                                                <th>Mobile</th>
                                                <td>{ profile.mobile }</td>
                                            </tr>
                                            <tr>
                                                <th>Role</th>
                                                <td>{ profile.role }</td>
                                            </tr>
                                            <tr>
                                                <th>Working Hours</th>
                                                <td>{ profile.workingHours } hours</td>
                                            </tr>
                                            <tr>
                                                <th>Salary</th>
                                                <td>Rs.{ profile.salary }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Fragment>
                        ) : null
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Profiles