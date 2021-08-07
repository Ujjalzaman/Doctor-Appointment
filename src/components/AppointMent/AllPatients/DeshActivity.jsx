import React from 'react';


const DeshActivity = () => {
    return (

        <div className="d-flex justify-content-center align-items-ceneter">
            <div className="desh-card bg-danger">
                <div className="desh-date d-flex justify-content-center align-items-ceneter">
                    <h2>09</h2>
                    <div className="desh-text">
                        <p>Pending <br /> Appointments</p>
                    </div>
                </div>
            </div>

            <div className="desh-card bg-primary">
                <div className="desh-date d-flex justify-content-center align-items-ceneter">
                    <h2>19</h2>
                    <div className="desh-text">
                        <p>Today <br /> Appointments</p>
                    </div>
                </div>
            </div>

            <div className="desh-card bg-success">
                <div className="desh-date d-flex justify-content-center align-items-ceneter">
                    <h2>55</h2>
                    <div className="desh-text">
                        <p>Total <br /> Appointments</p>
                    </div>
                </div>
            </div>

            <div className="desh-card bg-warning">
                <div className="desh-date d-flex justify-content-center align-items-ceneter">
                    <h2>98</h2>
                    <div className="desh-text">
                        <p>Total <br /> Patients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeshActivity;