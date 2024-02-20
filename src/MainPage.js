import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Spinner, Navbar } from 'react-bootstrap';
import {BACKEND_URL} from './App';
import "./MainPage.css";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [forms, setForms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState({
    _id: '',
    email: '',
    phone: '',
    title: '',
    note: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(BACKEND_URL + '/form', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
              },
        });
        if(response.ok){
            const data = await response.json();
            setForms(data.forms);
        }
        else{
            navigate('/login');
        }
        
      } catch (error) {
        navigate('/login');
        console.error('Error fetching forms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleCardClick = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdateForm = async () => {
    try {
        const token = localStorage.getItem('token');
        const result = await fetch(BACKEND_URL + `/form/update/${selectedForm._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'authorization': token,
            },
            body: JSON.stringify(selectedForm),
        });

        // Fetch updated forms after the update
        handleModalClose();
        if(result.ok){
            const response = await fetch('/form');
            const data = await response.json();
            setForms(data.forms);
        }
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" className='px-4'>
        <Navbar.Collapse className="justify-content-start">
          <Navbar.Brand>SPA Website</Navbar.Brand>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="danger" className="logout-button" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {isLoading ? (
        <Spinner animation="border" role="status">
        </Spinner>
      ) : (
        <div className="container">
          {forms.map((form, index) => (
            <Card
              key={form._id}
              className={`card card-${index % 6 + 1}`} // Apply color based on index
              onClick={() => handleCardClick(form)}
            >
              <Card.Body>
                <Card.Title>{form.title}</Card.Title>
                <Card.Text>{form.email}</Card.Text>
                <Card.Body>{form.note}</Card.Body>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={selectedForm.email}
                onChange={(e) => setSelectedForm({ ...selectedForm, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={selectedForm.phone}
                onChange={(e) => setSelectedForm({ ...selectedForm, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedForm.title}
                onChange={(e) => setSelectedForm({ ...selectedForm, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter note"
                value={selectedForm.note}
                onChange={(e) => setSelectedForm({ ...selectedForm, note: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateForm}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainPage;
