import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.init";
import swal from 'sweetalert';

const Modals = () => {
    const auth = getAuth(app);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let email = ""
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                handleClose();
                swal("Reset Link", "has been sent to your email", "success");
            }).catch(error => {
                console.log(error)
            })

    }

    return (
        <>
            <Link onClick={handleShow}>Reset Password</Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot password ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Reset Your password</p>
                    <input type="email" name="email" className='w-100 p-2' placeholder='Type your Email address' onBlur={(e) => {
                        return email = e.target.value;
                    }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleResetPassword}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Modals;