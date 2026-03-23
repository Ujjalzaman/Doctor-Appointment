import React, { useState } from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useDebounced } from '../../../utils/hooks/useDebounced';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty, Pagination, Spin } from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import './SearchDoctor.css';

const SearchDoctor = () => {
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortByGender, setSortByGender] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [priceRange, setPriceRange] = useState({});

	const query = {
		limit: size,
		page,
		...(sortBy && { sortBy }),
		...(sortOrder && { sortOrder }),
		...(sortByGender && { gender: sortByGender }),
		...(specialist && { specialist: specialist }),
	};

	const priceDebounced = useDebounced({ searchQuery: priceRange, delay: 600 });
	const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });

	if (priceDebounced && typeof priceDebounced === 'object' && Object.keys(priceDebounced).length > 0 && priceDebounced.min != null && priceDebounced.max != null) {
		query.min = priceDebounced.min;
		query.max = priceDebounced.max;
	}
	if (debouncedSearch) {
		query.searchTerm = debouncedSearch;
	}

	const resetFilter = () => {
		setPage(1);
		setSize(10);
		setSortBy('');
		setSortOrder('');
		setSearchTerm('');
		setSortByGender('');
		setSpecialist('');
		setPriceRange({});
	};

	const { data, isLoading, isError } = useGetDoctorsQuery(query);
	const doctorsData = data?.doctors ?? [];
	const meta = data?.meta;
	const total = meta?.total ?? 0;

	let content = null;
	if (isLoading) {
		content = (
			<div className="search-doctor-loading">
				<Spin size="large" />
				<p>Finding doctors...</p>
			</div>
		);
	} else if (isError) {
		content = (
			<div className="search-doctor-error">
				<p>Unable to load doctors. Please try again later.</p>
			</div>
		);
	} else if (!doctorsData.length) {
		content = (
			<div className="search-doctor-empty">
				<Empty description="No doctors match your filters" />
			</div>
		);
	} else {
		content = (
			<div className="search-doctor-grid">
				{doctorsData.map((item) => (
					<SearchContent key={item.id} data={item} />
				))}
			</div>
		);
	}

	const onPageChange = (newPage, newPageSize) => {
		setPage(newPage);
		if (newPageSize !== size) setSize(newPageSize);
	};

	return (
		<div className="search-doctor-page">
			<Header />
			<SubHeader title="Find a doctor" subtitle="Search by name, specialty, or filters below." />
			<div className="search-doctor-layout">
				<div className="container">
					<div className="row g-4">
						<SearchSidebar
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							sortByGender={sortByGender}
							setSortByGender={setSortByGender}
							specialist={specialist}
							setSpecialist={setSpecialist}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							sortBy={sortBy}
							sortOrder={sortOrder}
							setSortBy={setSortBy}
							setSortOrder={setSortOrder}
							resetFilter={resetFilter}
							query={query}
						/>
						<div className="col-12 col-lg-8 col-xl-9">
							<div className="search-doctor-results">
								{content}
							</div>
							{!isLoading && !isError && doctorsData.length > 0 && total > 0 && (
								<div className="search-doctor-pagination">
									<Pagination
										current={page}
										pageSize={size}
										total={total}
										onChange={onPageChange}
										showSizeChanger
										showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} doctors`}
										pageSizeOptions={[6, 10, 12, 20]}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SearchDoctor;
