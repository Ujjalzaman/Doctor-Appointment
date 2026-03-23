import React from 'react';
import './About.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { FaAward, FaUsers, FaHeart, FaStethoscope, FaCheckCircle, FaArrowRight, FaCertificate } from 'react-icons/fa';
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { Link } from 'react-router-dom';
import { Empty, Spin } from 'antd';

const About = () => {
	const { data: doctorData, isLoading: doctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });
	const doctors = doctorData?.doctors;

	const stats = [
		{ icon: <FaUsers />, number: '2,500+', label: 'Happy Patients' },
		{ icon: <FaStethoscope />, number: '50+', label: 'Expert Doctors' },
		{ icon: <FaAward />, number: '15+', label: 'Years Experience' },
		{ icon: <FaHeart />, number: '98%', label: 'Satisfaction Rate' }
	];

	const values = [
		{
			title: 'Excellence in Care',
			description: 'We maintain the highest standards of medical care, combining expertise with compassion.',
			icon: <FaStethoscope />
		},
		{
			title: 'Patient First',
			description: 'Your health and comfort are our top priorities. We listen, understand, and act accordingly.',
			icon: <FaHeart />
		},
		{
			title: 'Continuous Innovation',
			description: 'We stay at the forefront of medical advancements to provide you with the best treatments.',
			icon: <FaAward />
		}
	];

	let doctorContent = null;
	if (doctorIsLoading) {
		doctorContent = (
			<div className="text-center py-5">
				<Spin size="large" />
			</div>
		);
	} else if (doctorIsError) {
		doctorContent = (
			<div className="col-12 text-center py-5">
				<p>Unable to load doctors</p>
			</div>
		);
	} else if (!doctors || doctors.length === 0) {
		doctorContent = (
			<div className="col-12 py-5">
				<Empty description="No doctors available" />
			</div>
		);
	} else {
		doctorContent = doctors.map((item) => {
			const fullName = `${item?.firstName || ''} ${item?.lastName || ''}`.trim() || 'Doctor';
			const spec = item?.specialization || 'General practice';
			return (
				<div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
					<article className="about-doctor-card">
						<Link to={`/doctors/profile/${item.id}`} className="about-doctor-card__media">
							<div className="about-doctor-card__photo">
								{item.img ? (
									<img src={item.img} alt={fullName} className="img-fluid" />
								) : (
									<div className="about-doctor-card__placeholder">
										<FaStethoscope />
									</div>
								)}
							</div>
							<span className="about-doctor-card__shine" aria-hidden="true" />
							<span className="about-doctor-card__chip">
								<FaCertificate /> Board-certified
							</span>
						</Link>
						<div className="about-doctor-card__body">
							<h5 className="about-doctor-card__name">{fullName}</h5>
							<p className="about-doctor-card__designation">{item?.designation || 'Physician'}</p>
							<p className="about-doctor-card__specialization">{spec}</p>
							<div className="about-doctor-card__meta">
								<span>{item?.experience ? `${item.experience} yrs exp.` : 'Experienced care'}</span>
								<span className="about-doctor-card__dot" aria-hidden="true" />
								<span>Telehealth</span>
							</div>
							<Link to={`/doctors/profile/${item.id}`} className="about-doctor-card__cta">
								View profile <FaArrowRight />
							</Link>
						</div>
					</article>
				</div>
			);
		});
	}

	return (
		<>
			<Header />
			<SubHeader title="About us" subtitle="Learn more about our mission and values" />
			
			{/* Mission Section */}
			<section className="about-mission">
				<div className="container">
					<div className="row align-items-center g-5">
						<div className="col-lg-6">
							<span className="about-label">Who we are</span>
							<h2 className="about-heading">Committed to providing exceptional healthcare</h2>
							<p className="about-text">
								We are a team of dedicated healthcare professionals committed to providing compassionate, 
								patient-centered care. With over 15 years of experience, we combine medical excellence 
								with genuine care for each patient's wellbeing.
							</p>
							<p className="about-text">
								Our state-of-the-art facility offers comprehensive medical services, from preventive care 
								to specialized treatments, all delivered by experienced doctors who truly care about your health.
							</p>
							<div className="about-features">
								{['Board-certified physicians', 'Modern equipment', '24/7 Emergency care', 'Patient-focused approach'].map((feature, index) => (
									<div className="about-feature-item" key={index}>
										<FaCheckCircle className="about-feature-icon" />
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about-image-grid">
								<div className="about-image-main">
									<img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600" alt="Healthcare" className="img-fluid" />
								</div>
								<div className="about-image-side">
									<img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400" alt="Medical team" className="img-fluid" />
									<img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400" alt="Healthcare" className="img-fluid" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="about-stats">
				<div className="container">
					<div className="row g-4">
						{stats.map((stat, index) => (
							<div className="col-sm-6 col-lg-3" key={index}>
								<div className="about-stat-card">
									<div className="about-stat-icon">{stat.icon}</div>
									<h3>{stat.number}</h3>
									<p>{stat.label}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="about-values">
				<div className="container">
					<div className="text-center mb-5">
						<span className="about-label">Our values</span>
						<h2 className="about-heading">What drives us</h2>
						<p className="about-lead">The principles that guide everything we do</p>
					</div>
					<div className="row g-4">
						{values.map((value, index) => (
							<div className="col-lg-4" key={index}>
								<div className="about-value-card">
									<div className="about-value-icon">{value.icon}</div>
									<h4>{value.title}</h4>
									<p>{value.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="about-team">
				<div className="container">
					<div className="text-center mb-5">
						<span className="about-label">Our team</span>
						<h2 className="about-heading">Meet our specialists</h2>
						<p className="about-lead">Experienced professionals dedicated to your health</p>
					</div>
					<div className="row justify-content-center">
						{doctorContent}
					</div>
					<div className="text-center mt-4">
						<Link to="/doctors" className="about-cta-btn">View all doctors</Link>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default About;
