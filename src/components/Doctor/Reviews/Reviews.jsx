import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetDoctorReviewsQuery } from '../../../redux/api/reviewsApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { Card, Avatar, Rate, Tag, Empty, Spin, Input, Select } from 'antd';
import { FaThumbsUp, FaThumbsDown, FaStar, FaSearch } from 'react-icons/fa';
import moment from 'moment';
import './Reviews.css';

const Reviews = () => {
    const { data: loginInfo } = useAuthCheck();
    const { data, isError, isLoading } = useGetDoctorReviewsQuery(loginInfo?.id);
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');

    const filteredReviews = data?.filter(review => {
        const patientName = `${review?.patient?.firstName} ${review?.patient?.lastName}`.toLowerCase();
        const matchesSearch = patientName.includes(searchTerm.toLowerCase());
        const matchesRating = ratingFilter === 'all' || review?.star === parseInt(ratingFilter);
        return matchesSearch && matchesRating;
    });

    const averageRating = data?.length 
        ? (data.reduce((sum, review) => sum + review?.star, 0) / data.length).toFixed(1)
        : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: data?.filter(r => r?.star === star)?.length || 0,
        percentage: data?.length ? ((data?.filter(r => r?.star === star)?.length || 0) / data.length * 100).toFixed(0) : 0
    }));

    const stats = [
        {
            title: 'Total Reviews',
            count: data?.length || 0,
            color: 'primary',
        },
        {
            title: 'Average Rating',
            count: averageRating,
            icon: <FaStar />,
            color: 'warning',
        },
        {
            title: 'Recommended',
            count: data?.filter(r => r?.isRecommended)?.length || 0,
            color: 'success',
        },
    ];

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="text-center p-5">
                    <Spin size="large" />
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <Card>
                    <Empty description="Something went wrong loading reviews" />
                </Card>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="dashboard-card">
                <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">Patient Reviews</h3>
                </div>

                <div className="stats-mini-grid mb-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`stat-mini-card stat-mini-card-${stat.color}`}>
                            <div className="stat-mini-details">
                                <div className="stat-mini-title">{stat.title}</div>
                                <div className="stat-mini-count">
                                    {stat.icon && <span className="me-2">{stat.icon}</span>}
                                    {stat.count}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="mb-4">
                    <h5 className="mb-3">Rating Distribution</h5>
                    {ratingDistribution.map(item => (
                        <div key={item.star} className="rating-bar-container mb-2">
                            <span className="rating-star">{item.star} <FaStar className="text-warning" /></span>
                            <div className="rating-bar">
                                <div 
                                    className="rating-bar-fill" 
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                            <span className="rating-count">{item.count}</span>
                        </div>
                    ))}
                </Card>

                <Card>
                    <div className="table-toolbar mb-4">
                        <Input
                            placeholder="Search by patient name..."
                            prefix={<FaSearch />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: 300 }}
                            allowClear
                        />
                        <Select
                            value={ratingFilter}
                            onChange={setRatingFilter}
                            style={{ width: 150 }}
                        >
                            <Select.Option value="all">All Ratings</Select.Option>
                            <Select.Option value="5">5 Stars</Select.Option>
                            <Select.Option value="4">4 Stars</Select.Option>
                            <Select.Option value="3">3 Stars</Select.Option>
                            <Select.Option value="2">2 Stars</Select.Option>
                            <Select.Option value="1">1 Star</Select.Option>
                        </Select>
                    </div>

                    {filteredReviews?.length === 0 ? (
                        <Empty description="No reviews found" />
                    ) : (
                        <div className="reviews-list">
                            {filteredReviews?.map((review) => (
                                <div key={review?.id} className="review-card">
                                    <div className="review-header">
                                        <div className="d-flex align-items-center">
                                            <Avatar 
                                                src={review?.patient?.img} 
                                                size={50}
                                            />
                                            <div className="ms-3">
                                                <h6 className="mb-1">
                                                    {review?.patient?.firstName} {review?.patient?.lastName}
                                                </h6>
                                                <div className="text-muted small">
                                                    {moment(review?.createdAt).format('MMM DD, YYYY')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <Rate disabled value={review?.star} style={{ fontSize: 16 }} />
                                            <div className="mt-2">
                                                <Tag 
                                                    color={review?.isRecommended ? 'success' : 'error'}
                                                    icon={review?.isRecommended ? <FaThumbsUp /> : <FaThumbsDown />}
                                                >
                                                    {review?.isRecommended ? 'Recommended' : 'Not Recommended'}
                                                </Tag>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <p className="mb-0">{review?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Reviews;
