import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkerAlt, FaDollarSign, FaGraduationCap, FaBriefcase, FaAward, FaPhoneAlt, FaEnvelope, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

const DoctorProfileHero = ({ data }) => {
	if (!data) return null;
	const fullName = `Dr. ${[data.firstName, data.lastName].filter(Boolean).join(' ') || 'Doctor'}`;
	const designation = data.designation || 'Medical Professional';
	const specialization = data.specialization || 'General';
	const address = [data.address, data.country].filter(Boolean).join(', ') || data.clinicAddress || '—';
	const price = data.price != null ? `$${Number(data.price)}` : '—';
	const experience = '15+ years';
	const patients = '2,500+';
	const rating = 5.0;

	return (
		<div className="doctor-hero">
			<div className="doctor-hero__bg" />
			<div className="container">
				<div className="doctor-hero__content">
					<div className="doctor-hero__image-card">
						<div className="doctor-hero__image-wrap">
							{data.img ? (
								<img src={data.img} alt={fullName} className="doctor-hero__image" />
							) : (
								<div className="doctor-hero__image-placeholder">
									<FaUserMd />
								</div>
							)}
							<span className="doctor-hero__badge">
								<FaCheckCircle /> Verified
							</span>
						</div>
					</div>
					<div className="doctor-hero__info-card">
						<div className="doctor-hero__header">
							<div>
								<h1 className="doctor-hero__name">
									{fullName}
									<FaCheckCircle className="doctor-hero__verified-icon" />
								</h1>
								<p className="doctor-hero__designation">{designation}</p>
								<p className="doctor-hero__specialization">{specialization}</p>
							</div>
							<div className="doctor-hero__rating-box">
								<div className="doctor-hero__rating-number">{rating}</div>
								<StarRatings
									rating={rating}
									starRatedColor="#f4c150"
									numberOfStars={5}
									name="rating"
									starDimension="16px"
									starSpacing="2px"
								/>
								<span className="doctor-hero__reviews-count">127 reviews</span>
							</div>
						</div>
						<div className="doctor-hero__stats">
							<div className="doctor-hero__stat">
								<FaBriefcase className="doctor-hero__stat-icon" />
								<div>
									<strong>{experience}</strong>
									<span>Experience</span>
								</div>
							</div>
							<div className="doctor-hero__stat">
								<FaCalendarAlt className="doctor-hero__stat-icon" />
								<div>
									<strong>{patients}</strong>
									<span>Patients</span>
								</div>
							</div>
							<div className="doctor-hero__stat">
								<FaDollarSign className="doctor-hero__stat-icon" />
								<div>
									<strong>{price}</strong>
									<span>Consultation</span>
								</div>
							</div>
						</div>
						<div className="doctor-hero__contact">
							<div className="doctor-hero__contact-item">
								<FaMapMarkerAlt /> {address}
							</div>
							<div className="doctor-hero__contact-item">
								<FaPhoneAlt /> +1 (555) 123-4567
							</div>
							<div className="doctor-hero__contact-item">
								<FaEnvelope /> {data.email || 'contact@doctor.com'}
							</div>
						</div>
						<div className="doctor-hero__actions">
							<Link to={`/booking/${data.id}`} className="doctor-hero__book-btn">
								Book appointment
							</Link>
							<button className="doctor-hero__chat-btn">
								Send message
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorProfileHero;
