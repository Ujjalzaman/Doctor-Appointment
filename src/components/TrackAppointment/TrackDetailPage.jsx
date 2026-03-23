import React from 'react';
import img from '../../images/avatar.jpg';
import './index.css';
import './TrackDetailPage.css';
import { FaArrowLeft, FaCalendarCheck, FaRegClock, FaCopy } from 'react-icons/fa';
import AppointmentTimeLine from './AppointmentTimeLine';
import { appointStatusDsc } from '../../constant/appointmentStatus';
import moment from 'moment';
import { Button, Tag, Tooltip } from 'antd';
import { clickToCopyClipBoard } from '../../utils/copyClipBoard';
import { Link } from 'react-router-dom';

function joinParts(parts) {
	return parts.filter((p) => p != null && String(p).trim() !== '').join(', ');
}

const statusTagColor = (status) => {
	const s = (status || '').toLowerCase();
	if (s.includes('complet')) return 'success';
	if (s.includes('cancel')) return 'error';
	if (s.includes('pending')) return 'warning';
	if (s.includes('schedul') || s.includes('confirm')) return 'processing';
	return 'default';
};

const TrackDetailPage = ({ data, setShowInfo }) => {
	const patientFirst = data?.patient?.firstName || data?.firstName || '';
	const patientLast = data?.patient?.lastName || data?.lastName || '';
	const patientName = `${patientFirst} ${patientLast}`.trim() || 'Patient';
	const patientAddr = joinParts([
		data?.patient?.address,
		data?.patient?.city,
		data?.patient?.state,
		data?.patient?.country,
	]);

	const doctorFirst = data?.doctor?.firstName;
	const doctorLast = data?.doctor?.lastName;
	const doctorName =
		doctorFirst || doctorLast
			? `Dr. ${[doctorFirst, doctorLast].filter(Boolean).join(' ')}`
			: 'Doctor assigned soon';
	const doctorMeta = joinParts([data?.doctor?.designation, data?.doctor?.specialization]);

	const statusHelp = appointStatusDsc.appointment[data?.status] || 'Your appointment status will update here.';
	const scheduleOk = data?.scheduleDate && moment(data.scheduleDate).isValid();

	return (
		<div className="track-detail-page">
			<div className="track-detail-back">
				<Button type="default" icon={<FaArrowLeft />} size="large" onClick={() => setShowInfo(false)}>
					New search
				</Button>
			</div>

			<div className="track-detail-shell">
				<div className="track-detail-hero">
					<div>
						<div className="track-detail-hero__label">Appointment located</div>
						<h1 className="track-detail-hero__title">Your visit at a glance</h1>
						<div className="track-detail-hero__track">
							<span className="text-muted small me-1">Tracking ID</span>
							<code>{data?.trackingId || '—'}</code>
							<Tooltip title="Copy ID">
								<Button type="text" size="small" icon={<FaCopy />} onClick={() => clickToCopyClipBoard(data?.trackingId)} />
							</Tooltip>
						</div>
					</div>
					<div>
						<div className="text-muted small mb-1">Current status</div>
						<Tag color={statusTagColor(data?.status)} style={{ fontSize: '0.95rem', padding: '4px 12px' }}>
							{data?.status || 'Unknown'}
						</Tag>
					</div>
				</div>

				<div className="track-detail-body">
					<div className="track-detail-status-box">
						<Tag color="gold">What this means</Tag>
						<p>{statusHelp}</p>
					</div>

					<div className="track-detail-grid">
						<div className="track-detail-person track-detail-person--patient">
							<img src={data?.patient?.img || img} alt="" className="track-detail-avatar" />
							<div>
								<div className="track-detail-person__role">Patient</div>
								<div className="track-detail-person__name">{patientName}</div>
								{patientAddr ? <p className="track-detail-person__meta">{patientAddr}</p> : null}
								{(data?.email || data?.patient?.email) && (
									<p className="track-detail-person__meta mb-0">{data?.patient?.email || data?.email}</p>
								)}
							</div>
						</div>

						<div className="track-detail-person track-detail-person--doctor">
							<img src={data?.doctor?.img || img} alt="" className="track-detail-avatar" />
							<div>
								<div className="track-detail-person__role">Clinician</div>
								<div className="track-detail-person__name">{doctorName}</div>
								{doctorMeta ? <p className="track-detail-person__meta">{doctorMeta}</p> : null}
								{data?.doctor?.clinicAddress && (
									<p className="track-detail-person__meta mb-0">{data.doctor.clinicAddress}</p>
								)}
							</div>
						</div>
					</div>

					<div className="track-detail-schedule">
						<div className="track-detail-schedule__title">Schedule &amp; visit details</div>
						<div className="track-detail-schedule__row">
							<FaCalendarCheck />
							<span>
								<strong>Date:</strong>{' '}
								{scheduleOk ? moment(data.scheduleDate).format('dddd, MMMM D, YYYY') : 'To be confirmed'}
							</span>
						</div>
						<div className="track-detail-schedule__row">
							<FaRegClock />
							<span>
								<strong>Time:</strong> {data?.scheduleTime || '—'}
							</span>
						</div>
						{data?.reasonForVisit && (
							<div className="track-detail-schedule__row">
								<span className="ms-4">
									<strong>Reason:</strong> {data.reasonForVisit}
								</span>
							</div>
						)}
						{data?.description && (
							<div className="track-detail-schedule__row">
								<span className="ms-4 text-muted">{data.description}</span>
							</div>
						)}
					</div>

					<h2 className="track-detail-section-title">Progress overview</h2>
					<AppointmentTimeLine data={data} />

					<div className="text-center mt-4 pt-3 border-top">
						<p className="text-muted small mb-2">Need to change something?</p>
						<Link to="/contact">
							<Button type="link">Contact the clinic</Button>
						</Link>
						<span className="text-muted mx-2">·</span>
						<Link to="/login">
							<Button type="link">Patient login</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackDetailPage;
