import React from 'react';
import './Reviews.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/ema.png';
import img2 from '../../../images/john.png';
import { useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import { FaRegThumbsUp } from "react-icons/fa";
import moment from 'moment';
import StarRatings from 'react-star-ratings';

const Reviews = () => {
    const { data, isError, isLoading } = useGetDoctorReviewsQuery();

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, key) => (
                    <ul className="comments-list" key={item?.id + key}>
                        <li>
                            <div className="comment">
                                <img className="avatar rounded-circle" alt="User Image" src={img} />
                                <div className="comment-body">
                                    <div className="meta-data d-flex">
                                        <div>
                                            <span className="comment-author">{item?.patient?.firstName + ' ' + item?.patient?.lastName}</span>
                                            <span className="comment-date">Reviewed {moment(item?.createdAt).startOf('day').fromNow()}</span>
                                        </div>
                                        <div className="">
                                            <StarRatings
                                                rating={Number(item?.star)}
                                                starRatedColor="yellow"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                    </div>
                                    <p className="recommended"><FaRegThumbsUp /> {item?.isRecommended ? 'I recommend the doctor' : 'I do not recommend the doctor'}</p>
                                    <p className="comment-content">{item?.description}</p>
                                    <div className="comment-reply">
                                        <a className="comment-btn">
                                            <i className="fas fa-reply"></i> Reply
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {
                                item?.response &&
                                <ul className="comments-reply">
                                    <li>
                                        <div className="comment">
                                            <img className="avatar rounded-circle" alt="User Image" src={img2} />
                                            <div className="comment-body">
                                                <div className="meta-data">
                                                    <span className="comment-author">Dr. {item?.doctor?.firstName + ' ' + item?.doctor?.lastName}</span>
                                                </div>
                                                <p className="comment-content">
                                                    {item?.response}
                                                </p>
                                                <div className="comment-reply">
                                                    <a className="comment-btn" href="#">
                                                        <i className="fas fa-reply"></i> Reply
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            }

                        </li>
                    </ul>
                ))
            }
        </>
    return (
        <DashboardLayout>
            <div className='doc-review review-listing'>
                {content}
            </div>
        </DashboardLayout>
    )
}

export default Reviews;