import React from 'react';
import img from '../../../images/features/feature.png';
import './index.css';
import AvailableServiceContent from './AvailableServiceContent';

const Available = () => {
	return (
		<section className="available-section">
			<div className="container">
				<div className="row align-items-center g-4 g-lg-5">
					<div className="col-lg-5">
						<div className="available-section__visual">
							<img src={img} className="img-fluid" alt="Clinic facilities" />
						</div>
					</div>
					<div className="col-lg-7">
						<div className="available-section__header text-center text-lg-start">
							<span className="available-section__label">Facilities</span>
							<h2>Available services</h2>
							<p className="available-section__lead">
								Modern facilities and dedicated spaces for your care.
							</p>
						</div>
						<AvailableServiceContent />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Available;
