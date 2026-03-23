import { useEffect, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import CheckoutPage from '../Booking/BookingCheckout/CheckoutPage';
import PersonalInformation from '../Booking/PersonalInformation';
import { Button, Steps, message, Modal } from 'antd';
import moment from 'moment';
import SelectApppointment from './SelectApppointment';
import SelectDoctor from './SelectDoctor';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { useCreateAppointmentMutation } from '../../redux/api/appointmentApi';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../../redux/feature/invoiceSlice';
import { useNavigate } from 'react-router-dom';
import { visitReasonOptions } from '../../constant/global';
import './AppointmentFlow.css';

const initialValue = {
  paymentMethod: 'paypal',
  paymentType: 'creditCard',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  reasonForVisit: '',
  problemType: '',
  description: '',
  address: '',
  nameOnCard: '',
  cardNumber: '',
  expiredMonth: '',
  cardExpiredYear: '',
  cvv: '',
};

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const { data, role } = useAuthCheck();
  const [current, setCurrent] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [isCheck, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState(initialValue);
  const [IsDisable, setIsDisable] = useState(true);
  const [isConfirmDisable, setIsConfirmDisable] = useState(true);
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const [createAppointment, { data: appointmentData, isError, isSuccess, isLoading, error }] =
    useCreateAppointmentMutation();

  const handleChange = (e) => setSelectValue({ ...selectValue, [e.target.name]: e.target.value });

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  useEffect(() => {
    const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit, paymentType } =
      selectValue;
    const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
    const cardFilled = nameOnCard && cardNumber && expiredMonth && cardExpiredYear && cvv;
    const isConfirmInputEmpty =
      !isCheck || (paymentType === 'creditCard' ? !cardFilled : false);
    setIsDisable(isInputEmpty);
    setIsConfirmDisable(isConfirmInputEmpty);
  }, [selectValue, isCheck]);

  const handleConfirmSchedule = () => {
    const obj = {};
    const isPatientSession = role === 'patient' && data?.id;

    obj.patientInfo = {
      firstName: selectValue.firstName,
      lastName: selectValue.lastName,
      email: selectValue.email,
      phone: selectValue.phone,
      patientId: isPatientSession ? data.id : undefined,
      scheduleDate: selectedDate,
      scheduleTime: selectTime,
      reasonForVisit: [
        selectValue.problemType && visitReasonOptions.find((o) => o.value === selectValue.problemType)?.label,
        selectValue.reasonForVisit,
      ]
        .filter(Boolean)
        .join(' — ') || selectValue.reasonForVisit,
      description: selectValue.description || undefined,
      address: selectValue.address || undefined,
      ...(selectedDoctor?.id && { doctorId: selectedDoctor.id }),
    };
    obj.payment = {
      paymentType: selectValue.paymentType,
      paymentMethod: selectValue.paymentMethod,
      cardNumber: selectValue.cardNumber,
      cardExpiredYear: selectValue.cardExpiredYear,
      cvv: selectValue.cvv,
      expiredMonth: selectValue.expiredMonth,
      nameOnCard: selectValue.nameOnCard,
    };
    createAppointment(obj);
  };

  useEffect(() => {
    if (isSuccess && appointmentData?.id) {
      message.success('Appointment scheduled successfully');
      setSelectValue(initialValue);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectTime('');
      setCurrent(0);
      dispatch(addInvoice({ ...appointmentData }));

      const goToSuccess = () => navigate(`/booking/success/${appointmentData.id}`);
      Modal.success({
        className: 'appointment-success-modal',
        title: 'Appointment scheduled',
        content: 'Confirmation and details have been sent to your email. You will be redirected to your booking shortly.',
        okText: 'View booking',
        onOk: goToSuccess,
      });
      const t = setTimeout(goToSuccess, 4000);
      return () => clearTimeout(t);
    }
    if (isError) {
      message.error(error?.data?.message || 'Something went wrong');
    }
  }, [isSuccess, isError, appointmentData, error, dispatch, navigate]);

  const handleDateChange = (date) => setSelectedDate(moment(date).format('YYYY-MM-DD HH:mm:ss'));

  const steps = [
    {
      title: 'Select Doctor',
      content: (
        <SelectDoctor selectedDoctor={selectedDoctor} onSelect={setSelectedDoctor} />
      ),
    },
    {
      title: 'Date & Time',
      content: (
        <SelectApppointment
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          selectedDoctor={selectedDoctor}
        />
      ),
    },
    {
      title: 'Patient Information',
      content: (
        <PersonalInformation
          handleChange={handleChange}
          selectValue={selectValue}
          setPatientId={setPatientId}
        />
      ),
    },
    {
      title: 'Payment',
      content: (
        <CheckoutPage
          handleChange={handleChange}
          selectValue={selectValue}
          isCheck={isCheck}
          setIsChecked={setIsChecked}
          data={selectedDoctor ? { ...selectedDoctor, price: 60 } : false}
          selectedDate={selectedDate}
          selectTime={selectTime}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const canProceedStep0 = !!selectedDoctor;
  const canProceedStep1 = !!selectTime && !!selectedDate;

  return (
    <>
      <Header />
      <div className="appointment-page">
        <div className="container container-wrap">
          <Steps current={current} items={items} />
          <div className="appointment-step">{steps[current].content}</div>
          <div className="appointment-actions">
            <div>
              {current > 0 && (
                <Button type="default" size="large" onClick={prev}>
                  Previous
                </Button>
              )}
            </div>
            <div>
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  size="large"
                  disabled={
                    current === 0
                      ? !canProceedStep0
                      : current === 1
                        ? !canProceedStep1
                        : IsDisable
                  }
                  onClick={next}
                >
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  size="large"
                  disabled={isConfirmDisable}
                  loading={isLoading}
                  onClick={handleConfirmSchedule}
                >
                  Confirm & schedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentPage;
