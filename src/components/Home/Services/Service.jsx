import React from 'react';
import './index.css';
import img from '../../../images/doc/doc1.jpg';
import img2 from '../../../images/doc/doc4.jpg';
import img3 from '../../../images/doc/doctor 5.jpg';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Service = () => {
	return (
		<section className="services-section">
			<div className="container">
				<div className="services-header text-center">
					<span className="services-label">What we offer</span>
					<h2>Personal care for healthy living</h2>
					<p className="services-lead">
						From preventive checkups to specialized treatment, we support your health at every step.
					</p>
				</div>
				<div className="row align-items-center g-4 g-lg-5">
					<div className="col-lg-4 col-md-6">
						<div className="service-image-wrap">
							<img src={img} alt="Doctor consultation" className="img-fluid service-img service-img-1" />
							<img src={img2} alt="Patient care" className="img-fluid service-img service-img-2" />
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="service-image-wrap service-image-wrap--single">
							<img src={img3} alt="Healthcare team" className="img-fluid service-img" />
						</div>
					</div>
					<div className="col-lg-4">
						<div className="service-content-card">
							<div className="service-content-icon">
								<FaStethoscope />
							</div>
							<h2>Quality care, close to you</h2>
							<p>
								Our clinic brings together experienced doctors, modern equipment, and a focus on clear communication. 
								We offer check-ups, diagnostics, and ongoing care tailored to you.
							</p>
							<Link to="/service" className="service-cta">
								View all services <FaArrowRight className="ms-2" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Service;
