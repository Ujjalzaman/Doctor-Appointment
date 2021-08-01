import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

const SocialSignUp = () => {
    return (
        <div class="social-media">
            <div className="social-icon">
                <FaGoogle />
            </div>
            <div className="social-icon">
                <FaFacebook />
            </div>
            <div className="social-icon">
                <FaGithub />
            </div>
        </div>
    );
};

export default SocialSignUp;