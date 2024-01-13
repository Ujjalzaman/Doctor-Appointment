import React, { useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Empty } from 'antd';
import Header from '../Shared/Header/Header';

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
            <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{marginTop: '8rem', marginBottom: '5rem', height: '60vh' }}>
                {
                    state.id ?

                        <div className='rounded p-3' style={{background: "#f8f9fa"}}>
                            <FaCheckCircle style={{ fontSize: '5rem' }} className='text-info' />
                            <h4s>Appointment booked Successfully!</h4s>
                            <p>Appointment booked with <strong>Dr. {state?.doctor?.firstName + ' ' + state?.doctor?.firstName}</strong><br /> on <strong>{moment(state?.scheduleDate).format('LL') + '  ' + state?.scheduleTime + '  to  ' + mettingEndTime}</strong></p>
                            <Link to={`/booking/invoice/${state?.id}`} className="btn btn-primary">
                                View Invoice
                            </Link>
                        </div>

                        :
                        <div className='rounded p-3 d-flex flex-column justify-content-center align-items-center' style={{background: "#f8f9fa"}}>
                            <h4>You will be redirect to homepage !</h4>
                            <Empty />
                        </div>
                }

            </div>
            <Footer />
        </>

    )
}

export default BookingSuccess