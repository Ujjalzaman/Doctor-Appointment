import React, { useContext } from 'react';
import { UserContext } from '../../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav class="navbar navbar-expand-lg navbar-light ">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Online Doctor AppointMent</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>


                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active me-3" aria-current="page" href="/">HOME</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link me-3" href="#">ABOUT</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link me-3" href="#">CONTACT</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link me-3 text-white" href="#">DENTAL SERVICE</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link me-2 text-white" href="#">REVIEWS</a>
                        </li>

                        {
                            loggedInUser.email ?
                            <li class="nav-item">
                                <a class="nav-link text-white" href="/dashboard">DashBoard</a>
                            </li>
                            :
                            <li class="nav-item">
                                <a class="nav-link text-red" href="/login">login</a>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;