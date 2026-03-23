import React from 'react';
import './index.css';
import { useGetAllReviewsQuery } from '../../../redux/api/reviewsApi';
import StarRatings from 'react-star-ratings';
import { truncate } from '../../../utils/truncate';
import { FaCheck, FaUser } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Testimonial = () => {
	const { data, isLoading, isError } = useGetAllReviewsQuery({});
	let content = null;

	if (isLoading) {
		content = (
			<>
				{[1, 2].map((i) => (
					<SwiperSlide key={i}>
						<div className="testimonial-card testimonial-card--skeleton">
							<div className="testimonial-card__header">
								<div className="testimonial-card__avatar" />
								<div className="testimonial-card__meta-skeleton" />
							</div>
							<div className="testimonial-card__text-skeleton" />
						</div>
					</SwiperSlide>
				))}
			</>
		);
	} else if (!isLoading && isError) {
		content = (
			<div className="col-12 text-center py-5">
				<p className="testimonial-error">Unable to load reviews.</p>
			</div>
		);
	} else if (!isLoading && (!data || data.length === 0)) {
		content = (
			<div className="col-12 text-center py-5">
				<p className="testimonial-empty">No reviews yet.</p>
			</div>
		);
	} else if (data?.length > 0) {
		content = data.slice(0, 10).map((item) => (
			<SwiperSlide key={item.id}>
				<div className="testimonial-card">
					<div className="testimonial-card__header">
						<div className="testimonial-card__avatar">
							{item?.patient?.img ? (
								<img src={item.patient.img} alt="" />
							) : (
								<span className="testimonial-card__avatar-placeholder"><FaUser /></span>
							)}
						</div>
						<div>
							<h5 className="testimonial-card__name">
								{item?.patient?.firstName} {item?.patient?.lastName}
							</h5>
							<p className="testimonial-card__badge"><FaCheck /> Recommended</p>
						</div>
					</div>
					<p className="testimonial-card__text">{truncate(item?.description, 150)}</p>
					<div className="testimonial-card__stars">
						<StarRatings
							rating={5}
							starRatedColor="#f4c150"
							numberOfStars={5}
							name="rating"
							starDimension="18px"
							starSpacing="2px"
						/>
					</div>
				</div>
			</SwiperSlide>
		));
	}

	return (
		<section className="testimonial-section">
			<div className="container">
				<div className="testimonial-section__header text-center">
					<span className="testimonial-section__label">Reviews</span>
					<h2>Testimonials</h2>
					<p className="testimonial-section__lead">What our patients say about us</p>
				</div>
				<div className="testimonial-swiper-wrap">
					<Swiper
						spaceBetween={24}
						slidesPerView={1}
						modules={[Navigation, Autoplay]}
						navigation
						loop={data?.length > 1}
						autoplay={{ delay: 2500, disableOnInteraction: false }}
						breakpoints={{
							768: { slidesPerView: 2 },
						}}
						className="testimonial-swiper"
					>
						{content}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
