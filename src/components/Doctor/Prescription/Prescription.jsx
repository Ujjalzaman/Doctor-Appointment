import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { Card, Table, Button, Tag, Input, DatePicker, Space, Popconfirm, message, Collapse, Typography } from 'antd';
import { FaEye, FaEdit, FaTrash, FaSearch, FaPills, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
	useDeletePrescriptionMutation,
	useGetDoctorPrescriptionQuery,
	useGetPatientPrescriptionQuery,
} from '../../../redux/api/prescriptionApi';
import { useState } from 'react';
import moment from 'moment';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import './Prescription.css';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const DoctorPrescriptions = () => {
	const { data, isLoading } = useGetDoctorPrescriptionQuery();
	const [deletePrescription, { isLoading: deleteLoading }] = useDeletePrescriptionMutation();
	const [searchTerm, setSearchTerm] = useState('');
	const [dateRange, setDateRange] = useState(null);

	const filteredData = data?.filter((prescription) => {
		const matchesSearch =
			prescription?.disease?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			prescription?.appointment?.trackingId?.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesDateRange =
			!dateRange || moment(prescription?.createdAt).isBetween(dateRange[0], dateRange[1], 'day', '[]');

		return matchesSearch && matchesDateRange;
	});

	const stats = [
		{ title: 'Total Prescriptions', count: data?.length || 0, color: 'primary' },
		{ title: 'Active', count: data?.filter((p) => !p?.isArchived)?.length || 0, color: 'success' },
		{ title: 'Archived', count: data?.filter((p) => p?.isArchived)?.length || 0, color: 'warning' },
	];

	const columns = [
		{
			title: 'Appointment ID',
			key: 'appointmentId',
			width: 150,
			render: (_, record) => <Tag color="#667eea">{record?.appointment?.trackingId || 'N/A'}</Tag>,
		},
		{
			title: 'Patient / Case',
			key: 'patient',
			render: (_, record) => (
				<div>
					<div className="fw-semibold">
						{record?.patient?.firstName} {record?.patient?.lastName}
					</div>
					<Text type="secondary" className="small d-block">
						{record?.disease || '—'}
					</Text>
				</div>
			),
		},
		{
			title: 'Follow-Up',
			dataIndex: 'followUpdate',
			key: 'followUpdate',
			width: 140,
			render: (date) => (date ? moment(date).format('MMM DD, YYYY') : 'N/A'),
		},
		{
			title: 'Status',
			key: 'status',
			width: 120,
			render: (_, record) => (
				<Tag color={record?.isArchived ? '#f50' : '#52c41a'}>{record?.isArchived ? 'Archived' : 'Active'}</Tag>
			),
		},
		{
			title: 'Created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 130,
			render: (date) => moment(date).format('MMM DD, YYYY'),
		},
		{
			title: 'Actions',
			key: 'actions',
			fixed: 'right',
			width: 200,
			render: (_, record) => (
				<Space wrap>
					<Link to={`/dashboard/prescription/${record.id}`}>
						<Button type="primary" icon={<FaEye />} size="small">
							View
						</Button>
					</Link>
					<Link to={`/dashboard/appointment/treatment/edit/${record.id}`}>
						<Button type="default" icon={<FaEdit />} size="small">
							Edit
						</Button>
					</Link>
					<Popconfirm
						title="Delete prescription?"
						description="Are you sure you want to delete this prescription?"
						onConfirm={() => deleteHandler(record.id)}
						okText="Yes"
						cancelText="No"
					>
						<Button danger icon={<FaTrash />} size="small" loading={deleteLoading} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const deleteHandler = async (id) => {
		try {
			await deletePrescription(id).unwrap();
			message.success('Prescription deleted successfully!');
		} catch (error) {
			message.error('Failed to delete prescription');
		}
	};

	return (
		<div className="dashboard-card prescription-page">
			<div className="dashboard-card-header">
				<div>
					<h3 className="dashboard-card-title mb-1">Prescriptions</h3>
					<p className="text-muted small mb-0">Manage diagnoses, medicines, and follow-ups for your patients.</p>
				</div>
			</div>

			<div className="stats-mini-grid mb-4">
				{stats.map((stat, index) => (
					<Card key={index} className={`stat-mini-card stat-mini-card-${stat.color}`}>
						<div className="stat-mini-details">
							<div className="stat-mini-title">{stat.title}</div>
							<div className="stat-mini-count">{stat.count}</div>
						</div>
					</Card>
				))}
			</div>

			<Card className="prescription-table-card">
				<div className="table-toolbar mb-3">
					<Space wrap>
						<Input
							placeholder="Search by disease or tracking ID..."
							prefix={<FaSearch />}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{ width: 300 }}
							allowClear
						/>
						<RangePicker value={dateRange} onChange={setDateRange} format="MMM DD, YYYY" />
					</Space>
				</div>

				<Table
					columns={columns}
					dataSource={filteredData}
					rowKey="id"
					loading={isLoading}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showTotal: (total) => `Total ${total} prescriptions`,
					}}
					scroll={{ x: 960 }}
				/>
			</Card>
		</div>
	);
};

