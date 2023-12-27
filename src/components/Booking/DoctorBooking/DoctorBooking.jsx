import React from 'react'
import Navbar from '../../Shared/Navbar/Navbar'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import BreadCrumb from '../../UI/BreadCrumb';
import { Link, useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaArchway } from "react-icons/fa";
import { DatePicker, Space } from 'antd';
const DoctorBooking = () => {
    const { doctorId } = useParams();
    const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
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
                            <div className="card py-2 d-flex justify-content-between">
                                <div className="row m-2">
                                    <div className="col-6">
                                        <DatePicker
                                            format="YYYY-MM-DD HH:mm:ss"
                                            open={true}
                                        // disabledDate={disabledDate}
                                        // disabledTime={disabledDateTime}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <div className="schedule-cont">
                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="time-slot">
                                                        <ul className="clearfix">
                                                            <li>
                                                                <a className="timing" href="#">
                                                                    <span>9:00</span> <span>AM</span>
                                                                </a>
                                                                <a className="timing" href="#">
                                                                    <span>10:00</span> <span>AM</span>
                                                                </a>
                                                                <a className="timing" href="#">
                                                                    <span>11:00</span> <span>AM</span>
                                                                </a>
                                                            </li>

                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="submit-section proceed-btn text-end">
                                <Link className="btn btn-primary submit-btn" to={"/booking/checkout"}>Proceed to Pay</Link>
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