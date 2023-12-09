import React from 'react'
import Navbar from '../../Shared/Navbar/Navbar'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import { FaRegStar } from "react-icons/fa";
import './index.css';
import BreadCrumb from '../../UI/BreadCrumb';
import { Link } from 'react-router-dom';
import { FaMapMarker } from "react-icons/fa";

const DoctorBooking = () => {
    return (
        <>
            <Navbar />
            <BreadCrumb/>
            <div className="content">
                <div className="container">

                    <div className="row">
                        <div className="col-12">

                            <div className="card shadow-sm mb-3">
                                <div className="card-body">
                                    <div className="booking-doc-info">
                                        <a href="doctor-profile.html" className="booking-doc-img">
                                            <img src={img} alt="User Image" />
                                        </a>
                                        <div className="booking-info">
                                            <h4>
                                                <Link to={'/doctors/profile'} style={{textDecoration: 'none'}}>Dr. Darren Elder</Link>
                                                </h4>
                                            <div className="rating">
                                                <FaRegStar />
                                                <FaRegStar />
                                                <FaRegStar />
                                                <FaRegStar />
                                                <FaRegStar />
                                                <FaRegStar />
                                                <span className="d-inline-block average-rating">35</span>
                                            </div>
                                            <p className=" mb-0"><FaMapMarker/> Newyork, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card booking-schedule schedule-widget mb-3">

                                <div className="schedule-header">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="day-slot">
                                                <ul>
                                                    <li className="left-arrow">
                                                        <a href="#">
                                                            <i className="fa fa-chevron-left"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span>Mon</span>
                                                        <span className="slot-date">11 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Tue</span>
                                                        <span className="slot-date">12 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Wed</span>
                                                        <span className="slot-date">13 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Thu</span>
                                                        <span className="slot-date">14 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Fri</span>
                                                        <span className="slot-date">15 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Sat</span>
                                                        <span className="slot-date">16 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li>
                                                        <span>Sun</span>
                                                        <span className="slot-date">17 Nov <small className="slot-year">2019</small></span>
                                                    </li>
                                                    <li className="right-arrow">
                                                        <a href="#">
                                                            <i className="fa fa-chevron-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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
                                                    <li>
                                                        <a className="timing" href="#">
                                                            <span>9:00</span> <span>AM</span>
                                                        </a>
                                                        <a className="timing selected" href="#">
                                                            <span>10:00</span> <span>AM</span>
                                                        </a>
                                                        <a className="timing" href="#">
                                                            <span>11:00</span> <span>AM</span>
                                                        </a>
                                                    </li>
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