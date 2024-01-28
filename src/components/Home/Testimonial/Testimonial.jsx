import React from 'react';
import './index.css';
import { useGetAllReviewsQuery } from '../../../redux/api/reviewsApi';
import StarRatings from 'react-star-ratings';
import { truncate } from '../../../utils/truncate';
import { FaCheckDouble } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

const Testimonial = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery({});
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.slice(0, 10)?.map((item, key) => (
                    <SwiperSlide key={item.id + key}>
                        <div className="card shadow p-3 border-0 my-5" key={item?.id + key} style={{ maxWidth: '600px' }}>
                            <div className='d-flex gap-2'>
                                <div className='review-img'>
                                    {item.patient.img &&<img src={item.patient.img} alt="" className='shadow' />}
                                </div>
                                <div>
                                    <h5 className='text-secondary'>{item?.patient?.firstName + ' ' + item?.patient?.lastName}</h5>
                                </div>
                            </div>

                            <p className="text-start text-secondary" style={{minHeight:'72px', overflow:'hidden'}}> {truncate(item?.description, 150)}</p>
                            <div>
                                <p className='recomended'><FaCheckDouble /> Recomended</p>
                                <StarRatings
                                    rating={5}
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    name='rating'
                                    className="star"
                                    starDimension="20px"
                                    starSpacing="5px"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </>
    return (
        <div className="container" style={{ marginTop: "10rem", marginBottom: "10rem" }}>
            <div className='mb-5 section-title text-center'>
                <h2>TESTIMONIAL</h2>
                <p className='m-0 text-secondary'>What Our Patients Says.</p>
            </div>
            <div className="row d-flex justify-content-center">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={2}
                    modules={[Navigation, Autoplay]}
                    navigation={true}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                >
                    {content}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;