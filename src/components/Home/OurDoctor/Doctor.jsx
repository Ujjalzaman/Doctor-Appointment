import { Empty } from 'antd';
import React, { useEffect } from 'react';
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaCheckCircle, FaRegHeart, FaDollarSign, FaClock } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';

const Doctor = () => {
    const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 4 });
    const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();
    const doctors = data?.doctors;

    const handleAddFavourite = (id) => {
        addFavourite({ doctorId: id });
    };

    useEffect(() => {
        if (!FIsLoading && fIsError) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success('Successfully Favourite Adde')
        }
    }, [isSuccess, fIsError, error?.data?.message, FIsLoading])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && doctors?.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && doctors?.length > 0) content =
        <>
            {
                doctors && doctors?.map((item, key) => (
                    <div className="profile-widget" key={item?.id}>
                        <div className="doc-img">
                            <Link to={'/doctors/profile'}>
                                <img className="img-fluid" alt="" src={img} />
                            </Link>
                            <a style={{ cursor: 'pointer' }} className="position-absolute top-0 end-0 me-2" onClick={() => handleAddFavourite(item?.id)}>
                                <FaRegHeart />
                            </a>
                        </div>
                        <div className="pro-content">
                            <h3 className="title">
                                <Link to={'/doctors/profile'}>
                                    <a>{item?.firstName + ' ' + item?.lastName}</a>
                                </Link>
                                <FaCheckCircle className='verified' />
                            </h3>
                            <p className="speciality">MBBS, MD - General Medicine, DNB - Cardiology</p>
                            <div className="w-100 d-flex align-items-center">
                                <StarRatings
                                    rating={5}
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    name='rating'
                                    className="star"
                                    starDimension="20px"
                                    starSpacing="5px"
                                />
                                <span className="d-inline-block text-secondary mt-2">(27)</span>
                            </div>
                            <ul className="available-info">
                                <li>
                                    <FaLocationArrow className='icon' /> Georgia, USA
                                </li>
                                <li>
                                    <FaClock className='icon' /> Available on Fri, 22 Mar
                                </li>
                                <li>
                                    <FaDollarSign className='icon' /> $100 - $400
                                </li>
                            </ul>
                            <div className="row row-sm">
                                <div className="col-6">
                                    <Link to={'/doctors/profile'} className="btn  btn-outline-info btn-sm view-profile-btn">Profile</Link>
                                </div>
                                <div className="col-6">
                                    <Link to={`/booking/${item?.id}`} className="btn btn-sm book-btn">Book Now</Link>
                                </div>
                            </div>
                        </div>
                    </div >
                ))
            }
        </>
    return (
        <div className="container" style={{ marginTop: 80, marginBottom: 100 }}>
            <Toaster />
            <div className='mb-5 section-title text-center'>
                <h2>OUR DOCTORS</h2>
                <p className='m-0 text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, saepe.</p>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className="d-flex justify-content-center align-items-center gap-3 border-0">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctor;