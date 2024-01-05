import React, { useEffect } from 'react';
import './BookingSuccess.css';
import BreadCrumb from '../../UI/BreadCrumb';
import Footer from '../../Shared/Footer/Footer';
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Empty } from 'antd';
import Header from '../../Shared/Header/Header';

const BookingSuccess = () => {
    const state = useSelector((state) => state.invoice.data);
    const mettingEndTime = state.scheduleTime && moment(state.scheduleTime, 'hh:mm a').add(30, 'minutes').format('hh:mm a')
    const navigate = useNavigate();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!state.id) {
                navigate('/');
            }
        }, 5000)
        return () => clearTimeout(timeOut)
    }, [navigate, state])

    return (
        <>
            <Header />
            <BreadCrumb />
            <div className="content success-page-cont" style={{ marginBottom: '7rem' }}>
                <div className="container-fluid">
                    {
                        state.id ?
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="card success-card">
                                        <div className="card-body">
                                            <div className="success-cont">
                                                <FaCheckCircle style={{ fontSize: '5rem' }} className='text-info' />
                                                <h3>Appointment booked Successfully!</h3>
                                                <p>Appointment booked with <strong>Dr. {state?.doctor?.firstName + ' ' + state?.doctor?.firstName}</strong><br /> on <strong>{moment(state?.scheduleDate).format('LL') + '  ' + state?.scheduleTime + '  to  ' + mettingEndTime}</strong></p>
                                                <Link to={`/booking/invoice/${state?.id}`} className="btn btn-primary view-inv-btn">
                                                    View Invoice
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <h3>You will be redirect to homepage !</h3>
                                <Empty />
                            </div>
                    }


                </div>
            </div>
            <Footer />
        </>

    )
}

export default BookingSuccess