import React from 'react';

const TestimonialDetails = (props) => {
    const {quote, name, from , img } = props.testimonial; 
    return (
        <div className="col-md-4 col-sm-6 col-12 text-center">
            <div className="card shadow">
                <div className="card-body">
                    <p className="card-text text-center"> {quote}</p>
                </div>
                <div className="cart-footer d-flex align-items-center">
                    <img src={img} alt=""  className="px-3" />
                </div>
                <div>
                    <h6 className="text-primary">{name}</h6>
                    <p className="m-0">{from}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetails;