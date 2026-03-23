import { useEffect, useMemo, useState } from 'react';
import './index.css';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import TopHeader from '../TopHeader/TopHeader';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../images/logo.png';
import avatar from '../../../images/avatar.jpg';
import { Button, message } from 'antd';
import { getUserInfo, loggedOut } from '../../../service/auth.service';
import HeaderNav from './HeaderNav';

const ROLE_META = {
    patient: { label: 'Patient', className: 'nav-popover-role nav-popover-role--patient' },
    doctor: { label: 'Doctor', className: 'nav-popover-role nav-popover-role--doctor' },
    admin: { label: 'Administrator', className: 'nav-popover-role nav-popover-role--admin' },
};

const Header = () => {
    const navigate = useNavigate();
    const { authChecked, data, role } = useAuthCheck();
    const [isLoggedIn, setIsLogged] = useState(false);
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);

    const token = getUserInfo();
    const effectiveRole = token?.role || role;
    const roleMeta = ROLE_META[effectiveRole] || { label: 'Account', className: 'nav-popover-role' };

    const displayName = useMemo(() => {
        const t = getUserInfo();
        const r = t?.role || role;
        if (r === 'admin') {
            return t?.email || 'Administrator';
        }
        const first = data?.firstName?.trim?.() ?? '';
        const last = data?.lastName?.trim?.() ?? '';
        const full = [first, last].filter(Boolean).join(' ');
        if (full) return r === 'doctor' ? `Dr. ${full}` : full;
        return t?.email || 'Account';
    }, [role, data]);

    const emailLine = data?.email || token?.email || '';

    const dashboardPath = effectiveRole === 'admin' ? '/admin/dashboard' : '/dashboard';
    const dashboardLabel = effectiveRole === 'admin' ? 'Dashboard' : 'Dashboard';

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (authChecked) setIsLogged(true);
    }, [authChecked]);

    const hanldeSignOut = () => {
        loggedOut();
        message.success('Successfully Logged Out');
        setIsLogged(false);
        navigate('/');
    };

    const popoverTitle = (
        <div className="nav-popover-title-row">
            <span className={roleMeta.className}>{roleMeta.label}</span>
            {token?.role === 'admin' && token?.isDemo === true && (
                <span className="nav-popover-role nav-popover-role--demo">Demo · read-only</span>
            )}
        </div>
    );

    const content = (
        <div className="nav-popover">
            <div className="nav-popover-body">
                <h5 className="nav-popover-name text-capitalize mb-1">{displayName}</h5>
                {emailLine ? <p className="nav-popover-email my-0 small text-muted">{emailLine}</p> : null}
                <Link to={dashboardPath} className="nav-popover-dashboard-link d-inline-block mt-2">
                    {dashboardLabel}
                </Link>
            </div>
            <Button danger className="w-100 mt-2" size="small" onClick={hanldeSignOut}>
                Log out
            </Button>
        </div>
    );

    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && 'hideTopHeader'}`} expand="lg">
                <TopHeader />
            </div>
            <header id="header" className={`fixed-top ${!show && 'stickyHeader'}`}>
                <div className="container d-flex align-items-center">
                    <Link to={'/'} className="logo me-auto">
                        <img src={img} alt="" className="img-fluid" />
                    </Link>
                    <HeaderNav
                        isLoggedIn={isLoggedIn}
                        data={data}
                        avatar={avatar}
                        content={content}
                        popoverTitle={popoverTitle}
                        open={open}
                        setOpen={setOpen}
                    />
                    <Link to={'/appointment'} className="appointment-btn scrollto">
                        <span className="d-none d-md-inline">Make an</span> Appointment
                    </Link>
                </div>
            </header>
        </>
    );
};

export default Header;
