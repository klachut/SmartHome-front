import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = ({ user }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (emailRef.current.value.length < 3) {
      setError("Login mast have at least 3 characters");
      return;
    }
    if (passwordRef.current.value.length < 3) {
      setError("Password mast have at least 3 characters");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_URL_BASE}/api/v1/auth/register`,
        {
          username: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      navigate("/login");
    } catch (err) {
      setError("Provide valid credentials");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  if (user) {
    return null;
  }

  return (
    <Form className="login-wrapper" onSubmit={handleRegister}>
      <h1>Register</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" ref={emailRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="loginButton">
        Submit
      </Button>
      <Link className="link" to="/login">
        Login page
      </Link>
      {error ? <Alert variant="danger">{error}</Alert> : null}
    </Form>
  );
};

export default Register;
