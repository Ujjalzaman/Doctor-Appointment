import React from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Card, Row, Col, Table, Statistic, Empty, Spin } from 'antd';
import { FaUserMd, FaUsers, FaCalendarCheck, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { useGetAllAppointmentsQuery, useGetAllPatientsQuery } from '../../../redux/api/adminApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';
import moment from 'moment';

const COLORS = ['#667eea', '#f093fb', '#fad0c4', '#a8edea', '#fed6e3'];

const AdminDashboard = () => {
    const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery({ limit: 100 });
    const { data: appointmentsData, isLoading: appointmentsLoading } = useGetAllAppointmentsQuery({ limit: 100 });
    const { data: patientsData, isLoading: patientsLoading } = useGetAllPatientsQuery({ limit: 100 });

    const doctors = doctorsData?.doctors || [];
    const appointments = appointmentsData?.appointments || [];
    const patients = patientsData?.patients || [];

    const totalDoctors = doctorsData?.meta?.total || doctors.length;
    const totalPatients = patientsData?.meta?.total || patients.length;
    const totalAppointments = appointmentsData?.meta?.total || appointments.length;

    const totalRevenue = appointments.reduce((sum, apt) => {
        const amount = apt.payment?.[0]?.totalAmount || 0;
        return sum + amount;
    }, 0);

    const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
    const completedAppointments = appointments.filter(a => a.status === 'Completed').length;

    const last7DaysAppointments = appointments.filter(apt => {
        const aptDate = moment(apt.createdAt);
        return aptDate.isAfter(moment().subtract(7, 'days'));
    }).length;

    const appointmentsByStatus = [
        { name: 'Pending', value: pendingAppointments },
        { name: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length },
        { name: 'Completed', value: completedAppointments },
        { name: 'Cancelled', value: appointments.filter(a => a.status === 'cancel').length },
    ].filter(item => item.value > 0);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = moment().subtract(6 - i, 'days');
        return {
            date: date.format('MMM DD'),
            appointments: appointments.filter(apt => 
                moment(apt.createdAt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
            ).length
        };
    });

    const topDoctors = doctors
        .slice(0, 5)
        .map(doc => ({
            ...doc,
            appointmentCount: appointments.filter(a => a.doctorId === doc.id).length
        }));

    const recentAppointments = appointments
        .slice(0, 5)
        .map(apt => ({
            ...apt,
            doctor: doctors.find(d => d.doctorId === apt.doctorId),
            patient: patients.find(p => p.id === apt.patientId)
        }));

    const statsCards = [
        {
            title: 'Total Doctors',
            value: totalDoctors,
            icon: <FaUserMd />,
            color: 'primary',
            trend: { value: 12, isUp: true },
        },
        {
            title: 'Total Patients',
            value: totalPatients,
            icon: <FaUsers />,
            color: 'success',
            trend: { value: 8, isUp: true },
        },
        {
            title: 'Appointments',
            value: totalAppointments,
            icon: <FaCalendarCheck />,
            color: 'warning',
            trend: { value: 3, isUp: false },
        },
        {
            title: 'Revenue',
            value: `$${totalRevenue.toFixed(0)}`,
            icon: <FaDollarSign />,
            color: 'info',
            trend: { value: 15, isUp: true },
        },
    ];

    const doctorColumns = [
        {
            title: 'Doctor',
            dataIndex: 'firstName',
            key: 'name',
            render: (text, record) => `Dr. ${text} ${record.lastName}`,
        },
        {
            title: 'Specialty',
            dataIndex: 'specialization',
            key: 'specialty',
        },
        {
            title: 'Appointments',
            dataIndex: 'appointmentCount',
            key: 'appointments',
        },
    ];

    const appointmentColumns = [
        {
            title: 'Patient',
            dataIndex: 'firstName',
            key: 'patient',
            render: (text, record) => `${text || 'N/A'} ${record.lastName || ''}`,
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (doctor) => doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'N/A',
        },
        {
            title: 'Date',
            dataIndex: 'scheduleDate',
            key: 'date',
            render: (date) => moment(date).format('MMM DD, YYYY'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`status-badge status-badge--${status?.toLowerCase()}`}>
                    {status}
                </span>
            ),
        },
    ];

    if (doctorsLoading || appointmentsLoading || patientsLoading) {
        return (
            <AdminLayout title="Admin Dashboard" breadcrumbs={['Admin', 'Dashboard']}>
                <div className="dashboard-loading">
                    <Spin size="large" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Welcome Admin!" breadcrumbs={['Admin', 'Dashboard']}>
            <div className="admin-dashboard">
                <Row gutter={[16, 16]}>
                    {statsCards.map((stat, index) => (
                        <Col key={index} xs={24} sm={12} lg={6}>
                            <div className={`stats-card stats-card--${stat.color}`}>
                                <div className="stats-card-icon">{stat.icon}</div>
                                <div className="stats-card-value">{stat.value}</div>
                                <div className="stats-card-label">{stat.title}</div>
                                {stat.trend && (
                                    <div className="stats-card-trend">
                                        {stat.trend.isUp ? <FaArrowUp /> : <FaArrowDown />}
                                        {stat.trend.value}% vs last month
                                    </div>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} lg={16}>
                        <Card className="admin-card" title="Appointments Trend (Last 7 Days)">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={last7Days}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="appointments" stroke="#667eea" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card className="admin-card" title="Appointment Status">
                            {appointmentsByStatus.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={appointmentsByStatus}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {appointmentsByStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <Empty description="No appointment data" />
                            )}
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} className="mt-4">
                    <Col xs={24} lg={12}>
                        <Card className="admin-card" title="Top Doctors">
                            {topDoctors.length > 0 ? (
                                <Table
                                    columns={doctorColumns}
                                    dataSource={topDoctors}
                                    pagination={false}
                                    rowKey="id"
                                    size="small"
                                />
                            ) : (
                                <Empty description="No doctor data" />
                            )}
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card className="admin-card" title="Recent Appointments">
                            {recentAppointments.length > 0 ? (
                                <Table
                                    columns={appointmentColumns}
                                    dataSource={recentAppointments}
                                    pagination={false}
                                    rowKey="id"
                                    size="small"
                                />
                            ) : (
                                <Empty description="No appointment data" />
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
