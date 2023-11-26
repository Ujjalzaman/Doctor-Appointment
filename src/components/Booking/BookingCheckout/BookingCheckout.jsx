import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import BreadCrumb from '../../UI/BreadCrumb';
import img from '../../../images/doc/doctor 3.jpg';
import './BookingCheckout.css';
import { Link } from 'react-router-dom';

const BookingCheckout = () => {
    return (
        <>
            <Navbar />
            <BreadCrumb />
            <div class="content" style={{ margin: '7rem 0' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 col-lg-8">
                            <div class="card">
                                <div class="card-body">

                                    <form action="">

                                        <div class="info-widget">
                                            <h4 class="card-title">Personal Information</h4>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-12">
                                                    <div class="form-group card-label">
                                                        <label>First Name</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12">
                                                    <div class="form-group card-label">
                                                        <label>Last Name</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12">
                                                    <div class="form-group card-label">
                                                        <label>Email</label>
                                                        <input class="form-control" type="email" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-12">
                                                    <div class="form-group card-label">
                                                        <label>Phone</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="exist-customer">Existing Customer? <a href="#">Click here to login</a></div>
                                        </div>

                                        <div class="payment-widget">
                                            <h4 class="card-title">Payment Method</h4>

                                            <div class="payment-list">
                                                <label class="payment-radio credit-card-option">
                                                    <input type="radio" name="radio" checked />
                                                    <span class="checkmark"></span>
                                                    Credit card
                                                </label>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group card-label">
                                                            <label for="card_name">Name on Card</label>
                                                            <input class="form-control" id="card_name" type="text" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group card-label">
                                                            <label for="card_number">Card Number</label>
                                                            <input class="form-control" id="card_number" placeholder="1234  5678  9876  5432" type="text" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group card-label">
                                                            <label for="expiry_month">Expiry Month</label>
                                                            <input class="form-control" id="expiry_month" placeholder="MM" type="text" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group card-label">
                                                            <label for="expiry_year">Expiry Year</label>
                                                            <input class="form-control" id="expiry_year" placeholder="YY" type="text" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group card-label">
                                                            <label for="cvv">CVV</label>
                                                            <input class="form-control" id="cvv" type="text" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="payment-list">
                                                <label class="payment-radio paypal-option">
                                                    <input type="radio" name="radio" />
                                                    <span class="checkmark"></span>
                                                    Paypal
                                                </label>
                                            </div>
                                            <div class="terms-accept">
                                                <div class="custom-checkbox">
                                                    <input type="checkbox" id="terms_accept" />
                                                    <label for="terms_accept">I have read and accept <a href="#">Terms &amp; Conditions</a></label>
                                                </div>
                                            </div>
                                            <div class="submit-section mt-4">
                                                <Link to={'/booking/success'}>
                                                    <button type="submit" class="btn btn-primary submit-btn">Confirm and Pay</button>
                                                </Link>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>

                        <div class="col-md-5 col-lg-4 theiaStickySidebar">

                            <div class="card booking-card">
                                <div class="card-header">
                                    <h4 class="card-title">Booking Summary</h4>
                                </div>
                                <div class="card-body">

                                    <div class="booking-doc-info">
                                        <a href="doctor-profile.html" class="booking-doc-img">
                                            <img src={img} alt="User Image" />
                                        </a>
                                        <div class="booking-info">
                                            <h4><a href="doctor-profile.html">Dr. Darren Elder</a></h4>
                                            <div class="rating">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star"></i>
                                                <span class="d-inline-block average-rating">35</span>
                                            </div>
                                            <div class="clinic-details">
                                                <p class="doc-location"><i class="fas fa-map-marker-alt"></i> Newyork, USA</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="booking-summary">
                                        <div class="booking-item-wrap">
                                            <ul class="booking-date">
                                                <li>Date <span>16 Nov 2019</span></li>
                                                <li>Time <span>10:00 AM</span></li>
                                            </ul>
                                            <ul class="booking-fee">
                                                <li>Consulting Fee <span>$100</span></li>
                                                <li>Booking Fee <span>$10</span></li>
                                                <li>Video Call <span>$50</span></li>
                                            </ul>
                                            <div class="booking-total">
                                                <ul class="booking-total-list">
                                                    <li>
                                                        <span>Total</span>
                                                        <span class="total-cost">$160</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default BookingCheckout