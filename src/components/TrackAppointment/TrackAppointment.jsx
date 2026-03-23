import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import './index.css';
import {
	Button,
	Input,
	Steps,
	Card,
	Typography,
	message,
	Collapse,
	Row,
	Col,
	Alert,
	Space,
	Tag,
} from 'antd';
import { useTrackAppointmentMutation } from '../../redux/api/appointmentApi';
import TrackDetailPage from './TrackDetailPage';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
	FaSearch,
	FaIdCard,
	FaPhone,
	FaEnvelope,
	FaCalendarCheck,
	FaQuestionCircle,
	FaShieldAlt,
	FaCheckCircle,
	FaBookMedical,
	FaClock,
	FaUserLock,
} from 'react-icons/fa';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const RECENT_IDS_KEY = 'doccare_track_recent_ids';
const MIN_ID_LENGTH = 6;

function loadRecentIds() {
	try {
		const raw = localStorage.getItem(RECENT_IDS_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string' && x.length >= MIN_ID_LENGTH) : [];
	} catch {
		return [];
	}
}

function saveRecentId(id) {
	const trimmed = (id || '').trim();
	if (trimmed.length < MIN_ID_LENGTH) return;
	const next = [trimmed, ...loadRecentIds().filter((x) => x !== trimmed)].slice(0, 5);
	try {
		localStorage.setItem(RECENT_IDS_KEY, JSON.stringify(next));
	} catch {
		/* ignore quota */
	}
	return next;
}

const TrackAppointment = () => {
	const [trackAppointment, { data, isSuccess, isLoading, isError, error, reset }] = useTrackAppointmentMutation();
	const [showInfo, setShowInfo] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [recentIds, setRecentIds] = useState(loadRecentIds);

	const runTrack = useCallback(
		(raw) => {
			const v = (raw || '').trim();
			if (v.length < MIN_ID_LENGTH) {
				message.warning(`Enter at least ${MIN_ID_LENGTH} characters (your full tracking ID).`);
				return;
			}
			trackAppointment({ id: v });
		},
		[trackAppointment]
	);

	const onSearch = (value) => runTrack(value);

	useEffect(() => {
		if (isSuccess && data?.id) {
			message.success('Appointment found');
			setShowInfo(true);
			const idUsed = data.trackingId || searchValue.trim();
			if (idUsed.length >= MIN_ID_LENGTH) {
				const next = saveRecentId(idUsed);
				if (next) setRecentIds(next);
			}
		}
		if (isSuccess && data?.id === undefined) {
			message.warning('No appointment found for this ID');
		}
	}, [isSuccess, data?.id, data?.trackingId, searchValue]);

	useEffect(() => {
		if (isError && error?.data?.message) {
			message.error(error.data.message);
		}
	}, [isError, error]);

	const handleBackToSearch = () => {
		setShowInfo(false);
		setSearchValue('');
		reset();
	};

	const handleRecentClick = (id) => {
		setSearchValue(id);
		runTrack(id);
	};

	let content = null;
	if (!isLoading && !isError && data?.id) {
		content = <TrackDetailPage data={data} setShowInfo={handleBackToSearch} />;
	}

	return (
		<>
			<Header />
			<SubHeader
				title="Track your appointment"
				subtitle="Look up status, schedule, and clinician details with your tracking ID — secure and instant."
			/>

			<div className="track-page">
				{showInfo ? (
					<div className="container track-page__detail-wrap">{content}</div>
				) : (
					<>
						<section className="track-page__hero">
							<div className="container">
								<Row gutter={[24, 24]} align="stretch">
									<Col xs={24} lg={14} xl={15}>
										<Card className="track-page__card track-page__card--main" bordered={false}>
											<div className="track-page__card-head">
												<div>
													<Title level={3} className="track-page__title">
														<FaIdCard className="track-page__title-icon" />
														Look up your visit
													</Title>
													<Paragraph type="secondary" className="track-page__subtitle mb-0">
														Use the tracking ID from your booking confirmation (email or SMS). No account is required.
													</Paragraph>
												</div>
											</div>

											<Search
												placeholder="Paste your tracking ID (e.g. ABC20240315001)"
												allowClear
												enterButton={
													<Button type="primary" icon={<FaSearch />} loading={isLoading}>
														Track
													</Button>
												}
												size="large"
												value={searchValue}
												onChange={(e) => setSearchValue(e.target.value)}
												onSearch={onSearch}
												className="track-page__search"
												onPressEnter={() => onSearch(searchValue)}
											/>

											<div className="track-page__tips">
												<Text type="secondary">
													<FaQuestionCircle className="me-1" />
													Tip: copy-paste the full ID to avoid typos. Minimum {MIN_ID_LENGTH} characters.
												</Text>
											</div>

											{recentIds.length > 0 && (
												<div className="track-page__recent">
													<Text type="secondary" className="track-page__recent-label">
														Recent lookups on this device
													</Text>
													<div className="track-page__recent-chips">
														{recentIds.map((id) => (
															<Tag
																key={id}
																className="track-page__recent-tag"
																onClick={() => handleRecentClick(id)}
															>
																{id.length > 24 ? `${id.slice(0, 22)}…` : id}
															</Tag>
														))}
													</div>
												</div>
											)}

											<Steps
												className="track-page__steps"
												current={-1}
												items={[
													{ title: 'Booked', description: 'Confirmation sent' },
													{ title: 'Confirmed', description: 'Clinic review' },
													{ title: 'Visit', description: 'See your doctor' },
													{ title: 'Follow-up', description: 'Prescription & care' },
												]}
											/>
										</Card>
									</Col>

									<Col xs={24} lg={10} xl={9}>
										<Card className="track-page__side-card" bordered={false}>
											<div className="track-page__side-icon">
												<FaShieldAlt />
											</div>
											<Title level={4} className="track-page__side-title">
												Private &amp; read-only
											</Title>
											<ul className="track-page__side-list">
												<li>
													<FaCheckCircle /> We only show the appointment linked to your ID.
												</li>
												<li>
													<FaUserLock /> You cannot change clinical data from this page.
												</li>
												<li>
													<FaClock /> Status updates when your clinic updates the record.
												</li>
											</ul>
											<Alert
												type="info"
												showIcon
												className="track-page__side-alert"
												message="What you’ll see after tracking"
												description={
													<Space direction="vertical" size="small" className="w-100">
														<span>
															<FaCheckCircle className="text-success me-1" />
															Schedule date &amp; time
														</span>
														<span>
															<FaCheckCircle className="text-success me-1" />
															Patient &amp; doctor summary
														</span>
														<span>
															<FaCheckCircle className="text-success me-1" />
															Payment, visit &amp; prescription progress
														</span>
													</Space>
												}
											/>
										</Card>
									</Col>
								</Row>

								{!isLoading && isError && (
									<Alert
										className="track-page__banner-error"
										type="error"
										showIcon
										closable
										message="We couldn’t load that ID"
										description={
											error?.data?.message ||
											'Check the code and try again, or contact support if you keep seeing this message.'
										}
									/>
								)}
							</div>
						</section>

						<section className="track-page__how">
							<div className="container">
								<Title level={4} className="track-page__how-title text-center">
									How tracking works
								</Title>
								<Row gutter={[20, 20]} className="mt-4">
									<Col xs={24} md={8}>
										<Card className="track-page__how-card" bordered={false}>
											<div className="track-page__how-num">1</div>
											<Title level={5}>Find your ID</Title>
											<Paragraph type="secondary" className="mb-0">
												Open the confirmation email or SMS you received right after booking.
											</Paragraph>
										</Card>
									</Col>
									<Col xs={24} md={8}>
										<Card className="track-page__how-card" bordered={false}>
											<div className="track-page__how-num">2</div>
											<Title level={5}>Paste &amp; track</Title>
											<Paragraph type="secondary" className="mb-0">
												Enter the full code here. We match it to your appointment in real time.
											</Paragraph>
										</Card>
									</Col>
									<Col xs={24} md={8}>
										<Card className="track-page__how-card" bordered={false}>
											<div className="track-page__how-num">3</div>
											<Title level={5}>Review details</Title>
											<Paragraph type="secondary" className="mb-0">
												See timeline, payment, and prescription status — then contact us if you need changes.
											</Paragraph>
										</Card>
									</Col>
								</Row>
							</div>
						</section>

						<section className="track-page__faq">
							<div className="container">
								<Row justify="center">
									<Col xs={24} lg={10}>
										<Title level={4} className="text-center mb-4">
											Common questions
										</Title>
										<Collapse
											className="track-page__collapse"
											items={[
												{
													key: '1',
													label: 'I don’t have a tracking ID',
													children: (
														<p className="mb-0 text-muted">
															Check your spam folder for the confirmation email, or sign in as a patient and open
															<strong> My appointments</strong>. You can also book again from{' '}
															<Link to="/doctors">Find a doctor</Link>.
														</p>
													),
												},
												{
													key: '2',
													label: 'Can I cancel or reschedule here?',
													children: (
														<p className="mb-0 text-muted">
															This page is read-only. Use your patient dashboard or{' '}
															<Link to="/contact">contact support</Link> so the clinic can update your slot.
														</p>
													),
												},
												{
													key: '3',
													label: 'Is my information safe?',
													children: (
														<p className="mb-0 text-muted">
															Only someone with your tracking ID can load this summary. Don’t share your ID publicly.
															Recent IDs are stored only in your browser on this device.
														</p>
													),
												},
											]}
										/>
									</Col>
								</Row>
							</div>
						</section>

						<section className="track-page__info">
							<div className="container">
								<Row gutter={[20, 20]}>
									<Col xs={24} sm={12} lg={6}>
										<Card className="track-page__info-card" bordered={false}>
											<FaCalendarCheck className="track-page__info-icon" />
											<Title level={5}>Reschedule</Title>
											<Paragraph type="secondary">
												Log in and open your appointments, or message the clinic.
											</Paragraph>
											<Link to="/login" className="track-page__link">
												Patient login
											</Link>
										</Card>
									</Col>
									<Col xs={24} sm={12} lg={6}>
										<Card className="track-page__info-card" bordered={false}>
											<FaBookMedical className="track-page__info-icon" />
											<Title level={5}>New booking</Title>
											<Paragraph type="secondary">
												Browse specialists and pick a time that fits you.
											</Paragraph>
											<Link to="/appointment" className="track-page__link">
												Book appointment
											</Link>
										</Card>
									</Col>
									<Col xs={24} sm={12} lg={6}>
										<Card className="track-page__info-card" bordered={false}>
											<FaPhone className="track-page__info-icon" />
											<Title level={5}>Urgent help</Title>
											<Paragraph type="secondary">
												Emergencies: call your clinic. General questions: we’re here.
											</Paragraph>
											<Link to="/contact" className="track-page__link">
												Contact
											</Link>
										</Card>
									</Col>
									<Col xs={24} sm={12} lg={6}>
										<Card className="track-page__info-card" bordered={false}>
											<FaEnvelope className="track-page__info-icon" />
											<Title level={5}>Inbox</Title>
											<Paragraph type="secondary">
												Confirmations and reminders are sent to the email you used when booking.
											</Paragraph>
											<Link to="/doctors" className="track-page__link">
												Find a doctor
											</Link>
										</Card>
									</Col>
								</Row>
							</div>
						</section>
					</>
				)}
			</div>

			<Footer />
		</>
	);
};

export default TrackAppointment;
