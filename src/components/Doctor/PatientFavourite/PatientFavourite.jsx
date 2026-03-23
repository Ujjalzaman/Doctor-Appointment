import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetFavouriteQuery, useRemoveFavouriteMutation } from '../../../redux/api/favouriteApi';
import { Card, Empty, message, Button, Avatar, Tag, Rate, Spin } from 'antd';
import { FaMapMarkerAlt, FaCheckCircle, FaHeart, FaDollarSign, FaCalendar, FaUser } from "react-icons/fa";
import './PatientFavourite.css';

const PatientFavouriteDoctor = () => {
    const { data, isLoading, isError } = useGetFavouriteQuery();
    const [removeFavourite, { isLoading: FIsLoading }] = useRemoveFavouriteMutation();

    const handleRemoveFavourite = async (id) => {
        try {
            await removeFavourite({ doctorId: id }).unwrap();
            message.success('Doctor removed from favourites');
        } catch (error) {
            message.error('Failed to remove favourite');
        }
    };

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
                    <Empty description="Something went wrong loading favourites" />
                </Card>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="favourite-page">
                <div className="favourite-page__hero">
                    <div>
                        <h2 className="favourite-page__title">Your favourite doctors</h2>
                        <p className="favourite-page__lead">
                            Shortlist providers you trust — book again in one tap.
                        </p>
                    </div>
                    <Tag className="favourite-page__count">{data?.length || 0} saved</Tag>
                </div>

                {!data || data?.length === 0 ? (
                    <Card className="favourite-page__empty">
                        <Empty description="No favourite doctors yet — browse specialists and tap the heart on a profile." />
                        <Link to="/doctors">
                            <Button type="primary" size="large" className="mt-3">
                                Find doctors
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="favourite-doctors-grid">
                        {data?.map((item) => (
                            <Card key={item?.id} className="favourite-doctor-card" bordered={false}>
                                <div className="favourite-doctor-card__top">
                                    <Avatar
                                        src={item?.doctor?.img}
                                        icon={<FaUser />}
                                        size={72}
                                        className="favourite-doctor-card__avatar"
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        icon={<FaHeart style={{ fontSize: '1.2rem' }} />}
                                        onClick={() => handleRemoveFavourite(item?.doctor?.id)}
                                        loading={FIsLoading}
                                        className="favourite-button"
                                        aria-label="Remove from favourites"
                                    />
                                </div>

                                <div className="doctor-card-body">
                                    <h5 className="doctor-name">
                                        <Link to={`/doctors/profile/${item?.doctor?.id}`}>
                                            Dr. {item?.doctor?.firstName} {item?.doctor?.lastName}
                                        </Link>
                                        <FaCheckCircle className="verified-icon" />
                                    </h5>

                                    <p className="doctor-specialty">{item?.doctor?.designation || 'Medical Specialist'}</p>

                                    <div className="doctor-rating mb-3">
                                        <Rate disabled value={item?.doctor?.avgRating || 5} style={{ fontSize: 14 }} />
                                        <span className="rating-count">
                                            ({item?.doctor?.totalReviews || 0} reviews)
                                        </span>
                                    </div>

                                    <div className="doctor-info">
                                        <div className="info-item">
                                            <FaMapMarkerAlt className="info-icon" />
                                            <span>{item?.doctor?.city || 'N/A'}, {item?.doctor?.state || 'N/A'}</span>
                                        </div>
                                        <div className="info-item">
                                            <FaDollarSign className="info-icon" />
                                            <span>${item?.doctor?.price || 100} per consultation</span>
                                        </div>
                                        {item?.doctor?.experience && (
                                            <div className="info-item">
                                                <FaCalendar className="info-icon" />
                                                <span>{item?.doctor?.experience} years experience</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="doctor-actions">
                                        <Link to={`/doctors/profile/${item?.doctor?.id}`}>
                                            <Button type="default" block>
                                                View profile
                                            </Button>
                                        </Link>
                                        <Link to={`/booking/${item?.doctor?.id}`}>
                                            <Button type="primary" block>
                                                Book appointment
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default PatientFavouriteDoctor;
