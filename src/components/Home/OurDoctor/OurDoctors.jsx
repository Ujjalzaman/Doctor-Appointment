import React from 'react';
import './index.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaUserMd, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { Empty } from 'antd';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Link } from 'react-router-dom';

const OurDoctors = () => {
	const { data, isLoading, isError } = useGetDoctorsQuery({ limit: 4 });
	const doctors = data?.doctors;

	let content = null;
	if (isLoading) {
		content = (
			<>
				{[1, 2, 3, 4].map((i) => (
					<div className="col-sm-6 col-lg-3 mb-4" key={i}>
						<div className="our-doctor-card our-doctor-card--skeleton">
							<div className="our-doctor-card__avatar" />
							<div className="our-doctor-card__body">
								<div className="our-doctor-card__name-skeleton" />
								<div className="our-doctor-card__meta-skeleton" />
							</div>
						</div>
					</div>
				))}
			</>
		);
	} else if (!isLoading && isError) {
		content = (
			<div className="col-12 text-center py-5">
				<p className="our-doctor-error">Unable to load doctors. Please try again.</p>
			</div>
		);
	} else if (!isLoading && (!doctors || doctors.length === 0)) {
		content = (
			<div className="col-12 py-5">
				<Empty description="No doctors to show" />
			</div>
		);
	} else if (doctors?.length > 0) {
		content = doctors.map((item) => {
			const fullName = `${item?.firstName || ''} ${item?.lastName || ''}`.trim() || 'Doctor';
			return (
				<div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
					<div className="our-doctor-card">
						<Link to={`/doctors/profile/${item?.id}`} className="our-doctor-card__avatar-link">
							<div className="our-doctor-card__avatar">
								{item?.img ? (
									<img src={item.img} className="img-fluid" alt={fullName} />
								) : (
									<div className="our-doctor-card__avatar-placeholder">
										<FaUserMd />
									</div>
								)}
								<div className="our-doctor-card__avatar-overlay" aria-hidden="true" />
							</div>
						</Link>
						<div className="our-doctor-card__body">
							<div className="our-doctor-card__name-row">
								<Link to={`/doctors/profile/${item?.id}`} className="our-doctor-card__name">
									{fullName}
								</Link>
								<FaCheckCircle className="our-doctor-card__verified-icon" title="Verified doctor" />
							</div>
							{item?.designation && (
								<span className="our-doctor-card__designation">{item.designation}</span>
							)}
							<p className="our-doctor-card__specialization">{item?.specialization || 'General Practice'}</p>
							<div className="our-doctor-card__footer">
								<div className="our-doctor-card__social">
									<a href="#facebook" aria-label="Facebook" className="our-doctor-card__social-link"><FaFacebookF /></a>
									<a href="#instagram" aria-label="Instagram" className="our-doctor-card__social-link"><FaInstagram /></a>
									<a href="#linkedin" aria-label="LinkedIn" className="our-doctor-card__social-link"><FaLinkedinIn /></a>
								</div>
								<Link to={`/booking/${item?.id}`} className="our-doctor-card__book" aria-label={`Book appointment with ${fullName}`}>
									<FaCalendarAlt /> Book
								</Link>
							</div>
						</div>
					</div>
				</div>
			);
		});
	}

	return (
		<section id="doctors" className="our-doctors-section">
			<div className="container">
				<div className="our-doctors-section__header text-center">
					<span className="our-doctors-section__label">Our team</span>
					<h2>Our doctors</h2>
					<span className="our-doctors-section__line" aria-hidden="true" />
					<p className="our-doctors-section__lead">
						Meet our experienced and caring specialists.
					</p>
				</div>
				<div className="row justify-content-center">
					{content}
				</div>
			</div>
		</section>
	);
};

export default OurDoctors;
