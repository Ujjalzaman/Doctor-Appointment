import React from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import firebase from "firebase/app";
import "firebase/auth";
import { handleLoginWithProvider } from './LoginManager';


const SocialSignUp = ({ handleResponse }) => {

    const handleGoogleSignIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        handleLoginWithProvider(provider)
            .then(res => {
                if (res.error) {
                    console.log("error is ", res.error)
                }
                handleResponse(res)
                console.log("added")
            })
    }


    return (
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
    );
};

export default SocialSignUp;