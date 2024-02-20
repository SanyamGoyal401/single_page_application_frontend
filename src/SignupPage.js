// Signup.js
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {BACKEND_URL} from './App';

const Signup = () => {
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
      const response = await fetch(BACKEND_URL + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <h1>Signup</h1>
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
          Signup
        </Button>

        <p className='mt-3'>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </Form>
    </Container>
  );
};

export default Signup;
