import React from 'react';
import img1 from '../../../images/specialities/specialities-01.png';
import img2 from '../../../images/specialities/specialities-02.png';
import img3 from '../../../images/specialities/specialities-03.png';
import img4 from '../../../images/specialities/specialities-04.png';
import img5 from '../../../images/specialities/specialities-05.png';
import { FaCheck } from 'react-icons/fa';
import './index.css';

const specialities = [
	{ name: 'Urology', img: img1 },
	{ name: 'Neurology', img: img2 },
	{ name: 'Orthopedic', img: img3 },
	{ name: 'Cardiologist', img: img4 },
	{ name: 'Dentist', img: img5 },
];

const ClinicAndSpecialities = () => {
	return (
		<section className="specialities-section">
			<div className="container">
				<div className="specialities-header text-center">
					<span className="specialities-label">Our focus</span>
					<h2>Clinic & specialities</h2>
					<span className="specialities-header-line" aria-hidden="true" />
					<p className="specialities-lead">
						Expert care across multiple specialties under one roof.
					</p>
				</div>
				<div className="specialities-grid">
					{specialities.map((item) => (
						<div className="speciality-card" key={item.name}>
							<div className="speciality-card-inner">
								<div className="speciality-img-wrap">
									<span className="speciality-img-ring" aria-hidden="true" />
									<img src={item.img} className="img-fluid" alt={item.name} />
									<span className="speciality-check">
										<FaCheck />
									</span>
								</div>
								<p className="speciality-name">{item.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ClinicAndSpecialities;
