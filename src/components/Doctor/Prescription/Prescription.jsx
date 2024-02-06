import DashboardLayout from '../DashboardLayout/DashboardLayout';
import CustomTable from '../../UI/component/CustomTable';
import { Button, Tag, message } from 'antd';
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useDeletePrescriptionMutation, useGetAllPrescriptionsQuery } from '../../../redux/api/prescriptionApi';

const Prescription = () => {
    const { data, isLoading } = useGetAllPrescriptionsQuery();
    const [deleteBlog] = useDeletePrescriptionMutation();

    const columns = [
        {
            title: 'Appointment Id',
            dataIndex: "appointment",
            key: 1,
            render: ({trackingId}) =>{
                return (
                    <Tag color="#f50">{trackingId}</Tag>
                )
            }
        },
        {
            title: 'Disease',
            sorter: true,
            dataIndex: "disease",
            key: 3,
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
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 5,
            sorter: true,
            render: function (data) {
                return data && dayjs(data).format('MMM D, YYYY hh:mm A');
            }
        },
        {
            title: 'Action',
            key: 4,
            render: function (data) {
                return (
                    <div className='d-flex'>
                        <Link to={`/dashboard/prescription/${data.id}`}>
                            <Button type='primary' size='small' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaRegEye />
                            </Button>
                        </Link>
                        <Link to={`/dashboard/appointment/treatment/edit/${data.id}`}>
                            <Button type='primary' size='small' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaEdit />
                            </Button>
                        </Link>
                        <Button onClick={() => deleteHandler(data.id)} size='small' type='primary' style={{ margin: "5px 5px" }} danger>
                            <FaRegTimesCircle />
                        </Button>
                    </div>
                )
            }
        },
    ];

    const deleteHandler = async (id) => {
        message.loading("Deleting ...");
        try {
            const res = await deleteBlog(id);
            if (res) {
                message.success("Successfully Deleted !!");
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded" style={{ background: '#f8f9fa' }}>
                <CustomTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    showPagination={true}
                    pageSize={20}
                    showSizeChanger={true}
                />
            </div>
        </DashboardLayout>
    )
}

export default Prescription;