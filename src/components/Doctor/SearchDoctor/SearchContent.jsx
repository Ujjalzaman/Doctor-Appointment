import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { FaMapMarkerAlt, FaCheckCircle, FaDollarSign, FaClock, FaUserMd, FaComment, FaBriefcaseMedical } from 'react-icons/fa';
import { truncate } from '../../../utils/truncate';
import './SearchDoctor.css';

const SearchContent = ({ data, compact }) => {
	const fullName = `Dr. ${[data?.firstName, data?.lastName].filter(Boolean).join(' ') || 'Doctor'}`;
	const services = data?.services ? String(data.services).split(',').map((s) => s.trim()).filter(Boolean) : [];
	const designation = data?.designation || 'Medical Professional';
	const specialization = data?.specialization || 'General';
	const address = [data?.address, data?.country].filter(Boolean).join(', ') || '—';
	const clinicAddress = data?.clinicAddress ? truncate(data.clinicAddress, 36) : null;
	const price = data?.price != null ? `$${Number(data.price)}` : '$60';
	const rating = 5;
	const reviewCount = 27;

	return (
		<div className={`doctor-card ${compact ? 'doctor-card--compact' : ''}`}>
			<div className="doctor-card__layout">
				<aside className="doctor-card__visual">
					<Link to={`/doctors/profile/${data?.id}`} className="doctor-card__photo-wrap">
						<div className="doctor-card__photo">
							{data?.img ? (
								<img src={data.img} alt={fullName} className="img-fluid" />
							) : (
								<div className="doctor-card__photo-placeholder">
									<FaUserMd />
								</div>
							)}
						</div>
						<span className="doctor-card__photo-ring" aria-hidden="true" />
					</Link>
					<div className="doctor-card__price-pill">
						<FaDollarSign />
						<span>{price}</span>
						<small>consult</small>
					</div>
				</aside>

				<div className="doctor-card__content">
					<div className="doctor-card__content-top">
						<div className="doctor-card__identity">
							<h3 className="doctor-card__name">
								<Link to={`/doctors/profile/${data?.id}`}>
									{fullName}
									<FaCheckCircle className="doctor-card__verified" title="Verified doctor" />
								</Link>
							</h3>
							<p className="doctor-card__designation">{designation}</p>
							<p className="doctor-card__specialization">
								<FaBriefcaseMedical className="doctor-card__spec-icon" aria-hidden />
								{specialization}
							</p>
						</div>
						<div className="doctor-card__score">
							<div className="doctor-card__score-inner">
								<span className="doctor-card__score-num">{rating}.0</span>
								<StarRatings
									rating={rating}
									starRatedColor="#f4c150"
									numberOfStars={5}
									name="rating"
									starDimension="14px"
									starSpacing="1px"
								/>
								<span className="doctor-card__reviews">
									<FaComment /> {reviewCount} reviews
								</span>
							</div>
						</div>
					</div>

					<ul className="doctor-card__meta-grid">
						<li>
							<span className="doctor-card__meta-label"><FaMapMarkerAlt /> Location</span>
							<span className="doctor-card__meta-value">{address}</span>
						</li>
						{clinicAddress && !compact && (
							<li>
								<span className="doctor-card__meta-label"><FaMapMarkerAlt /> Clinic</span>
								<span className="doctor-card__meta-value">{clinicAddress}</span>
							</li>
						)}
						<li>
							<span className="doctor-card__meta-label"><FaClock /> Availability</span>
							<span className="doctor-card__meta-value">Same-week slots</span>
						</li>
					</ul>

					{services.length > 0 && (
						<div className="doctor-card__services">
							{services.slice(0, 5).map((item, id) => (
								<span key={id} className="doctor-card__tag">{item}</span>
							))}
							{services.length > 5 && <span className="doctor-card__tag doctor-card__tag--more">+{services.length - 5}</span>}
						</div>
					)}

					<div className="doctor-card__actions">
						<Link to={`/doctors/profile/${data?.id}`} className="doctor-card__btn doctor-card__btn--outline">
							View profile
						</Link>
						<Link to={`/booking/${data?.id}`} className="doctor-card__btn doctor-card__btn--primary">
							Book appointment
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchContent;
