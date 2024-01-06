import React from 'react';
import './index.css';
import img from '../../../images/doc/doc1.jpg'
import img2 from '../../../images/doc/doc4.jpg'
import img3 from '../../../images/doc/doctor 5.jpg'
import { Link } from 'react-router-dom';

const Service = () => {
    return (
        <section class="container" style={{marginTop: 200, marginBottom:200}}>
            <div className='mb-5 section-title text-center'>
                <h2>Services</h2>
                <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 col-sm-6">
                        <div class="service-img">
                            <img src={img} alt="" class="img-fluid" />
                            <img src={img2} alt="" class="img-fluid mt-4" />
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6">
                        <div class="service-img mt-4 mt-lg-0">
                            <img src={img3} alt="" class="img-fluid" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="service-content ps-4 mt-4 mt-lg-0">
                            <h2>Personal care <br />healthy living</h2>
                            <p class="mt-4 mb-5 text-secondary form-text">We provide best leading medicle service Nulla perferendis veniam deleniti ipsum officia dolores repellat laudantium obcaecati neque.</p>
                            <Link to={'/services'} className="btn-get-started scrollto">Services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service