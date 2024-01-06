import React from 'react';
import './index.css';
import img from '../../../images/doc/doctor 3.jpg'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const OurDoctors = () => {
    return (
        <section id="doctors" class="doctors">
            <div class="container">
                <div class="section-title text-center mb-3">
                    <h2>OUR DOCTORS</h2>
                    <p className='form-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, adipisci?</p>
                </div>

                <div class="row">
                    {
                        Array(4).fill(null).map((_item, index) => (
                            <div class="col-lg-6 mt-3" key={index}>
                                <div class="member d-flex align-items-start">
                                    <div class="pic">
                                        <img src={img} class="img-fluid" alt="" />
                                    </div>
                                    <div class="member-info">
                                        <h4>Walter White</h4>
                                        <span>Chief Medical Officer</span>
                                        <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
                                        <div class="social">
                                            <a><FaFacebookSquare className='icon' /></a>
                                            <a><FaInstagramSquare className='icon' /></a>
                                            <a><FaLinkedin className='icon' /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default OurDoctors