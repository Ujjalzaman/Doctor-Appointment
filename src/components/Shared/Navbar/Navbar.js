import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <div classNameName="navbar-heading">
                    <h3>
                        <Link className="navbar-h" to="/">Online Doctor AppointMent</Link>
                    </h3>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active me-3" aria-current="page" href="/">HOME</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link me-3" href="!#">ABOUT</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3" href="!#">CONTACT</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3 text-white" href="!#">DENTAL SERVICE</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-2 text-white" href="!#">REVIEWS</a>
                        </li>

                        {
                            loggedInUser.email ?
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="/dashboard">DashBoard</a>
                                </li>
                                :
                                <div className="dropdown">
                                    <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        LOGIN
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="nav-item">
                                            <Link className=" dropdown-item" to="/login">LOGIN</Link>
                                            <Link className=" dropdown-item" to="/login">SIGN UP</Link>
                                        </li>
                                    </ul>
                                </div>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;