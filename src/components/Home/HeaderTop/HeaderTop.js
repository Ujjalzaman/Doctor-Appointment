import React from 'react';
import { Link } from 'react-router-dom';
import chair from '../../../images/doc/doc1.jpg';
const HeaderTop = () => {
    return (
        <div style={{ height: "600px", 'width': '100%' }} className="row d-flex align-items-center container">
            <div className="col-md-4 col-sm-6 col-12 offset-md-1 md-mx-5">
                <h1>Your New Smile <br />Starts From Here</h1>
                <p className="text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore eveniet necessitatibus et iusto corrupti minima
                </p>
                <Link to="/appointment" className="btn btn-primary btn-lg shadow rounded"> GET STARTED</Link>

            </div>
            <div className="col-md-6 col-sm-6 col-12">
                <img src={chair} className="img-fluid rounded" alt="" />
            </div>
        </div>
    );
};

export default HeaderTop;