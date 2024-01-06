import React from 'react';
import Blog from '../Blog/Blog';
import Doctor from '../Doctor/Doctor';
import Footer from '../../Shared/Footer/Footer';
import Testimonial from '../Testimonial/Testimonial';
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import BookDoctor from '../bookDoctor/BookDoctor';
import Availabe from '../AvailableFeatures/Available';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';
import Service from '../Services/Service';

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <Service />
            <ClinicAndSpecialities />
            <BookDoctor />
            <Testimonial />
            <Blog />
            <Availabe />
            <Doctor />
            <Footer />
        </>
    );
};

export default Home;