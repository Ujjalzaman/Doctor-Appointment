import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const {register,handleSubmit, errors} = useForm()
    const navigate = useNavigate();
    const onSubmit = async(data) =>{
        data.appointmantDate = date;
        data.serviceTitle = appointMentDate;
        try{
            await axios.post("http://localhost:5000/auth/addAppointMent",data)
            closeModal();
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
                    <div className="form-group">
                        <input type="text" {...register("name",{required: true})} name="name" placeholder="Your Name" className="form-control" />

                    </div>
                    <div className="form-group">
                        <input type="text" {...register("phone", { required: true })} name="phone" placeholder="Phone Number" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" {...register("email", { required: true })} name="email" placeholder="Email" className="form-control" />
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

                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>

            </Modal>

        </div>
    );
};

export default AppointMentForm;