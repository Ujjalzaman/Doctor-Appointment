import React from 'react'
import { useGetDoctorInvoicesQuery } from '../../../redux/api/appointmentApi';
import CustomTable from '../../UI/component/CustomTable';
import { Button } from 'antd';
import moment from 'moment';
import img from '../../../images/john.png';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { FaEye } from "react-icons/fa";

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
            title: 'Paid',
            key: '2',
            width: 100,
            render: function (data) {
                return <div>{data?.totalAmount} $</div>
            }
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
            title: <div className='text-nowrap'>Payment Method</div>,
            key: '4',
            width: 150,
            dataIndex: "paymentMethod"
        },
        {
            title: <div className='text-nowrap'>Payment Type</div>,
            key: '4',
            width: 120,
            dataIndex: "paymentType"
        },
        {
            title: 'Action',
            key: '5',
            width: 100,
            render: function (data) {
                return (
                    <Button type="primary" shape="circle" icon={<FaEye />} size="medium" href={`/booking/invoice/${data?.id}`} />
                )
            }
        },
    ];
    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded" style={{ background: '#f8f9fa' }}>
                <CustomTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    showPagination={true}
                    pageSize={10}
                    showSizeChanger={true}
                />
            </div>
        </DashboardLayout>
    )
}
export default DoctorInvoice;