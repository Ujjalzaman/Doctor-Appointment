import { useEffect, useState } from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import CheckoutPage from "../Booking/BookingCheckout/CheckoutPage";
import PersonalInformation from "../Booking/PersonalInformation";
import { Button, Steps, message } from "antd";
import moment from "moment";
import SelectApppointment from "./SelectApppointment";
import useAuthCheck from "../../redux/hooks/useAuthCheck";
import { useCreateAppointmentByUnauthenticateUserMutation } from "../../redux/api/appointmentApi";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/feature/invoiceSlice";
import { useNavigate } from "react-router-dom";

let initialValue = {
  paymentMethod: 'paypal',
  paymentType: 'creditCard',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  reasonForVisit: '',
  description: '',
  address: '',
  nameOnCard: '',
  cardNumber: '',
  expiredMonth: '',
  cardExpiredYear: '',
  cvv: '',
}
const AppointmentPage = () => {
  const dispatch = useDispatch();
  const {data, role} = useAuthCheck();
  const [current, setCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [isCheck, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState(initialValue);
  const [IsDisable, setIsDisable] = useState(true);
  const [isConfirmDisable, setIsConfirmDisable] = useState(true);
  const [patientId, setPatientId] = useState('');
  const navigation = useNavigate();

  const [createAppointmentByUnauthenticateUser, {data: appointmentData, isError, isSuccess, isLoading, error}] = useCreateAppointmentByUnauthenticateUserMutation()

  const handleChange = (e) => { setSelectValue({ ...selectValue, [e.target.name]: e.target.value }) };

  const next = () => { setCurrent(current + 1) };
  const prev = () => { setCurrent(current - 1) };

  useEffect(() => {
    const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
    const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
    const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
    setIsDisable(isInputEmpty);
    setIsConfirmDisable(isConfirmInputEmpty);
  }, [selectValue, isCheck]);
  
  const handleConfirmSchedule = () => {
    const obj = {};
    obj.patientInfo = {
      firstName: selectValue.firstName,
      lastName: selectValue.lastName,
      email: selectValue.email,
      phone: selectValue.phone,
      patientId: role !== '' && role === 'patient' ? data.id : undefined,
      scheduleDate: selectedDate,
      scheduleTime: selectTime,
    }
    obj.payment = {
      paymentType: selectValue.paymentType,
      paymentMethod: selectValue.paymentMethod,
      cardNumber: selectValue.cardNumber,
      cardExpiredYear: selectValue.cardExpiredYear,
      cvv: selectValue.cvv,
      expiredMonth: selectValue.expiredMonth,
      nameOnCard: selectValue.nameOnCard
    }
    createAppointmentByUnauthenticateUser(obj)
  }

  useEffect(() => {
    if (isSuccess) {
        message.success("Succcessfully Appointment Scheduled")
        setSelectValue(initialValue);
        dispatch(addInvoice({ ...appointmentData }))
        navigation(`/booking/success/${appointmentData?.id}`)
    }
    if (isError) {
        message.error(error?.data?.message);
    }
}, [isSuccess, isError, isLoading, appointmentData])

  const handleDateChange = (date) => { setSelectedDate(moment(date).format('YYYY-MM-DD HH:mm:ss')) }

  const steps = [
    {
      title: 'Select Appointment Date & Time',
      content: <SelectApppointment
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
        selectTime={selectTime}
        setSelectTime={setSelectTime}
      />
    },
    {
      title: 'Patient Information',
      content: <PersonalInformation handleChange={handleChange} selectValue={selectValue} setPatientId={setPatientId}/>
    },
    {
      title: 'Payment',
      content: <CheckoutPage
        handleChange={handleChange}
        selectValue={selectValue}
        isCheck={isCheck}
        setIsChecked={setIsChecked}
        data={false}
        selectedDate={selectedDate}
        selectTime={selectTime}
      />,
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '8rem', bottom: '5rem' }}>
        <div className="container" style={{ marginBottom: '12rem', marginTop: '8rem' }}>
          <Steps current={current} items={items} />
          <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
          <div className='text-end mx-3' >
            {current < steps.length - 1 && (
              <Button type="primary" size="large"
                disabled={current === 0 ? (selectTime ? false : true) : IsDisable || !selectTime}
                onClick={() => next()}>Next</Button>)}

            {current === steps.length - 1 && (<Button type="primary" size="large" disabled={isConfirmDisable} loading={isLoading} onClick={handleConfirmSchedule}>Confirm</Button>)}
            {current > 0 && (<Button style={{ margin: '0 8px', }} size="large" onClick={() => prev()} >Previous</Button>)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AppointmentPage