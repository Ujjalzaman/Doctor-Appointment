import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useDeleteBlogMutation, useGetAllBlogsQuery } from '../../../redux/api/blogApi';
import { Card, Table, Input, Button, Popconfirm, message, Space, Tag } from 'antd';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Blogs.css';

const Blogs = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const query = {
        limit: size,
        page: page,
        searchTerm: searchTerm
    };

    const { data, isLoading } = useGetAllBlogsQuery({ ...query });
    const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();

    const blogsData = data?.blogs;
    const meta = data?.meta;

    const columns = [
        {
            title: 'Title',
            key: 'title',
            render: (_, record) => (
                <div>
                    <div className="fw-bold">{record?.title}</div>
                    <div className="text-muted small">{moment(record?.createdAt).format('MMM DD, YYYY')}</div>
                </div>
            ),
            sorter: (a, b) => (a?.title || '').localeCompare(b?.title || ''),
        },
        {
            title: 'Description',
            key: 'description',
            render: (_, record) => (
                <div className="blog-description">
                    {record?.description?.substring(0, 100)}...
                </div>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            width: 120,
            render: () => <Tag color="success">Published</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 180,
            render: (_, record) => (
                <Space>
                    <Link to={`/blogs/${record.id}`}>
                        <Button type="default" icon={<FaEye />} size="small">
                            View
                        </Button>
                    </Link>
                    <Link to={`/dashboard/blogs/${record.id}`}>
                        <Button type="primary" icon={<FaEdit />} size="small">
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Delete blog?"
                        description="Are you sure you want to delete this blog?"
                        onConfirm={() => deleteHandler(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<FaTrash />} size="small" loading={deleteLoading} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteHandler = async (id) => {
        try {
            await deleteBlog(id).unwrap();
            message.success('Blog deleted successfully!');
        } catch (error) {
            message.error('Failed to delete blog');
        }
    };

    const stats = [
        {
            title: 'Total Blogs',
            count: meta?.total || 0,
            color: 'primary',
        },
        {
            title: 'Published',
            count: blogsData?.length || 0,
            color: 'success',
        },
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">My Blogs</h3>
                    <Link to="/dashboard/blogs/create">
                        <Button type="primary" icon={<FaPlus />}>
                            Create New Blog
                        </Button>
                    </Link>
                </div>

                <div className="stats-mini-grid mb-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`stat-mini-card stat-mini-card-${stat.color}`}>
                            <div className="stat-mini-details">
                                <div className="stat-mini-title">{stat.title}</div>
                                <div className="stat-mini-count">{stat.count}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card>
                    <div className="table-toolbar mb-3">
                        <Input
                            placeholder="Search blogs by title..."
                            prefix={<FaSearch />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: 300 }}
                            allowClear
                        />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={blogsData}
                        rowKey="id"
                        loading={isLoading}
                        pagination={{
                            current: page,
                            pageSize: size,
                            total: meta?.total,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setSize(pageSize);
                            },
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} blogs`,
                        }}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Blogs;
