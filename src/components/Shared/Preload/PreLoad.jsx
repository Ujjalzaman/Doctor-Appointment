import React from 'react';
import spinner from '../../../images/doc/spinner3.gif';
const PreLoad = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <img src={spinner} alt="" />
        </div>
    );
};

export default PreLoad;