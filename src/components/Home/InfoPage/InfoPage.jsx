import React from 'react';
import './InfoPage.css';
import { FaClock, FaPhoneAlt, FaCalendarCheck, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InfoPage = () => {
	return (
		<section className="why-us">
			<div className="container">
				<div className="row g-4 align-items-stretch">
					<div className="col-lg-4">
						<div className="why-us-card">
							<span className="why-us-badge">Why choose us</span>
							<h2>Healthcare you can trust, care that puts you first</h2>
							<p>
								We combine experienced specialists, modern facilities, and a patient-centered approach. 
								From same-day appointments to 24/7 emergency support, we’re here when you need us.
							</p>
							<Link to="/about" className="why-us-cta">
								Learn more <FaChevronRight className="ms-1" />
							</Link>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="row g-4 why-us-cards-row">
							<div className="col-md-4">
								<div className="info-box">
									<div className="info-box-icon">
										<FaCalendarCheck />
									</div>
									<h4>Easy appointments</h4>
									<span className="info-box-sub">24/7 booking</span>
									<p>Book or reschedule online anytime. We offer flexible slots including evenings and weekends.</p>
								</div>
							</div>
							<div className="col-md-4">
								<div className="info-box">
									<div className="info-box-icon info-box-icon--emergency">
										<FaPhoneAlt />
									</div>
									<h4>Emergency care</h4>
									<span className="info-box-sub">+1 (555) 123-4567</span>
									<p>Urgent medical support when you need it. Our team is ready to guide you 24 hours a day.</p>
								</div>
							</div>
							<div className="col-md-4">
								<div className="info-box">
									<div className="info-box-icon">
										<FaClock />
									</div>
									<h4>Working hours</h4>
									<span className="info-box-sub">Clinic schedule</span>
									<ul className="info-box-schedule">
										<li><span>Sun – Wed</span> <span>8:00 AM – 5:00 PM</span></li>
										<li><span>Thu – Fri</span> <span>9:00 AM – 5:00 PM</span></li>
										<li><span>Saturday</span> <span>10:00 AM – 4:00 PM</span></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoPage;
