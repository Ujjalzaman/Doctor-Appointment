import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaUser } from 'react-icons/fa';
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import { useCreateReviewMutation, useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import { Button, Radio, message, Space, Rate, Spin, Empty } from 'antd';
import { useForm } from 'react-hook-form';
import './Review.css';

const desc = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

const Review = ({ doctorId }) => {
	const { register, handleSubmit, reset } = useForm();
	const [value, setValue] = useState(null);
	const [recommend, setRecommend] = useState(null);

	const { data, isError, isLoading } = useGetDoctorReviewsQuery(doctorId);
	const [createReview, { isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createIsLoading }] = useCreateReviewMutation();

	const onChange = (e) => setRecommend(e.target.value);

	const onSubmit = (formData) => {
		if (!formData.description || formData.description.trim() === '') {
			message.error('Please write your review');
			return;
		}
		if (value === null) {
			message.error('Please select a rating');
			return;
		}
		if (recommend === null) {
			message.error('Please select if you recommend this doctor');
			return;
		}

		const obj = {
			isRecommended: recommend === 1,
			description: formData.description,
			star: value?.toString(),
			doctorId
		};
		createReview({ data: obj });
	};

	useEffect(() => {
		if (createIsError && createError) {
			message.error(createError?.data?.message || 'Failed to submit review');
		}
		if (createIsSuccess) {
			message.success('Review submitted successfully!');
			setRecommend(null);
			setValue(null);
			reset();
		}
	}, [createIsLoading, createIsError, createError, createIsSuccess, reset]);

	let content = null;
	if (isLoading) {
		content = (
			<div className="reviews-loading">
				<Spin size="large" />
			</div>
		);
	} else if (isError) {
		content = <div className="reviews-error">Unable to load reviews</div>;
	} else if (!data || data.length === 0) {
		content = <Empty description="No reviews yet. Be the first to review!" />;
	} else {
		content = data.map((item) => (
			<div className="review-card" key={item.id}>
				<div className="review-card__header">
					<div className="review-card__user">
						<div className="review-card__avatar">
							{item?.patient?.img ? (
								<img src={item.patient.img} alt="" />
							) : (
								<FaUser />
							)}
						</div>
						<div>
							<h5 className="review-card__name">
								{item?.patient?.firstName} {item?.patient?.lastName}
							</h5>
							<p className="review-card__date">
								{moment(item?.createdAt).format('MMM D, YYYY')}
							</p>
						</div>
					</div>
					<div className="review-card__rating-block">
						<div className="review-card__stars">
							<StarRatings
								rating={5}
								starRatedColor="#f4c150"
								numberOfStars={5}
								name="rating"
								starDimension="18px"
								starSpacing="2px"
							/>
						</div>
						<span className="review-card__rating-text">5.0</span>
					</div>
				</div>
				<div className="review-card__body">
					<p className="review-card__text">{item?.description}</p>
					<div className={`review-card__recommendation ${item?.isRecommended ? 'review-card__recommendation--yes' : 'review-card__recommendation--no'}`}>
						{item?.isRecommended ? (
							<>
								<FaThumbsUp /> Recommends this doctor
							</>
						) : (
							<>
								<FaThumbsDown /> Does not recommend
							</>
						)}
					</div>
				</div>
			</div>
		));
	}

	return (
		<div className="reviews-container">
			<div className="reviews-grid">
				<div className="reviews-list">
					<h3 className="reviews-list__title">Patient Reviews</h3>
					{content}
				</div>

				<div className="review-form-card">
					<h3 className="review-form__title">Write a review</h3>
					<form onSubmit={handleSubmit(onSubmit)} className="review-form">
						<div className="review-form__group">
							<label className="review-form__label">
								Your rating {value ? <strong className="review-form__desc">{desc[value - 1]}</strong> : ''}
							</label>
							<Space>
								<Rate tooltips={desc} onChange={setValue} value={value} />
							</Space>
						</div>

						<div className="review-form__group">
							<label className="review-form__label">Do you recommend this doctor?</label>
							<Radio.Group onChange={onChange} value={recommend} className="review-form__radio-group">
								<Space direction="vertical">
									<Radio value={1}>
										<span className="review-form__radio-label">
											<FaThumbsUp className="review-form__radio-icon review-form__radio-icon--yes" />
											Yes, I recommend
										</span>
									</Radio>
									<Radio value={2}>
										<span className="review-form__radio-label">
											<FaThumbsDown className="review-form__radio-icon review-form__radio-icon--no" />
											No, I don't recommend
										</span>
									</Radio>
								</Space>
							</Radio.Group>
						</div>

						<div className="review-form__group">
							<label className="review-form__label">Your review</label>
							<textarea
								className="review-form__textarea"
								{...register('description')}
								placeholder="Share your experience with this doctor..."
								rows={6}
							/>
						</div>

						<Button
							htmlType="submit"
							type="primary"
							size="large"
							block
							loading={createIsLoading}
							disabled={!value || recommend === null}
							className="review-form__submit"
						>
							Submit Review
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Review;
