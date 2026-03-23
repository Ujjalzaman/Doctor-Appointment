import React, { useState } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Table, Card, Rate, Button, Modal, message, Avatar, Space, Tag, Input } from 'antd';
import { FaUser, FaUserMd, FaTrash, FaEye } from 'react-icons/fa';
import { useGetAllReviewsQuery, useDeleteReviewQuery } from '../../../redux/api/reviewsApi';
import moment from 'moment';
import './Reviews.css';

const AdminReviews = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading, refetch } = useGetAllReviewsQuery({ limit: pageSize, page });
    
    const reviews = data?.data || [];
    const meta = data?.meta || {};

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Review',
            content: 'Are you sure you want to delete this review?',
            onOk: async () => {
                try {
                    message.info('Delete review API needs proper implementation');
                    refetch();
                } catch (error) {
                    message.error('Failed to delete review');
                }
            },
        });
    };

    const handleViewDetails = (record) => {
        Modal.info({
            title: 'Review Details',
            width: 600,
            content: (
                <div className="review-details-modal">
                    <div className="review-header">
                        <Avatar src={record.patient?.img} icon={<FaUser />} size={60} />
                        <div>
                            <h4>{record.patient?.firstName} {record.patient?.lastName}</h4>
                            <Rate disabled value={record.star} />
                        </div>
                    </div>
                    <div className="review-content">
                        <p><strong>Doctor:</strong> Dr. {record.doctor?.firstName} {record.doctor?.lastName}</p>
                        <p><strong>Date:</strong> {moment(record.createdAt).format('MMM DD, YYYY')}</p>
                        <p><strong>Review:</strong></p>
                        <p className="review-text">{record.description}</p>
                        {record.reply && (
                            <>
                                <p><strong>Doctor Reply:</strong></p>
                                <p className="reply-text">{record.reply}</p>
                            </>
                        )}
                    </div>
                </div>
            ),
        });
    };

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
            width: 200,
            render: (_, record) => (
                <div className="reviewer-info">
                    <Avatar 
                        src={record.patient?.img} 
                        icon={<FaUser />} 
                        size={40}
                    />
                    <div>
                        <div className="reviewer-name">
                            {record.patient?.firstName} {record.patient?.lastName}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Doctor',
            key: 'doctor',
            width: 200,
            render: (_, record) => (
                <div className="doctor-reviewed">
                    <FaUserMd className="icon-inline" />
                    Dr. {record.doctor?.firstName} {record.doctor?.lastName}
                </div>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'star',
            key: 'rating',
            width: 150,
            render: (star) => <Rate disabled value={star} />,
        },
        {
            title: 'Review',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_, record) => (
                <Tag color={record.reply ? 'green' : 'orange'}>
                    {record.reply ? 'Replied' : 'Pending'}
                </Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            width: 130,
            render: (date) => moment(date).format('MMM DD, YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<FaEye />}
                        onClick={() => handleViewDetails(record)}
                        size="small"
                    />
                    <Button
                        type="link"
                        danger
                        icon={<FaTrash />}
                        onClick={() => handleDelete(record.id)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout title="Reviews" breadcrumbs={['Admin', 'Reviews']}>
            <Card className="admin-card">
                <Table
                    columns={columns}
                    dataSource={reviews}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize,
                        total: meta.total || 0,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} reviews`,
                        onChange: (p, ps) => {
                            setPage(p);
                            setPageSize(ps);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>
        </AdminLayout>
    );
};

export default AdminReviews;
