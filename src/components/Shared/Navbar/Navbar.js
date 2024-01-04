import { Link } from 'react-router-dom';
import Pop from '../Pop/Pop';
import './Navbar.css';
import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import logo from '../../../images/logo.png';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { loggedOut } from '../../../service/auth.service';
import swal from 'sweetalert';

const Navbar = () => {
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false)
    const [isSticky, setSticky] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        })
        if (authChecked) {
            setIsLogged(true)
        }
    }, [authChecked])

    const hanldeSignOut = () => {
        loggedOut();
        swal({
            icon: 'success',
            text: `Successfully Logged Out`,
            timer: 2000
        })
        setIsLogged(false)
    }
    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${isSticky ? "stickynav" : "normalnav"}`} expand="lg">
            <Toaster />
            <div className="container-fluid">
                <div className="navbar-heading">
                    <h3>
                        <Link className="navbar-h" to="/">
                            <img src={logo} style={{ maxWidth: '170px' }} alt='' />
                        </Link>
                    </h3>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active me-3" aria-current="page" to={'/'}>
                                HOME
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link me-3" href="#doctorContaints">ABOUT</a>
                        </li>

                        <li className="nav-item">
                            <a href='#ContactPage' className="nav-link me-3">CONTACT</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3 textDark" href="#BlogContaint">BLOG</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3 textDark" href="#serviceContaint" >DENTAL SERVICE</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3 textDark" href="#reviewsContaints">REVIEWS</a>
                        </li>

                        <div className="dropdown">

                            <li className="nav-item">
                                {isLoggedIn ?
                                    <Pop data={data} hanldeSignOut={hanldeSignOut} />
                                    :
                                    <span>
                                        <Link className={`btn-primary btn py-1 px-3nav-link me-3 text-white ${isSticky ? "textDark" : "textWhite"}`} to="/login">LOGIN / SIGNUP</Link>
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