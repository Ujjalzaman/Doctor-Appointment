import React, { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link } from 'react-router-dom';
import img from '../../../images/logo.png';
import img2 from '../../../images/doc/doctor 3.jpg';
import { Button, Popover, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import { FaBars } from "react-icons/fa";

const Header = () => {
    const { authChecked, data } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    // const lastScrollRef = useRef(0);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
        // lastScrollRef.current = currentScroll;
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => window.removeEventListener('scroll', handleScroll));
    }, [])

    useEffect(() => { authChecked && setIsLogged(true) }, [authChecked]);

    const hanldeSignOut = () => {
        loggedOut();
        message.success("Successfully Logged Out")
        setIsLogged(false)
    }


    const content = (
        <div className='nav-popover'>
            <div className='my-2'>
                <h5 className='text-capitalize'>{data?.firstName + ' ' + data?.lastName}</h5>
                <p className='my-0'>{data?.email}</p>
                <Link to="/dashboard">Deshboard</Link>
            </div>
            <Button variant="outline-danger" className='w-100' size="sm" onClick={hanldeSignOut}>
                Logged Out
            </Button>
        </div >
    );
    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
                <TopHeader />
            </div>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container d-flex align-items-center">

                    <Link to={'/'} className="logo me-auto">
                        <img src={img} alt="" className="img-fluid" />
                    </Link>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><Link to={'/'} className="nav-link scrollto active">Home</Link></li>
                            <li><Link to={'/about'} className="nav-link scrollto" >About</Link></li>
                            <li><a className="nav-link scrollto">Services</a></li>
                            <li><Link to={'/doctors'} className="nav-link scrollto">Doctors</Link></li>
                            <li><Link to={'/contact'} className="nav-link scrollto" href="#contact">Contact</Link></li>
                            <li><Link to={'/blog'} className="nav-link scrollto" href="#contact">Blog</Link></li>
                        </ul>
                        {isLoggedIn &&
                            <div>
                                <Popover content={content}>
                                    <div className='profileImage'>
                                        <img src={img2} alt="" className="profileImage shadow img-fluid" />
                                    </div>
                                </Popover>
                            </div>
                        }
                        <FaBars className='mobile-nav-toggle' />
                    </nav>

                    <a href="#appointment" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</a>
                </div>
            </header>
        </>
    )
}

export default Header