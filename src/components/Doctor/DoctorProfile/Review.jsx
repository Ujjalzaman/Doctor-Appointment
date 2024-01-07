import React from 'react'

const Review = () => {
    return (
        <>
            <div className="widget review-listing">
                <ul className="comments-list">

                    <li>
                        <div className="comment">
                            <img className="avatar avatar-sm rounded-circle" alt="" src="assets/img/patients/patient.jpg" />
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
                                    <img className="avatar avatar-sm rounded-circle" alt="" src="assets/img/patients/patient1.jpg" />
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
                            </li>
                        </ul>

                    </li>
                    <li>
                        <div className="comment">
                            <img className="avatar avatar-sm rounded-circle" alt="" src="assets/img/patients/patient2.jpg" />
                            <div className="comment-body">
                                <div className="meta-data">
                                    <span className="comment-author">Travis Trimble</span>
                                    <span className="comment-date">Reviewed 4 Days ago</span>
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
                    </li>

                </ul>

                <div className="all-feedback text-center">
                    <a href="#" className="btn btn-primary btn-sm">
                        Show all feedback <strong>(167)</strong>
                    </a>
                </div>

            </div>
            <div className="write-review">
                <h4>Write a review for <strong>Dr. Darren Elder</strong></h4>

                <form>
                    <div className="form-group">
                        <label>Review</label>
                        <div className="star-rating">
                            <input id="star-5" type="radio" name="rating" value="star-5" />
                            <label for="star-5" title="5 stars">
                                <i className="active fa fa-star"></i>
                            </label>
                            <input id="star-4" type="radio" name="rating" value="star-4" />
                            <label for="star-4" title="4 stars">
                                <i className="active fa fa-star"></i>
                            </label>
                            <input id="star-3" type="radio" name="rating" value="star-3" />
                            <label for="star-3" title="3 stars">
                                <i className="active fa fa-star"></i>
                            </label>
                            <input id="star-2" type="radio" name="rating" value="star-2" />
                            <label for="star-2" title="2 stars">
                                <i className="active fa fa-star"></i>
                            </label>
                            <input id="star-1" type="radio" name="rating" value="star-1" />
                            <label for="star-1" title="1 star">
                                <i className="active fa fa-star"></i>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Title of your review</label>
                        <input className="form-control" type="text" placeholder="If you could say it in one sentence, what would you say?" />
                    </div>
                    <div className="form-group">
                        <label>Your review</label>
                        <textarea id="review_desc" maxlength="100" className="form-control"></textarea>

                        <div className="d-flex justify-content-between mt-3"><small className="text-muted"><span id="chars">100</span> characters remaining</small></div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="terms_accept" />
                                <label for="terms_accept">I have read and accept <a href="#">Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                    </div>
                    <div className="submit-section">
                        <button type="submit" className="btn btn-primary submit-btn">Add Review</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Review