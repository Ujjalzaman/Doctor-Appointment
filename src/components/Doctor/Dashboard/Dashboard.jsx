import React, { useMemo } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import {
	FaCalendarCheck,
	FaUserInjured,
	FaDollarSign,
	FaStar,
	FaArrowUp,
	FaClock,
	FaHeart,
	FaPills,
	FaSearch,
	FaFileInvoiceDollar,
	FaChevronRight,
} from 'react-icons/fa';
import { useGetDoctorAppointmentsQuery, useGetDoctorPatientsQuery, useGetDoctorInvoicesQuery } from '../../../redux/api/appointmentApi';
import { useGetPatientAppointmentsQuery, useGetPatientInvoicesQuery } from '../../../redux/api/appointmentApi';
import { useGetFavouriteQuery } from '../../../redux/api/favouriteApi';
import { useGetPatientPrescriptionQuery } from '../../../redux/api/prescriptionApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, Tag, Button, Avatar, Card, Typography } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../DashboardLayout/DashboardLayout.css';
import './DashboardHome.css';

const { Text } = Typography;

const Dashboard = () => {
	const { role } = useAuthCheck();

	return (
		<DashboardLayout>
			{role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
		</DashboardLayout>
	);
};

const DoctorDashboard = () => {
	const { data: appointmentsData, isLoading: appointmentsLoading } = useGetDoctorAppointmentsQuery({});
	const { data: patientsData } = useGetDoctorPatientsQuery();
	const { data: invoicesData } = useGetDoctorInvoicesQuery();

	const appointments = appointmentsData || [];
	const patients = patientsData || [];
	const invoices = invoicesData || [];

	const stats = useMemo(() => {
		const totalAppointments = appointments.length;
		const todayAppointments = appointments.filter((a) => moment(a.scheduleDate).isSame(moment(), 'day')).length;
		const pendingAppointments = appointments.filter((a) => a.status === 'pending').length;
		const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

		return {
			totalAppointments,
			todayAppointments,
			totalPatients: patients.length,
			pendingAppointments,
			totalRevenue,
		};
	}, [appointments, patients, invoices]);

	const last7DaysData = useMemo(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const date = moment().subtract(6 - i, 'days');
			return {
				date: date.format('MMM DD'),
				appointments: appointments.filter((apt) => moment(apt.scheduleDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')).length,
			};
		});
	}, [appointments]);

	const recentAppointments = appointments.slice(0, 5);

	const columns = [
		{
			title: 'Patient',
			key: 'patient',
			render: (_, record) => (
				<div>
					<div className="fw-bold">
						{record.firstName} {record.lastName}
					</div>
					<div className="text-muted small">{record.email}</div>
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
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={status === 'pending' ? 'gold' : status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Link to={`/dashboard/appointments/${record.id}`}>
					<Button type="primary" size="small">
						View
					</Button>
				</Link>
			),
		},
	];

	return (
		<>
			<div className="dash-home__welcome dash-home__welcome--doctor">
				<div>
					<h2 className="dash-home__welcome-title">Practice overview</h2>
					<p className="dash-home__welcome-text">Monitor visits, revenue, and follow-ups in one place.</p>
				</div>
				<div className="dash-home__welcome-actions">
					<Link to="/dashboard/appointments" className="dash-home__pill">
						<FaCalendarCheck /> Appointments
					</Link>
					<Link to="/dashboard/prescription" className="dash-home__pill">
						<FaPills /> Prescriptions
					</Link>
				</div>
			</div>

			<div className="dashboard-stats-grid">
				<div className="dashboard-stat-card stat-card--primary">
					<div className="dashboard-stat-icon">
						<FaCalendarCheck />
					</div>
					<div className="dashboard-stat-value">{stats.totalAppointments}</div>
					<div className="dashboard-stat-label">Total Appointments</div>
					<div className="dashboard-stat-trend">
						<FaArrowUp /> {stats.todayAppointments} today
					</div>
				</div>

				<div className="dashboard-stat-card stat-card--success">
					<div className="dashboard-stat-icon">
						<FaUserInjured />
					</div>
					<div className="dashboard-stat-value">{stats.totalPatients}</div>
					<div className="dashboard-stat-label">Total Patients</div>
				</div>

				<div className="dashboard-stat-card stat-card--warning">
					<div className="dashboard-stat-icon">
						<FaClock />
					</div>
					<div className="dashboard-stat-value">{stats.pendingAppointments}</div>
					<div className="dashboard-stat-label">Pending Appointments</div>
				</div>

				<div className="dashboard-stat-card stat-card--info">
					<div className="dashboard-stat-icon">
						<FaDollarSign />
					</div>
					<div className="dashboard-stat-value">${stats.totalRevenue.toFixed(0)}</div>
					<div className="dashboard-stat-label">Total Revenue</div>
				</div>
			</div>

			<div className="dashboard-card">
				<div className="dashboard-card-header">
					<h3 className="dashboard-card-title">Appointments This Week</h3>
				</div>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={last7DaysData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="appointments" fill="#667eea" radius={[6, 6, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="dashboard-card">
				<div className="dashboard-card-header">
					<h3 className="dashboard-card-title">Recent Appointments</h3>
					<Link to="/dashboard/appointments">
						<Button type="link">View All</Button>
					</Link>
				</div>
				<Table columns={columns} dataSource={recentAppointments} rowKey="id" loading={appointmentsLoading} pagination={false} />
			</div>
		</>
	);
};

const PatientDashboard = () => {
	const { data: appointmentsData, isLoading } = useGetPatientAppointmentsQuery();
	const { data: invoicesData } = useGetPatientInvoicesQuery();
	const { data: favourites } = useGetFavouriteQuery();
	const { data: prescriptions } = useGetPatientPrescriptionQuery();

	const appointments = appointmentsData || [];
	const invoices = invoicesData || [];

	const stats = useMemo(() => {
		const totalSpent = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
		const upcomingAppointments = appointments.filter((a) => moment(a.scheduleDate).isAfter(moment())).length;
		const completedAppointments = appointments.filter((a) => a.status === 'Completed').length;

		return {
			totalAppointments: appointments.length,
			upcomingAppointments,
			completedAppointments,
			totalSpent,
		};
	}, [appointments, invoices]);

	const recentAppointments = appointments.slice(0, 5);
	const lastVisit = appointments.find((a) => a.status === 'Completed');
	const medCount = prescriptions?.reduce((n, p) => n + (p.medicines?.length || 0), 0) || 0;

	const columns = [
		{
			title: 'Doctor',
			key: 'doctor',
			render: (_, record) => (
				<div className="d-flex align-items-center gap-2">
					<Avatar src={record.doctor?.img} size={40}>
						{record.doctor?.firstName?.[0]}
					</Avatar>
					<div>
						<div className="fw-bold">
							Dr. {record.doctor?.firstName} {record.doctor?.lastName}
						</div>
						<div className="text-muted small">{record.doctor?.specialization}</div>
					</div>
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
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={status === 'pending' ? 'gold' : status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Link to={`/dashboard/appointments/${record.id}`}>
					<Button type="primary" size="small">
						View
					</Button>
				</Link>
			),
		},
	];

	return (
		<>
			<div className="dash-home__welcome">
				<div>
					<h2 className="dash-home__welcome-title">Your care hub</h2>
					<p className="dash-home__welcome-text">Appointments, prescriptions, and billing — organized for you.</p>
				</div>
			</div>

			<div className="dash-home__quick row g-3 mb-4">
				<div className="col-sm-6 col-lg-3">
					<Link to="/track-appointment" className="dash-home__quick-card">
						<FaSearch className="dash-home__quick-icon" />
						<div>
							<strong>Track visit</strong>
							<Text type="secondary" className="d-block small mb-0">
								Lookup by ID
							</Text>
						</div>
						<FaChevronRight className="dash-home__quick-arrow" />
					</Link>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Link to="/dashboard/favourite" className="dash-home__quick-card">
						<FaHeart className="dash-home__quick-icon" />
						<div>
							<strong>Favourites</strong>
							<Text type="secondary" className="d-block small mb-0">
								{favourites?.length || 0} saved doctors
							</Text>
						</div>
						<FaChevronRight className="dash-home__quick-arrow" />
					</Link>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Link to="/dashboard/prescription" className="dash-home__quick-card">
						<FaPills className="dash-home__quick-icon" />
						<div>
							<strong>Medicines</strong>
							<Text type="secondary" className="d-block small mb-0">
								{medCount} lines across visits
							</Text>
						</div>
						<FaChevronRight className="dash-home__quick-arrow" />
					</Link>
				</div>
				<div className="col-sm-6 col-lg-3">
					<Link to="/dashboard/invoices" className="dash-home__quick-card">
						<FaFileInvoiceDollar className="dash-home__quick-icon" />
						<div>
							<strong>Invoices</strong>
							<Text type="secondary" className="d-block small mb-0">
								Payments & receipts
							</Text>
						</div>
						<FaChevronRight className="dash-home__quick-arrow" />
					</Link>
				</div>
			</div>

			{favourites && favourites.length > 0 && (
				<Card className="dash-home__fav-card mb-4">
					<div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
						<div>
							<Text strong>Your care team</Text>
							<Text type="secondary" className="d-block small">
								Quick access to doctors you follow
							</Text>
						</div>
						<div className="d-flex align-items-center gap-2">
							<Avatar.Group maxCount={4} size="large">
								{favourites.slice(0, 5).map((f) => (
									<Avatar key={f.id || f.doctorId} src={f.doctor?.img} icon={<FaHeart />} />
								))}
							</Avatar.Group>
							<Link to="/dashboard/favourite">
								<Button type="link">Manage</Button>
							</Link>
						</div>
					</div>
				</Card>
			)}

			{lastVisit && (
				<Card className="dash-home__treatment mb-4">
					<div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
						<div>
							<Text strong>Recent care</Text>
							<p className="mb-0 text-muted small">
								Last completed visit with Dr. {lastVisit.doctor?.firstName} {lastVisit.doctor?.lastName}
								{lastVisit.reasonForVisit ? ` — ${lastVisit.reasonForVisit}` : ''}.
							</p>
						</div>
						<Link to={`/dashboard/appointments/${lastVisit.id}`}>
							<Button size="small">Open visit</Button>
						</Link>
					</div>
				</Card>
			)}

			<div className="dashboard-stats-grid">
				<div className="dashboard-stat-card stat-card--primary">
					<div className="dashboard-stat-icon">
						<FaCalendarCheck />
					</div>
					<div className="dashboard-stat-value">{stats.totalAppointments}</div>
					<div className="dashboard-stat-label">Total Appointments</div>
				</div>

				<div className="dashboard-stat-card stat-card--success">
					<div className="dashboard-stat-icon">
						<FaClock />
					</div>
					<div className="dashboard-stat-value">{stats.upcomingAppointments}</div>
					<div className="dashboard-stat-label">Upcoming</div>
				</div>

				<div className="dashboard-stat-card stat-card--warning">
					<div className="dashboard-stat-icon">
						<FaStar />
					</div>
					<div className="dashboard-stat-value">{stats.completedAppointments}</div>
					<div className="dashboard-stat-label">Completed</div>
				</div>

				<div className="dashboard-stat-card stat-card--info">
					<div className="dashboard-stat-icon">
						<FaDollarSign />
					</div>
					<div className="dashboard-stat-value">${stats.totalSpent.toFixed(0)}</div>
					<div className="dashboard-stat-label">Total Spent</div>
				</div>
			</div>

			<div className="dashboard-card">
				<div className="dashboard-card-header">
					<h3 className="dashboard-card-title">My Appointments</h3>
					<Link to="/dashboard/appointments">
						<Button type="link">View All</Button>
					</Link>
				</div>
				<Table columns={columns} dataSource={recentAppointments} rowKey="id" loading={isLoading} pagination={false} />
			</div>
		</>
	);
};

export default Dashboard;
