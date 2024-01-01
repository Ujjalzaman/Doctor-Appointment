import React, { useState } from 'react'
import './DoctorDashboardPatient';
import img from '../../images/john.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import { FaEye } from "react-icons/fa";
import { useGetDoctorAppointmentsQuery } from '../../redux/api/appointmentApi';
import moment from 'moment';
import CustomTable from './component/CustomTable';
import { Button } from 'antd';

const DoctorDashboardPatient = () => {
    const [key, setKey] = useState('upcoming');

    const handleOnselect = (value) => {
        setKey(value === 'upcoming' ? 'today' : 'upcoming')
        refetch();
    }
    const { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({ sortBy: key });

    const upcomingColumns = [
        {
            title: 'Patient Nam',
            key: '1',
            width: 100,
            render: function (data) {
                return <>
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <div>
                                <p className='p-0 m-0 text-nowrap'>{data?.patient?.firstName + ' ' + data?.patient?.lastName}</p>
                                <p className='p-0 m-0'>{data?.patient?.designation}</p>
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
                    <div className='d-flex gap-2'>
                        <Button type='primary'>View</Button>
                        <Button type='primary'>Accept</Button>
                        <Button type='primary'>Cancel</Button>
                    </div>
                )
            }
        },
    ];

    return (
        <Tabs
            defaultActiveKey="upcoming"
            id="uncontrolled-tab"
            className="mb-3"
            onSelect={(k) => handleOnselect(k)}
        >
            <Tab eventKey="upcoming" title="Upcoming">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <CustomTable
                                loading={isLoading}
                                columns={upcomingColumns}
                                dataSource={data}
                                showPagination={true}
                                pageSize={10}
                                showSizeChanger={true}
                            />
                        </div>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="today" title="Today">
                <div className="appointment-tab">
                    <div className="tab-content">
                        <div className="tab-pane show active" id="upcoming-appointments">
                            <CustomTable
                                loading={isLoading}
                                columns={upcomingColumns}
                                dataSource={data}
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

export default DoctorDashboardPatient;