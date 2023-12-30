import moment from 'moment';
import img from '../../../images/doc/doctor 3.jpg';
import './BookingCheckout.css';

const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, data, selectedDate, selectTime }) => {
    const handleCheck = () => {
        setIsChecked(!isCheck)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="payment-widget">

                        <div className="payment-list">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="payment-radio credit-card-option">
                                        <input type="radio"
                                            name="paymentType"
                                            value="creditCard"
                                            onChange={(e) => handleChange(e)}
                                            checked={selectValue?.paymentType === 'creditCard'}
                                        />
                                        <span className="checkmark"></span>
                                        Credit card
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="payment-radio credit-card-option">
                                        <input type="radio"
                                            name="paymentType"
                                            value="cash"
                                            onChange={(e) => handleChange(e)}
                                            checked={selectValue?.paymentType === 'cash'}
                                        />
                                        <span className="checkmark"></span>
                                        Cash
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label">
                                        <label htmlFor="card_name">Name on Card</label>
                                        <input className="form-control" id="card_name" type="text" onChange={(e) => handleChange(e)} name='nameOnCard' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label">
                                        <label htmlFor="card_number">Card Number</label>
                                        <input className="form-control" id="card_number" placeholder="1234  5678  9876  5432" type="number" onChange={(e) => handleChange(e)} name='cardNumber' />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label htmlFor="expiry_month">Expiry Month</label>
                                        <input className="form-control" id="expiry_month" placeholder="MM" type="number" onChange={(e) => handleChange(e)} name='expiredMonth' />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label htmlFor="expiry_year">Expiry Year</label>
                                        <input className="form-control" id="expiry_year" placeholder="YY" type="number" onChange={(e) => handleChange(e)} name='cardExpiredYear' />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label">
                                        <label htmlFor="cvv">CVV</label>
                                        <input className="form-control" id="cvv" type="number" onChange={(e) => handleChange(e)} name='cvv' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="payment-list d-flex gap-2 mt-3">
                            <label className="payment-radio paypal-option">
                                <input type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => handleChange(e)}
                                    checked={selectValue?.paymentMethod === 'paypal'}
                                />
                                <span className="checkmark"></span>
                                Paypal
                            </label>
                            <label className="payment-radio paypal-option">
                                <input type="radio"
                                    name="paymentMethod"
                                    value="payoneer"
                                    onChange={(e) => handleChange(e)}
                                    checked={selectValue?.paymentMethod === 'payoneer'}
                                />
                                <span className="checkmark"></span>
                                Payoneer
                            </label>
                        </div>
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms_accept" className='me-2'
                                    checked={isCheck}
                                    onChange={handleCheck} />
                                <label htmlFor="terms_accept"> I have read and accept <a className='text-primary' style={{cursor:'pointer', textDecoration:'none'}}>Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-lg-4 theiaStickySidebar">
                    <div className="card booking-card">
                        <div className="card-body">
                            <div className="booking-doc-info">
                                <a href="doctor-profile.html" className="booking-doc-img">
                                    <img src={img} alt="" />
                                </a>
                                <div className="booking-info">
                                    <h4><a>Dr. {data?.firstName + ' ' + data?.lastName}</a></h4>
                                   
                                    <div className="clinic-details">
                                        <p className="doc-location"><i className="fas fa-map-marker-alt"></i> {data?.designation}</p>
                                        <p className="doc-location"><i className="fas fa-map-marker-alt"></i> {data?.clinicAddress}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-summary">
                                <div className="booking-item-wrap">
                                    <ul className="booking-date">
                                        <li>Date <span>{moment(selectedDate).format('LL')}</span></li>
                                        <li>Time <span>{selectTime}</span></li>
                                    </ul>
                                    <ul className="booking-fee">
                                        <li>Consulting Fee <span>${data?.price}</span></li>
                                        <li>Booking Fee <span>$10</span></li>
                                    </ul>
                                    <div className="booking-total">
                                        <ul className="booking-total-list">
                                            <li>
                                                <span>Total</span>
                                                <span className="total-cost">${(Number(data?.price) + 10)}</span>
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
    )
}
export default CheckoutPage;