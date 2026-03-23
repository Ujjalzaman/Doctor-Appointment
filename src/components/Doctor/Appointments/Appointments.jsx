import React, { useState, useMemo } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Table, Tag, Button, Input, Select, DatePicker, Space, Modal, message, Card } from 'antd';
import { FaEye, FaCheck, FaTimes, FaBriefcaseMedical, FaSearch } from 'react-icons/fa';
import { useGetDoctorAppointmentsQuery, useUpdateAppointmentMutation } from '../../../redux/api/appointmentApi';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Appointments.css';

const { RangePicker } = DatePicker;

const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(undefined);
    const [dateRange, setDateRange] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading, refetch } = useGetDoctorAppointmentsQuery({});
    const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

    const appointments = data || [];

    const filteredAppointments = useMemo(() => {
        let result = appointments;

        if (searchTerm) {
            result = result.filter(apt =>
                `${apt.firstName} ${apt.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.trackingId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            result = result.filter(apt => apt.status === statusFilter);
        }

        if (dateRange) {
            result = result.filter(apt => {
                const aptDate = moment(apt.scheduleDate);
                return aptDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
            });
        }

        return result;
    }, [appointments, searchTerm, statusFilter, dateRange]);

    const stats = useMemo(() => {
        return {
            total: appointments.length,
            pending: appointments.filter(a => a.status === 'pending').length,
            today: appointments.filter(a => moment(a.scheduleDate).isSame(moment(), 'day')).length,
            completed: appointments.filter(a => a.status === 'Completed').length,
        };
    }, [appointments]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateAppointment({ id, data: { status } }).unwrap();
            message.success('Appointment status updated successfully');
            refetch();
        } catch (error) {
            message.error('Failed to update appointment status');
        }
    };

    const handleViewDetails = (record) => {
        Modal.info({
            title: 'Appointment Details',
            width: 700,
            content: (
                <div className="appointment-details-modal">
                    <h4>Patient Information</h4>
                    <p><strong>Name:</strong> {record.firstName} {record.lastName}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Phone:</strong> {record.phone}</p>
                    <p><strong>Address:</strong> {record.address || 'N/A'}</p>
                    <hr />
                    <h4>Appointment Details</h4>
                    <p><strong>Tracking ID:</strong> {record.trackingId}</p>
                    <p><strong>Date:</strong> {moment(record.scheduleDate).format('MMM DD, YYYY')}</p>
                    <p><strong>Time:</strong> {record.scheduleTime}</p>
                    <p><strong>Reason:</strong> {record.reasonForVisit}</p>
                    <p><strong>Status:</strong> <Tag color="blue">{record.status}</Tag></p>
                    <p><strong>Payment Status:</strong> <Tag color="green">{record.paymentStatus}</Tag></p>
                    <p><strong>Prescription Status:</strong> <Tag color="orange">{record.prescriptionStatus}</Tag></p>
                </div>
            ),
        });
    };

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
            render: (_, record) => (
                <div>
                    <div className="fw-bold">{record.firstName} {record.lastName}</div>
                    <div className="text-muted small">{record.email}</div>
                    <div className="text-muted small">ID: {record.trackingId}</div>
                </div>
            ),
        },
        {
            title: 'Date & Time',
            key: 'datetime',
            render: (_, record) => (
                <div>
                    <div>{moment(record.scheduleDate).format('MMM DD, YYYY')}</div>
                    <div className="text-muted small">{record.scheduleTime}</div>
                </div>
            ),
        },
        {
            title: 'Reason',
            dataIndex: 'reasonForVisit',
            key: 'reason',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    pending: 'gold',
                    scheduled: 'blue',
                    Completed: 'green',
                    cancel: 'red',
                };
                return <Tag color={colors[status] || 'default'}>{status}</Tag>;
            },
        },
        {
            title: 'Payment',
            dataIndex: 'paymentStatus',
            key: 'payment',
            render: (status) => (
                <Tag color={status === 'paid' ? 'green' : 'orange'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 280,
            render: (_, record) => (
                <Space wrap size="small">
                    <Button
                        type="link"
                        icon={<FaEye />}
                        onClick={() => handleViewDetails(record)}
                        size="small"
                    >
                        View
                    </Button>
                    {record.prescriptionStatus === 'notIssued' ? (
                        <Link to={`/dashboard/appointment/treatment/${record.id}`}>
                            <Button type="primary" icon={<FaBriefcaseMedical />} size="small">
                                Treat
                            </Button>
                        </Link>
                    ) : (
                        <Link to={`/dashboard/prescription/${record.prescription?.[0]?.id}`}>
                            <Button type="primary" size="small">Prescription</Button>
                        </Link>
                    )}
                    {record.status === 'pending' && (
                        <>
                            <Button
                                type="primary"
                                icon={<FaCheck />}
                                size="small"
                                onClick={() => handleStatusUpdate(record.id, 'scheduled')}
                            >
                                Accept
                            </Button>
                            <Button
                                danger
                                icon={<FaTimes />}
                                size="small"
                                onClick={() => handleStatusUpdate(record.id, 'cancel')}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="row mb-3">
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stat-mini-card">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stat-mini-card stat-warning">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stat-mini-card stat-info">
                        <div className="stat-value">{stats.today}</div>
                        <div className="stat-label">Today</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stat-mini-card stat-success">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">Completed</div>
                    </Card>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">My Appointments</h3>
                </div>

                <div className="table-toolbar mb-3">
                    <Input
                        placeholder="Search by patient name or tracking ID..."
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
                        options={[
                            { label: 'All Status', value: null },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Scheduled', value: 'scheduled' },
                            { label: 'Completed', value: 'Completed' },
                            { label: 'Cancelled', value: 'cancel' },
                        ]}
                    />
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="MMM DD, YYYY"
                        style={{ width: 280 }}
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
                        total: filteredAppointments.length,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} appointments`,
                        onChange: (p, ps) => {
                            setPage(p);
                            setPageSize(ps);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />
            </div>
        </DashboardLayout>
    );
};

export default Appointments;
