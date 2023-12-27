import React, { useEffect } from 'react';
import './BookDoctor.css';
import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaHeart } from "react-icons/fa";
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import toast, { Toaster } from 'react-hot-toast';

const BookDoctor = () => {
	const { data, isError, isLoading } = useGetDoctorsQuery();
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
	if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
	if (!isLoading && !isError && data?.length > 0) content =
		<>
			{
				data && data?.map((item) => (
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
							<div className="rating">
								<i className="fas fa-star filled"></i>
								<i className="fas fa-star filled"></i>
								<i className="fas fa-star filled"></i>
								<i className="fas fa-star filled"></i>
								<i className="fas fa-star"></i>
								<span className="d-inline-block average-rating">(27)</span>
							</div>
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
				))
			}
		</>
	return (
		<section className="section section-doctor">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<div className="section-header ">
							<h2>Book Our Doctor</h2>
							<p>Lorem Ipsum is simply dummy text </p>
						</div>
						<div className="about-content">
							<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
							<p>web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes</p>
							<a>Read More..</a>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="doctor-slider slider d-flex justify-content-center align-items-center gap-3 border-0">
							{content}
							<Toaster
								position="top-center"
								reverseOrder={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookDoctor;