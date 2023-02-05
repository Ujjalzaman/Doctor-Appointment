import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import PatientList from '../../AppointMent/AllPatients/PatientList'
import useFetch from '../../hooks/useFetch';
import Sidebar from '../Sidebar/Sidebar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const DoctorList = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [userData, setUserData] = useState({})
    const [searchData, setSearchData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data, loading, error, reFetchData } = useFetch(`${baseUrl}/auth/doctors`);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = async (event) => {
        try {
            const response = await axios.get(`${baseUrl}/auth/doctors?email=${event.email}`);
            setSearchData(response.data)
            handleShow();
        } catch (err) {
            console.log()
        }
    }
    const handleChange = (e) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleUpdateInfo = async(e) => {
        try{
            const response = await axios.put(`${baseUrl}/auth/updateInfo/${searchData[0]._id}`,userData)
            handleClose();
        }catch(err){
            console.log(err)
        }
        e.preventDefault();
    }
    return (
        <div className="all-patient">
            <Sidebar></Sidebar>

            <div className="col-md-10 p-5 pr-4 m-0 patient-container">
                <h6 className="brand-color text-start">Doctors</h6>

                <div className="my-2">
                    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="title">Add Doctor</h2>
                        <div className="input-field">
                            <span className="fIcon"><FaEnvelope /></span>
                            <input {...register("email", { required: true })} placeholder="Enter Your Email" type="email" />
                        </div>
                        <button className="iBtn" type="submit" value="sign In" >
                            {loading ? <Spinner animation="border" variant="info" /> : "Search"}
                        </button>
                    </form>
                </div>

                <table className="table shadow-lg p-5 mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-primar text-center" scope="col">Sr No</th>
                            <th className="text-primar" scope="col">Name</th>
                            <th className="text-primar" scope="col">Email</th>
                            <th className="text-primar" scope="col">Type</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            data && data.map((item, index) =>
                                <tr className="pateint-table-data" key={index + 100}>
                                    <th className="text-center">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.isDoctor ? "Doctor" : "User"}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Doctor or Update Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="doctorUserName" className="form-label">Username</label>
                                <input onChange={handleChange} type="email" className="form-control" id="doctorUserName" name="username" defaultValue={searchData[0]?.username}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input onChange={handleChange} type="email" className="form-control" id="doctorEmail" name="email" defaultValue={searchData[0]?.email}/>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleChange} name="type" className="form-select" aria-label="Default select example">
                                    <option 
                                    value={searchData[0]?.isAdmin ? "2" : searchData[0]?.isDoctor ? "1" : "0"}
                                    defaultValue>{searchData[0]?.isAdmin ? "Admin" : searchData[0]?.isDoctor ? "Doctor" : "User"}</option>
                                    <option value="1">Doctor</option>
                                    <option value="2">Admin</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateInfo}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default DoctorList