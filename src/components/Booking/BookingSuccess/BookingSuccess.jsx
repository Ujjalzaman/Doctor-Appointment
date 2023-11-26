import React from 'react';
import './BookingSuccess.css';
import Navbar from '../../Shared/Navbar/Navbar';
import BreadCrumb from '../../UI/BreadCrumb';
import Footer from '../../Shared/Footer/Footer';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
    return (
        <>
            <Navbar />
            <BreadCrumb />

            <div class="content success-page-cont" style={{ marginBottom: '7rem' }}>
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="card success-card">
                                <div class="card-body">
                                    <div class="success-cont">
                                        <FaCheckCircle style={{ fontSize: '5rem' }} className='text-info' />
                                        <h3>Appointment booked Successfully!</h3>
                                        <p>Appointment booked with <strong>Dr. Darren Elder</strong><br /> on <strong>12 Nov 2019 5:00PM to 6:00PM</strong></p>
                                        <Link to={'/booking/invoice'} class="btn btn-primary view-inv-btn">
                                            View Invoice
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}

export default BookingSuccess