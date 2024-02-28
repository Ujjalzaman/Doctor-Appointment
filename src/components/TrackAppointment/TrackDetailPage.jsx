import React from 'react'
import img from '../../images/avatar.jpg';
import './index.css';
import { FaCalendarCheck, FaRegClock, FaArrowAltCircleLeft } from "react-icons/fa";
import 'react-vertical-timeline-component/style.min.css';
import AppointmentTimeLine from './AppointmentTimeLine';
import { appointStatusDsc } from '../../constant/appointmentStatus';
import moment from 'moment';
import { Button } from 'antd';

const TrackDetailPage = ({ data, setShowInfo }) => {
  const patinetFirstName = data?.patient?.firstName ? data?.patient?.firstName : data?.firstName;
  const patinetLastName = data?.patient?.lastName ? data?.patient?.lastName : data?.lastName
  const doctorFirstName = data?.doctor?.firstName ? data?.doctor?.firstName : 'Not Setup yet'
  const doctorLastName = data?.doctor?.lastName ? data?.doctor?.lastName : ''
  return (
    <>
      <div className="container mb-2" style={{ marginTop: '8rem' }}>
        <Button type="primary" 
        icon={<FaArrowAltCircleLeft />} size='medium'
        onClick={() => setShowInfo(false)}
        >
          Back
        </Button>
      </div>
      <div className='container track-detail rounded'>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column gap-4 justify-content-around">

              <div className='card shadow-sm p-3 text-center shadow border-0 bg-success'>
                <div className='text-white'>
                  <h6 className='text-start text-primary text-uppercase text-black'>Patient</h6>
                  <div className='d-flex gap-2'>
                    <div className='img-div'>
                      {data?.patient?.img ? <img src={data?.patient?.img} alt='' /> : <img src={img} alt='' />}
                    </div>
                    <div className='text-start'>
                      <h6 className='mb-0 text-white'>{patinetFirstName + ' ' + patinetLastName}</h6>
                      <p className='form-text text-white'>{data?.patient?.address && data?.patient?.address + ',' + data?.patient?.city && data?.patient?.city}<br /> {data?.patient?.state + ',' + data?.patient?.country && data?.patient?.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=' card shadow-sm p-3 text-center shadow border-0 bg-danger text-white'>
                <div>
                  <h6 className='text-start text-uppercase text-black'>Doctor</h6>
                  <div className='d-flex gap-2'>
                    <div className='img-div'>
                      {data?.doctor?.img ? <img src={data?.doctor?.img} alt='' /> : <img src={img} alt='' />}
                    </div>
                    <div className='text-start'>
                      <h6 className='mb-0 text-white'>{doctorFirstName + ' ' + doctorLastName}</h6>
                      <p className='form-text text-white'>{data?.doctor?.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <h4 className='text-center text-capitalized'>Status : {data?.status}</h4>
            <p className='px-5 form-text text-center'>{appointStatusDsc.appointment[data?.status]}</p>

            <div className='d-flex justify-content-center mt-4'>
              <div className='text-center'>
                <h5>Meeting Schedule: </h5>
                <div className='text-secondary text-start'><FaCalendarCheck className='me-2' />Appointment Date : {moment(data?.scheduleDate).format("MMM Do YY")}</div>
                <div className='text-secondary text-start'><FaRegClock className='me-2' />Appointment Time : {data?.scheduleTime}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className='text-center mt-4 text-uppercase'>Appointment Timeline: </h4>
          <AppointmentTimeLine data={data} />
        </div>
      </div>
    </>
  )
}

export default TrackDetailPage