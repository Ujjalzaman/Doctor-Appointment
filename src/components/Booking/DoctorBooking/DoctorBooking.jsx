import React, { useEffect, useState } from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import BreadCrumb from '../../UI/BreadCrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Empty, Button, message, Steps } from 'antd';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { FaArchway } from "react-icons/fa";
import { useGetAppointmentTimeQuery } from '../../../redux/api/timeSlotApi';
import moment from 'moment';
import SelectDateAndTime from './SelectDateAndTime';
import PersonalInformation from '../BookingCheckout/PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import { useCreateAppointmentMutation } from '../../../redux/api/appointmentApi';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';

const DoctorBooking = () => {
    const dispatch = useDispatch();
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
    const [current, setCurrent] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelecDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [isCheck, setIsChecked] = useState(false);
    const [createAppointment, { data: appointmentData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createIsLoading }] = useCreateAppointmentMutation();
    const { doctorId } = useParams();
    const navigation = useNavigate();
    const { data, isLoading, isError, error } = useGetDoctorQuery(doctorId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: doctorId });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => { setSelectValue({ ...selectValue, [e.target.name]: e.target.value }) }

    useEffect(() => {
        const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
        const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck])

    useEffect(() => {
        if (createIsSuccess) {
            message.success("Succcessfully Appointment Scheduled")
            setSelectValue(initialValue);
            dispatch(addInvoice({ ...appointmentData }))
            navigation('/booking/success')
        }
        if (createIsError) {
            message.error(error?.data?.message);
        }
    }, [createIsSuccess, createError])

    const handleDateChange = (_date, dateString) => {
        setSelectedDate(dateString)
        setSelecDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    }
    const disabledDateTime = (current) => current && (current < moment().add(1, 'day').startOf('day') || current > moment().add(8, 'days').startOf("day"))
    const handleSelectTime = (date) => { setSelectTime(date) }

    const next = () => { setCurrent(current + 1) };
    const prev = () => { setCurrent(current - 1) };

    let dContent = null;
    if (dIsLoading) dContent = <div>Loading ...</div>
    if (!dIsLoading && dIsError) dContent = <div>Something went Wrong!</div>
    if (!dIsLoading && !dIsError && time.length === 0) dContent = <Empty children="Doctor Is not Available" />
    if (!dIsLoading && !dIsError && time.length > 0) dContent =
        <>
            {
                time && time.map((item, id) => (
                    <div className="col-md-4" key={id + 155}>
                        <Button type={item?.slot?.time === selectTime ? "primary" : "default"} shape="round" size='large' className='mb-3' onClick={() => handleSelectTime(item?.slot?.time)}> {item?.slot?.time} </Button>
                    </div>
                ))
            }
        </>

    //What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content =
        <>
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <div className="booking-doc-info">
                        <a href="doctor-profile.html" className="booking-doc-img">
                            <img src={img} alt="" />
                        </a>
                        <div className="booking-info">
                            <h4>
                                <Link to={'/doctors/profile'} style={{ textDecoration: 'none' }}>Dr. {data?.firstName + ' ' + data?.lastName}</Link>
                            </h4>
                            <p className=" mb-0"><FaArchway /> {data?.specialization + ',' + data?.experienceHospitalName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    const steps = [
        {
            title: 'Select Appointment Date & Time',
            content: <SelectDateAndTime
                content={content}
                handleDateChange={handleDateChange}
                disabledDateTime={disabledDateTime}
                selectedDate={selectedDate}
                dContent={dContent}
                selectTime={selectTime}
            />
        },
        {
            title: 'Patient Information',
            content: <PersonalInformation handleChange={handleChange} selectValue={selectValue} />
        },
        {
            title: 'Payment',
            content: <CheckoutPage
                handleChange={handleChange}
                selectValue={selectValue}
                isCheck={isCheck}
                setIsChecked={setIsChecked}
                data={data}
                selectedDate={selectedDate}
                selectTime={selectTime}
            />,
        },
    ]

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const handleConfirmSchedule = () => {
        const obj = {};
        obj.patientInfo = {
            firstName: selectValue.firstName,
            lastName: selectValue.lastName,
            email: selectValue.email,
            phone: selectValue.phone,
            patientId: selectValue.patientId,
            scheduleDate: selectedDate,
            scheduleTime: selectTime,
            doctorId: doctorId
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
        createAppointment(obj);
    }
    return (
        <>
            <Header />
            <BreadCrumb />
            <div style={{ marginBottom: '10rem' }}>
                <Steps current={current} items={items} />
                <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
                <div className='text-end mx-3' style={{ marginBottom: 48 }} >
                    {current < steps.length - 1 && (<Button type="primary"
                        disabled={current === 0 ? (selectTime ? false : true) : IsdDisable || !selectTime}
                        onClick={() => next()}>Next</Button>)}

                    {current === steps.length - 1 && (<Button type="primary" disabled={IsConfirmDisable} loading={createIsLoading} onClick={handleConfirmSchedule}>Confirm</Button>)}
                    {current > 0 && (<Button style={{ margin: '0 8px', }} onClick={() => prev()} >Previous</Button>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorBooking