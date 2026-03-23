import React, { useEffect, useState } from 'react';
import './BookDoctor.css';
import { Link } from 'react-router-dom';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { FaMapMarkerAlt, FaCheckCircle, FaHeart, FaRegHeart, FaDollarSign, FaClock, FaUserMd } from 'react-icons/fa';
import { useAddFavouriteMutation } from '../../../redux/api/favouriteApi';
import StarRatings from 'react-star-ratings';
import { message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const BookDoctor = () => {
	const { data, isError, isLoading } = useGetDoctorsQuery({ limit: 10 });
	const doctors = data?.doctors;
	const [addFavourite, { isSuccess, isError: fIsError, error }] = useAddFavouriteMutation();
	const [selectedId, setSelectedId] = useState(null);

	const handleAddFavourite = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		addFavourite({ doctorId: id });
	};

	useEffect(() => {
		if (fIsError) {
			message.error(error?.data?.message || 'Could not add to favourites');
		}
		if (isSuccess) {
			message.success('Added to favourites');
		}
	}, [isSuccess, fIsError, error?.data?.message]);

	let content = null;
	if (isLoading) {
		content = (
			<>
				{[1, 2, 3].map((i) => (
					<SwiperSlide key={i}>
						<div className="book-doctor-card book-doctor-card--skeleton">
							<div className="book-doctor-card__photo" />
							<div className="book-doctor-card__body">
								<div className="book-doctor-card__name" />
								<div className="book-doctor-card__meta" />
								<div className="book-doctor-card__actions" />
							</div>
						</div>
					</SwiperSlide>
				))}
			</>
		);
	} else if (!isLoading && isError) {
		content = (
			<div className="book-doctor-error">
				<p>Unable to load doctors. Please try again later.</p>
			</div>
		);
	} else if (!isLoading && doctors?.length === 0) {
		content = (
			<div className="book-doctor-empty">
				<p>No doctors available at the moment.</p>
			</div>
		);
	} else if (doctors?.length > 0) {
		content = doctors.map((item, index) => {
			const fullName = `${item?.firstName || ''} ${item?.lastName || ''}`.trim() || 'Doctor';
			const isFeatured = index < 2;
			return (
			<SwiperSlide key={item.id}>
				<div
					className={`book-doctor-card${isFeatured ? ' book-doctor-card--featured' : ''}${selectedId === item.id ? ' book-doctor-card--selected' : ''}`}
					onClick={(e) => {
						if (!e.target.closest('a, button')) {
							setSelectedId(prev => prev === item.id ? null : item.id);
						}
					}}
				>
					{isFeatured && <span className="book-doctor-card__badge">Featured</span>}
					{selectedId === item.id && (
						<span className="book-doctor-card__selected-banner">
							<FaCheckCircle /> Selected
						</span>
					)}
					<Link to={`/doctors/profile/${item?.id}`} className="book-doctor-card__photo-link">
							<div className="book-doctor-card__photo">
								{item?.img ? (
									<img src={item.img} alt={fullName} className="img-fluid" />
								) : (
									<div className="book-doctor-card__photo-placeholder">
										<FaUserMd />
									</div>
								)}
							</div>
						</Link>
						<button
							type="button"
							className="book-doctor-card__favourite"
							onClick={(e) => handleAddFavourite(e, item?.id)}
							aria-label="Add to favourites"
						>
							<FaRegHeart />
						</button>
						<div className="book-doctor-card__body">
							<h3 className="book-doctor-card__title">
								<Link to={`/doctors/profile/${item?.id}`}>
									{fullName}
									<FaCheckCircle className="book-doctor-card__verified" title="Verified doctor" />
								</Link>
							</h3>
							<p className="book-doctor-card__speciality">
								{item?.designation}{item?.specialization ? `, ${item.specialization}` : ''}
							</p>
							<div className="book-doctor-card__rating">
								<StarRatings
									rating={5}
									starRatedColor="#f4c150"
									numberOfStars={5}
									name="rating"
									starDimension="16px"
									starSpacing="2px"
								/>
								<span className="book-doctor-card__reviews">(27 reviews)</span>
							</div>
							<ul className="book-doctor-card__info">
								<li><FaMapMarkerAlt /> Georgia, USA</li>
								<li><FaClock /> Available Fri, 22 Mar</li>
								<li><FaDollarSign /> $100 – $400</li>
							</ul>
							<div className="book-doctor-card__actions">
								<Link to={`/doctors/profile/${item?.id}`} className="book-doctor-card__btn book-doctor-card__btn--outline">Profile</Link>
								<Link to={`/booking/${item?.id}`} className="book-doctor-card__btn book-doctor-card__btn--primary">Book</Link>
							</div>
						</div>
					</div>
				</SwiperSlide>
			);
		});
	}

	return (
		<section className="section-doctor">
			<div className="container">
				<div className="row align-items-start">
					<div className="col-12 col-lg-3 mb-4 mb-lg-0">
						<div className="section-doctor-intro">
							<span className="section-doctor-label">Our team</span>
							<h2>Book our doctors</h2>
							<p className="section-doctor-lead">
								Choose from verified specialists and book an appointment at your convenience.
							</p>
							<p className="section-doctor-text">
								Our doctors are experienced, qualified, and committed to your care. 
								Book a visit online or explore profiles to find the right fit.
							</p>
							<Link to="/doctors" className="section-doctor-cta">View all doctors</Link>
						</div>
					</div>
					<div className="col-12 col-lg-9">
						<div className="book-doctor-swiper-wrap">
							<Swiper
								spaceBetween={20}
								slidesPerView={1}
								modules={[Navigation, Autoplay]}
								navigation
								loop={doctors?.length > 3}
								autoplay={{ delay: 5000, disableOnInteraction: false }}
								breakpoints={{
									576: { slidesPerView: 2 },
									992: { slidesPerView: 3 },
								}}
								className="book-doctor-swiper"
							>
								{content}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookDoctor;
