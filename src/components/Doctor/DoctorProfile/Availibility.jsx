import React from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import './Availibility.css';

const availabilityData = [
	{ day: 'Monday', time: '9:00 AM - 5:00 PM', isOpen: true },
	{ day: 'Tuesday', time: '9:00 AM - 5:00 PM', isOpen: true },
	{ day: 'Wednesday', time: '9:00 AM - 5:00 PM', isOpen: true },
	{ day: 'Thursday', time: '10:00 AM - 6:00 PM', isOpen: true },
	{ day: 'Friday', time: '9:00 AM - 3:00 PM', isOpen: true },
	{ day: 'Saturday', time: '10:00 AM - 2:00 PM', isOpen: true },
	{ day: 'Sunday', time: 'Closed', isOpen: false }
];

const Availibility = () => {
	const today = dayjs().format('dddd');
	const todayData = availabilityData.find(item => item.day === today);
	const isCurrentlyOpen = todayData?.isOpen || false;

	return (
		<div className="availability-container">
			<div className="availability-grid">
				<div className="availability-status-card">
					<div className="availability-status-header">
						<FaClock className="availability-status-icon" />
						<div>
							<h3>Current Status</h3>
							<p className="availability-today">Today, {dayjs().format('MMM D, YYYY')}</p>
						</div>
					</div>
					<div className={`availability-status-badge ${isCurrentlyOpen ? 'availability-status-badge--open' : 'availability-status-badge--closed'}`}>
						{isCurrentlyOpen ? (
							<>
								<FaCheckCircle /> Open Now
							</>
						) : (
							<>
								<FaTimesCircle /> Closed
							</>
						)}
					</div>
					{todayData && (
						<div className="availability-today-hours">
							<p>Today's Hours:</p>
							<strong>{todayData.time}</strong>
						</div>
					)}
				</div>

				<div className="availability-schedule-card">
					<h3 className="availability-schedule-title">Weekly Schedule</h3>
					<div className="availability-list">
						{availabilityData.map((item, index) => {
							const isToday = item.day === today;
							return (
								<div 
									className={`availability-item ${isToday ? 'availability-item--today' : ''} ${!item.isOpen ? 'availability-item--closed' : ''}`} 
									key={index}
								>
									<div className="availability-day">
										<span className="availability-day-name">{item.day}</span>
										{isToday && <span className="availability-today-label">Today</span>}
									</div>
									<div className="availability-time">
										{item.isOpen ? (
											<>
												<FaCheckCircle className="availability-icon availability-icon--open" />
												<span>{item.time}</span>
											</>
										) : (
											<>
												<FaTimesCircle className="availability-icon availability-icon--closed" />
												<span className="availability-closed-text">{item.time}</span>
											</>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="availability-note">
				<p><strong>Note:</strong> Schedule may vary during holidays. Please call ahead to confirm availability.</p>
			</div>
		</div>
	);
};

export default Availibility;
