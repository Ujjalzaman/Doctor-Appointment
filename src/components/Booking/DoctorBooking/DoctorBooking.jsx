import React, { useState } from 'react'
import Navbar from '../../Shared/Navbar/Navbar'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import BreadCrumb from '../../UI/BreadCrumb';
import { Link, useParams } from 'react-router-dom';
import { Empty, Button,DatePicker } from 'antd';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaArchway } from "react-icons/fa";
import { useGetAppointmentTimeQuery } from '../../../redux/api/timeSlotApi';
import moment from 'moment';

const DoctorBooking = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelecDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const { doctorId } = useParams();
    const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: doctorId });

    const handleDateChange = (_date, dateString) => {
        setSelectedDate(dateString)
        setSelecDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    }
    const disabledDateTime = (current) => {
        return current && (current < moment().add(1, 'day').startOf('day') || current > moment().add(8, 'days').startOf("day"))
    }

    const handleSelectTime = (date) => {
        setSelectTime(date)
    }

    let dContent = null;
    if (dIsLoading) dContent = <div>Loading ...</div>
    if (!dIsLoading && dIsError) dContent = <div>Something went Wrong!</div>
    if (!dIsLoading && !dIsError && time.length === 0) dContent = <Empty />
    if (!dIsLoading && !dIsError && time.length > 0) dContent =
        <>
            {
                time && time.map((item) => (
                    <div className="col-md-4">
                        <Button type={item?.slot?.time=== selectTime ? "primary" : "default"} shape="round" size='large' className='mb-3' onClick={() => handleSelectTime(item?.slot?.time)}> {item?.slot?.time} </Button>
                    </div>
                ))
            }
        </>

    //What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (!isLoading && !isError && data.id === undefined) content = <Empty />
    if (!isLoading && !isError && data.id) content =
        <>
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <div className="booking-doc-info">
                        <a href="doctor-profile.html" className="booking-doc-img">
                            <img src={img} alt="" />
                        </a>
                        <div className="booking-info">
                            <h4>
                                <Link to={'/doctors/profile'} style={{ textDecoration: 'none' }}>Dr. {data?.firstName + ' ' + data?.lastName}</Link>
                            </h4>
                            <p className=" mb-0"><FaArchway /> {data?.specialization + ',' + data?.experienceHospitalName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    return (
        <>
            <Navbar />
            <BreadCrumb />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {content}
                            <div className="card py-2 d-flex justify-content-between" style={{ height: '70vh' }}>
                                <div className="row m-2">
                                    <div className="col-6">
                                        <DatePicker
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={disabledDateTime}
                                            open={true}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        {selectedDate ? <h4>Schedule Date: {selectedDate && moment(selectedDate).format('LL')} 
                                        {selectTime && 'time :' + selectTime}</h4>: "Please Select Date First"}
                                        <div className="schedule-cont">
                                            <div className="row">
                                                {dContent}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-section proceed-btn text-end">
                                <Link className="btn btn-primary submit-btn mt-2" to={"/booking/checkout"}>Next</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorBooking