import React, { useEffect } from 'react';
import Footer from '../../Shared/Footer/Footer';
import './index.css';
import { useParams } from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { Empty, message, Tabs } from 'antd';
import DoctorProfileHero from './DoctorProfileHero';
import OverView from './OverView';
import Location from './Location';
import Review from './Review';
import Availibility from './Availibility';

const DoctorProfile = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = useGetDoctorQuery(id, { skip: !id });

	useEffect(() => {
		if (!isLoading && isError) {
			message.error('Could not load doctor. Please try again.');
		}
	}, [isLoading, isError]);

	const items = [
		{ key: '1', label: 'Overview', children: <OverView /> },
		{ key: '2', label: 'Locations', children: <Location /> },
		{ key: '3', label: 'Reviews', children: <Review doctorId={id} /> },
		{ key: '4', label: 'Availability', children: <Availibility /> },
	];

	let content = null;
	if (isLoading) {
		content = (
			<div className="profile-loading">
				<div className="profile-loading__card" />
				<div className="profile-loading__tabs" />
			</div>
		);
	} else if (isError || !data?.id) {
		content = (
			<div className="profile-error">
				<Empty description="Doctor not found or unable to load." />
			</div>
		);
	} else {
		content = (
			<>
				<DoctorProfileHero data={data} />
				<div className="profile-tabs-wrap">
					<div className="container">
						<Tabs defaultActiveKey="1" items={items} className="profile-tabs" />
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="doctor-profile-page">
			<Header />
			<SubHeader title="Doctor profile" subtitle="View details, reviews, and book an appointment." />
			<div className="profile-content">
				{content}
			</div>
			<Footer />
		</div>
	);
};

export default DoctorProfile;
