import React from 'react'
import { useGetDoctorInvoicesQuery } from '../../../redux/api/appointmentApi';
import CustomTable from '../../UI/component/CustomTable';
import { Button } from 'antd';
import moment from 'moment';
import img from '../../../images/john.png';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const DoctorInvoice = () => {
    const { data, isLoading } = useGetDoctorInvoicesQuery();
    const columns = [
        {
            title: 'Doctor',
            key: '1',
            width: 150,
            render: function (data) {
                return (
                    <div className="table-avatar">
                        <a className="avatar avatar-sm mr-2 d-flex gap-2">
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                            <p className='p-0 m-0 text-nowrap'>{data?.appointment?.patient?.firstName + ' ' + data?.appointment?.patient?.lastName}</p>
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
    return (
        <DashboardLayout>
            <CustomTable
                loading={isLoading}
                columns={columns}
                dataSource={data}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />
        </DashboardLayout>
    )
}
export default DoctorInvoice;