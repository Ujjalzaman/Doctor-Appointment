import './index.css';
import './TrackDetailPage.css';
import { appointStatusDsc } from '../../constant/appointmentStatus';
import moment from 'moment';

const AppointmentTimeLine = ({ data }) => {
	const payDesc = appointStatusDsc?.payment;
	const apptDesc = appointStatusDsc.appointment[data?.status] || 'Status updates as your visit progresses.';
	const rxDesc =
		appointStatusDsc.prescriptionStatus[data?.prescriptionStatus] ||
		'Your doctor will update this after the visit.';

	return (
		<div className="track-timeline">
			<div className="track-timeline__card">
				<h6>Payment</h6>
				<div className="track-timeline__value">{data?.paymentStatus || '—'}</div>
				<p>{payDesc}</p>
			</div>
			<div className="track-timeline__card">
				<h6>Appointment</h6>
				<div className="track-timeline__value">{data?.status || '—'}</div>
				<p>{apptDesc}</p>
			</div>
			<div className="track-timeline__card">
				<h6>Follow-up</h6>
				<div className="track-timeline__value">
					{data?.followUp ? moment(data.followUp).format('MMM D, YYYY') : 'Not scheduled'}
				</div>
				<p>{data?.followUp ? appointStatusDsc.followUpDate : 'Book a follow-up if your doctor recommends one.'}</p>
			</div>
			<div className="track-timeline__card">
				<h6>Prescription</h6>
				<div className="track-timeline__value">{data?.prescriptionStatus || '—'}</div>
				<p>{rxDesc}</p>
			</div>
		</div>
	);
};

export default AppointmentTimeLine;
