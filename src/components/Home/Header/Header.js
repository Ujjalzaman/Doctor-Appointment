import React from 'react';
import BusinessInfo from '../InfoPage/InfoPage';
import Navbar from '../../Shared/Navbar/Navbar';
import './Header.css';

const Header = () => {
    return (
        <header>
            <Navbar></Navbar>
            <BusinessInfo></BusinessInfo>
        </header>
    );
};

export default Header;