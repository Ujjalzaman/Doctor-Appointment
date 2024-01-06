import React from 'react';
import img from '../../../images/features/feature.png';
import img2 from '../../../images/features/feature-02.jpg';
import img3 from '../../../images/features/feature-02.jpg';
import img4 from '../../../images/features/feature-03.jpg';
import './index.css';

const Availabe = () => {
	return (
		<section className="container section-features">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-5 features-img">
						<img src={img} className="img-fluid" alt="" />
					</div>
					<div className="col-md-7">
						<div className='mb-4 section-title text-center'>
							<h2 className='text-uppercase'>Availabe Service</h2>
							<p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
						</div>
						<div className="d-flex justify-content-center align-items-center gap-4">

							<div className="feature-item text-center">
								<img src={img4} className="img-fluid" alt="" />
								<p>ICU</p>
							</div>

							<div className="feature-item text-center">
								<img src={img4} className="img-fluid" alt="" />
								<p>Patient Ward</p>
							</div>

							<div className="feature-item text-center">
								<img src={img2} className="img-fluid" alt="Feature" />
								<p>Test Room</p>
							</div>

							<div className="feature-item text-center">
								<img src={img3} className="img-fluid" alt="" />
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