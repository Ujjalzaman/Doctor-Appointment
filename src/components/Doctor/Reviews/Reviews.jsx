import React from 'react';
import './Reviews.css';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import img from '../../../images/ema.png';
import img2 from '../../../images/john.png';
const Reviews = () => {
    return (
        <DashboardLayout>
            <ul class="comments-list">
                <li>
                    <div class="comment">
                        <img class="avatar rounded-circle" alt="User Image" src={img} />
                        <div class="comment-body">
                            <div class="meta-data">
                                <span class="comment-author">Richard Wilson</span>
                                <span class="comment-date">Reviewed 2 Days ago</span>
                                <div class="review-count rating">
                                    <i class="fas fa-star filled"></i>
                                    <i class="fas fa-star filled"></i>
                                    <i class="fas fa-star filled"></i>
                                    <i class="fas fa-star filled"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <p class="recommended"><i class="far fa-thumbs-up"></i> I recommend the doctor</p>
                            <p class="comment-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation.
                                Curabitur non nulla sit amet nisl tempus
                            </p>
                            <div class="comment-reply">
                                <a class="comment-btn" href="#">
                                    <i class="fas fa-reply"></i> Reply
                                </a>
                                <p class="recommend-btn">
                                    <span>Recommend?</span>
                                    <a href="#" class="like-btn">
                                        <i class="far fa-thumbs-up"></i> Yes
                                    </a>
                                    <a href="#" class="dislike-btn">
                                        <i class="far fa-thumbs-down"></i> No
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <ul class="comments-reply">

                        <li>
                            <div class="comment">
                                <img class="avatar rounded-circle" alt="User Image" src={img2} />
                                <div class="comment-body">
                                    <div class="meta-data">
                                        <span class="comment-author">Dr. Darren Elder</span>
                                        <span class="comment-date">Reviewed 3 Days ago</span>
                                    </div>
                                    <p class="comment-content">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam.
                                        Curabitur non nulla sit amet nisl tempus
                                    </p>
                                    <div class="comment-reply">
                                        <a class="comment-btn" href="#">
                                            <i class="fas fa-reply"></i> Reply
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