import React, { useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { handleLoginWithProvider } from './LoginManager';
import toast, { Toaster } from 'react-hot-toast';


const SocialSignUp = ({ handleResponse }) => {

    const [error, setError] = useState({})

    const handleGoogleSignIn = () => {

        // let provider = new firebase.auth.GoogleAuthProvider();
        // handleLoginWithProvider(provider)
        //     .then(res => {
        //         if (res.error) {
        //             setError(res.error)
        //         }
        //         handleResponse(res)
        //         toast("Successfully logged in")
        //     })
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