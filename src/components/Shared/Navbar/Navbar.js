import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { hanldeSignOut } from '../../Login/LoginMain/LoginManager';
import Pop from '../Pop/Pop';
import './Navbar.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';


const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const signOut = () => {
        setLoading(true)
        hanldeSignOut()
            .then(res => {
                setLoggedInUser(res)
                toast("Successfully logged out")
                if (res.error) {
                    setLoading(false)
                }
            })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <Toaster />
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
                            <a className="nav-link me-3 text-white" href="!#" >DENTAL SERVICE</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-2 text-white" href="!#">REVIEWS</a>
                        </li>

                        <div className="dropdown">

                            <li className="nav-item">
                                {loggedInUser.email ?
                                    <Pop user={loggedInUser} hanldeSignOut={signOut} loading={loading} setLoading={setLoading} />
                                    :
                                    <span>
                                        <Link className="nav-link dropdown-item" to="/login">LOGIN</Link>
                                    </span>
                                }
                            </li>

                        </div>)
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;