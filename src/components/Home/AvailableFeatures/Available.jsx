import React from 'react';
import img from '../../../images/features/feature.png';
import img2 from '../../../images/features/feature-02.jpg';
import img3 from '../../../images/features/feature-02.jpg';
import img4 from '../../../images/features/feature-03.jpg';
import './index.css';

const Availabe = () => {
	return (
		<section className="section section-features">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-5 features-img">
						<img src={img} className="img-fluid" alt="Feature" />
					</div>
					<div className="col-md-7">
						<div className="section-header">
							<h2 className="mt-2">Availabe Features in Our Clinic</h2>
							<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
						</div>
						<div className="features-slider slider d-flex justify-content-center align-items-center gap-4">

							<div className="feature-item text-center">
								<img src={img4} className="img-fluid" alt="Feature" />
								<p>ICU</p>
							</div>

							<div class="feature-item text-center">
								<img src={img4} className="img-fluid" alt="Feature" />
								<p>Patient Ward</p>
							</div>

							<div className="feature-item text-center">
								<img src={img2} className="img-fluid" alt="Feature" />
								<p>Test Room</p>
							</div>

							<div className="feature-item text-center">
								<img src={img3} className="img-fluid" alt="Feature" />
								<p>Laboratory</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Availabe;