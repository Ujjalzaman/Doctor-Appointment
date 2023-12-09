import React from 'react';
import './Reviews.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/ema.png';
import img2 from '../../../images/john.png';
const Reviews = () => {
    return (
        <DashboardLayout>
            <ul className="comments-list">
                <li>
                    <div className="comment">
                        <img className="avatar rounded-circle" alt="User Image" src={img} />
                        <div className="comment-body">
                            <div className="meta-data">
                                <span className="comment-author">Richard Wilson</span>
                                <span className="comment-date">Reviewed 2 Days ago</span>
                                <div className="review-count rating">
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star filled"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <p className="recommended"><i className="far fa-thumbs-up"></i> I recommend the doctor</p>
                            <p className="comment-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation.
                                Curabitur non nulla sit amet nisl tempus
                            </p>
                            <div className="comment-reply">
                                <a className="comment-btn" href="#">
                                    <i className="fas fa-reply"></i> Reply
                                </a>
                                <p className="recommend-btn">
                                    <span>Recommend?</span>
                                    <a href="#" className="like-btn">
                                        <i className="far fa-thumbs-up"></i> Yes
                                    </a>
                                    <a href="#" className="dislike-btn">
                                        <i className="far fa-thumbs-down"></i> No
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <ul className="comments-reply">

                        <li>
                            <div className="comment">
                                <img className="avatar rounded-circle" alt="User Image" src={img2} />
                                <div className="comment-body">
                                    <div className="meta-data">
                                        <span className="comment-author">Dr. Darren Elder</span>
                                        <span className="comment-date">Reviewed 3 Days ago</span>
                                    </div>
                                    <p className="comment-content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam.
                                        Curabitur non nulla sit amet nisl tempus
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

                </li>
            </ul>
        </DashboardLayout>
    )
}

export default Reviews;