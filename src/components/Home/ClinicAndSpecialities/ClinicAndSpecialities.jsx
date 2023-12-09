import React from 'react';
import img1 from '../../../images/specialities/specialities-01.png';
import img2 from '../../../images/specialities/specialities-02.png';
import img3 from '../../../images/specialities/specialities-03.png';
import img4 from '../../../images/specialities/specialities-04.png';
import img5 from '../../../images/specialities/specialities-05.png';
import './index.css';

const ClinicAndSpecialities = () => {
    return (
        <section className="section section-specialities position-relative">
				<div className="container-fluid">
					<div className="section-header text-center mb-5">
						<h2>Clinic and Specialities</h2>
						<p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div className="row justify-content-center">
						<div className="col-md-9">
							<div className="specialities-slider slider d-flex justify-content-center align-items-center gap-5">
							
							
								<div className="speicality-item text-center">
									<div className="speicality-img">
										<img src={img1} className="img-fluid" alt="Speciality"/>
										<span><i className="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Urology</p>
								</div>	
								<div className="speicality-item text-center">
									<div className="speicality-img">
										<img src={img2} className="img-fluid" alt="Speciality"/>
										<span><i className="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Neurology</p>	
								</div>
								<div className="speicality-item text-center">
									<div className="speicality-img">
										<img src={img3} className="img-fluid" alt="Speciality"/>
										<span><i className="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Orthopedic</p>	
								</div>				
								<div className="speicality-item text-center">
									<div className="speicality-img">
										<img src={img4} className="img-fluid" alt="Speciality"/>
										<span><i className="fa fa-circle" aria-hidden="true"></i></span>
									</div>	
									<p>Cardiologist</p>	
								</div>			
								<div className="speicality-item text-center">
									<div className="speicality-img">
										<img src={img5} className="img-fluid" alt="Speciality"/>
										<span><i className="fa fa-circle" aria-hidden="true"></i></span>
									</div>	
									<p>Dentist</p>
								</div>					
							</div>
						</div>
					</div>
				</div>   
			</section>	 
    );
};

export default ClinicAndSpecialities;