// // // import React, { useState, useEffect, useContext } from 'react';
// // // import axios from 'axios';
// // // import { AuthContext } from '../context/auth.context';

// // // function Profile() {
// // //   const authContext = useContext(AuthContext);
// // //   const [user, setUser] = useState(null);
// // //   const [editing, setEditing] = useState(false);
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");

// // //   useEffect(() => {
// // //     if (authContext.user) {
// // //       setUser(authContext.user);
// // //       setName(authContext.user.name);
// // //       setEmail(authContext.user.email);
// // //     }
// // //   }, [authContext.user]);

// // //   const handleEdit = () => {
// // //     setEditing(true);
// // //   };

// // //   const handleCancel = () => {
// // //     setEditing(false);
// // //   };

// // //   const handleSubmit = async event => {
// // //     event.preventDefault();
// // //     const authToken = localStorage.getItem('authToken');
// // //     try {
// // //       const response = await axios.put('/profile', { name, email }, {
// // //         headers: {
// // //           Authorization: `Bearer ${authToken}`,
// // //         },
// // //       });

// // //       setUser(response.data);
// // //       authContext.setUser(response.data); // update the user in the auth context
// // //       setEditing(false);
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   };

// // //   if (!user) return <div>Loading...</div>;

// // //   return (
// // //     <div>
// // //       <h2>User Profile</h2>
// // //       {editing ? (
// // //         <form onSubmit={handleSubmit}>
// // //           <label>
// // //             Name:
// // //             <input type="text" value={name} onChange={e => setName(e.target.value)} />
// // //           </label>
// // //           <label>
// // //             Email:
// // //             <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
// // //           </label>
// // //           <button type="submit">Update</button>
// // //           <button type="button" onClick={handleCancel}>Cancel</button>
// // //         </form>
// // //       ) : (
// // //         <div>
// // //           <p>{user.name}</p>
// // //           <p>{user.email}</p>
// // //           <p>{user.password}</p>
// // //           <button onClick={handleEdit}>Edit Profile</button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Profile;


// // import React, { useState, useEffect, useContext } from 'react';
// // import axios from 'axios';
// // import { AuthContext } from '../context/auth.context';

// // function Profile() {
// //   const authContext = useContext(AuthContext);
// //   const [user, setUser] = useState(authContext.user);
// //   const [editing, setEditing] = useState(false);

// //   useEffect(() => {
// //     setUser(authContext.user);
// //   }, [authContext.user]);

// //   const handleEdit = () => {
// //     setEditing(true);
// //   };

// //   const handleCancel = () => {
// //     setEditing(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const authToken = localStorage.getItem('authToken');
// //     try {
// //       const response = await axios.put('/profile', user, {
// //         headers: {
// //           'Authorization': `Bearer ${authToken}`,
// //         },
// //       });
// //       if (response.status === 200) {
// //         authContext.setUser(response.data); // update the context user
// //         setUser(response.data);
// //         console.log(user);
// //         setEditing(false);
// //         alert('Profile updated successfully!');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const handleInputChange = (event) => {
// //     setUser({
// //       ...user,
// //       [event.target.name]: event.target.value,
// //     });
// //   };

// //   return (
// //     <div>
// //       <h2>User Profile</h2>
// //       {editing ? (
// //         <form onSubmit={handleSubmit}>
// //           <label>
// //             Name:
// //             <input type="text" name="name" value={user.name} onChange={handleInputChange} />
// //           </label>
// //           <label>
// //             Email:
// //             <input type="email" name="email" value={user.email} onChange={handleInputChange} />
// //           </label>
// //           <button type="submit">Save</button>
// //           <button type="button" onClick={handleCancel}>Cancel</button>
// //         </form>
// //       ) : (
// //         <div>
// //           <p>Name: {user.name}</p>
// //           <p>Email: {user.email}</p>
// //           <button onClick={handleEdit}>Edit Profile</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Profile;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/auth.context';

// function Profile() {
//   const authContext = useContext(AuthContext);
//   const [user, setUser] = useState(authContext.user);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     setUser(authContext.user);
//   }, [authContext.user]);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleCancel = () => {
//     setEditing(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const authToken = localStorage.getItem('authToken');


//     try {
//       const response = await axios.put('/profile', {name: user.name, email: user.email}, 
//       {
//         headers: {
//           'Authorization': `Bearer ${authToken}`,
//         },
//       });

//       if (response.status === 200) {
//         const updatedUser = response.data.user;
//         const newAuthToken = response.data.authToken;
//         localStorage.setItem('authToken', newAuthToken);
//         authContext.updateUser(updatedUser);
        
//         setUser(updatedUser);
//         setEditing(false);
//         alert('Profile updated successfully!');
//       }
//     } catch (error) {
//       if(error.response && error.response.data && error.response.data.message) {
//         console.log(error.response.data.message);
//       } else {
//         console.log('Error updating profile');
//       }
//       }
//     };


//   const handleInputChange = (event) => {
//     setUser({
//       ...user,
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {editing ? (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input type="text" name="name" value={user.name} onChange={handleInputChange} />
//           </label>
//           <label>
//             Email:
//             <input type="email" name="email" value={user.email} onChange={handleInputChange} />
//           </label>
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       ) : (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <button onClick={handleEdit}>Edit Profile</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Profile;

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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 56px)', paddingTop: '50px' }}>
    <h1 className="mb-3" style={{marginBottom: '50px'}}>Welcome to your profile</h1>
      <Card style={{ width: '30rem', backgroundColor:' #82c4be', marginTop: '20px' }}>
        <Card.Body>
          {/* <Card.Title>Welcome to your profile</Card.Title> */}
          {editing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Name</Form.Label>
                <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Save</Button>{' '}
              <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
          ) : (
            <div>
              <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
              <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
              <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;

