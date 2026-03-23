import React from 'react';
import { FaGraduationCap, FaBriefcase, FaAward, FaStethoscope, FaStar } from 'react-icons/fa';
import './OverView.css';

const OverView = () => {
	const education = [
		{
			degree: 'Doctor of Medicine (MD)',
			institution: 'Harvard Medical School',
			location: 'Boston, MA',
			year: '2005 - 2009',
			description: 'Specialized in Internal Medicine with focus on cardiovascular health and preventive care.'
		},
		{
			degree: 'Bachelor of Science in Biology',
			institution: 'Stanford University',
			location: 'Stanford, CA',
			year: '2001 - 2005',
			description: 'Graduated with honors, focusing on molecular biology and biochemistry.'
		}
	];

	const experience = [
		{
			position: 'Chief of Cardiology',
			organization: 'Metropolitan Medical Center',
			location: 'New York, NY',
			period: '2018 - Present',
			description: 'Leading a team of 15+ cardiologists, overseeing patient care and clinical research in cardiovascular medicine.'
		},
		{
			position: 'Senior Cardiologist',
			organization: 'City General Hospital',
			location: 'Chicago, IL',
			period: '2013 - 2018',
			description: 'Provided comprehensive cardiac care, performed advanced diagnostic procedures, and mentored residents.'
		},
		{
			position: 'Cardiology Resident',
			organization: 'Johns Hopkins Hospital',
			location: 'Baltimore, MD',
			period: '2009 - 2013',
			description: 'Completed rigorous training in all aspects of cardiovascular medicine and interventional cardiology.'
		}
	];

	const awards = [
		{ title: 'Top Doctor Award', organization: 'Medical Excellence Board', year: '2023' },
		{ title: 'Research Excellence in Cardiology', organization: 'American Heart Association', year: '2021' },
		{ title: 'Patient Choice Award', organization: 'Healthcare Review', year: '2020' }
	];

	const services = [
		'Comprehensive Cardiac Evaluation',
		'Echocardiography',
		'Stress Testing',
		'Holter Monitoring',
		'Preventive Cardiology',
		'Heart Disease Management',
		'Hypertension Treatment',
		'Cholesterol Management'
	];

	const specializations = [
		'Interventional Cardiology',
		'Electrophysiology',
		'Heart Failure Management',
		'Preventive Cardiology',
		'Cardiac Imaging',
		'Cardiovascular Disease'
	];

	return (
		<div className="overview-container">
			<div className="overview-grid">
				<div className="overview-main">
					<section className="overview-section">
						<h3 className="overview-section__title">About</h3>
						<p className="overview-section__text">
							Dr. [Name] is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. 
							Committed to providing exceptional patient care through evidence-based medicine and a compassionate approach. 
							Specializes in preventive cardiology, heart disease management, and advanced cardiac diagnostics.
						</p>
						<p className="overview-section__text">
							Known for taking the time to listen to patients, explaining conditions in understandable terms, and 
							developing personalized treatment plans that align with each patient's lifestyle and goals.
						</p>
					</section>

					<section className="overview-section">
						<h3 className="overview-section__title">
							<FaGraduationCap className="overview-section__icon" /> Education
						</h3>
						<div className="timeline">
							{education.map((item, index) => (
								<div className="timeline-item" key={index}>
									<div className="timeline-marker" />
									<div className="timeline-content">
										<div className="timeline-header">
											<h4>{item.degree}</h4>
											<span className="timeline-year">{item.year}</span>
										</div>
										<p className="timeline-institution">{item.institution}</p>
										<p className="timeline-location">{item.location}</p>
										<p className="timeline-description">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="overview-section">
						<h3 className="overview-section__title">
							<FaBriefcase className="overview-section__icon" /> Work Experience
						</h3>
						<div className="timeline">
							{experience.map((item, index) => (
								<div className="timeline-item" key={index}>
									<div className="timeline-marker" />
									<div className="timeline-content">
										<div className="timeline-header">
											<h4>{item.position}</h4>
											<span className="timeline-year">{item.period}</span>
										</div>
										<p className="timeline-institution">{item.organization}</p>
										<p className="timeline-location">{item.location}</p>
										<p className="timeline-description">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>

				<div className="overview-sidebar">
					<section className="overview-card">
						<h3 className="overview-card__title">
							<FaAward className="overview-card__icon" /> Awards & Recognition
						</h3>
						<div className="awards-list">
							{awards.map((award, index) => (
								<div className="award-item" key={index}>
									<div className="award-icon">
										<FaStar />
									</div>
									<div>
										<h5>{award.title}</h5>
										<p>{award.organization}</p>
										<span>{award.year}</span>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="overview-card">
						<h3 className="overview-card__title">
							<FaStethoscope className="overview-card__icon" /> Services Offered
						</h3>
						<ul className="services-list">
							{services.map((service, index) => (
								<li key={index}>{service}</li>
							))}
						</ul>
					</section>

					<section className="overview-card">
						<h3 className="overview-card__title">Specializations</h3>
						<div className="specializations-list">
							{specializations.map((spec, index) => (
								<span className="specialization-tag" key={index}>{spec}</span>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default OverView;
