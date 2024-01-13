import React, { useEffect, useState } from 'react'
import img from '../../../../images/john.png';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../../redux/api/appointmentApi';
import moment from 'moment';
import { Button, message } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import { Tabs } from 'antd';

const DashboardPage = () => {
    const [sortBy, setSortBy] = useState("upcoming");
    const { data, refetch, isLoading } = useGetDoctorAppointmentsQuery({ sortBy });
    const [updateAppointment, { isError, isSuccess, error }] = useUpdateAppointmentMutation();

    const handleOnselect = (value) => {
        // eslint-disable-next-line eqeqeq
        setSortBy(value == 1 ? 'upcoming': value == 2 ? 'today' : sortBy)
        refetch()
    }


    const updatedApppointmentStatus = (data, type) => {
        const changeObj = {
            status: type
        }
        if (data.id) {
            updateAppointment({ id: data.id, data: changeObj })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Succcessfully Appointment Updated")
        }
        if (isError) {
            message.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])

    const upcomingColumns = [
        {
            title: 'Patient Name',
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
                // console.log(data)
                return (
                    <div className='d-flex gap-2'>
                        <Button type="primary" shape="circle" icon={<FaEye />} size="medium" />
                        {
                            data?.status === 'pending' &&
                            <>
                                <Button type="primary" icon={<FaCheck />} size="medium" onClick={() => updatedApppointmentStatus(data, 'accept')}>Accept</Button>
                                <Button type='primary' icon={<FaTimes />} danger onClick={() => updatedApppointmentStatus(data, 'cancel')}>Cancel</Button>
                            </>
                        }
                    </div>
                )
            }
        },
    ];

    const items = [
        {
            key: '1',
            label: 'upcoming',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
        {
            key: '2',
            label: 'today',
            children: <CustomTable
                loading={isLoading}
                columns={upcomingColumns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={handleOnselect} />
    )
}

export default DashboardPage;