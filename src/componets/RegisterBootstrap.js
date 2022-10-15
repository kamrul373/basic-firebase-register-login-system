import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handlerRegisterForm = (e) => {
        setSuccess(false);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Pasword should be 6 charecter");
            return;
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            setError("Password should be least One UpperCase");
            return;
        }

        if (!/(?=.*\d)/.test(password)) {
            setError("Password should contain one digit");
            return;
        }

        if (!/(?=.*[!#$%&?@ "])/.test(password)) {
            setError("Password should contain one special charecter");
            return;
        }

        setError("");

        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                setSuccess(true);
                const currentUser = response.user.email;
                console.log(currentUser);
                sendEmailVerification(auth.currentUser)
                    .then(() => {

                    });
                form.reset();
            })
            .catch(error => {
                setError(error.message)
            });

    }
    return (
        <div className='w-50 mx-auto mt-3'>
            <h2 className='text-primary'>Register Now !!!</h2>
            <Form onSubmit={handlerRegisterForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" required />
                </Form.Group>
                {
                    error && <p className='text-danger'>{error}</p>
                }
                {
                    success && <p className='text-success'>Successfully Registered & a verification link sent to your email address , Pelase verify your email</p>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className='py-2'>Do you already have an account ? please <Link to="/login">Login</Link> </p>
            </Form>
        </div>
    );
};

export default RegisterBootstrap;