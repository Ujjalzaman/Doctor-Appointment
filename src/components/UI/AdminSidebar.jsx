import React, { useState } from 'react';
import './AdminSidebar.css';
import {
	FaHome,
	FaCalendarCheck,
	FaStar,
	FaUserMd,
	FaUsers,
	FaStethoscope,
	FaMoneyBillWave,
	FaUserCircle,
	FaBars,
	FaTimes,
	FaHeartbeat,
	FaClipboardList,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const menuSections = [
		{
			title: 'Overview',
			items: [
				{ path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard & analytics' },
			],
		},
		{
			title: 'Operations',
			items: [
				{ path: '/admin/appointments', icon: <FaCalendarCheck />, label: 'All appointments' },
				{ path: '/admin/transaction', icon: <FaMoneyBillWave />, label: 'Payments & invoices' },
			],
		},
		{
			title: 'People & care',
			items: [
				{ path: '/admin/doctors', icon: <FaUserMd />, label: 'Doctors (verify, edit)' },
				{ path: '/admin/patients', icon: <FaUsers />, label: 'Patients (view, export)' },
				{ path: '/admin/specialites', icon: <FaStethoscope />, label: 'Specialties' },
			],
		},
		{
			title: 'Engagement',
			items: [
				{ path: '/admin/reviews', icon: <FaStar />, label: 'Reviews & ratings' },
			],
		},
	];

	const bottomItems = [
		{ path: '/track-appointment', icon: <FaHeartbeat />, label: 'Track appointment (public)' },
		{ path: '/doctors', icon: <FaClipboardList />, label: 'Public doctor search' },
	];

	const toggleSidebar = () => setIsOpen(!isOpen);

	return (
		<>
			<button type="button" className="sidebar-toggle-mobile" onClick={toggleSidebar} aria-label="Toggle menu">
				{isOpen ? <FaTimes /> : <FaBars />}
			</button>

			<div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
				<div className="sidebar-inner">
					<div className="sidebar-logo">
						<h2>DocCare Admin</h2>
						<p>Full platform control — doctors, patients, visits & payments</p>
					</div>

					<div className="sidebar-menu">
						<ul>
							{menuSections.map((section) => (
								<React.Fragment key={section.title}>
									<li className="menu-title">
										<span>{section.title}</span>
									</li>
									{section.items.map((item) => (
										<li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
											<Link to={item.path} onClick={() => setIsOpen(false)}>
												{item.icon}
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</React.Fragment>
							))}

							<li className="menu-title">
								<span>Shortcuts</span>
							</li>
							{bottomItems.map((item) => (
								<li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
									<Link to={item.path} onClick={() => setIsOpen(false)}>
										{item.icon}
										<span>{item.label}</span>
									</Link>
								</li>
							))}

							<li className="menu-title">
								<span>Account</span>
							</li>
							<li className={location.pathname === '/admin/profile' ? 'active' : ''}>
								<Link to="/admin/profile" onClick={() => setIsOpen(false)}>
									<FaUserCircle />
									<span>Admin profile</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} role="presentation" />}
		</>
	);
};

export default AdminSidebar;
