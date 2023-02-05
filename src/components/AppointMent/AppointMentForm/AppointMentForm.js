import React, { useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../Context/AuthContext';
import swal from 'sweetalert';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

const AppointMentForm = ({modalIsOpen, appointMentDate, closeModal, date }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {user} = useContext(AuthContext);
    const { data, loading, error } = useFetch(`${baseUrl}/auth/doctors`);
    const {register,handleSubmit, errors} = useForm()
    const navigate = useNavigate();
    const onSubmit = async(data) =>{
        data.appointmantDate = date;
        data.serviceTitle = appointMentDate;
        data.user_id = user._id;
        try{
            await axios.post(`${baseUrl}/auth/addAppointMent`,data)
            closeModal();
            swal({
                icon:'success',
                text:'Successfully Appointment Submited',
                timer: 23
            })
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }
    return (

        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FontAwesomeIcon icon={faWindowClose} onClick={closeModal} className="m-2 text-primary"/>
                <h1 className="text-center brand-color">{appointMentDate}</h1>
                <p className="text-secondary text-center"> On {date.toDateString()}</p>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-2">
                        <input type="text" {...register("username",{required: true})} name="username" placeholder="Your Name" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" {...register("phone", { required: true })} name="phone" placeholder="Phone Number" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" {...register("email", { required: true })} name="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                            <select className="form-control" name="doctor_id"  {...register("doctor_id", { required: true })}>
                                <option disabled={true} value="Not set">Select Doctor</option>
                                {
                                    data && data.map((item) =>(
                                        <option value={item._id} key={item._id + 20000}>{item.username}</option>
                                    ))
                                }
                            </select>
                    </div>
                    <div className="form-group row">
                        <div className="col-4">
                            <select className="form-control" name="gender"  {...register("gender", { required: true })}>
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <input {...register("age", { required: true })} className="form-control" name="age" placeholder="Your Age" type="number" />
                        </div>
                        <div className="col-4">
                            <input {...register("weight", { required: true })} className="form-control" name="weight" placeholder="Weight" type="number" />
                        </div>
                    </div>

                    <div className="form-group text-right mt-2">
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>

            </Modal>

        </div>
    );
};

export default AppointMentForm;