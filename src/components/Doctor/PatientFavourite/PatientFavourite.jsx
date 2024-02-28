import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetFavouriteQuery, useRemoveFavouriteMutation } from '../../../redux/api/favouriteApi';
import { useEffect } from 'react';
import { Empty, message } from 'antd';
import { FaLocationArrow, FaCheckCircle, FaBookmark, FaDollarSign, FaClock } from "react-icons/fa";
import StarRatings from 'react-star-ratings';
import './index.css';

const PatientFavouriteDoctor = () => {
    const { data, isLoading, isError } = useGetFavouriteQuery();
    const [removeFavourite, { isLoading: FIsLoading, isError: fIsError, error: fError, isSuccess }] = useRemoveFavouriteMutation();

    const handleRemoveFavourite = (id) => {
        removeFavourite({ doctorId: id });
    };

    useEffect(() => {
        if (!FIsLoading && fIsError) {
            message.error(fError?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Favourite Removed')
        }
    }, [isSuccess, fIsError])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <Empty/>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {data && data?.map((item) => (
                <div className="col-md-4 col-sm-12 mb-4 mx-2 rounded shadow-sm" key={item?.id} style={{ background: '#f8f9fa', maxWidth: '20rem' }}>
                    <div className='rounded position-relative'>
                        <div className='fav-img my-3 d-flex justify-content-center'>
                            <img alt="" src={img} />
                        </div>
                        <div style={{ cursor: 'pointer' }} className="m-2 text-success position-absolute top-0 end-0 me-2" onClick={() => handleRemoveFavourite(item?.doctor?.id)}>
                            <FaBookmark />
                        </div>

                        <div className='p-2'>
                            <h5 className="d-flex align-items-center gap-2 mb-0" style={{ color: '#1977cc' }}>
                                <Link to={`/doctors/profile/${item?.doctor?.id}`}>
                                    {item?.doctor?.firstName + ' ' + item?.doctor?.lastName}
                                </Link>
                                <FaCheckCircle className='verified text-success' />
                            </h5>
                            <p className="form-text">MBBS, MD - General Medicine, DNB - Cardiology</p>
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
                            <div className="d-flex justify-content-between mb-3 mt-2">
                                <Link to={'/doctors/profile'} className="btn  btn-outline-info" style={{ borderColor: '#1977cc', color: '#1977cc' }}>Profile</Link>
                                <Link to={`/booking/${item?.doctor?.id}`} className="btn book-btn" style={{ backgroundColor: '#1977cc' }}>Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    return (
        <DashboardLayout>
            <div className="row">
                {content}
            </div>
        </DashboardLayout>
    )
}

export default PatientFavouriteDoctor