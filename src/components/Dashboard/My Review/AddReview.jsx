import axios from 'axios';
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Sidebar from '../Sidebar/Sidebar';

const AddReview = () => {
    const [review, setReview] = useState({});
    const { data, loading, error, reFetchData } = useFetch("/auth/reviews");

    const handleChange = (e) => {
        setReview(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(review.email){
                const res = await axios.post("/auth/addReview", review)
                console.log(res.data);
            }
        }catch(err){
            console.log(err)
        }   
    }
    console.log(data)
    return (
        <section className='container row g-0'>
            <div className='col-md-3'>
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                <h2 className="text-center brand-color">Add a Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="reviewname" className="form-label">Name</label>
                        <input type="text" onChange={handleChange} name="name" id="reviewname" placeholder="Enter Your Name" className="form-control" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="reviewEmail" className="form-label">Email</label>
                        <input type="email" onChange={handleChange} name="email" id="reviewEmail" placeholder="example@mail.com" className="form-control" />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="reviewImage" className="form-label">Image</label>
                        <input type="file" name="image" id="reviewImage" placeholder="Image" className="form-control" />
                    </div>
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