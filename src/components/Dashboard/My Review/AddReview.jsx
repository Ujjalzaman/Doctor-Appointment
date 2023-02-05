import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useFetch from '../../hooks/useFetch';
import Sidebar from '../Sidebar/Sidebar';
import swal from 'sweetalert';

const AddReview = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [review, setReview] = useState({});
    const { data, loading, error, reFetchData } = useFetch(`${baseUrl}/auth/reviews`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setReview(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        review.user_id = user._id;
        review.email = user.email;
        review.name = user.username
        try {
            if (user._id && review.desc) {
                const res = await axios.post(`${baseUrl}/auth/addReview`, review)
                swal({
                    icon: 'success',
                    text: 'Successfully Sign In',
                    timer: 2000
                })
                navigate("/")
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className='container row g-0'>
            <div className='col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                <h2 className="text-center brand-color">Add a Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="reviewAddress" className="form-label">Address</label>
                        <input type="text" onChange={handleChange} name="address" id="reviewAddress" placeholder="stree/avenue" className="form-control" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="descriptionReview" className="form-label">Description</label>
                        <textarea onChange={handleChange} id="descriptionReview" name="desc" placeholder="Enter Your Review" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
                <table className="table shadow-lg p-5 mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-primar text-center" scope="col">Sr No</th>
                            <th className="text-primar" scope="col">Name</th>
                            <th className="text-primar" scope="col">Email</th>
                            <th className="text-primar" scope="col">Address</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            data && data.map((item, index) =>
                                <tr className="pateint-table-data" key={index + 1020}>
                                    <th className="text-center">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default AddReview