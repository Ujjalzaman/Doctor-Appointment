import React, { useState, useMemo } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Table, Input, Select, Button, Tag, Space, Modal, message, DatePicker, Card, Row, Col } from 'antd';
import { FaSearch, FaEye, FaEdit, FaTrash, FaCalendarCheck, FaClock } from 'react-icons/fa';
import { useGetAllAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/adminApi';
import moment from 'moment';
import './Appointments.css';

const { RangePicker } = DatePicker;

const AdminAppointments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(undefined);
    const [dateRange, setDateRange] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const queryParams = useMemo(() => ({
        limit: pageSize,
        page,
        ...(searchTerm && { searchTerm }),
        ...(statusFilter && { status: statusFilter }),
    }), [page, pageSize, searchTerm, statusFilter]);

    const { data, isLoading, refetch } = useGetAllAppointmentsQuery(queryParams);
    const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

    const appointments = data?.appointments || [];
    const meta = data?.meta || {};

    const filteredAppointments = useMemo(() => {
        let result = appointments;
        if (dateRange) {
            result = result.filter(apt => {
                const aptDate = moment(apt.scheduleDate);
                return aptDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
            });
        }
        return result;
    }, [appointments, dateRange]);

    const statusOptions = [
        { label: 'All Status', value: null },
        { label: 'Pending', value: 'pending' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'In Progress', value: 'InProgress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'cancel' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'gold',
            scheduled: 'blue',
            confirmed: 'cyan',
            InProgress: 'purple',
            Completed: 'green',
            cancel: 'red',
        };
        return colors[status] || 'default';
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateAppointment({ id, data: { status: newStatus } }).unwrap();
            message.success('Appointment status updated successfully');
            refetch();
        } catch (error) {
            message.error('Failed to update appointment status');
        }
    };

    const handleViewDetails = (record) => {
        Modal.info({
            title: 'Appointment Details',
            width: 600,
            content: (
                <div className="appointment-details-modal">
                    <p><strong>Patient:</strong> {record.firstName} {record.lastName}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Phone:</strong> {record.phone}</p>
                    <p><strong>Date:</strong> {moment(record.scheduleDate).format('MMM DD, YYYY')}</p>
                    <p><strong>Time:</strong> {record.scheduleTime}</p>
                    <p><strong>Reason:</strong> {record.reasonForVisit || 'N/A'}</p>
                    <p><strong>Description:</strong> {record.description || 'N/A'}</p>
                    <p><strong>Status:</strong> <Tag color={getStatusColor(record.status)}>{record.status}</Tag></p>
                    <p><strong>Tracking ID:</strong> {record.trackingId}</p>
                </div>
            ),
        });
    };

    const columns = [
        {
            title: 'Tracking ID',
            dataIndex: 'trackingId',
            key: 'trackingId',
            width: 120,
            render: (text) => <span className="tracking-id">{text}</span>,
        },
        {
            title: 'Patient',
            key: 'patient',
            width: 180,
            render: (_, record) => (
                <div>
                    <div className="patient-name">{record.firstName} {record.lastName}</div>
                    <div className="patient-email">{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Contact',
            dataIndex: 'phone',
            key: 'phone',
            width: 130,
        },
        {
            title: 'Date & Time',
            key: 'datetime',
            width: 160,
            render: (_, record) => (
                <div>
                    <div className="appointment-date">
                        <FaCalendarCheck className="icon-inline" />
                        {moment(record.scheduleDate).format('MMM DD, YYYY')}
                    </div>
                    <div className="appointment-time">
                        <FaClock className="icon-inline" />
                        {record.scheduleTime}
                    </div>
                </div>
            ),
        },
        {
            title: 'Reason',
            dataIndex: 'reasonForVisit',
            key: 'reason',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status, record) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    style={{ width: '100%' }}
                    size="small"
                >
                    {statusOptions.slice(1).map(opt => (
                        <Select.Option key={opt.value} value={opt.value}>
                            <Tag color={getStatusColor(opt.value)} style={{ margin: 0 }}>
                                {opt.label}
                            </Tag>
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<FaEye />}
                        onClick={() => handleViewDetails(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const stats = useMemo(() => {
        const all = appointments.length;
        return {
            total: all,
            pending: appointments.filter(a => a.status === 'pending').length,
            completed: appointments.filter(a => a.status === 'Completed').length,
            cancelled: appointments.filter(a => a.status === 'cancel').length,
        };
    }, [appointments]);

    return (
        <AdminLayout title="Appointments" breadcrumbs={['Admin', 'Appointments']}>
            <Row gutter={[16, 16]} className="mb-4">
                <Col xs={12} sm={6}>
                    <Card className="stats-mini-card">
                        <div className="stats-mini-value">{stats.total}</div>
                        <div className="stats-mini-label">Total</div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="stats-mini-card stats-mini-card--warning">
                        <div className="stats-mini-value">{stats.pending}</div>
                        <div className="stats-mini-label">Pending</div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="stats-mini-card stats-mini-card--success">
                        <div className="stats-mini-value">{stats.completed}</div>
                        <div className="stats-mini-label">Completed</div>
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="stats-mini-card stats-mini-card--danger">
                        <div className="stats-mini-value">{stats.cancelled}</div>
                        <div className="stats-mini-label">Cancelled</div>
                    </Card>
                </Col>
            </Row>

            <Card className="admin-card">
                <div className="table-toolbar">
                    <Input
                        placeholder="Search by patient name, email, tracking ID..."
                        prefix={<FaSearch />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        placeholder="Filter by status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 180 }}
                        allowClear
                        options={statusOptions}
                    />
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="MMM DD, YYYY"
                        style={{ width: 260 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredAppointments}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize,
                        total: meta.total || 0,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} appointments`,
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

export default AdminAppointments;
