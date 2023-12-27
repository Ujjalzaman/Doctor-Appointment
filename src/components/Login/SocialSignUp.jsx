import React, { useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

const SocialSignUp = () => {
    const [error] = useState({})
    const handleGoogleSignIn = () => {
    }


    return (
        <div>
            <div className="social-media">
                <div className="social-icon" onClick={handleGoogleSignIn}>
                    <FaGoogle />
                </div>
                <div className="social-icon">
                    <FaFacebook />
                </div>
                <div className="social-icon">
                    <FaGithub />
                </div>
            </div>
            {error.length && <h6 className="text-danger text-center p-2">{error}</h6>}

        </div>
    );
};

export default SocialSignUp;