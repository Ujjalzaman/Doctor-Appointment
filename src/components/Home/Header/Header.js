import React from 'react';
import BusinessInfo from '../Businessinfo/BusinessInfo';
import HeaderTop from '../HeaderTop/HeaderTop';
import Navbar from '../../Shared/Navbar/Navbar';
import './Header.css';

const Header = () => {
    return (
        <header>
            <Navbar></Navbar>
            <HeaderTop></HeaderTop>
            <BusinessInfo></BusinessInfo>
        </header>
    );
};

export default Header;