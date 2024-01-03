import React from 'react';
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import showImg from '../../../images/specialities/specialities-01.png'
import StarRatings from 'react-star-ratings';
import { Tag } from 'antd';

const SearchContent = ({ data }) => {
    const services = data?.services?.split(',')
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className='d-flex'>
                    <div className='d-flex gap-3'>
                        <div style={{maxWidth: 200, overflow: 'hidden' }}>
                            <img src={img} className="img-fluid" alt="User Image" />
                        </div>
                        <div className="doc-info-cont">
                            <h4><Link to={'/'} style={{ textDecoration: 'none' }}>Dr. {data?.firstName + ' ' + data?.lastName}</Link></h4>
                            <p>{data?.designation}</p>
                            <p className="doc-department"><img src={showImg} className="img-fluid" alt="Speciality" />Urology</p>

                            <StarRatings
                                rating={5}
                                starRatedColor="blue"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                            />
                            <span className="d-inline-block">(4)</span>

                            <div className="clinic-details">
                                <p className="my-2"><i className="fas fa-map-marker-alt"></i> {data?.address}, {data?.country}</p>
                                <ul className="clinic-gallery mt-3">
                                    <li>
                                        <img src={showImg} alt="Feature" style={{ maxWidth: "30px" }} />
                                    </li>
                                    <li>
                                        <img src={showImg} alt="Feature" style={{ maxWidth: "30px" }} />
                                    </li>
                                    <li>
                                        <img src={showImg} alt="Feature" style={{ maxWidth: "30px" }} />

                                    </li>
                                    <li>
                                        <img src={showImg} alt="Feature" style={{ maxWidth: "30px" }} />
                                    </li>
                                </ul>
                            </div>
                            {
                                services.map((item, id) => (
                                    <Tag key={id + 51}>{item}</Tag>

                                ))
                            }
                        </div>
                    </div>
                    <div className="doc-info-right">
                        <div className="clini-infos">
                            <ul>
                                <li><i className="far fa-thumbs-up"></i> 97%</li>
                                <li><i className="far fa-comment"></i> 4 Feedback</li>
                                <li><i className="fas fa-map-marker-alt"></i> Newyork, USA</li>
                                <li><i className="far fa-money-bill-alt"></i> $150 - $250 <i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i></li>
                            </ul>
                        </div>
                        <div className="clinic-booking">
                            <Link to={'/doctors/profile'} className="view-pro-btn" style={{ textDecoration: 'none' }}>View Profile</Link>
                            <Link to={`/booking/${data?.id}`} className="apt-btn" style={{ textDecoration: 'none' }}>Book Appointment</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchContent