// Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import {BACKEND_URL} from './App';
import {Link, useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!username || !password) {
        setError("All fields are required");
        return;
    }

    try {
      const response = await fetch(BACKEND_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data);
        handleLogin(true);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className='mt-5' controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mt-2' controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className='mt-4' variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className='mt-3'>
          Don't have an account? <Link to="/signup">Signup here</Link>.
      </p>
    </Container>
  );
};

export default Login;
