import React, { useState } from 'react';
import img from '../../images/john.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment';
import { useGetPatientAppointmentsQuery, useGetPatientInvoicesQuery } from '../../redux/api/appointmentApi';
import { useGetPatientPrescriptionQuery } from '../../redux/api/prescriptionApi';
import CustomTable from './component/CustomTable';
import { Button } from 'antd';

const PatientAppointments = () => {
    const [, setKey] = useState('appointment');
    const { data, isLoading: pIsLoading } = useGetPatientAppointmentsQuery();
    const { data: prescriptionData, prescriptionIsLoading } = useGetPatientPrescriptionQuery();
    const { data: invoices, isLoading: InvoicesIsLoading } = useGetPatientInvoicesQuery();
  
    const InvoiceColumns = [
        {
            title: 'Doctor',
            key: '1',
            width: 150,
            render: function (data) {
                return (
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.appointment?.doctor?.firstName + ' ' + data?.appointment?.doctor?.lastName}</p>
                                <p className='p-0 m-0'>{data?.appointment?.doctor?.designation}</p>
                            </div>
                        </a>
                    </div>
                )
            }
        },
        {
            title: 'Total Paid',
            key: '2',
            width: 100,
            dataIndex: "totalAmount"
        },
        {
            title: 'Paid On',
            key: '3',
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Payment Method',
            key: '4',
            width: 100,
            dataIndex: "paymentMethod"
        },
        {
            title: 'Payment Type',
            key: '4',
            width: 100,
            dataIndex: "paymentType"
        },
        {
            title: 'Action',
            key: '5',
            width: 100,
            render: function (data) {
                return (
                    <div>
                        <Button type='primary' href={`/booking/invoice/${data?.id}`}>View</Button>
                    </div>
                )
            }
        },
    ];
    const prescriptionColumns = [
        {
            title: 'App Doctor',
            key: '1',
            width: 150,
            render: function (data) {
                return <>
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</p>
                                <p className='p-0 m-0'>{data?.doctor?.designation}</p>
                            </div>
                        </a>
                    </div>
                </>
            }
        },

        {
            title: 'Appointment Date',
            key: '2',
            width: 100,
            render: function (data) {
                return <div>{moment(data?.appointment?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.appointment?.scheduleTime}</span></div>
            }
        },
        {
            title: 'Action',
            key: '5',
            width: 100,
            render: function (data) {
                return (
                    <div>
                        <Button type='primary'>View</Button>
                    </div>
                )
            }
        },
    ];
    const appointmentColumns = [
        {
            title: 'Doctor',
            key: '1',
            width: 100,
            render: function (data) {
                return <>
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</p>
                                <p className='p-0 m-0'>{data?.doctor?.designation}</p>
                            </div>
                        </a>
                    </div>
                </>
            }
        },
        {
            title: 'App Date',
            key: '2',
            width: 100,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                )
            }
        },
        {
            title: 'Booking Date',
            key: '3',
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Status',
            key: '4',
            width: 100,
            render: function (data) {
                return <div>{data?.status}</div>
            }
        },
        {
            title: 'Action',
            key: '5',
            width: 100,
            render: function (data) {
                return (
                    <div>
                        <Button type='primary'>View</Button>
                    </div>
                )
            }
        },
    ];
    return (
        <Tabs
            defaultActiveKey="appointment"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="appointment" title="Appointment">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <CustomTable
                                loading={pIsLoading}
                                columns={appointmentColumns}
                                dataSource={data}
                                showPagination={true}
                                pageSize={10}
                                showSizeChanger={true}
                            />
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Prescription" title="Prescription">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <CustomTable
                                loading={prescriptionIsLoading}
                                columns={prescriptionColumns}
                                dataSource={prescriptionData}
                                showPagination={true}
                                pageSize={10}
                                showSizeChanger={true}
                            />
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="Billing" title="Billing">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <CustomTable
                                loading={InvoicesIsLoading}
                                columns={InvoiceColumns}
                                dataSource={invoices}
                                showPagination={true}
                                pageSize={10}
                                showSizeChanger={true}
                            />
                        </div>
                    </div>
                </div>
            </Tab>
        </Tabs>
    )
}
export default PatientAppointments