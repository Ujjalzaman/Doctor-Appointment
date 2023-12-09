import React, { useEffect, useState } from 'react';
import { Button, Overlay } from 'react-bootstrap';
import { useRef } from 'react';
import Popover from 'react-bootstrap/Popover';
import UserIcon from '../../../images/doc/user.svg';
import './Pop.css';
import { Link } from 'react-router-dom';

const Pop = ({ data, hanldeSignOut }) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    
    const handleClick = (e) => {
        setShow(!show)
        setTarget(e.target);
    }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if(ref.current && !ref.current.contains(event.target)){
    //             setShow(false)
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () =>{
    //         document.removeEventListener('mousedown', handleClickOutside)
    //     }
    // }, [ref])
    
    return (
        <div>
            <img src={UserIcon} alt="" className="popImg" onClick={handleClick} />
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h4" className='text-capitalize'>
                        {data?.firstName}
                    </Popover.Header>
                    <Popover.Body>
                        <p className="userName">{data?.email}</p>
                        <Link className="nav-link userName" to="/doctor/dashboard">
                            <button className='btn btn-primary my-2'>Deshboard</button>
                        </Link>
                        <Button variant="outline-danger" size="sm" onClick={hanldeSignOut}>
                            Sign Out
                        </Button>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
};

export default Pop;