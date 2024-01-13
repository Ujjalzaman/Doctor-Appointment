import React from 'react';
import img from '../../../images/doc/doctor 3.jpg';
import moment from 'moment';
import { useGetPatientAppointmentsQuery, useGetPatientInvoicesQuery } from '../../../redux/api/appointmentApi';
import { useGetPatientPrescriptionQuery } from '../../../redux/api/prescriptionApi';
import { Button, Tabs } from 'antd';
import CustomTable from '../../UI/component/CustomTable';

const PatientDashboard = () => {
    const { data, isLoading: pIsLoading } = useGetPatientAppointmentsQuery();
    const { data: prescriptionData, prescriptionIsLoading } = useGetPatientPrescriptionQuery();
    const { data: invoices, isLoading: InvoicesIsLoading } = useGetPatientInvoicesQuery();

    const InvoiceColumns = [
        {
            title: 'Doctor',
            key: 1,
            width: 150,
            render: function (data) {
                return (
                    <div className="avatar avatar-sm mr-2 d-flex gap-2">
                        <div>
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                        </div>
                        <div>
                            <h6 className='text-nowrap mb-0'>{data?.appointment?.doctor?.firstName + ' ' + data?.appointment?.doctor?.lastName}</h6>
                            <p className='form-text'>{data?.appointment?.doctor?.designation}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Total Paid',
            key: 2,
            width: 100,
            dataIndex: "totalAmount"
        },
        {
            title: 'Paid On',
            key: 3,
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Payment Method',
            key: 4,
            width: 100,
            dataIndex: "paymentMethod"
        },
        {
            title: 'Payment Type',
            key: 4,
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
            key: 11,
            width: 150,
            render: function (data) {
                return <>
                    <div className="avatar avatar-sm mr-2 d-flex gap-2">
                        <div>
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                        </div>
                        <div>
                            <h6 className='text-nowrap mb-0'>{data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</h6>
                            <p className='form-text'>{data?.doctor?.designation}</p>
                        </div>
                    </div>
                </>
            }
        },

        {
            title: 'Appointment Date',
            key: 12,
            width: 100,
            render: function (data) {
                return <div>{moment(data?.appointment?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.appointment?.scheduleTime}</span></div>
            }
        },
        {
            title: 'Action',
            key: 13,
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
            key: 20,
            width: 150,
            render: function (data) {
                return <>
                    <div className="avatar avatar-sm mr-2 d-flex gap-2">
                        <div>
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                        </div>
                        <div>
                            <h6 className='text-nowrap mb-0'>{data?.doctor?.firstName + ' ' + data?.doctor?.lastName}</h6>
                            <p className='form-text'>{data?.doctor?.designation}</p>
                        </div>
                    </div>
                </>
            }
        },
        {
            title: 'App Date',
            key: 22,
            width: 100,
            render: function (data) {
                return (
                    <div>{moment(data?.scheduleDate).format("LL")} <span className="d-block text-info">{data?.scheduleTime}</span></div>
                )
            }
        },
        {
            title: 'Booking Date',
            key: 22,
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Status',
            key: 24,
            width: 100,
            render: function (data) {
                return <div>{data?.status}</div>
            }
        },
        {
            title: 'Action',
            key: 25,
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

    const items = [
        {
            key: '1',
            label: 'Appointment',
            children: <CustomTable
                loading={pIsLoading}
                columns={appointmentColumns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
        {
            key: '2',
            label: 'Prescription',
            children: <CustomTable
                loading={prescriptionIsLoading}
                columns={prescriptionColumns}
                dataSource={prescriptionData}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />

        },
        {
            key: '3',
            label: 'Billing',
            children: <CustomTable
                loading={InvoicesIsLoading}
                columns={InvoiceColumns}
                dataSource={invoices}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />
        },
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}
export default PatientDashboard;