import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { hanldeSignOut } from '../../Login/LoginMain/LoginManager';
import Pop from '../Pop/Pop';
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log("user is", loggedInUser)

    const signOut = () => {
        hanldeSignOut()
            .then(res => {
                setLoggedInUser(res)
                alert("logged out")
            })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <div className="navbar-heading">
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

                        {/* { */}
                        {/* // loggedInUser.email ? */}
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/dashboard">DashBoard</a>
                        </li>
                        :
                        <div className="dropdown">
                            {/* <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> */}

                            <li className="nav-item">
                                {loggedInUser.email ?
                                    <Pop user={loggedInUser} hanldeSignOut={hanldeSignOut} />
                                    :
                                    <span>
                                        <Link className=" dropdown-item" to="/login">Login</Link>
                                    </span>
                                }
                            </li>

                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;