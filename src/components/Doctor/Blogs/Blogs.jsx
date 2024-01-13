import React, { useState } from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { useDeleteBlogMutation, useGetAllBlogsQuery } from '../../../redux/api/blogApi'
import CustomTable from '../../UI/component/CustomTable';
import { truncate } from '../../../utils/truncate';
import { Button, message } from 'antd';
import { FaRegEye, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { useDebounced } from '../../../redux/hooks';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const query = {};
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [searchTerm, setSearchTerm] = useState("");

    query['limit'] = size;
    query['page'] = page;
    query['sortBy'] = sortBy;
    query['sortOrder'] = sortOrder;

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    })

    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm
    }
    const { data, isLoading } = useGetAllBlogsQuery({ ...query });
    const [deleteBlog] = useDeleteBlogMutation();

    const blogsData = data?.blogs;
    const meta = data?.meta

    const columns = [
        {
            title: 'Title',
            sorter: true,
            key: 1,
            render: function (data) {
                return data && truncate(data.title, 30)
            }
        },
        {
            title: 'Description',
            sorter: true,
            key: 2,
            render: function (data) {
                return data && truncate(data.description, 30)
            }
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 3,
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
                        <Link to={`/blogs/${data.id}`}>
                            <Button type='primary' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaRegEye />
                            </Button>
                        </Link>
                        <Link to={`/dashboard/blogs/${data.id}`}>
                            <Button type='primary' className="bg-primary" style={{ margin: "5px 5px" }}>
                                <FaEdit />
                            </Button>
                        </Link>
                        <Button onClick={() => deleteHandler(data.id)} type='primary' style={{ margin: "5px 5px" }} danger>
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

    const onTableChange = (pagination, filter, sorter) => {
        const { order, field } = sorter;
        setSortBy(field);
        setSortOrder(order === 'ascend' ? 'asc' : 'desc')
    }

    const onPaginationChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    }
    const resetFilters = () => {
        setSortBy("");
        setSearchTerm("");
        setSortOrder("");
    }
    return (
        <DashboardLayout>
            <div className="w-100 mb-3 rounded" style={{ background: '#f8f9fa' }}>
                <Link to={`/dashboard/blogs/create`} className='d-flex justify-content-end p-3'>
                    <Button type="primary" size='middle'>Add Blog</Button>
                </Link>

                <CustomTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={blogsData}
                    onPaginationChange={onPaginationChange}
                    onTableChange={onTableChange}
                    showPagination={true}
                    pageSize={size}
                    showSizeChanger={true}
                    totalPages={meta?.total}
                />
            </div>
        </DashboardLayout>
    )
}

export default Blogs;