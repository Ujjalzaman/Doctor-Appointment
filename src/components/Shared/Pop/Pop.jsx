import React, { useState } from 'react';
import { Button, Overlay } from 'react-bootstrap';
import { useRef } from 'react';
import Popover from 'react-bootstrap/Popover';
import UserIcon from '../../../images/doc/user.svg';
import './Pop.css';

const Pop = ({ user, hanldeSignOut }) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleClick = () => {
        // setShow(!show)
    }
    return (
        <div >
            <img src={UserIcon} alt="" onClick={handleClick} className="popImg" />
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                // container={useRef.current}
                containerPadding={50}
            >
                <Popover id="popover-contained">
                    <Popover.Content className="text-center">
                        <img src={user.dp} alt="" className="popUserImg" />
                        <p className="userName">{`${user.name}`}</p>
                        <p className="userEmail">{user.password}</p>
                        <Button variant="outline-danger" size="sm" onClick={hanldeSignOut}>Log out</Button>
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
};

export default Pop;