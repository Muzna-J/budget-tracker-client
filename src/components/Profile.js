import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Card, Button, Form } from 'react-bootstrap';

function Profile() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(authContext.user);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUser(authContext.user);
  }, [authContext.user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.put('/profile', {name: user.name, email: user.email}, 
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data.user;
        const newAuthToken = response.data.authToken;
        localStorage.setItem('authToken', newAuthToken);
        authContext.updateUser(updatedUser);
        
        setUser(updatedUser);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log('Error updating profile');
      }
    }
  };

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
    <h1 className="mb-3" style={{marginBottom: '60px', marginTop: '40px'}}>Welcome to your profile</h1>
      <Card style={{ width: '30rem', height: '15rem', backgroundColor:' #82c4be', marginTop: '30px' }}>
        <Card.Body>
          {/* <Card.Title>Welcome to your profile</Card.Title> */}
          {editing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Name</Form.Label>
                <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} style={{backgroundColor: '#ecf5f9'}} />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} style={{backgroundColor: '#ecf5f9'}} />
              </Form.Group>
             
              <button type="submit" style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px', marginTop:'5px' }} className="btn" onClick={handleEdit}>Save</button>
{' '}
              <Button variant="secondary" type="button" style={{marginTop:'5px'}} onClick={handleCancel}>Cancel</Button>
            </Form>
          ) : (
            <div  style={{marginTop:'30px'}}>
              <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
              <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
              <button type="submit" style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }} className="btn" onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;

