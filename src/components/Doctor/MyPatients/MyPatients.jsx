import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetDoctorPatientsQuery } from '../../../redux/api/appointmentApi';
import { Card, Table, Input, Avatar, Tag, Button, Modal, Space, Badge, Spin } from 'antd';
import { FaEye, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaUser, FaSearch } from 'react-icons/fa';
import moment from 'moment';
import './MyPatients.css';

const MyPatients = () => {
    const { data, isLoading } = useGetDoctorPatientsQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getInitPatientName = (item) => {
        const fullName = `${item?.firstName ?? ''} ${item?.lastName ?? ''}`;
        return fullName.trim() || "Private Patient";
    };

    const handleViewDetails = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
    };

    const filteredData = data?.filter(patient => {
        const searchLower = searchTerm.toLowerCase();
        const fullName = getInitPatientName(patient).toLowerCase();
        return fullName.includes(searchLower) || 
               patient?.email?.toLowerCase().includes(searchLower) ||
               patient?.mobile?.includes(searchTerm);
    });

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
            render: (_, record) => (
                <div className="d-flex align-items-center">
                    <Avatar 
                        src={record?.img} 
                        icon={<FaUser />} 
                        size={50}
                    />
                    <div className="ms-3">
                        <div className="fw-bold">{getInitPatientName(record)}</div>
                        <div className="text-muted small">ID: #{record?.trackingId || record?.id}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (_, record) => (
                <div>
                    <div className="d-flex align-items-center mb-1">
                        <FaEnvelope className="text-muted me-2" />
                        <span className="small">{record?.email}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <FaPhone className="text-muted me-2" />
                        <span className="small">{record?.mobile || 'N/A'}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Last Visit',
            dataIndex: 'appointmentTime',
            key: 'lastVisit',
            render: (date) => moment(date).format('MMM DD, YYYY'),
            sorter: (a, b) => moment(a.appointmentTime).unix() - moment(b.appointmentTime).unix(),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            render: (text) => text || 'N/A',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => {
                const isPrescriptionIssued = record?.prescriptionStatus === 'issued';
                return (
                    <Tag color={isPrescriptionIssued ? 'success' : 'warning'}>
                        {isPrescriptionIssued ? 'Treated' : 'Pending'}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Button 
                    type="primary" 
                    icon={<FaEye />} 
                    size="small"
                    onClick={() => handleViewDetails(record)}
                >
                    View
                </Button>
            ),
        },
    ];

    const stats = [
        {
            title: 'Total Patients',
            count: data?.length || 0,
            color: 'primary',
            icon: <FaUser />,
        },
        {
            title: 'Treated',
            count: data?.filter(p => p?.prescriptionStatus === 'issued')?.length || 0,
            color: 'success',
            icon: <FaCalendar />,
        },
        {
            title: 'Pending',
            count: data?.filter(p => p?.prescriptionStatus !== 'issued')?.length || 0,
            color: 'warning',
            icon: <FaCalendar />,
        },
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">My Patients</h3>
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
                        <Input
                            placeholder="Search by name, email, or phone..."
                            prefix={<FaSearch />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="large"
                            allowClear
                        />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        loading={isLoading}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Total ${total} patients`,
                        }}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>

            <Modal
                title="Patient Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
                className="patient-details-modal"
            >
                {selectedPatient && (
                    <div>
                        <div className="text-center mb-4">
                            <Avatar src={selectedPatient?.img} icon={<FaUser />} size={100} />
                            <h4 className="mt-3 mb-1">{getInitPatientName(selectedPatient)}</h4>
                            <Tag color={selectedPatient?.prescriptionStatus === 'issued' ? 'success' : 'warning'}>
                                {selectedPatient?.prescriptionStatus === 'issued' ? 'Treated' : 'Pending Treatment'}
                            </Tag>
                        </div>

                        <div className="patient-info-grid">
                            <div className="info-item">
                                <FaUser className="info-icon" />
                                <div>
                                    <div className="info-label">Patient ID</div>
                                    <div className="info-value">#{selectedPatient?.trackingId || selectedPatient?.id}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <FaEnvelope className="info-icon" />
                                <div>
                                    <div className="info-label">Email</div>
                                    <div className="info-value">{selectedPatient?.email}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <FaPhone className="info-icon" />
                                <div>
                                    <div className="info-label">Phone</div>
                                    <div className="info-value">{selectedPatient?.mobile || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="info-item">
                                <FaCalendar className="info-icon" />
                                <div>
                                    <div className="info-label">Last Visit</div>
                                    <div className="info-value">
                                        {moment(selectedPatient?.appointmentTime).format('MMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>

                            <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                                <FaMapMarkerAlt className="info-icon" />
                                <div>
                                    <div className="info-label">Address</div>
                                    <div className="info-value">{selectedPatient?.address || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
};

export default MyPatients;
