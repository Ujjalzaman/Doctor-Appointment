import React, { useEffect } from 'react';
import img from '../../../images/doctor.png';
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import toast, { Toaster } from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DoctorDetail = ({ item }) => {
    const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

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

    return (
        <div className='col-md-4 col-sm-6 col-12 text-center doctor-content m-3'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="profile-widget" key={item?.id}>
                <div className="doc-img">
                    <a href="doctor-profile.html">
                        <img className="img-fluid" alt="" src={img} />
                    </a>
                    <a style={{ cursor: 'pointer' }} className="position-absolute top-0 end-0 me-2" onClick={() => handleAddFavourite(item?.id)}>
                        <FaHeart />
                    </a>
                </div>
                <div className="pro-content">
                    <h3 className="title">
                        <Link to={'/doctors/profile'}>
                            <a>{item?.firstName} {item?.lastName}</a>
                        </Link>
                        <i className="fas fa-check-circle verified"></i>
                    </h3>
                    <p className="speciality">MBBS, MD - General Medicine, DNB - Cardiology</p>
                    <ul className="available-info">
                        <li>
                            <i className="fas fa-map-marker-alt"></i> Georgia, USA
                        </li>
                        <li>
                            <i className="far fa-clock"></i> Available on Fri, 22 Mar
                        </li>
                        <li>
                            <i className="far fa-money-bill-alt"></i> $100 - $400
                            <i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
                        </li>
                    </ul>
                    <div className="row row-sm">
                        <div className="col-6">
                            <Link to={'/doctors/profile'} className="btn btn-outline-info">View Profile</Link>
                        </div>
                        <div className="col-6">
                            <Link to={`/booking/${item?.id}`} className="btn btn-info text-white">Book Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoctorDetail;