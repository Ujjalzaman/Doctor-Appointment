import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Input, Checkbox } from 'antd';
import { FaUserMd } from 'react-icons/fa';
import img from '../../../images/avatar.jpg';
import './BookingCheckout.css';
import '../../Appointment/AppointmentFlow.css';

const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, data, selectedDate, selectTime }) => {
  const { nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, paymentType, paymentMethod } = selectValue;

  const handleCheck = () => setIsChecked(!isCheck);

  const price = data?.price ?? 60;
  const doctorImg = data?.img ?? img;
  const vat = (15 / 100) * (Number(price) + 10);
  const total = Number(price) + 10 + vat;

  const fullName = data
    ? `Dr. ${(data.firstName || '')} ${(data.lastName || '')}`.trim()
    : 'Doctor';

  return (
    <div className="appointment-step appointment-step--payment">
      <p className="appointment-step__title">Payment</p>
      <p className="appointment-step__subtitle">Complete your booking with secure payment.</p>

      <div className="checkout-layout">
        <div>
          <Card className="checkout-form-card">
            <p className="checkout-form-card__title">Payment method</p>
            <div className="payment-method-options">
              <div
                className={`payment-method-option ${paymentType === 'creditCard' ? 'payment-method-option--active' : ''}`}
                onClick={() => handleChange({ target: { name: 'paymentType', value: 'creditCard' } })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleChange({ target: { name: 'paymentType', value: 'creditCard' } })}
              >
                Credit / Debit card
              </div>
              <div
                className={`payment-method-option ${paymentType === 'cash' ? 'payment-method-option--active' : ''}`}
                onClick={() => handleChange({ target: { name: 'paymentType', value: 'cash' } })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleChange({ target: { name: 'paymentType', value: 'cash' } })}
              >
                Pay at clinic (cash)
              </div>
            </div>

            {paymentType === 'creditCard' && (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-12">
                    <label className="form-label">Name on card</label>
                    <Input
                      placeholder="Name as on card"
                      name="nameOnCard"
                      value={nameOnCard || ''}
                      onChange={handleChange}
                      size="large"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Card number</label>
                    <Input
                      placeholder="1234 5678 9876 5432"
                      name="cardNumber"
                      value={cardNumber || ''}
                      onChange={handleChange}
                      size="large"
                      maxLength={19}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Expiry month</label>
                    <Input
                      placeholder="MM"
                      name="expiredMonth"
                      value={expiredMonth || ''}
                      onChange={handleChange}
                      size="large"
                      maxLength={2}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Expiry year</label>
                    <Input
                      placeholder="YY"
                      name="cardExpiredYear"
                      value={cardExpiredYear || ''}
                      onChange={handleChange}
                      size="large"
                      maxLength={2}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">CVV</label>
                    <Input
                      placeholder="CVV"
                      name="cvv"
                      value={cvv || ''}
                      onChange={handleChange}
                      size="large"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="payment-method-options">
                  <div
                    className={`payment-method-option ${paymentMethod === 'paypal' ? 'payment-method-option--active' : ''}`}
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'paypal' } })}
                    role="button"
                    tabIndex={0}
                  >
                    PayPal
                  </div>
                  <div
                    className={`payment-method-option ${paymentMethod === 'payoneer' ? 'payment-method-option--active' : ''}`}
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'payoneer' } })}
                    role="button"
                    tabIndex={0}
                  >
                    Payoneer
                  </div>
                </div>
              </>
            )}

            <div className="terms-accept mt-4">
              <Checkbox id="terms_accept" checked={isCheck} onChange={handleCheck}>
                I have read and accept the{' '}
                <a className="text-primary" href="#terms" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                  Terms &amp; Conditions
                </a>
              </Checkbox>
            </div>
          </Card>
        </div>

        <div>
          <Card className="order-summary-card">
            {data && (
              <div className="text-center mb-3">
                <Link to={`/doctors/profile/${data?.id}`} className="booking-doc-img d-block mb-2">
                  {doctorImg ? (
                    <img src={doctorImg} alt={fullName} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div className="select-doctor-card__placeholder" style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto' }}>
                      <FaUserMd style={{ fontSize: '2rem' }} />
                    </div>
                  )}
                </Link>
                <h5 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>{fullName}</h5>
                <p className="form-text mb-0 small">{data?.designation}</p>
              </div>
            )}
            <div className="summary-row">
              <span>Date</span>
              <span>{selectedDate ? moment(selectedDate).format('LL') : '—'}</span>
            </div>
            <div className="summary-row">
              <span>Time</span>
              <span>{selectTime || '—'}</span>
            </div>
            <div className="summary-row">
              <span>Consultation fee</span>
              <span>${price}</span>
            </div>
            <div className="summary-row">
              <span>Booking fee</span>
              <span>$10</span>
            </div>
            <div className="summary-row">
              <span>VAT (15%)</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span className="amount">${total.toFixed(2)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
