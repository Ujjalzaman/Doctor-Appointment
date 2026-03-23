import React, { useState, useMemo } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Table, Input, Button, Modal, Card, Avatar, Space, Tag, DatePicker } from 'antd';
import { FaSearch, FaEye, FaUser, FaDownload } from 'react-icons/fa';
import { useGetAllPatientsQuery } from '../../../redux/api/adminApi';
import moment from 'moment';
import './Patients.css';

const { RangePicker } = DatePicker;

const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const queryParams = useMemo(() => ({
        limit: pageSize,
        page,
        ...(searchTerm && { searchTerm }),
    }), [page, pageSize, searchTerm]);

    const { data, isLoading } = useGetAllPatientsQuery(queryParams);

    const patients = data?.patients || [];
    const meta = data?.meta || {};

    const filteredPatients = useMemo(() => {
        if (!dateRange) return patients;
        return patients.filter(patient => {
            const patientDate = moment(patient.createdAt);
            return patientDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
        });
    }, [patients, dateRange]);

    const handleViewDetails = (record) => {
        Modal.info({
            title: 'Patient Details',
            width: 600,
            content: (
                <div className="patient-details-modal">
                    <p><strong>Name:</strong> {record.firstName} {record.lastName}</p>
                    <p><strong>Email:</strong> {record.email}</p>
                    <p><strong>Phone:</strong> {record.phone || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {record.dob ? moment(record.dob).format('MMM DD, YYYY') : 'N/A'}</p>
                    <p><strong>Gender:</strong> {record.gender || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {record.bloodGroup || 'N/A'}</p>
                    <p><strong>Address:</strong> {record.address || 'N/A'}</p>
                    <p><strong>City:</strong> {record.city || 'N/A'}</p>
                    <p><strong>Registered:</strong> {moment(record.createdAt).format('MMM DD, YYYY')}</p>
                </div>
            ),
        });
    };

    const handleExport = () => {
        const csvContent = [
            ['Name', 'Email', 'Phone', 'Gender', 'Blood Group', 'City', 'Registered'],
            ...filteredPatients.map(p => [
                `${p.firstName} ${p.lastName}`,
                p.email,
                p.phone || '',
                p.gender || '',
                p.bloodGroup || '',
                p.city || '',
                moment(p.createdAt).format('YYYY-MM-DD')
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `patients-${moment().format('YYYY-MM-DD')}.csv`;
        a.click();
    };

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
            width: 250,
            render: (_, record) => (
                <div className="patient-info">
                    <Avatar 
                        src={record.img} 
                        icon={<FaUser />} 
                        size={45}
                        className="patient-avatar"
                    />
                    <div className="patient-details">
                        <div className="patient-name">{record.firstName} {record.lastName}</div>
                        <div className="patient-email">{record.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Contact',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
            render: (phone) => phone || 'N/A',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (gender) => gender ? <Tag>{gender}</Tag> : 'N/A',
        },
        {
            title: 'Blood Group',
            dataIndex: 'bloodGroup',
            key: 'bloodGroup',
            width: 120,
            render: (bg) => bg ? <Tag color="red">{bg}</Tag> : 'N/A',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
            render: (city) => city || 'N/A',
        },
        {
            title: 'Registered',
            dataIndex: 'createdAt',
            key: 'registered',
            width: 150,
            render: (date) => moment(date).format('MMM DD, YYYY'),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<FaEye />}
                    onClick={() => handleViewDetails(record)}
                    size="small"
                />
            ),
        },
    ];

    return (
        <AdminLayout title="Patients" breadcrumbs={['Admin', 'Patients']}>
            <Card className="admin-card">
                <div className="table-toolbar">
                    <Input
                        placeholder="Search patients by name, email..."
                        prefix={<FaSearch />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        format="MMM DD, YYYY"
                        style={{ width: 260 }}
                    />
                    <Button
                        icon={<FaDownload />}
                        onClick={handleExport}
                        disabled={filteredPatients.length === 0}
                    >
                        Export CSV
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredPatients}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: page,
                        pageSize,
                        total: meta.total || 0,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} patients`,
                        onChange: (p, ps) => {
                            setPage(p);
                            setPageSize(ps);
                        },
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>
        </AdminLayout>
    );
};

export default Patients;
