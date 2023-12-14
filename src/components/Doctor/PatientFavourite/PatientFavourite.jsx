import img from '../../../images/doc/doctor 3.jpg';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useGetFavouriteQuery, useRemoveFavouriteMutation } from '../../../redux/api/favouriteApi';
import { FaHeart } from "react-icons/fa";
import toast,{ Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const PatientFavouriteDoctor = () => {
    const { data, isLoading, isError } = useGetFavouriteQuery();
    const [removeFavourite, {isLoading: FIsLoading, isError: fIsError, error: fError, isSuccess}] = useRemoveFavouriteMutation();

    const handleRemoveFavourite = (id) => {
        removeFavourite({ doctorId: id });
    };

    useEffect(() => {
		if (!FIsLoading && fIsError) {
			toast.error(fError?.data?.message)
		}
		if (isSuccess) {
			toast.success('Successfully Favourite Removed')
		}
	}, [isSuccess, fIsError])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {data && data?.map((item) => (
                <div className="profile-widget" key={item?.id}>
                    <div className="doc-img position-relative">
                        <a>
                            <img className="img-fluid" alt="User Image" src={img} />
                        </a>
                        <a style={{ cursor: 'pointer' }} className="position-absolute top-0 end-0 me-2" onClick={() => handleRemoveFavourite(item?.doctor?.id)}>
                            <FaHeart />
                        </a>
                    </div>
                    <div className="pro-content">
                        <h3 className="title">
                            <Link to={'/doctors/profile'}>
                                <a>{item?.doctor?.firstName} {item?.doctor?.lastName}</a>
                            </Link>
                            <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">MBBS, MD - General Medicine, DNB - Cardiology</p>
                        <div className="rating">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">(27)</span>
                        </div>
                        <ul className="available-info">
                            <li>
                                <i className="fas fa-map-marker-alt"></i> Georgia, USA
                            </li>
                            <li>
                                <i className="far fa-clock"></i> Available on Fri, 22 Mar
                            </li>
                            <li>
                                <i className="far fa-money-bill-alt"></i> $100 - $400
                                <i className="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i>
                            </li>
                        </ul>
                        <div className="row row-sm">
                            <div className="col-6">
                                <Link to={'/doctors/profile'} className="btn btn-outline-info">View Profile</Link>
                            </div>
                            <div className="col-6">
                                <Link to={'/booking'} className="btn btn-info text-white">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </>
    return (
        <DashboardLayout>
            <div className="doctor-slider slider d-flex justify-content-center align-items-center gap-3 border-0">
                {content}
                <Toaster/>
            </div>
        </DashboardLayout>
    )
}

export default PatientFavouriteDoctor