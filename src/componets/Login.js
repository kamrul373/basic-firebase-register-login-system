import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import Modals from './Modal';

const auth = getAuth();

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false)
    const handlerLoginForm = (e) => {
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user.emailVerified)
                if (result.user.emailVerified) {
                    setSuccess(true);
                } else {
                    setSuccess(false);
                    setWarning(true);
                }

            }).catch(error => {
                console.log(error);
            })
        console.log(email, password);
        e.preventDefault();
    }

    return (
        <div className='w-50 mx-auto mt-3'>
            <h2 className='text-primary'>Login Now !!!</h2>
            <Form onSubmit={handlerLoginForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" required />
                </Form.Group>
                {
                    success && <p className='text-success'>Successfully Logged in</p>
                }{
                    warning && <p className='text-danger'>Email Verification required , pleaase verify your email</p>
                }
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p className='py-2'><small>Are you new to site ? <Link to="/register">Register Now</Link> </small></p>
            </Form>
            <p className='py-2'><small>If you forget password then  <Modals></Modals> </small></p>
        </div>
    );
};

export default Login;