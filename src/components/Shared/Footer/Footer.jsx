import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-top">
				<div className="container">
					<div className="row g-4">
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to="/">
										<img src={logo} alt="Logo" className="footer-logo__img" />
									</Link>
								</div>
								<p className="footer-about__text">
									Quality healthcare with a personal touch. We’re committed to your wellbeing with experienced doctors and modern facilities.
								</p>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h3 className="footer-title">For patients</h3>
								<ul className="footer-list">
									<li><Link to="/doctors"><FaChevronRight className="footer-list__icon" /> Find a doctor</Link></li>
									<li><Link to="/login"><FaChevronRight className="footer-list__icon" /> Login</Link></li>
									<li><Link to="/register"><FaChevronRight className="footer-list__icon" /> Register</Link></li>
									<li><Link to="/doctors"><FaChevronRight className="footer-list__icon" /> Book appointment</Link></li>
									<li><Link to="/dashboard"><FaChevronRight className="footer-list__icon" /> Patient dashboard</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h3 className="footer-title">For doctors</h3>
								<ul className="footer-list">
									<li><Link to="/dashboard"><FaChevronRight className="footer-list__icon" /> Appointments</Link></li>
									<li><Link to="/login"><FaChevronRight className="footer-list__icon" /> Login</Link></li>
									<li><Link to="/register"><FaChevronRight className="footer-list__icon" /> Register</Link></li>
									<li><Link to="/dashboard"><FaChevronRight className="footer-list__icon" /> Doctor dashboard</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h3 className="footer-title">Contact us</h3>
								<div className="footer-contact__item">
									<FaMapMarkerAlt className="footer-contact__icon" />
									<p>121, Mirzapur Union Office,<br />Sylhet, Bangladesh 3100</p>
								</div>
								<div className="footer-contact__item">
									<FaPhoneAlt className="footer-contact__icon" />
									<p><a href="tel:+1 (555) 123-4567">+1 (555) 123-4567</a></p>
								</div>
								<div className="footer-contact__item">
									<FaEnvelope className="footer-contact__icon" />
									<p><a href="mailto:ujjalzaman@gmail.com">ujjalzaman@gmail.com</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-12 col-md-6 text-center text-md-start">
							<p className="footer-copyright">
								&copy; {new Date().getFullYear()} All rights reserved.
							</p>
						</div>
						<div className="col-12 col-md-6">
							<ul className="footer-policy">
								<li><Link to="/terms">Terms & conditions</Link></li>
								<li><Link to="/policy">Privacy policy</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
