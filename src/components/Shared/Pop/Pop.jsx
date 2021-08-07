import React, { useState } from 'react';
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useRef } from 'react';
import Popover from 'react-bootstrap/Popover';
import UserIcon from '../../../images/doc/user.svg';
import './Pop.css';
import { Link } from 'react-router-dom';

const Pop = ({ user, hanldeSignOut }) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const handleClick = (e) => {
        setShow(!show)
        setTarget(e.target);
    }


    return (
        <div ref={ref}>
            <img src={UserIcon} alt="" className="popImg" onClick={handleClick} />

            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Popover bottom</Popover.Header>
                    <Popover.Body>
                        <p className="userName">{user.name}</p>
                        <p className="userName">{user.email}</p>
                        <p><Link to="/dashboard">Deshboard</Link></p>
                        <Button variant="outline-danger" size="sm" onClick={hanldeSignOut}>Sign OUt</Button>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>

    );
};

export default Pop;