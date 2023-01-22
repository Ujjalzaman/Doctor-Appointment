import React from 'react';
import image from '../../../images/message.png';

const TestimonialDetails = ({testimonial}) => {
    return (
        <div className="col-md-4 col-sm-6 col-12 text-center review-section">
            <div className="card shadow-lg">

                <div className="card-body">
                    <img className="qute-img" src={image} alt="" />
                    <p className="card-text text-center"> {testimonial.desc}</p>
                </div>
                <div className="cart-footer d-flex align-items-center mb-4 justify-content-center">
                    {/* <img src={img} alt="" className="footer-img me-3" /> */}
                    <div>
                        <h6 className="text-primary testName">{testimonial.name}</h6>
                        <p className="">{testimonial.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetails;