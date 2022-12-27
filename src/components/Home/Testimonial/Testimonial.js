import React from 'react';
import ema from '../../../images/ema.png';
import john from '../../../images/john.png';
import watson from '../../../images/watson.png';
import TestimonialDetails from './TestimonialDetails';
import './Testimonial.css';

const ReviewData = [
    {
        quote: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dicta molestias fugiat consectetur repellat voluptatem laborum ex cum nam harum repellendus aliquam dolore perspiciatis reprehenderit exercitationem ut autem. Assumenda, atque.',
        name: 'john Due',
        from: 'Sylhet',
        img: john
    },
    {
        quote: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dicta molestias fugiat consectetur repellat voluptatem laborum ex cum nam harum repellendus aliquam dolore perspiciatis reprehenderit exercitationem ut autem. Assumenda, atque.',
        name: 'Ema Watson',
        from: 'Moulvibazar',
        img: ema
    },
    {
        quote: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dicta molestias fugiat consectetur repellat voluptatem laborum ex cum nam harum repellendus aliquam dolore perspiciatis reprehenderit exercitationem ut autem. Assumenda, atque.',
        name: 'watson',
        from: 'Dhaka',
        img: watson
    }

]

const Testimonial = () => {
    return (
        <section className="container testimonial my-5 py-5" id="reviewsContaints">
            <div className="cointainer">
                <div className="section-header py-5">
                    <h5 className="brand-color text-uppercase">Testimonial</h5>
                    <h1>What Our Patients <br /> Says</h1>
                </div>
                <div className="card-deck ">
                    <div className="d-flex justify-content-center ">
                        <div className="row w-80 ">
                            {
                                ReviewData.map(review => <TestimonialDetails key={review.name} testimonial={review}></TestimonialDetails>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;