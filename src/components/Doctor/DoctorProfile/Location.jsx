import React from 'react'

const Location = () => {
    return (
        <div className="location-list">
            <div className="row">

                <div className="col-md-6">
                    <div className="clinic-content">
                        <h4 className="clinic-name"><a href="#">Smile Cute Dental Care Center</a></h4>
                        <p className="doc-speciality">MDS - Periodontology and Oral Implantology, BDS</p>
                        <div className="rating">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">(4)</span>
                        </div>
                        <div className="clinic-details mb-0">
                            <h5 className="clinic-direction"> <i className="fas fa-map-marker-alt"></i> 2286  Sundown Lane, Austin, Texas 78749, USA <br /><a>Get Directions</a></h5>
                            <ul>
                                <li>
                                    <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery2">
                                        <img src="assets/img/features/feature-01.jpg" alt="Feature Image" />
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery2">
                                        <img src="assets/img/features/feature-02.jpg" alt="Feature Image" />
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery2">
                                        <img src="assets/img/features/feature-03.jpg" alt="Feature Image" />
                                    </a>
                                </li>
                                <li>
                                    <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery2">
                                        <img src="assets/img/features/feature-04.jpg" alt="Feature Image" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="clinic-timing">
                        <div>
                            <p className="timings-days">
                                <span> Mon - Sat </span>
                            </p>
                            <p className="timings-times">
                                <span>10:00 AM - 2:00 PM</span>
                                <span>4:00 PM - 9:00 PM</span>
                            </p>
                        </div>
                        <div>
                            <p className="timings-days">
                                <span>Sun</span>
                            </p>
                            <p className="timings-times">
                                <span>10:00 AM - 2:00 PM</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="consult-price">
                        $250
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location