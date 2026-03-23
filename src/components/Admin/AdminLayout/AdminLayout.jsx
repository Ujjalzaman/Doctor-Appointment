import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import AdminSidebar from '../../UI/AdminSidebar';
import AdminHeader from '../../UI/AdminHeader';
import { getUserInfo } from '../../../service/auth.service';
import {
	FaThLarge,
	FaCalendarCheck,
	FaUserMd,
	FaUsers,
	FaStethoscope,
	FaStar,
	FaMoneyBillWave,
	FaChartPie,
	FaPlus,
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = ({ children, title = 'Dashboard', breadcrumbs = ['Dashboard'] }) => {
	const location = useLocation();
	const auth = getUserInfo();
	const isDemoAdmin = auth?.role === 'admin' && auth?.isDemo === true;

	const quickLinks = [
		{ to: '/admin/dashboard', label: 'Overview', icon: <FaThLarge /> },
		{ to: '/admin/appointments', label: 'Appointments', icon: <FaCalendarCheck /> },
		{ to: '/admin/doctors', label: 'Doctors', icon: <FaUserMd /> },
		{ to: '/admin/patients', label: 'Patients', icon: <FaUsers /> },
		{ to: '/admin/specialites', label: 'Specialties', icon: <FaStethoscope /> },
		{ to: '/admin/reviews', label: 'Reviews', icon: <FaStar /> },
		{ to: '/admin/transaction', label: 'Payments', icon: <FaMoneyBillWave /> },
	];

	return (
		<div className="main-wrapper">
			<AdminHeader />
			<AdminSidebar />
			<div className="page-wrapper">
				<div className="content container-fluid">
					<div className="page-header">
						<div className="row align-items-start">
							<div className="col-sm-12 col-lg">
								<h3 className="page-title">{title}</h3>
								<ul className="breadcrumb">
									{breadcrumbs.map((crumb, index) => (
										<li
											key={index}
											className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
										>
											{crumb}
										</li>
									))}
								</ul>
								<p className="page-header__hint">
									<FaChartPie className="page-header__hint-icon" />
									Use the sidebar or shortcuts below to manage doctors, patients, appointments, and billing.
								</p>
							</div>
						</div>
					</div>

					{isDemoAdmin && (
						<Alert
							type="info"
							showIcon
							className="mb-3"
							message="Read-only demo administrator"
							description="This account can browse all data. Create, update, and delete actions are disabled on the server. Use a non-demo admin account to make changes."
						/>
					)}

					<nav className="admin-quick-nav" aria-label="Admin shortcuts">
						<div className="admin-quick-nav__links">
							{quickLinks.map((item) => (
								<Link
									key={item.to}
									to={item.to}
									className={`admin-quick-nav__link ${location.pathname === item.to ? 'is-active' : ''}`}
								>
									<span className="admin-quick-nav__icon">{item.icon}</span>
									{item.label}
								</Link>
							))}
						</div>
						<div className="admin-quick-nav__actions">
							<Link to="/admin/doctors" className="admin-quick-nav__btn admin-quick-nav__btn--primary">
								<FaPlus /> <span>Doctor</span>
							</Link>
							<Link to="/admin/patients" className="admin-quick-nav__btn">
								<FaPlus /> <span>Patient</span>
							</Link>
							<Link to="/track-appointment" className="admin-quick-nav__btn admin-quick-nav__btn--ghost">
								Track ID
							</Link>
						</div>
					</nav>

					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
