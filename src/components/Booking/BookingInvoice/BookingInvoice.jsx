import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import BreadCrumb from '../../UI/BreadCrumb';
import Footer from '../../Shared/Footer/Footer';
import logo from '../../../images/logo.png';
import './BookingInvoice.css';


const BookingInvoice = () => {
    return (
        <>
            <Navbar />
            <BreadCrumb />

            <div class="content" style={{marginBottom:'7rem'}}>
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-lg-8 offset-lg-2">
                            <div class="invoice-content">
                                <div class="invoice-item">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="invoice-logo">
                                                <img src={logo} alt="logo" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="invoice-details">
                                                <strong>Order:</strong> #00124 <br />
                                                <strong>Issued:</strong> 20/07/2019
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="invoice-item">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="invoice-info">
                                                <strong class="customer-text">Invoice From</strong>
                                                <p class="invoice-details invoice-details-two">
                                                    Dr. Darren Elder <br />
                                                    806  Twin Willow Lane, Old Forge,<br />
                                                    Newyork, USA <br />
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="invoice-info invoice-info2">
                                                <strong class="customer-text">Invoice To</strong>
                                                <p class="invoice-details">
                                                    Walter Roberson <br />
                                                    299 Star Trek Drive, Panama City, <br />
                                                    Florida, 32405, USA <br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-item">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="invoice-info">
                                                <strong class="customer-text">Payment Method</strong>
                                                <p class="invoice-details invoice-details-two">
                                                    Debit Card <br />
                                                    XXXXXXXXXXXX-2541 <br />
                                                    HDFC Bank<br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="invoice-item invoice-table-wrap">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="invoice-table table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Description</th>
                                                            <th class="text-center">Quantity</th>
                                                            <th class="text-center">VAT</th>
                                                            <th class="text-right">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>General Consultation</td>
                                                            <td class="text-center">1</td>
                                                            <td class="text-center">$0</td>
                                                            <td class="text-right">$100</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Video Call Booking</td>
                                                            <td class="text-center">1</td>
                                                            <td class="text-center">$0</td>
                                                            <td class="text-right">$250</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-xl-4 ml-auto">
                                            <div class="table-responsive">
                                                <table class="invoice-table-two table">
                                                    <tbody>
                                                        <tr>
                                                            <th>Subtotal:</th>
                                                            <td><span>$350</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Discount:</th>
                                                            <td><span>-10%</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total Amount:</th>
                                                            <td><span>$315</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="other-info">
                                    <h4>Other information</h4>
                                    <p class="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
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
export default BookingInvoice;