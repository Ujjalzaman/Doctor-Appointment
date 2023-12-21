import React from 'react';
import image from '../../../images/ema.png';

const TestimonialDetails = ({testimonial}) => {
    return (
        <div className="text-center review-section">
            <div className="card shadow-lg">
                <div className="card-body">
                    <img className="qute-img" src={image} alt="" />
                    <p className="card-text text-center"> {testimonial?.description}</p>
                </div>
                <div className="cart-footer d-flex align-items-center mb-4 justify-content-center">
                    <img src={image} alt="" className="footer-img me-3" />
                    <div>
                        <h6 className="text-primary testName">{testimonial?.patient?.firstName + ' ' + testimonial?.patient?.lastName}</h6>
                        <p className="">{testimonial?.star}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetails;