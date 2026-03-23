import React from 'react';
import img from '../../../images/doc/doctor 3.jpg';
import moment from 'moment';
import { useGetPatientAppointmentsQuery, useGetPatientInvoicesQuery } from '../../../redux/api/appointmentApi';
import { useGetPatientPrescriptionQuery } from '../../../redux/api/prescriptionApi';
import { Button, Tabs, Tag, Tooltip } from 'antd';
import CustomTable from '../../UI/component/CustomTable';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FaRegEye } from "react-icons/fa";
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';

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
                    <Link to={`/booking/invoice/${data?.appointment?.id}`}>
                        <Button type='primary' size='medium'>View</Button>

                    </Link>
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
            title: 'Appointment Id',
            dataIndex: "appointment",
            key: 1,
            render: ({trackingId}) =>{
                return (
                    <Tooltip title="Copy Tracking Id">
                            <Button>
                                <h6><Tag color="#87d068" className='ms-2 text-uppercase' onClick={() => clickToCopyClipBoard(trackingId)}>{trackingId}</Tag></h6>
                            </Button>
                        </Tooltip>
                )
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
            title: 'Follow-Update',
            dataIndex: "followUpdate",
            key: 4,
            render: function (data) {
                return <Tag color="#87d068">{dayjs(data).format('MMM D, YYYY hh:mm A')}</Tag>;
            }
        },
        {
            title: 'Archived',
            dataIndex: "isArchived",
            key: 4,
            render: function ({isArchived}) {
                return <Tag color={isArchived ? "#f50" : "#108ee9"}>{isArchived ? "Yes" :"Under Treatment"}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 13,
            width: 100,
            render: function (data) {
                return (
                    <div className='d-flex'>
                        <Link to={`/dashboard/prescription/${data.id}`}>
                            <Button type='primary' size='small' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaRegEye />
                            </Button>
                        </Link>
                        {/* <Link to={`/dashboard/appointment/treatment/edit/${data.id}`}>
                            <Button type='primary' size='small' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaEdit />
                            </Button>
                        </Link> */}
                        {/* <Button onClick={() => deleteHandler(data.id)} size='small' type='primary' style={{ margin: "5px 5px" }} danger>
                            <FaRegTimesCircle />
                        </Button> */}
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
                return <Tag color="#f50">{data?.status}</Tag>
            }
        },
        {
            title: 'Action',
            key: 25,
            width: 100,
            render: function (data) {
                return (
                    <Link to={`/dashboard/appointments/${data.id}`}>
                        <Button type='primary'>View</Button>
                    </Link>
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