import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import BreadCrumb from '../../UI/BreadCrumb';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';

const SearchDoctor = () => {
    return (
        <div>
            <Navbar />
            <BreadCrumb />
            <div class="content" style={{marginBottom:200}}>
                <div class="container-fluid">
                    <div class="row">
                        <SearchSidebar />
                        <SearchContent />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchDoctor