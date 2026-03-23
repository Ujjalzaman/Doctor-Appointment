import React from 'react';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaPhoneAlt, FaDirections } from 'react-icons/fa';
import './Location.css';

const locations = [
	{
		id: 1,
		name: 'Metropolitan Medical Center',
		specialty: 'Cardiology Department',
		address: '2286 Sundown Lane, Austin, Texas 78749, USA',
		phone: '+1 (555) 123-4567',
		schedule: [
			{ days: 'Mon - Fri', times: ['9:00 AM - 1:00 PM', '3:00 PM - 7:00 PM'] },
			{ days: 'Saturday', times: ['10:00 AM - 2:00 PM'] },
			{ days: 'Sunday', times: ['Closed'], closed: true }
		],
		price: '$150'
	},
	{
		id: 2,
		name: 'City Heart & Wellness Clinic',
		specialty: 'Preventive Cardiology',
		address: '1425 Oak Street, Suite 200, Austin, Texas 78701, USA',
		phone: '+1 (555) 987-6543',
		schedule: [
			{ days: 'Tue - Thu', times: ['10:00 AM - 2:00 PM', '4:00 PM - 8:00 PM'] },
			{ days: 'Friday', times: ['9:00 AM - 1:00 PM'] },
			{ days: 'Mon, Sat, Sun', times: ['Closed'], closed: true }
		],
		price: '$120'
	}
];

const Location = () => {
	return (
		<div className="locations-container">
			<div className="locations-grid">
				{locations.map((location) => (
					<div className="location-card" key={location.id}>
						<div className="location-card__header">
							<div>
								<h3 className="location-card__name">{location.name}</h3>
								<p className="location-card__specialty">{location.specialty}</p>
							</div>
							<div className="location-card__price-badge">
								{location.price}
							</div>
						</div>
						
						<div className="location-card__info">
							<div className="location-card__info-item">
								<FaMapMarkerAlt className="location-card__icon" />
								<div>
									<p>{location.address}</p>
									<a href="#directions" className="location-card__directions">
										<FaDirections /> Get directions
									</a>
								</div>
							</div>
							
							<div className="location-card__info-item">
								<FaPhoneAlt className="location-card__icon" />
								<div>
									<p>{location.phone}</p>
								</div>
							</div>
						</div>

						<div className="location-card__schedule">
							<h4 className="location-card__schedule-title">
								<FaClock /> Working Hours
							</h4>
							<div className="schedule-list">
								{location.schedule.map((item, index) => (
									<div className={`schedule-item ${item.closed ? 'schedule-item--closed' : ''}`} key={index}>
										<span className="schedule-days">{item.days}</span>
										<div className="schedule-times">
											{item.times.map((time, timeIndex) => (
												<span key={timeIndex} className={item.closed ? 'schedule-closed-badge' : ''}>
													{time}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Location;
