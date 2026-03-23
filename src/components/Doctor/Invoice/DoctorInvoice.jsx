import React, { useState } from 'react';
import { useGetDoctorInvoicesQuery } from '../../../redux/api/appointmentApi';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Card, Table, Input, Tag, Button, DatePicker, Select, Space, Avatar, Badge } from 'antd';
import { FaEye, FaSearch, FaDollarSign, FaCreditCard, FaCalendar, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './DoctorInvoice.css';

const { RangePicker } = DatePicker;

const DoctorInvoice = () => {
    const { data, isLoading } = useGetDoctorInvoicesQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState(null);
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

    const getPatientName = (invoice) => {
        const fullName = `${invoice?.appointment?.patient?.firstName ?? ''} ${invoice?.appointment?.patient?.lastName ?? ''}`;
        return fullName.trim() || "Private Patient";
    };

    const filteredData = data?.filter(invoice => {
        const patientName = getPatientName(invoice).toLowerCase();
        const matchesSearch = patientName.includes(searchTerm.toLowerCase());
        
        const matchesDateRange = !dateRange || 
            moment(invoice?.createdAt).isBetween(dateRange[0], dateRange[1], 'day', '[]');
        
        const matchesPaymentMethod = paymentMethodFilter === 'all' || 
            invoice?.paymentMethod?.toLowerCase() === paymentMethodFilter;
        
        return matchesSearch && matchesDateRange && matchesPaymentMethod;
    });

    const totalRevenue = filteredData?.reduce((sum, invoice) => sum + (invoice?.totalAmount || 0), 0) || 0;

    const stats = [
        {
            title: 'Total Invoices',
            count: filteredData?.length || 0,
            color: 'primary',
            icon: <FaCalendar />,
        },
        {
            title: 'Total Revenue',
            count: `$${totalRevenue.toFixed(2)}`,
            color: 'success',
            icon: <FaDollarSign />,
        },
        {
            title: 'Card Payments',
            count: filteredData?.filter(i => i?.paymentMethod?.toLowerCase() === 'card')?.length || 0,
            color: 'info',
            icon: <FaCreditCard />,
        },
        {
            title: 'Cash Payments',
            count: filteredData?.filter(i => i?.paymentMethod?.toLowerCase() === 'cash')?.length || 0,
            color: 'warning',
            icon: <FaDollarSign />,
        },
    ];

    const columns = [
        {
            title: 'Invoice ID',
            key: 'invoiceId',
            width: 120,
            render: (_, record) => (
                <div className="fw-bold">#{record?.id?.slice(0, 8)}</div>
            ),
        },
        {
            title: 'Patient',
            key: 'patient',
            render: (_, record) => (
                <div className="d-flex align-items-center">
                    <Avatar 
                        src={record?.appointment?.patient?.img} 
                        size={40}
                    />
                    <div className="ms-2">
                        <div className="fw-bold">{getPatientName(record)}</div>
                        <div className="text-muted small">{record?.appointment?.patient?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Amount',
            key: 'amount',
            width: 120,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: (_, record) => (
                <div className="fw-bold text-success">${record?.totalAmount}</div>
            ),
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 150,
            render: (method) => (
                <Tag color={method?.toLowerCase() === 'card' ? 'blue' : 'green'}>
                    {method || 'N/A'}
                </Tag>
            ),
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
            width: 130,
            render: (type) => (
                <Tag color="purple">{type || 'N/A'}</Tag>
            ),
        },
        {
            title: 'Date',
            key: 'date',
            width: 150,
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
            render: (_, record) => moment(record?.createdAt).format('MMM DD, YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Link to={`/booking/invoice/${record?.appointmentId}`}>
                    <Button type="primary" icon={<FaEye />} size="small">
                        View
                    </Button>
                </Link>
            ),
        },
    ];

    const handleExportCSV = () => {
        const csvData = filteredData?.map(invoice => ({
            'Invoice ID': invoice?.id,
            'Patient Name': getPatientName(invoice),
            'Amount': invoice?.totalAmount,
            'Payment Method': invoice?.paymentMethod,
            'Payment Type': invoice?.paymentType,
            'Date': moment(invoice?.createdAt).format('YYYY-MM-DD'),
        }));

        const csv = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoices_${moment().format('YYYY-MM-DD')}.csv`;
        a.click();
    };

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Invoices</h3>
                </div>

                <div className="stats-mini-grid mb-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`stat-mini-card stat-mini-card-${stat.color}`}>
                            <div className="stat-mini-icon">{stat.icon}</div>
                            <div className="stat-mini-details">
                                <div className="stat-mini-title">{stat.title}</div>
                                <div className="stat-mini-count">{stat.count}</div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card>
                    <div className="table-toolbar mb-3">
                        <Space wrap size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Space wrap>
                                <Input
                                    placeholder="Search by patient name..."
                                    prefix={<FaSearch />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: 250 }}
                                    allowClear
                                />
                                <RangePicker
                                    value={dateRange}
                                    onChange={setDateRange}
                                    format="MMM DD, YYYY"
                                />
                                <Select
                                    value={paymentMethodFilter}
                                    onChange={setPaymentMethodFilter}
                                    style={{ width: 150 }}
                                >
                                    <Select.Option value="all">All Methods</Select.Option>
                                    <Select.Option value="card">Card</Select.Option>
                                    <Select.Option value="cash">Cash</Select.Option>
                                </Select>
                            </Space>
                            <Button 
                                type="primary" 
                                icon={<FaDownload />}
                                onClick={handleExportCSV}
                                disabled={!filteredData?.length}
                            >
                                Export CSV
                            </Button>
                        </Space>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        loading={isLoading}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} invoices`,
                        }}
                        scroll={{ x: 1000 }}
                    />
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default DoctorInvoice;
