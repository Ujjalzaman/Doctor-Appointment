import React from 'react'
import { Link } from 'react-router-dom';
import img from '../../../images/doc/doctor 3.jpg'
import StarRatings from 'react-star-ratings';

const Review = () => {
    return (
        <>
            <div className="widget review-listing">
                <ul className="comments-list">

                    <li>
                        <div className="comment">
                            <img className="avatar avatar-sm rounded-circle" alt="" src={img} />
                            <div className="comment-body">
                                <div className="meta-data">
                                    <div className='d-flex justify-content-between'>
                                        <span className="comment-author">Richard Wilson</span>
                                        <div>
                                            <span className="comment-date">Reviewed 2 Days ago</span>
                                            <StarRatings
                                                rating={5}
                                                starRatedColor="#f4c150"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="15px"
                                                starSpacing="2px"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="comment-content">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation.
                                    Curabitur non nulla sit amet nisl tempus
                                </p>

                            </div>
                        </div>

                        <ul className="comments-reply">
                            <li>
                                <div className="comment">
                                    <img className="avatar avatar-sm rounded-circle" alt="" src={img} />
                                    <div className="comment-body">
                                        <div className="meta-data">
                                            <span className="comment-author">Charlene Reed</span>
                                            <span className="comment-date">Reviewed 3 Days ago</span>
                                            <div className="review-count rating">
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="comment-content">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam.
                                            Curabitur non nulla sit amet nisl tempus
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </li>


                </ul>

                <div className="text-center">
                    <Link to={'/'} className='more-btn'>Show all feedback <strong>(167)</strong></Link>
                </div>

            </div>

            <div className="write-review">
                <h4>Write a review for <strong>Dr. Darren Elder</strong></h4>

                <form>
                    <div className="form-group">
                        <label>Review</label>

                    </div>
                    <div className="form-group">
                        <label>Title of your review</label>
                        <input className="form-control" type="text" placeholder="Write..." />
                    </div>
                    <div className="form-group">
                        <label>Your review</label>
                        <textarea id="review_desc" maxlength="100" className="form-control"></textarea>

                        <div className="d-flex justify-content-between mt-3">
                            <small className="text-muted"><span id="chars">100</span> characters remaining</small></div>
                    </div>
                    <hr />

                    <div className="submit-section">
                        <button type="submit" className="btn btn-primary submit-btn btn-sm">Add Review</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Review