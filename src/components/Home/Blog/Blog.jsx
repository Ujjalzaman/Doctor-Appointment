import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Empty, message } from 'antd';
import { useGetAllBlogsQuery } from '../../../redux/api/blogApi';
import { Link } from 'react-router-dom';
import { truncate } from '../../../utils/truncate';
import { FaUser, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
	const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 3 });
	const blogData = data?.blogs;

	useEffect(() => {
		if (!isLoading && isError) {
			message.error('Something went wrong. Please try again.');
		}
	}, [isLoading, isError]);

	let content = null;
	if (isLoading) {
		content = (
			<>
				{[1, 2, 3].map((i) => (
					<div className="col-md-4 col-sm-12 mb-4" key={i}>
						<div className="blog-card blog-card--skeleton">
							<div className="blog-card__img" />
							<div className="blog-card__body">
								<div className="blog-card__title-skeleton" />
								<div className="blog-card__meta-skeleton" />
								<div className="blog-card__excerpt-skeleton" />
							</div>
						</div>
					</div>
				))}
			</>
		);
	} else if (!isLoading && isError) {
		content = (
			<div className="col-12 text-center py-5">
				<p className="blog-error">Unable to load posts. Please try again later.</p>
			</div>
		);
	} else if (!isLoading && (!blogData || blogData.length === 0)) {
		content = (
			<div className="col-12 py-5">
				<Empty description="No blog posts yet" />
			</div>
		);
	} else if (blogData?.length > 0) {
		content = blogData.map((item) => (
			<div className="col-md-4 col-sm-12 mb-4" key={item?.id}>
				<article className="blog-card">
					<Link to={`/blog/${item?.id}`} className="blog-card__img-link">
						<div className="blog-card__img">
							{item?.img ? (
								<img src={item.img} alt="" className="img-fluid" />
							) : (
								<div className="blog-card__img-placeholder">Blog</div>
							)}
						</div>
					</Link>
					<div className="blog-card__body">
						<Link to={`/blog/${item?.id}`} className="blog-card__title">
							{truncate(item?.title, 55)}
						</Link>
						<div className="blog-card__meta">
							<span><FaUser size={12} /> {item?.user?.firstName} {item?.user?.lastName}</span>
							<span><FaCalendarAlt size={12} /> {dayjs(item?.createdAt).format('MMM D, YYYY')}</span>
						</div>
						<p className="blog-card__excerpt">{truncate(item?.description, 140)}</p>
						<Link to={`/blog/${item?.id}`} className="blog-card__link">
							Read more <FaArrowRight className="ms-1" />
						</Link>
					</div>
				</article>
			</div>
		));
	}

	return (
		<section className="blog-section">
			<div className="container">
				<div className="blog-section__header text-center">
					<span className="blog-section__label">From our blog</span>
					<h2>Our blog</h2>
					<p className="blog-section__lead">
						Health tips, news, and updates from our team.
					</p>
				</div>
				<div className="row justify-content-center">
					{content}
				</div>
				<div className="text-center mt-4 mt-md-5">
					<Link to="/blog" className="blog-section__cta">View all posts</Link>
				</div>
			</div>
		</section>
	);
};

export default Blog;
