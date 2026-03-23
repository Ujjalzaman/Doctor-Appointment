import React, { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleAppointmentQuery } from '../../../redux/api/appointmentApi';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import moment from 'moment';
import './index.css';
import './ViewAppointment.css';
import { Button, Tag, Tooltip, Spin, Empty } from 'antd';
import { clickToCopyClipBoard } from '../../../utils/copyClipBoard';
import { FaPrint, FaCopy, FaUserMd, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

/** Safe age in full years from DOB; null if unknown or invalid */
function getAgeFromDateOfBirth(dateOfBirth) {
	if (dateOfBirth == null || dateOfBirth === '') return null;
	const dob = moment(dateOfBirth);
	if (!dob.isValid()) return null;
	const years = moment().diff(dob, 'years');
	return Number.isFinite(years) && years >= 0 && years < 130 ? years : null;
}

function joinLocation(parts) {
	return parts.filter((p) => p != null && String(p).trim() !== '').join(' · ');
}

const ViewAppointment = () => {
	const printRef = useRef(null);
	const { id } = useParams();
	const { data, isLoading, isError } = useGetSingleAppointmentQuery(id, { skip: !id });

	const handlePrint = useReactToPrint({
		contentRef: printRef,
		bodyClass: 'print-agreement',
		documentTitle: () => (data?.trackingId ? `Appointment-${data.trackingId}` : 'Appointment'),
	});

	const patientSummary = useMemo(() => {
		if (!data?.id) return null;
		const p = data.patient;
		const fromRecord = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
		const fromPatient = p ? [p.firstName, p.lastName].filter(Boolean).join(' ').trim() : '';
		const displayName = fromPatient || fromRecord || 'Guest booking';
		const ageYears = p ? getAgeFromDateOfBirth(p.dateOfBirth) : null;
		let ageLabel;
		if (ageYears != null) {
			ageLabel = `${ageYears} years old`;
		} else if (p?.dateOfBirth) {
			ageLabel = 'Date of birth on file is invalid — update patient profile';
		} else {
			ageLabel = 'Not on file — add date of birth in the patient profile to show age';
		}
		const blood = p?.bloodGroup?.trim() || '—';
		const loc = joinLocation([p?.city, p?.state, p?.country]);
		const emailLine = p?.email || data.email || '—';
		const phoneLine = p?.mobile || data.phone || '—';
		return {
			displayName,
			ageLabel,
			blood,
			location: loc || '—',
			emailLine,
			phoneLine,
			hasPatientRecord: !!p,
			img: p?.img,
		};
	}, [data]);

	const doctor = data?.doctor;
	const doctorName = doctor
		? [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') || doctor.firstName || doctor.lastName || 'Doctor'
		: null;
	const clinicLocation = joinLocation([doctor?.clinicName, doctor?.clinicAddress, doctor?.city, doctor?.country]);

	let content = null;
	if (!id) {
		content = (
			<div className="view-appointment-error">
				<Empty description="Missing appointment ID" />
			</div>
		);
	} else if (isLoading) {
		content = (
			<div className="view-appointment-loading">
				<Spin size="large" />
				<p className="text-muted mt-3 mb-0">Loading appointment…</p>
			</div>
		);
	} else if (isError) {
		content = (
			<div className="view-appointment-error">
				<Empty description="Unable to load this appointment" />
			</div>
		);
	} else if (data?.id && patientSummary) {
		const scheduleValid = data.scheduleDate && moment(data.scheduleDate).isValid();
		content = (
			<div className="view-appointment-sheet view-appointment-sheet--a4">
				<div className="view-appointment-top">
					<div>
						<div className="view-appointment-brand">Appointment summary</div>
						<h1>Visit details</h1>
						<div className="view-appointment-meta text-muted small mb-2">
							Created {data.createdAt ? moment(data.createdAt).format('LL') : '—'}
						</div>
						<Tooltip title="Copy tracking ID">
							<Button type="default" icon={<FaCopy />} onClick={() => clickToCopyClipBoard(data.trackingId)}>
								Tracking: <Tag color="success">{data.trackingId || '—'}</Tag>
							</Button>
						</Tooltip>
					</div>
					<div className="view-appointment-status-grid">
						{data.patientType && (
							<div>
								<span className="text-muted small me-1">Patient type</span>
								<Tag color="processing">{data.patientType}</Tag>
							</div>
						)}
						<div>
							<span className="text-muted small me-1">Status</span>
							<Tag color="orange">{data.status || '—'}</Tag>
						</div>
						<div>
							<span className="text-muted small me-1">Payment</span>
							<Tag color="success">{data.paymentStatus || '—'}</Tag>
						</div>
						<div>
							<span className="text-muted small me-1">Prescription</span>
							<Tag color="green">{data.prescriptionStatus || '—'}</Tag>
						</div>
					</div>
				</div>

				<section className="view-appointment-section">
					<h2 className="view-appointment-section__title">Schedule &amp; location</h2>
					<div className="view-appointment-grid view-appointment-grid--2">
						<div className="view-appointment-field">
							<div className="view-appointment-field__label">Date</div>
							<p className="view-appointment-field__value">
								{scheduleValid ? moment(data.scheduleDate).format('dddd, MMMM D, YYYY') : '—'}
							</p>
						</div>
						<div className="view-appointment-field">
							<div className="view-appointment-field__label">Time</div>
							<p className="view-appointment-field__value">{data.scheduleTime || '—'}</p>
						</div>
						<div className="view-appointment-field" style={{ gridColumn: '1 / -1' }}>
							<div className="view-appointment-field__label">
								<FaVideo className="me-1" />
								Visit format
							</div>
							<p className="view-appointment-field__value">
								<Tag color="red">Online</Tag>
								<span className="text-muted fw-normal ms-2">Video link can be shared by the clinic if applicable.</span>
							</p>
							<p className="small text-muted mb-0 mt-2">
								Example meet link (replace with your clinic workflow):{' '}
								<a href="https://meet.google.com/" target="_blank" rel="noreferrer">
									Google Meet
								</a>
							</p>
						</div>
						{clinicLocation && (
							<div className="view-appointment-field" style={{ gridColumn: '1 / -1' }}>
								<div className="view-appointment-field__label">
									<FaMapMarkerAlt className="me-1" />
									Clinic / address
								</div>
								<p className="view-appointment-field__value mb-0">{clinicLocation}</p>
							</div>
						)}
					</div>
				</section>

				{doctor && (
					<section className="view-appointment-section">
						<h2 className="view-appointment-section__title">Doctor</h2>
						<div className="view-appointment-person">
							{doctor.img ? (
								<img src={doctor.img} alt="" className="view-appointment-avatar" />
							) : (
								<div className="view-appointment-avatar-placeholder" aria-hidden>
									<FaUserMd />
								</div>
							)}
							<div>
								<p className="view-appointment-person__name">Dr. {doctorName}</p>
								<ul className="view-appointment-person__lines">
									{doctor.designation && <li>{doctor.designation}</li>}
									{doctor.specialization && <li>{doctor.specialization}</li>}
									{doctor.college && <li>{doctor.college}</li>}
									{doctor.phone && <li>Phone: {doctor.phone}</li>}
									{doctor.email && <li>Email: {doctor.email}</li>}
								</ul>
							</div>
						</div>
					</section>
				)}

				<section className="view-appointment-section">
					<h2 className="view-appointment-section__title">Patient</h2>
					<div className="view-appointment-person">
						{patientSummary.img ? (
							<img src={patientSummary.img} alt="" className="view-appointment-avatar" />
						) : (
							<div className="view-appointment-avatar-placeholder" aria-hidden>
								<FaUserMd />
							</div>
						)}
						<div>
							<p className="view-appointment-person__name">{patientSummary.displayName}</p>
							<ul className="view-appointment-person__lines">
								<li>
									<strong>Age:</strong> {patientSummary.ageLabel}
								</li>
								<li>
									<strong>Blood group:</strong> {patientSummary.blood}
								</li>
								<li>
									<strong>Location:</strong> {patientSummary.location}
								</li>
								<li>
									<strong>Email:</strong> {patientSummary.emailLine}
								</li>
								<li>
									<strong>Phone:</strong> {patientSummary.phoneLine}
								</li>
								{!patientSummary.hasPatientRecord && (
									<li className="text-muted">
										No linked patient account — details are taken from this booking only.
									</li>
								)}
							</ul>
							{(data.reasonForVisit || data.description) && (
								<div className="view-appointment-reason">
									<div className="view-appointment-reason__label">Reason &amp; notes</div>
									{data.reasonForVisit && <p>{data.reasonForVisit}</p>}
									{data.description && <p>{data.description}</p>}
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		);
	} else {
		content = (
			<div className="view-appointment-error">
				<Empty description="Appointment not found" />
			</div>
		);
	}

	return (
		<>
			<Header />
			<div className="view-appointment-page">
				<div className="container px-3">
					<div className="view-appointment-toolbar">
						<Button type="primary" size="large" icon={<FaPrint />} onClick={handlePrint}>
							Print / PDF
						</Button>
					</div>
					<div ref={printRef}>{content}</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ViewAppointment;
