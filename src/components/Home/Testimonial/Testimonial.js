import React from 'react';
import TestimonialDetails from './TestimonialDetails';
import './Testimonial.css';
import { useGetAllReviewsQuery } from '../../../redux/api/reviewsApi';

const Testimonial = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery();
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, key) => (
                    <TestimonialDetails key={item?.id + key} testimonial={item}></TestimonialDetails>
                ))
            }
        </>
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
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;