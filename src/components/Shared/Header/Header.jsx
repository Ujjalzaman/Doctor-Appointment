import { useEffect, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import img from '../../../images/logo.png';
import avatar from '../../../images/avatar.jpg';
import { Button, Popover, message } from 'antd';
import { loggedOut } from '../../../service/auth.service';
import { FaBars } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
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
        navigate('/')
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
                            <li><NavLink to={'/'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""} >Home</NavLink></li>
                            <li><NavLink to={'/about'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>About</NavLink></li>
                            <li><NavLink to={'/service'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Service</NavLink></li>
                            <li><NavLink to={'/doctors'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Doctors</NavLink></li>
                            <li><NavLink to={'/contact'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Contact</NavLink></li>
                            <li><NavLink to={'/blog'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>Blog</NavLink></li>
                            {!isLoggedIn && <li><Link to={'/login'} className="nav-link scrollto">Login</Link></li>}
                        </ul>
                        {isLoggedIn &&
                            <div>
                                <Popover content={content}>
                                    <div className='profileImage'>
                                        <img src={data?.img ? data?.img : avatar} alt="" className="profileImage shadow img-fluid" />
                                    </div>
                                </Popover>
                            </div>
                        }
                        <FaBars className='mobile-nav-toggle' />
                    </nav>

                    <Link to={'/appointment'} className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</Link>
                </div>
            </header>
        </>
    )
}

export default Header