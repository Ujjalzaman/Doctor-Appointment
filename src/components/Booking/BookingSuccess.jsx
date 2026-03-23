import React, { useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import {
	FaCalendarCheck,
	FaRegClock,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaUserMd,
	FaEnvelope,
	FaPhone,
	FaClipboardList,
	FaCopy,
	FaHome,
	FaSearch,
	FaRoute,
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Spin, Tooltip, Empty } from 'antd';
import moment from 'moment';
import Header from '../Shared/Header/Header';
import { useGetSingleAppointmentQuery } from '../../redux/api/appointmentApi';
import { clickToCopyClipBoard } from '../../utils/copyClipBoard';
import { getUserInfo } from '../../service/auth.service';
import './BookingSuccess.css';

const BookingSuccess = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isFetching, isError } = useGetSingleAppointmentQuery(id, { skip: !id });

	const auth = getUserInfo();
	const isPatient = auth?.role === 'patient';
	const doctor = data?.doctor;
	const doctorName = doctor
		? `Dr. ${[doctor.firstName, doctor.lastName].filter(Boolean).join(' ')}`
		: null;
	const locationLine = [doctor?.clinicName, doctor?.clinicAddress, doctor?.city, doctor?.country].filter(Boolean).join(' · ');
	const whenText =
		data?.scheduleDate && data?.scheduleTime
			? `${moment(data.scheduleDate).format('dddd, MMMM D, YYYY')} · ${data.scheduleTime}`
			: null;

	useEffect(() => {
		if (!id) return undefined;
		const timer = setTimeout(() => {
			const settled = !isLoading && !isFetching;
			if (settled && !data?.id) {
				navigate('/', { replace: true });
			}
		}, 8000);
		return () => clearTimeout(timer);
	}, [id, isLoading, isFetching, data?.id, navigate]);

	const handleCopyTracking = () => {
		if (data?.trackingId) clickToCopyClipBoard(data.trackingId);
	};

	const renderContent = () => {
		if (!id) {
			return (
				<div className="booking-success-empty">
					<Empty description="Invalid booking link" />
					<Button type="primary" className="mt-3" onClick={() => navigate('/')}>
						Back to home
					</Button>
				</div>
			);
		}

		if (isLoading || isFetching) {
			return (
				<div className="booking-success-loading">
					<Spin size="large" />
					<p className="text-muted mt-3 mb-0">Loading your confirmation…</p>
				</div>
			);
		}

		if (isError || !data?.id) {
			return (
				<div className="booking-success-empty">
					<Empty description="We couldn’t find this booking." />
					<p>You’ll be redirected to the homepage shortly, or go there now.</p>
					<Button type="primary" className="mt-3" onClick={() => navigate('/')}>
						<FaHome className="me-2" />
						Home
					</Button>
				</div>
			);
		}

		return (
			<div className="booking-success-card">
				<div className="booking-success-card__hero">
					<div className="booking-success-card__icon-wrap" aria-hidden>
						<FaCalendarCheck />
					</div>
					<h1 className="booking-success-card__title">You’re booked</h1>
					<p className="booking-success-card__subtitle">
						We’ve sent a confirmation to <strong>{data.email}</strong>. Save your tracking ID below — you’ll need it to check status or
						reschedule.
					</p>
					<span className="booking-success-card__badge">Confirmation email sent</span>
				</div>

				<div className="booking-success-card__body">
					<div className="booking-success-tracking">
						<span className="booking-success-tracking__label">Tracking ID</span>
						<span className="booking-success-tracking__id">{data.trackingId || '—'}</span>
						<Tooltip title="Copy tracking ID">
							<Button type="default" icon={<FaCopy />} onClick={handleCopyTracking} disabled={!data.trackingId}>
								Copy
							</Button>
						</Tooltip>
					</div>

					{doctorName && (
						<div className="booking-success-doctor">
							{doctor?.img ? (
								<img src={doctor.img} alt="" className="booking-success-doctor__avatar" />
							) : (
								<div className="booking-success-doctor__placeholder" aria-hidden>
									<FaUserMd />
								</div>
							)}
							<div>
								<p className="booking-success-doctor__name">{doctorName}</p>
								<p className="booking-success-doctor__role">
									{doctor?.designation}
									{doctor?.specialization ? ` · ${doctor.specialization}` : ''}
								</p>
							</div>
						</div>
					)}

					<div className="booking-success-grid">
						{whenText && (
							<div className="booking-success-info">
								<div className="booking-success-info__icon">
									<FaCalendarAlt />
								</div>
								<div>
									<div className="booking-success-info__label">Date &amp; time</div>
									<p className="booking-success-info__value">{whenText}</p>
									<p className="booking-success-info__meta">Approx. 30 minutes · arrive a few minutes early</p>
								</div>
							</div>
						)}

						<div className="booking-success-info">
							<div className="booking-success-info__icon">
								<FaRegClock />
							</div>
							<div>
								<div className="booking-success-info__label">Status</div>
								<p className="booking-success-info__value text-capitalize">{data.status || 'Pending'}</p>
								<p className="booking-success-info__meta">Payment: {data.paymentStatus || '—'}</p>
							</div>
						</div>

						{locationLine && (
							<div className="booking-success-info booking-success-info--wide">
								<div className="booking-success-info__icon">
									<FaMapMarkerAlt />
								</div>
								<div>
									<div className="booking-success-info__label">Location</div>
									<p className="booking-success-info__value">{locationLine}</p>
								</div>
							</div>
						)}

						{(data.phone || data.email) && (
							<div className="booking-success-info booking-success-info--wide">
								<div className="booking-success-info__icon">
									<FaEnvelope />
								</div>
								<div>
									<div className="booking-success-info__label">Your contact</div>
									<p className="booking-success-info__value mb-1">{data.email}</p>
									{data.phone && (
										<p className="booking-success-info__meta mb-0">
											<FaPhone className="me-1" />
											{data.phone}
										</p>
									)}
								</div>
							</div>
						)}

						{data.reasonForVisit && (
							<div className="booking-success-info booking-success-info--wide">
								<div className="booking-success-info__icon">
									<FaClipboardList />
								</div>
								<div>
									<div className="booking-success-info__label">Reason for visit</div>
									<p className="booking-success-info__value">{data.reasonForVisit}</p>
									{data.description && <p className="booking-success-info__meta">{data.description}</p>}
								</div>
							</div>
						)}
					</div>

					<div className="booking-success-actions">
						{isPatient ? (
							<Link to={`/dashboard/appointments/${id}`}>
								<Button type="primary" size="large">
									View in dashboard
								</Button>
							</Link>
						) : (
							<Link to={`/track-appointment`}>
								<Button type="primary" size="large" icon={<FaRoute />}>
									Track this visit
								</Button>
							</Link>
						)}
						<Link to="/doctors">
							<Button size="large" icon={<FaSearch />}>
								Find more doctors
							</Button>
						</Link>
						<Link to="/">
							<Button size="large" type="default" icon={<FaHome />}>
								Home
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<Header />
			<div className="booking-success-page">
				<div className="container">
					<div className="booking-success-inner">{renderContent()}</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default BookingSuccess;
