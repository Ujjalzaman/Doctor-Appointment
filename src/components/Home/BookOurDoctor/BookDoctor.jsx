import React, { useEffect } from 'react';
import './BookDoctor.css';
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaLocationArrow, FaCheckCircle, FaRegHeart, FaDollarSign, FaClock } from "react-icons/fa";
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import toast, { Toaster } from 'react-hot-toast';
import StarRatings from 'react-star-ratings';

const BookDoctor = () => {
	const { data, isError, isLoading } = useGetDoctorsQuery({ limit: 10 });
	const doctors = data?.doctors;
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
	}, [isSuccess, fIsError, FIsLoading, error?.data?.message])


	// what to render 
	let content = null;
	if (!isLoading && isError) content = <div>Something Went Wrong !</div>
	if (!isLoading && !isError && doctors?.length === 0) content = <div>Empty</div>
	if (!isLoading && !isError && doctors?.length > 0) content =
		<>
			{
				doctors && doctors?.map((item) => (
					<div className="profile-widget" key={item.id}>
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
		<section className="section-doctor container">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-12">
						<div className='mb-2 section-title text-center'>
							<h2>Book Our Doctor</h2>
							<p className='m-0 text-secondary'>Lorem ipsum dolor sit.</p>
						</div>
						<div className="form-text">
							<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
							<p>Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover  Various versions have evolved over the years, sometimes</p>
							<Link to={'/doctors'} className='more-btn'>See More</Link>
						</div>
					</div>
					<div className="col-lg-9 col-md-9 col-sm-12">
						<div className="d-flex justify-content-center align-items-center gap-3 border-0">
							{content}
						</div>
						<Toaster />
					</div>
				</div>
			</div>
		</section >
	);
};

export default BookDoctor;