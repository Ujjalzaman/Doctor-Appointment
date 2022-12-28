import { faCalendar, faCog, faGripHorizontal, faHome, faSignOutAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { hanldeSignOut } from '../../Login/LoginMain/LoginManager';
import './Sidebar.css';
import Spinner from 'react-bootstrap/Spinner'
import toast from 'react-hot-toast';

const Sidebar = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetch("https://sleepy-tundra-72379.herokuapp.com/isDoctor", {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     // body: JSON.stringify({ email: loggedInUser.email })
        // })
            // .then(res => res.json())
            // .then(data => setDoctor(data))
    }, [])

    const signOut = () => {
        setLoading(true)
        hanldeSignOut()
            // .then(res => {
            //     setLoggedInUser(res)
            //     toast("Successfully logged out")
            //     if (res.error) {
            //         setLoading(false)
            //     }
            // })
    }
    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5">
            <ul className="list-unstyled">
                <li>
                    <Link to="/" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUser} />
                        {/* <span>{loggedInUser.name}</span> */}
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text-white text-decoration-none"><FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                </li>

                <li>
                    <Link to="/dashboard" className="text-white text-decoration-none"><FontAwesomeIcon icon={faGripHorizontal} />
                        <span>Dashboard</span>
                    </Link>
                </li>


                {/* {doctor === true && */}

                    <div>
                        <li>
                            <Link to="/appointment" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCalendar} />
                                <span>AppointMent</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/patients" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUser} />
                                <span>Patients</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/addDoctor" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUserPlus} />
                                <span>Add Doctor</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCog} />
                                <span>Setting</span>
                            </Link>
                        </li>
                    </div>
                {/* } */}
            </ul>
            <div className="desh-logout">
                <Link to="/" className="text-white text-decoration-none" onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} /><span>
                    {loading ? <Spinner animation="border" variant="info" /> : "LogOut"}
                </span></Link>
            </div>
        </div>
    );
};

export default Sidebar;