import React, { useState, useMemo } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Table, Card, DatePicker, Select, Tag, Button } from 'antd';
import { FaDownload, FaMoneyBillWave } from 'react-icons/fa';
import { useGetAllAppointmentsQuery } from '../../../redux/api/adminApi';
import moment from 'moment';
import './Transactions.css';

const { RangePicker } = DatePicker;

const Transactions = () => {
    const [dateRange, setDateRange] = useState(null);
    const [statusFilter, setStatusFilter] = useState(undefined);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading } = useGetAllAppointmentsQuery({ limit: 100 });
    
    const appointments = data?.appointments || [];

    const transactions = useMemo(() => {
        return appointments
            .filter(apt => apt.payment && apt.payment.length > 0)
            .map(apt => ({
                ...apt,
                paymentInfo: apt.payment[0]
            }));
    }, [appointments]);

    const filteredTransactions = useMemo(() => {
        let result = transactions;
        
        if (dateRange) {
            result = result.filter(trans => {
                const transDate = moment(trans.createdAt);
                return transDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
            });
        }
        
        if (statusFilter) {
            result = result.filter(trans => trans.paymentStatus === statusFilter);
        }
        
        return result;
    }, [transactions, dateRange, statusFilter]);

    const stats = useMemo(() => {
        const totalRevenue = filteredTransactions.reduce((sum, t) => sum + (t.paymentInfo?.totalAmount || 0), 0);
        const paidCount = filteredTransactions.filter(t => t.paymentStatus === 'paid').length;
        const unpaidCount = filteredTransactions.filter(t => t.paymentStatus === 'unpaid').length;
        
        return {
            total: filteredTransactions.length,
            totalRevenue,
            paid: paidCount,
            unpaid: unpaidCount
        };
    }, [filteredTransactions]);

    const handleExport = () => {
        const csvContent = [
            ['Date', 'Transaction ID', 'Patient', 'Amount', 'Payment Method', 'Status'],
            ...filteredTransactions.map(t => [
                moment(t.createdAt).format('YYYY-MM-DD'),
                t.trackingId,
                `${t.firstName} ${t.lastName}`,
                `$${t.paymentInfo?.totalAmount || 0}`,
                t.paymentInfo?.paymentMethod || 'N/A',
                t.paymentStatus
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-${moment().format('YYYY-MM-DD')}.csv`;
        a.click();
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            width: 130,
            render: (date) => moment(date).format('MMM DD, YYYY'),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'trackingId',
            key: 'trackingId',
            width: 150,
            render: (text) => <span className="tracking-id">{text}</span>,
        },
        {
            title: 'Patient',
            key: 'patient',
            width: 200,
            render: (_, record) => (
                <div>
                    <div className="patient-name">{record.firstName} {record.lastName}</div>
                    <div className="patient-email">{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Amount',
            key: 'amount',
            width: 120,
            render: (_, record) => (
                <span className="amount-value">
                    ${record.paymentInfo?.totalAmount || 0}
                </span>
            ),
        },
        {
            title: 'Payment Method',
            key: 'method',
            width: 150,
            render: (_, record) => (
                <Tag color="blue">
                    {record.paymentInfo?.paymentMethod || 'N/A'}
                </Tag>
            ),
        },
        {
            title: 'Type',
            key: 'type',
            width: 130,
            render: (_, record) => (
                <Tag>{record.paymentInfo?.paymentType || 'N/A'}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'paymentStatus',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status === 'paid' ? 'green' : 'orange'}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <AdminLayout title="Transactions" breadcrumbs={['Admin', 'Transactions']}>
            <div className="row mb-4">
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stats-mini-card">
                        <div className="stats-mini-value">{stats.total}</div>
                        <div className="stats-mini-label">Total Transactions</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stats-mini-card stats-mini-card--success">
                        <div className="stats-mini-value">${stats.totalRevenue.toFixed(0)}</div>
                        <div className="stats-mini-label">Total Revenue</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stats-mini-card stats-mini-card--success">
                        <div className="stats-mini-value">{stats.paid}</div>
                        <div className="stats-mini-label">Paid</div>
                    </Card>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <Card className="stats-mini-card stats-mini-card--warning">
                        <div className="stats-mini-value">{stats.unpaid}</div>
                        <div className="stats-mini-label">Unpaid</div>
                    </Card>
                </div>
            </div>

            <Card className="admin-card">
                <div className="table-toolbar">
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="MMM DD, YYYY"
                        style={{ width: 280 }}
                    />
                    <Select
                        placeholder="Filter by status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 150 }}
                        allowClear
                        options={[
                            { label: 'All Status', value: null },
                            { label: 'Paid', value: 'paid' },
                            { label: 'Unpaid', value: 'unpaid' },
                        ]}
                    />
                    <Button
                        icon={<FaDownload />}
                        onClick={handleExport}
                        disabled={filteredTransactions.length === 0}
                    >
                        Export CSV
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredTransactions}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize,
                        total: filteredTransactions.length,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} transactions`,
                        onChange: (p, ps) => {
                            setPage(p);
                            setPageSize(ps);
                        },
                    }}
                    scroll={{ x: 1100 }}
                />
            </Card>
        </AdminLayout>
    );
};

export default Transactions;
