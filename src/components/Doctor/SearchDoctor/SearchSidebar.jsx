import React from 'react';
import { Input, Select, Slider, Button } from 'antd';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { doctorSpecialistOptions } from '../../../constant/global';
import './SearchDoctor.css';

const genderOptions = [
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
	{ label: 'Other', value: 'shemale' },
];

const sortOptions = [
	{ label: 'Name (A–Z)', value: 'firstName', order: 'asc' },
	{ label: 'Name (Z–A)', value: 'firstName', order: 'desc' },
	{ label: 'Price (Low to High)', value: 'price', order: 'asc' },
	{ label: 'Price (High to Low)', value: 'price', order: 'desc' },
	{ label: 'Rating', value: 'rating', order: 'desc' },
];

const SearchSidebar = ({
	searchTerm,
	setSearchTerm,
	sortByGender,
	setSortByGender,
	specialist,
	setSpecialist,
	priceRange,
	setPriceRange,
	sortBy,
	sortOrder,
	setSortBy,
	setSortOrder,
	resetFilter,
	query,
}) => {
	const onSearch = (e) => {
		const v = e?.target?.value ?? '';
		setSearchTerm(v);
	};

	const onSortChange = (value) => {
		if (!value) {
			setSortBy('');
			setSortOrder('');
			return;
		}
		const opt = sortOptions.find((o) => o.value + '_' + o.order === value);
		if (opt) {
			setSortBy(opt.value);
			setSortOrder(opt.order);
		}
	};

	const sortValue = sortBy && sortOrder ? `${sortBy}_${sortOrder}` : undefined;

	const hasActiveFilters =
		searchTerm ||
		sortByGender ||
		specialist ||
		(priceRange?.min != null && priceRange?.max != null) ||
		sortBy;

	return (
		<div className="col-12 col-lg-4 col-xl-3">
			<aside className="search-sidebar">
				<div className="search-sidebar__header">
					<h3>Filters</h3>
					{hasActiveFilters && (
						<Button type="link" size="small" onClick={resetFilter} className="search-sidebar__clear">
							<FaTimes /> Clear all
						</Button>
					)}
				</div>

				<div className="search-sidebar__group">
					<label>Search by name or specialty</label>
					<Input
						placeholder="Doctor name, specialty..."
						value={searchTerm}
						onChange={onSearch}
						allowClear
						prefix={<FaSearch className="search-sidebar__input-icon" />}
						className="search-sidebar__input"
					/>
				</div>

				<div className="search-sidebar__group">
					<label>Gender</label>
					<Select
						placeholder="Any"
						value={sortByGender || undefined}
						onChange={setSortByGender}
						options={genderOptions}
						allowClear
						className="search-sidebar__select w-100"
					/>
				</div>

				<div className="search-sidebar__group">
					<label>Specialty</label>
					<Select
						placeholder="Any specialty"
						value={specialist || undefined}
						onChange={setSpecialist}
						options={doctorSpecialistOptions}
						allowClear
						className="search-sidebar__select w-100"
						showSearch
						optionFilterProp="label"
					/>
				</div>

				<div className="search-sidebar__group">
					<label>Consultation fee (per hour)</label>
					<Slider
						range
						min={0}
						max={500}
						value={[priceRange?.min ?? 0, priceRange?.max ?? 500]}
						onChange={([min, max]) => setPriceRange({ min, max })}
						marks={{ 0: '$0', 250: '$250', 500: '$500' }}
						className="search-sidebar__slider"
					/>
				</div>

				<div className="search-sidebar__group">
					<label>Sort by</label>
					<Select
						placeholder="Default"
						value={sortValue}
						onChange={onSortChange}
						options={sortOptions.map((o) => ({
							label: o.label,
							value: o.value + '_' + o.order,
						}))}
						allowClear
						className="search-sidebar__select w-100"
					/>
				</div>

				{hasActiveFilters && (
					<Button block type="default" onClick={resetFilter} className="search-sidebar__reset-btn">
						<FaTimes /> Reset filters
					</Button>
				)}
			</aside>
		</div>
	);
};

export default SearchSidebar;
