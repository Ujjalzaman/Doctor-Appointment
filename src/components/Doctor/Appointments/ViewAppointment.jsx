import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleAppointmentQuery } from '../../../redux/api/appointmentApi';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import moment from 'moment';
import './index.css';
import { Button, Tag, Tooltip } from 'antd';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import { FaPrint } from "react-icons/fa";
import ReactToPrint from "react-to-print";

const ViewAppointment = () => {
    const ref = useRef();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleAppointmentQuery(id);

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (isLoading && !isError) content = <h2>Loading...</h2>
    if (!isLoading && !isError && data?.id) content =
        <>
            <page size="A4" className="container mx-auto border border-primary-subtle p-3 pb-3">
                <div className='d-flex justify-content-between rounded p-2' style={{ background: '#f2f4fe' }}>
                    <div>
                        <p className='form-text text-black mb-0'>Creation Date : <Tag bordered={false} color="volcano">{moment(data?.createdAt).format('LL')}</Tag></p>
                        <Tooltip title="Copy Tracking Id">
                            <Button>
                                <h6>Tracking<Tag color="#87d068" className='ms-2 text-uppercase' onClick={() => clickToCopyClipBoard(data?.trackingId)}>{data?.trackingId}</Tag></h6>
                            </Button>
                        </Tooltip>
                    </div>

                    <div style={{ fontWeight: 500 }}>
                        {data?.patientType &&
                        <p className='mb-1'>Patient Type : <Tag bordered={false} color="processing">{data?.patientType}</Tag></p>}
                        <p className='mb-1'>Current Status:  <Tag bordered={false} color="orange">{data?.status}</Tag></p>
                        <p className='mb-1'>Payment : <Tag bordered={false} color="success">{data?.paymentStatus}</Tag></p>
                        <p className='mb-1'>Prescription Status : <Tag bordered={false} color="green">{data?.prescriptionStatus}</Tag></p>
                    </div>
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold'>
                        APPOINTMENT INFOMATION
                    </h4>
                    <div className='border border-light-subtle rounded p-3'>
                        <p className='mb-1'>Place of Meeting : <Tag bordered={false} color="#f50">ONLINE</Tag></p>
                        <p className='mb-1'>Meeting Link : <a href="https://meet.google.com/udx-kieq-sng" target='_blank' rel='noreferrer'>https://meet.google.com/udx-kieq-sng</a></p>
                        <p className='mb-1'>Meeting Date : <Tag bordered={false} color="orange">{moment(data?.scheduleDate).format('LL')}</Tag></p>
                        <p className='mb-1'>Meeting Time : <Tag bordered={false} color="orange">{data?.scheduleTime}</Tag></p>
                    </div>
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold text-secondary'>DOCTOR INFOMATION</h4>
                    {
                        data?.doctor &&
                        <div className='border border-light-subtle rounded p-3 d-flex gap-3'>
                            <div>
                                <img src={data?.doctor?.img} alt="" style={{ border: '2px solid #ffbc21', width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                            </div>
                            <div>
                                <h4 className="mb-1">{data?.doctor?.firstName && data?.doctor?.lastName ? `${data.doctor.firstName} ${data.doctor.lastName}` : (data?.doctor?.firstName || data?.doctor?.lastName)}</h4>
                                <p className="mb-1">{data?.doctor?.specialization}</p>
                                <p className="mb-1 form-text">{data?.doctor?.designation}</p>
                                <p className="mb-1 form-text">{data?.doctor?.college}</p>
                            </div>
                        </div>
                    }
                </div>

                <div>
                    <h4 className='text-center my-3 fw-bold text-secondary'>PATIENT INFOMATION</h4>
                    <div className='border border-light-subtle rounded p-3 d-flex gap-3'>
                        <div>
                            <img src={data?.patient?.img} alt="" style={{ border: '2px solid #ffbc21', width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                        <div>

                            <h4 className="mb-1">{data?.patient?.firstName + ' ' + data?.patient?.lastName}</h4>
                            <p className="mb-1 form-text">Age : {moment().diff(moment(data?.patient?.dateOfBirth), 'years')}</p>
                            <p className="mb-1 form-text">Blood Group : {data?.patient?.bloodGroup}</p>
                            <p className="mb-1 form-text">{data?.patient?.city + ' , ' + data?.patient?.state + ' , ' + data?.patient?.country}</p>

                            <div className='mt-2'>
                                <p>Reason for Visit - <span className='text-warning'>{data?.reasonForVisit}</span></p>
                                <p className='text-warning'>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </page>
        </>
    return (
        <>
            <Header />
            <div style={{ margin: '10rem 7rem' }}>
                <div className="d-flex justify-content-end mb-4" style={{ marginRight: '8rem' }}>
                    <ReactToPrint
                        bodyClass="print-agreement"
                        content={() => ref.current}
                        trigger={() => (<Button type="primary" icon={<FaPrint />}> Print</Button>)}
                    />
                </div>
                <div ref={ref}>
                    {content}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewAppointment