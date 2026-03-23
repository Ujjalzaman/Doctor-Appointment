import React, { useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { useDebounced } from '../../redux/hooks';
import { Empty, Pagination, Spin, Input } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { truncate } from '../../utils/truncate';
import { FaUser, FaCalendarAlt, FaArrowRight, FaSearch } from 'react-icons/fa';
import moment from 'moment';
import './Blog.css';

const Blog = () => {
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(9);
	const [searchTerm, setSearchTerm] = useState('');

	const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

	const query = {
		limit: size,
		page,
		...(debouncedTerm && { searchTerm: debouncedTerm })
	};

	const { data, isError, isLoading } = useGetAllBlogsQuery(query);
	const blogData = data?.blogs;
	const meta = data?.meta;
	const total = meta?.total ?? 0;

	const onPageChange = (newPage, newPageSize) => {
		setPage(newPage);
		if (newPageSize !== size) setSize(newPageSize);
	};

	let content = null;
	if (isLoading) {
		content = (
			<div className="blog-loading">
				<Spin size="large" />
				<p>Loading posts...</p>
			</div>
		);
	} else if (isError) {
		content = (
			<div className="blog-error">
				<p>Unable to load posts. Please try again later.</p>
			</div>
		);
	} else if (!blogData || blogData.length === 0) {
		content = (
			<div className="blog-empty">
				<Empty description="No blog posts found" />
			</div>
		);
	} else {
		content = blogData.map((item) => (
			<div className="col-lg-4 col-md-6 mb-4" key={item.id}>
				<article className="blog-post-card">
					<Link to={`/blog/${item.id}`} className="blog-post-card__image-link">
						<div className="blog-post-card__image">
							{item.img ? (
								<img src={item.img} alt={item.title} className="img-fluid" />
							) : (
								<div className="blog-post-card__image-placeholder">Blog</div>
							)}
						</div>
					</Link>
					<div className="blog-post-card__body">
						<div className="blog-post-card__meta">
							<span className="blog-post-card__meta-item">
								<FaUser /> {item.user?.firstName} {item.user?.lastName}
							</span>
							<span className="blog-post-card__meta-item">
								<FaCalendarAlt /> {moment(item.createdAt).format('MMM D, YYYY')}
							</span>
						</div>
						<Link to={`/blog/${item.id}`} className="blog-post-card__title">
							{truncate(item.title, 60)}
						</Link>
						<p className="blog-post-card__excerpt">{truncate(item.description, 120)}</p>
						<Link to={`/blog/${item.id}`} className="blog-post-card__read-more">
							Read more <FaArrowRight />
						</Link>
					</div>
				</article>
			</div>
		));
	}

	return (
		<>
			<Header />
			<SubHeader title="Blog" subtitle="Health tips, news, and insights from our team" />

			<section className="blog-page">
				<div className="container">
					<div className="blog-header">
						<div className="blog-search-wrap">
							<Input
								size="large"
								placeholder="Search blog posts..."
								prefix={<FaSearch />}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="blog-search-input"
								allowClear
							/>
						</div>
					</div>

					<div className="row">
						{content}
					</div>

					{!isLoading && !isError && blogData && blogData.length > 0 && total > 0 && (
						<div className="blog-pagination">
							<Pagination
								current={page}
								pageSize={size}
								total={total}
								onChange={onPageChange}
								showSizeChanger
								showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} posts`}
								pageSizeOptions={[6, 9, 12, 18]}
							/>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
};

export default Blog;