const PatientPrescriptions = () => {
	const { data, isLoading } = useGetPatientPrescriptionQuery();
	const [searchTerm, setSearchTerm] = useState('');

	const filtered = data?.filter(
		(p) =>
			!searchTerm ||
			p?.disease?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p?.appointment?.trackingId?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const columns = [
		{
			title: 'Doctor',
			key: 'doctor',
			render: (_, record) => (
				<div className="d-flex align-items-center gap-2">
					<FaUserMd className="text-primary" />
					<div>
						<div className="fw-semibold">
							Dr. {record?.doctor?.firstName} {record?.doctor?.lastName}
						</div>
						<Text type="secondary" className="small">
							{record?.doctor?.specialization || 'Specialist'}
						</Text>
					</div>
				</div>
			),
		},
		{
			title: 'Visit focus',
			dataIndex: 'disease',
			key: 'disease',
			render: (t) => t || '—',
		},
		{
			title: 'Tracking',
			key: 'tid',
			width: 140,
			render: (_, record) => <Tag>{record?.appointment?.trackingId || 'N/A'}</Tag>,
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 120,
			render: (d) => moment(d).format('MMM DD, YYYY'),
		},
		{
			title: '',
			key: 'action',
			width: 110,
			render: (_, record) => (
				<Link to={`/dashboard/prescription/${record.id}`}>
					<Button type="primary" size="small" icon={<FaEye />}>
						Details
					</Button>
				</Link>
			),
		},
	];

	return (
		<div className="dashboard-card prescription-page prescription-page--patient">
			<div className="dashboard-card-header">
				<div>
					<h3 className="dashboard-card-title mb-1">My prescriptions &amp; medicines</h3>
					<p className="text-muted small mb-0">
						Everything your care team prescribed — open a row for full instructions and medication list.
					</p>
				</div>
			</div>

			<Card className="prescription-table-card mb-4">
				<div className="table-toolbar mb-3">
					<Input
						placeholder="Search by condition or tracking ID..."
						prefix={<FaSearch />}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{ maxWidth: 360 }}
						allowClear
					/>
				</div>
				<Table
					columns={columns}
					dataSource={filtered}
					rowKey="id"
					loading={isLoading}
					pagination={{ pageSize: 8 }}
					expandable={{
						expandedRowRender: (record) => (
							<div className="prescription-expand">
								<div className="prescription-expand__block">
									<Text strong>Instructions</Text>
									<p className="mb-0 text-muted">{record?.instruction || '—'}</p>
								</div>
								<div className="prescription-expand__block">
									<Text strong>
										<FaPills className="me-1" />
										Medicines
									</Text>
									{record?.medicines?.length ? (
										<ul className="prescription-meds-list">
											{record.medicines.map((m) => (
												<li key={m.id}>
													<strong>{m.medicine || 'Medicine'}</strong>
													{m.dosage && <span> · {m.dosage}</span>}
													{m.frequency && <span> · {m.frequency}</span>}
													{m.duration && <span> · {m.duration}</span>}
												</li>
											))}
										</ul>
									) : (
										<p className="text-muted mb-0">No medicines listed for this record.</p>
									)}
								</div>
							</div>
						),
						rowExpandable: () => true,
					}}
				/>
			</Card>

			<Collapse
				className="prescription-faq"
				items={[
					{
						key: '1',
						label: 'How do I request a refill?',
						children: <p className="mb-0 text-muted">Message your doctor from the appointment or book a follow-up visit.</p>,
					},
					{
						key: '2',
						label: 'Are these records official?',
						children: (
							<p className="mb-0 text-muted">Yes — they mirror what was issued after your visit. Bring your tracking ID to the pharmacy if needed.</p>
						),
					},
				]}
			/>
		</div>
	);
};

const Prescription = () => {
	const { role } = useAuthCheck();

	return (
		<DashboardLayout>{role === 'doctor' ? <DoctorPrescriptions /> : <PatientPrescriptions />}</DashboardLayout>
	);
};

export default Prescription;
