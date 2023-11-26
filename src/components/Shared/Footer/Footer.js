import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.png';

const Footer = () => {
	return (
		<footer className="footer">


			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<img src={logo} alt="logo" style={{maxWidth:'160px'}}/>
								</div>
								<div className="footer-about-content">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
							</div>

						</div>

						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Patients</h2>
								<ul>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Search for Doctors</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Login</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Register</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Booking</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Patient Dashboard</a></li>
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">

							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Doctors</h2>
								<ul>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Appointments</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Chat</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Login</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Register</a></li>
									<li><a href="#"><i className="fas fa-angle-double-right"></i> Doctor Dashboard</a></li>
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title">Contact Us</h2>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> 3556  Beech Street, San Francisco,<br /> California, CA 94108 </p>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										+1 315 369 5943
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										ujjalzaman@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">

					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<p className="mb-0"><a href="templateshub.net">
										<div className="copyRight text-center">
											<p>Copyright {(new Date()).getFullYear()} All Rights Reserved</p>
										</div></a></p>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-2">
										<a href="#" className='text-white'>Terms and Conditions</a>
										<a href="#" className='text-white'>Policy</a>
									</ul>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</footer>
	);
};

export default Footer;