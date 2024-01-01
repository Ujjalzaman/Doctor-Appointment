import React from 'react';
import { Pagination } from 'antd';
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import showImg from '../../../images/specialities/specialities-01.png'
import StarRatings from 'react-star-ratings';

const SearchContent = () => {
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    }
    return (
        <div class="col-md-12 col-lg-8 col-xl-9">
            <div class="card">
                <div class="card-body">
                    <div className='d-flex'>
                        <div className='d-flex gap-3'>
                            <div>
                                <img src={img} class="img-fluid" alt="User Image" style={{ maxWidth: '240', maxHeight: '240' }} />
                            </div>
                            <div class="doc-info-cont">
                                <h4 class=""><Link to={'/'} style={{ textDecoration: 'none' }}>Dr. Sofia Brient</Link></h4>
                                <p class="">MBBS, MS - General Surgery, MCh - Urology</p>
                                <p class="doc-department"><img src={showImg} class="img-fluid" alt="Speciality" />Urology</p>

                                <StarRatings
                                    rating={5}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                />
                                <span class="d-inline-block">(4)</span>

                                <div class="clinic-details">
                                    <p class="my-2"><i class="fas fa-map-marker-alt"></i> Louisiana, USA</p>
                                    <ul class="clinic-gallery mt-3">
                                        <li>
                                            <img src={showImg} alt="Feature" style={{maxWidth:"30px"}}/>
                                        </li>
                                        <li>
                                            <img src={showImg} alt="Feature" style={{maxWidth:"30px"}}/>
                                        </li>
                                        <li>
                                            <img src={showImg} alt="Feature" style={{maxWidth:"30px"}}/>

                                        </li>
                                        <li>
                                            <img src={showImg} alt="Feature" style={{maxWidth:"30px"}}/>
                                        </li>
                                    </ul>
                                </div>
                                <div class="clinic-services">
                                    <span>Dental Fillings</span>
                                    <span> Whitneing</span>
                                </div>
                            </div>
                        </div>
                        <div class="doc-info-right">
                            <div class="clini-infos">
                                <ul>
                                    <li><i class="far fa-thumbs-up"></i> 97%</li>
                                    <li><i class="far fa-comment"></i> 4 Feedback</li>
                                    <li><i class="fas fa-map-marker-alt"></i> Newyork, USA</li>
                                    <li><i class="far fa-money-bill-alt"></i> $150 - $250 <i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i></li>
                                </ul>
                            </div>
                            <div class="clinic-booking">
                                <Link to={'/'} class="view-pro-btn" style={{textDecoration: 'none'}}>View Profile</Link>
                                <Link to={'/'} class="apt-btn" style={{textDecoration: 'none'}}>Book Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='text-center mt-5 mb-5'>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={3}
                    total={20}
                />
            </div>
        </div>
    )
}

export default SearchContent