import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'

import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({user, setUser}) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post(`${process.env.REACT_APP_URL_BASE}/api/v1/auth/login`,
            {
                username: emailRef.current.value,
                password: passwordRef.current.value,
            })
            setUser(data)
            localStorage.setItem('smartHomeUser', JSON.stringify(data) )
            navigate('/dashboard')
        } catch (err) {
            setError('Provide valid credentials')
        } 
    }

    useEffect(()=> {
        if(user) {
            navigate('/dashboard')
        }
    }, [user])

    if(user) {
        return null
    }

    return (
        <Form className='login-wrapper' onSubmit={handleLogin}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter email" ref={emailRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
            </Form.Group>
            <Button variant="primary" type="submit" className='loginButton'>
                Submit
            </Button>
            <Link className="link" to="/register">Register page</Link>
           

            {error ? (<Alert variant="danger">
                {error}
            </Alert>): null}
        </Form>
    )
}

export default Login;