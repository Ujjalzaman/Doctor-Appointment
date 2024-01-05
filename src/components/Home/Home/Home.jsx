import React from 'react';
import Appointment from '../Appointment/Appointment';
import Blog from '../Blog/Blog';
import Doctor from '../Doctor/Doctor';
import FeaturedService from '../FeaturedService/FeaturedService';
import Footer from '../../Shared/Footer/Footer';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import BookDoctor from '../bookDoctor/BookDoctor';
import Availabe from '../AvailableFeatures/Available';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <Services />
            <ClinicAndSpecialities />
            <BookDoctor />
            <FeaturedService />
            <Appointment />
            <Testimonial />
            <Blog />
            <Availabe />
            <Doctor />
            <Footer />
        </>
    );
};

export default Home;