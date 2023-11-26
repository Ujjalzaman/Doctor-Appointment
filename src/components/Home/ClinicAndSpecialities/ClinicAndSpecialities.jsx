import React from 'react';
import img1 from '../../../images/specialities/specialities-01.png';
import img2 from '../../../images/specialities/specialities-02.png';
import img3 from '../../../images/specialities/specialities-03.png';
import img4 from '../../../images/specialities/specialities-04.png';
import img5 from '../../../images/specialities/specialities-05.png';
import './index.css';

const ClinicAndSpecialities = () => {
    return (
        <section class="section section-specialities position-relative">
				<div class="container-fluid">
					<div class="section-header text-center mb-5">
						<h2>Clinic and Specialities</h2>
						<p class="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div class="row justify-content-center">
						<div class="col-md-9">
							<div class="specialities-slider slider d-flex justify-content-center align-items-center gap-5">
							
							
								<div class="speicality-item text-center">
									<div class="speicality-img">
										<img src={img1} class="img-fluid" alt="Speciality"/>
										<span><i class="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Urology</p>
								</div>	
								<div class="speicality-item text-center">
									<div class="speicality-img">
										<img src={img2} class="img-fluid" alt="Speciality"/>
										<span><i class="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Neurology</p>	
								</div>
								<div class="speicality-item text-center">
									<div class="speicality-img">
										<img src={img3} class="img-fluid" alt="Speciality"/>
										<span><i class="fa fa-circle" aria-hidden="true"></i></span>
									</div>
									<p>Orthopedic</p>	
								</div>				
								<div class="speicality-item text-center">
									<div class="speicality-img">
										<img src={img4} class="img-fluid" alt="Speciality"/>
										<span><i class="fa fa-circle" aria-hidden="true"></i></span>
									</div>	
									<p>Cardiologist</p>	
								</div>			
								<div class="speicality-item text-center">
									<div class="speicality-img">
										<img src={img5} class="img-fluid" alt="Speciality"/>
										<span><i class="fa fa-circle" aria-hidden="true"></i></span>
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